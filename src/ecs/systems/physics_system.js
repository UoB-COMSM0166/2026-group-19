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
    constructor(ecs) {
        super(ecs);
        this.maxFall = 50; // Terminal velocity
    }

    update() {
        /*
        Main update loop called each frame.
        For each entity with Position and Velocity:
        1. Apply gravity
        2. Update X position and resolve wall collisions
        3. Update Y position and resolve wall collisions
        4. Check for interaction collisions (pickups, damage, etc.)
        */
        const toDelete = [];
        const moving_ids = this.ecs.getEntitiesWith(Position, Velocity);
        

        for (let id of moving_ids) {
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const g = this.ecs.getComponent(id, Gravity);

            // Apply Gravity
            if (g) {
                vel.vy = Math.min(vel.vy + g.g, this.maxFall);
            }

            // Movement phase (axis-dependent)
            pos.x += vel.vx;
            this.resolveMovementCollisions(id, Axis.X);
            pos.y += vel.vy;
            this.resolveMovementCollisions(id, Axis.Y);

            // Interaction phase (axis-independent)
            this.resolveInteractionCollisions(id, toDelete);
        }

        // Delay deletion in case the update still looping through the things we already deleted right away
        for (let id of toDelete){
            this.ecs.removeEntity(id);
        }
    }

    collides(a, b) {
        /*
        AABB collision detection.
        Returns true if bounding box a and bounding box b are overlapping.
        */
        return a.left_x < b.left_x + b.w &&
            a.left_x + a.w > b.left_x &&
            a.top_y < b.top_y + b.h &&
            a.top_y + a.h > b.top_y;
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

    resolveInteractionCollisions(id, toDelete) {
        /*
        Handles gameplay interaction collisions for the entity.
        */
        if (this.ecs.getComponent(id, Player)) {
            this.handlePlayerEnemyCollision(id);
            this.handlePlayerBoxCollision(id, toDelete);
        }

        if (this.ecs.getComponent(id, Projectile)) {
            this.handleProjectileEnemyCollision(id, toDelete);
            this.handleProjectileWallCollision(id, toDelete);
        }
    }

    forEachCollision(pos, components, callback) {
        /*
        Iterates through all entities with the given components and calls the
        callback for each entity whose bounding box collides with the given positition's bounding box.

        Position pos - The position to check collisions against
        Component[] components - Array of component types to query (e.g., [Enemy, Position])
        Function callback - A function reference/pointer called with entity id for each collision found
        */
        const ids = this.ecs.getEntitiesWith(...components);
        const bb_a = pos.getBoundingBox();
        for (let id of ids) {
            const otherPos = this.ecs.getComponent(id, Position);
            const bb_b = otherPos.getBoundingBox();
            if (this.collides(bb_a, bb_b)) {
                callback(id);
            }
        }
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
                pos.x = bb_b.left_x + bb_b.w + bb_a.w / 2; // Hit ri
                // ght side of wall
            }
            
            if (player) { vel.vx = 0; }
            else { vel.vx = -vel.vx; }
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

    handlePlayerEnemyCollision(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            // TODO: Implement logic
            console.log('Player dies');
        })
    }

    handlePlayerBoxCollision(playerId, toDelete) {
        const pos = this.ecs.getComponent(playerId, Position);
        this.forEachCollision(pos, [Box, Position], (boxId) => {
            // Player gets weapon, box is removed
            this.ecs.addComponent(playerId, new Weapon("pistol"));
            toDelete.push(boxId);
            
            
            console.log('Player gets weapon, box is removed');
        })
    }

    handleProjectileEnemyCollision(projectileId, toDelete) {
        const pos = this.ecs.getComponent(projectileId, Position);
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            // TODO: Implement logic
            // So far disappear
            toDelete.push(projectileId);
            toDelete.push(enemyId);
            console.log('Enemy takes damage');
        })
    }

    handleProjectileWallCollision(projectileId, toDelete) {
        const pos = this.ecs.getComponent(projectileId, Position);
        this.forEachCollision(pos, [Wall, Position], (wallId) => {
            // TODO: Implement logic
            toDelete.push(projectileId);
            console.log('Projectile hits wall, should be deleted');
        })
    }
}