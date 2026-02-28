const Axis = Object.freeze({
    X: 'x',
    Y: 'y'
});

class PhysicsSystem extends System {
    constructor(ecs) {
        super(ecs);
        // Walls never change, so can cache them
        this.walls = null;
    }
    update() {
        const entities = this.ecs.getEntitiesWith(Position, Velocity, Collider, Character);
        if (!this.walls) {
            this.walls = this.ecs.getEntitiesWith(Position, Collider, Immovable, Wall);
        }

        for (let id of entities) {
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const col = this.ecs.getComponent(id, Collider);
            const sprite = this.ecs.getComponent(id, Character);

            sprite.onGround = false;

            // X-AXIS MOVEMENT
            pos.x += vel.vx;
            this.resolveWallCollisions(id, pos, col, Axis.X);

            // Y-AXIS MOVEMENT
            pos.y += vel.vy;
            this.resolveWallCollisions(id, pos, col, Axis.Y);
        }
    }

    collides(a, b) {
        // a and b are bounding boxes from col.getBoundingBox(pos)
        return a.left_x < b.left_x + b.w &&
            a.left_x + a.w > b.left_x &&
            a.top_y < b.top_y + b.h &&
            a.top_y + a.h > b.top_y;
    }

    resolveWallCollisions(entityId, pos, col, axis) {
        /*
        Resolves a collision between an entity having Position, Velocity, Collider and all walls
        */
        const bb_a = col.getBoundingBox(pos);
        const vel = this.ecs.getComponent(entityId, Velocity);
        const sprite = this.ecs.getComponent(entityId, Character);

        // Loop through all walls
        // See if entity is colliding with wall(s)
        // Resolve collision in correct axis
        for (let wallId of this.walls) {
            const wallPos = this.ecs.getComponent(wallId, Position);
            const wallCol = this.ecs.getComponent(wallId, Collider);
            const bb_b = wallCol.getBoundingBox(wallPos);

            if (this.collides(bb_a, bb_b)) {
                if (axis === Axis.X) {
                    // Resolve X: Push out and kill velocity
                    if (vel.vx > 0) {
                        pos.x = bb_b.left_x - bb_a.w / 2; // Hit left side of wall
                    } else if (vel.vx < 0) {
                        pos.x = bb_b.left_x + bb_b.w + bb_a.w / 2; // Hit right side of wall
                    }

                    if (sprite.isPlayer) {
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
                        sprite.onGround = true;

                    } else if (vel.vy < 0) {
                        pos.y = bb_b.top_y + bb_b.h + bb_a.h / 2; // Hit bottom of ceiling
                    }
                    vel.vy = 0;
                }
            }
        }
    }
}