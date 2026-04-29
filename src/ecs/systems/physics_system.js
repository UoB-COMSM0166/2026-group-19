const Axis = Object.freeze({
    X: 'x',
    Y: 'y'
});

/**
 * Simulates physics for all entities with Position and Velocity components.
 * Each frame it applies gravity, integrates velocity into position axis-by-axis,
 * and resolves wall collisions to prevent penetration. Entities that fall below
 * the screen are either removed (dying/droplets) or respawned at the top (enemies,
 * who also gain a speed boost and switch to their angry sprite on respawn).
 */
class PhysicsSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    /**
     * For each moving entity: applies acceleration (with gravity scaled down for dying
     * entities), clamps player horizontal speed and decays recoil, moves along X then
     * resolves wall collisions, moves along Y, handles screen-bottom exit, then resolves
     * Y wall collisions. Enemy speed is capped and multiplied when in powerful state.
     */
    update(dt) {
        const moving_ids = this.ecs.getEntitiesWith(Position, Velocity);
        

        for (let id of moving_ids) {
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const accel = this.ecs.getComponent(id, Acceleration);
            const enemy = this.ecs.getComponent(id, Enemy);
            const droplet = this.ecs.getComponent(id, BloodDroplet);
            const player = this.ecs.getComponent(id, Player);

            // Apply Gravity
            if (accel) {
                const dying = this.ecs.getComponent(id, Dying);
                const gravityScale = dying ? 0.5 : 1;
                vel.vx = vel.vx + accel.ax * dt;

                // Terminal velocity only applies in downward direction (for gravity)
                vel.vy = Math.min(vel.vy + (accel.ay * gravityScale) * dt, this.physics.terminalVelocity);
            }

            // Clamp player horizontal speed
            if (player) {
                vel.vx = Math.sign(vel.vx) * Math.min(Math.abs(vel.vx), this.physics.playerSpeed);
                vel.recoilVx *= Math.pow(this.physics.playerDampingMultiplier, dt);
                if (Math.abs(vel.recoilVx) < 0.001) vel.recoilVx = 0;
            }

            // Movement phase (axis-dependent)
            pos.x += Math.round((vel.vx + vel.recoilVx) * dt);
            this.resolveMovementCollisions(id, Axis.X);

            let nextY = pos.y + vel.vy * dt;
            if (nextY > height) {
                const dying = this.ecs.getComponent(id, Dying);
                const droplet = this.ecs.getComponent(id, BloodDroplet);

                if (dying || droplet) {
                    this.ecs.removeEntity(id);
                    continue;
                } else {
                    pos.y = 0;
                    if (enemy) {
                        enemy.powerful = true;
                        vel.vx *= this.physics.enemySpeedMultiplier; // Enemies gain speed boost after falling

                        const anim = this.ecs.getComponent(id, Animation);
                        if (anim) {
                            if (anim.spriteSheet === enemySpriteSheet) {
                                anim.setSpriteSheet(enemyAngrySpriteSheet, 7, EnemyAngryAnimations);
                            } else if (anim.spriteSheet === enemyLargeSpriteSheet) {
                                anim.setSpriteSheet(enemyLargeAngrySpriteSheet, 5, LargeEnemyAngryAnimations);
                            }
                        }
                    }
                }
            } else {
                pos.y = nextY;
            }

            // Clamp to max speed — magnified if enemy is in powerful state
            if (enemy) {
                const maxSpeed = enemy.powerful
                    ? this.physics.enemySpeed * this.physics.enemySpeedMultiplier
                    : this.physics.enemySpeed;
                vel.vx = Math.sign(vel.vx) * Math.min(Math.abs(vel.vx), maxSpeed);
                vel.vy = Math.sign(vel.vy) * Math.min(Math.abs(vel.vy), maxSpeed);
            }

            // Resolve Wall Collisions
            this.resolveMovementCollisions(id, Axis.Y);
        }
    }

    /**
     * Pushes a character entity out of any overlapping walls along the given axis and
     * stops the corresponding velocity component. Marks the character as onGround when
     * a downward Y collision is resolved, which the InputSystem uses to gate jumping.
     */
    resolveMovementCollisions(id, axis) {
        const char = this.ecs.getComponent(id, Character);
        if (!char) return;
        const pos = this.ecs.getComponent(id, Position);
        const vel = this.ecs.getComponent(id, Velocity);
        const player = this.ecs.getComponent(id, Player);
        const floating = this.ecs.getComponent(id, Floating);

        // Assume character is not on ground, update to true later if on ground
        if (axis === Axis.Y) {
            char.onGround = false;
        }

        const originalVel = { vx: vel.vx + (vel.recoilVx ?? 0), vy: vel.vy };

        this.forEachCollision(pos, [Position, Wall], wallId => {
            const wallPos = this.ecs.getComponent(wallId, Position);
            this.resolveWallPenetration(pos, vel, char, player, floating, axis, wallPos, originalVel);
        })
    }

    /**
     * Calculates and applies the positional correction and velocity cancellation for a
     * single wall overlap detected along the given axis. Players stop dead on wall contact;
     * enemies reverse direction. Floating enemies bounce vertically instead of stopping.
     */
    resolveWallPenetration(pos, vel, char, player, floating, axis, wallPos, originalVel) {
        const bb_a = pos.getBoundingBox();
        const bb_b = wallPos.getBoundingBox();

        if (axis === Axis.X) {
            // Resolve X: Push out and kill velocity
            if (originalVel.vx > 0) {
                pos.x = Math.floor(bb_b.left_x - bb_a.w / 2); // Hit left side of wall
            } else if (originalVel.vx < 0) {
                pos.x = Math.ceil(bb_b.left_x + bb_b.w + bb_a.w / 2); // Hit right side of wall
            }
            
            if (player) {
                vel.vx = 0;
                vel.recoilVx = 0;
            }
            else { 
                // Only flip velocity if it matches the original direction (avoid double flip)
                if (originalVel.vx > 0 && vel.vx > 0) vel.vx = -vel.vx;
                else if (originalVel.vx < 0 && vel.vx < 0) vel.vx = -vel.vx;
            }
        } 
        else {
            // Resolve Y: Push out and kill velocity
            if (originalVel.vy > 0) {
                pos.y = Math.floor(bb_b.top_y - bb_a.h / 2); // Hit top of floor
                char.onGround = true;

                if (floating) {
                    vel.vy = -this.physics.floatingEnemyBounce;
                }
                else {
                    vel.vy = 0;
                }

            } else if (originalVel.vy < 0) {
                pos.y = Math.ceil(bb_b.top_y + bb_b.h + bb_a.h / 2); // Hit bottom of ceiling
                vel.vy = 0;
            }
        }
    }

}