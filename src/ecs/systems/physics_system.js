const Axis = Object.freeze({
    X: 'x',
    Y: 'y'
});

class PhysicsSystem extends System {
    constructor() {
        // Walls never change, so can cache them
        this.walls = null;
    }
    update(ecs) {
        const entities = ecs.getEntitiesWith(Position, Velocity, Collider);
        if (!this.walls) {
            this.walls = ecs.getEntitiesWith(Position, Collider, Immovable, Wall);
        }

        for (let id of entities) {
            const pos = ecs.getComponent(id, Position);
            const vel = ecs.getComponent(id, Velocity);
            const col = ecs.getComponent(id, Collider);
            const player = ecs.getComponent(id, Player);

            if (player) {
                player.onGround = false;
            }

            // X-AXIS MOVEMENT
            pos.x += vel.vx;
            this.resolveWallCollisions(id, pos, col, ecs, Axis.X);

            // Y-AXIS MOVEMENT
            pos.y += vel.vy;
            this.resolveWallCollisions(id, pos, col, ecs, Axis.Y);
        }
    }

    collides(a, b) {
        // a and b are bounding boxes from col.getBoundingBox(pos)
        return a.left_x < b.left_x + b.w &&
            a.left_x + a.w > b.left_x &&
            a.top_y < b.top_y + b.h &&
            a.top_y + a.h > b.top_y;
    }

    resolveWallCollisions(entityId, pos, col, ecs, axis) {
        /*
        Resolves a collision between an entity having Position, Velocity, Collider and all walls
        */
        const bb_a = col.getBoundingBox(pos);
        const vel = ecs.getComponent(entityId, Velocity);
        const player = ecs.getComponent(entityId, Player);

        // Loop through all walls
        // See if entity is colliding with wall(s)
        // Resolve collision in correct axis
        for (let wallId of this.walls) {
            const wallPos = ecs.getComponent(wallId, Position);
            const wallCol = ecs.getComponent(wallId, Collider);
            const bb_b = wallCol.getBoundingBox(wallPos);

            if (this.collides(bb_a, bb_b)) {
                if (axis === Axis.X) {
                    // Resolve X: Push out and kill velocity
                    if (vel.vx > 0) {
                        pos.x = bb_b.left_x - bb_a.w / 2; // Hit left side of wall
                    } else if (vel.vx < 0) {
                        pos.x = bb_b.left_x + bb_b.w + bb_a.w / 2; // Hit right side of wall
                    }
                    vel.vx = 0;
                } 
                else {
                    // Resolve Y: Push out and kill velocity
                    if (vel.vy > 0) {
                        pos.y = bb_b.top_y - bb_a.h / 2; // Hit top of floor
                        
                        if (player) {
                            player.onGround = true;
                        }

                    } else if (vel.vy < 0) {
                        pos.y = bb_b.top_y + bb_b.h + bb_a.h / 2; // Hit bottom of ceiling
                    }
                    vel.vy = 0;
                }
            }
        }
    }
}