const Axis = Object.freeze({
    X: 'x',
    Y: 'y'
});

class PhysicsSystem extends System {
    /*
    Handles all physics simulation for the game.

    Responsibilities:
    - Apply gravity
    - Update entity positions based on velocity
    - Resolve all collisions between entities

    The system processes entities in two phases per frame:
    - Movement Phase: Apply velocity and gravity, resolve wall collisions (axis-by-axis to allow sliding)
    - Interaction Phase: Check for gameplay interactions (pickups, damage, etc.)
    */
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.physics = DEFAULTS.physics; // Terminal velocity
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    update(dt) {
        /*
        Main update loop called each frame.
        For each entity with Position and Velocity:
        1. Apply gravity
        2. Update X position and resolve wall collisions
        3. Update Y position and resolve wall collisions
        4. Check for interaction collisions (pickups, damage, etc.)
        5. If entity fallen off bottom of screen, respawn at top
        */
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
                vel.vx = vel.vx + accel.ax * dt;

                // Terminal velocity only applies in downward direction (for gravity)
                vel.vy = Math.min(vel.vy + accel.ay * dt, this.physics.TERMINAL_VELOCITY);
            }

            // Clamp player horizontal speed
            if (player) {
                vel.vx = Math.sign(vel.vx) * Math.min(Math.abs(vel.vx), this.physics.PLAYER_SPEED);
            }

            // Movement phase (axis-dependent)
            pos.x += Math.round(vel.vx * dt);
            this.resolveMovementCollisions(id, Axis.X);
            
            if (pos.y > height) {
                if (droplet) {
                    this.ecs.removeEntity(id);
                    continue;
                }

                pos.y = 0;
                if (enemy) {
                    enemy.powerful = true;
                    vel.vx *= this.physics.ENEMY_SPEED_MULTIPLIER;
                }
            }
            else {
                pos.y = pos.y + vel.vy * dt;
            }  

            // Clamp to max speed — magnified if enemy is in powerful state
            if (enemy) {
                const maxSpeed = enemy.powerful
                    ? this.physics.ENEMY_SPEED * this.physics.ENEMY_SPEED_MULTIPLIER
                    : this.physics.ENEMY_SPEED;
                vel.vx = Math.sign(vel.vx) * Math.min(Math.abs(vel.vx), maxSpeed);
                vel.vy = Math.sign(vel.vy) * Math.min(Math.abs(vel.vy), maxSpeed);
            }

            // Resolve Wall Collisions
            this.resolveMovementCollisions(id, Axis.Y);
        }
    }

    resolveMovementCollisions(id, axis) {
        /*
        Resolves collsions between a character and walls for a specific axis.
        Prevents characters from passing through walls by pushing them out and stopping velocity.
        Also marks the character as "on ground" if they collide with a floor (for jumping logic in InputSystem)
        */
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

        const originalVel = { vx: vel.vx, vy: vel.vy };

        this.forEachCollision(pos, [Position, Wall], wallId => {
            const wallPos = this.ecs.getComponent(wallId, Position);
            this.resolveWallPenetration(pos, vel, char, player, floating, axis, wallPos, originalVel);
        })
    }

    resolveWallPenetration(pos, vel, char, player, floating, axis, wallPos, originalVel) {
        // Helper private method for resolveMovementCollisions
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
                    vel.vy = -this.physics.FLOATING_ENEMY_BOUNCE;
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