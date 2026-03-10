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
        this.maxFall = PhysicsConstants.TERMINAL_VELOCITY; // Terminal velocity
    }

    update() {
        /*
        Main update loop called each frame.
        For each entity with Position and Velocity:
        1. Apply gravity
        2. Update X position and resolve wall collisions
        3. Update Y position and resolve wall collisions
        4. Check for interaction collisions (pickups, damage, etc.)
        5. If entity fallen off bottom of screen, respawn at top
        */
        const toDelete = [];
        const moving_ids = this.ecs.getEntitiesWith(Position, Velocity);
        const force_ids = this.ecs.getEntitiesWith(Position, Velocity, Force);

        for (let id of moving_ids) {
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const force = this.ecs.getComponent(id, Force);
            const enemy = this.ecs.getComponent(id, Enemy);
            const g = this.ecs.getComponent(id, Gravity);

            //apply if forces if they are present
            if (force) {
                vel.vx += force.fx;
                vel.vy += force.fy;
            }

            // Apply Gravity (but not to floating enemies)
            if (g && !(enemy && enemy.type === EnemyType.FLOATING)) {
                vel.vy = Math.min(vel.vy + g.g, this.maxFall);
            }

            // Movement phase (axis-dependent)
            pos.x += vel.vx;
            this.resolveMovementCollisions(id, Axis.X);
            
            if (pos.y > height) {
                pos.y = 0;
                vel.vx = Math.sign(vel.vx) * Math.min(Math.abs(vel.vx) * 2, 12); //replace with angry_mode=true eventually
            }
            else {
                pos.y = pos.y + vel.vy;
            }   
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

        // Assume character is not on ground, update to true later if on ground
        if (axis === Axis.Y) {
            char.onGround = false;
        }

        this.forEachCollision(pos, [Position, Wall], wallId => {
            const wallPos = this.ecs.getComponent(wallId, Position);
            this.resolveWallPenetration(pos, vel, char, player, axis, wallPos);
        })
    }

    resolveWallPenetration(pos, vel, char, player, axis, wallPos) {
        // Helper private method for resolveMovementCollisions
        const bb_a = pos.getBoundingBox();
        const bb_b = wallPos.getBoundingBox();

        if (axis === Axis.X) {
            // Resolve X: Push out and kill velocity
            if (vel.vx > 0) {
                pos.x = bb_b.left_x - bb_a.w / 2; // Hit left side of wall
            } else if (vel.vx < 0) {
                pos.x = bb_b.left_x + bb_b.w + bb_a.w / 2; // Hit right side of wall
            }
            
            if (player) { 
                vel.vx = 0; 
            }
            else { 
                vel.vx = -vel.vx; 
            }
        } 
        else {
            // Resolve Y: Push out and kill velocity
            if (vel.vy > 0) {
                pos.y = bb_b.top_y - bb_a.h / 2; // Hit top of floor
                char.onGround = true;

            } else if (vel.vy < 0) {
                pos.y = bb_b.top_y + bb_b.h + bb_a.h / 2; // Hit bottom of ceiling
            }
            vel.vy = 0;
        }
    }

}