class RenderSystem extends System {
    /*
    Handles drawing of all renderable entities to the screen
    */
    constructor(ecs) {
        super(ecs);
        this.debugLineOfSight = true;
    }

    update() {
        const entities = this.ecs.getEntitiesWith(Position, Renderable);
        for (let entity of entities) {
            const pos = this.ecs.getComponent(entity, Position);
            const render = this.ecs.getComponent(entity, Renderable);

            const vel = this.ecs.getComponent(entity, Velocity);
            const bb = pos.getBoundingBox();

            // Keep track of which way the entity is facing
            if (render.facingRight === undefined) {
                render.facingRight = true; // Default to facing right
            }

            // Update the facing direction
            if (vel) {
                if (vel.vx > 0) {
                    render.facingRight = true;
                } else if (vel.vx < 0) {
                    render.facingRight = false;
                }
            }

            if (render.image && render.image.width > 0) {
                push();

                // Move the origin to the center of the entity
                translate(pos.x, pos.y);

                // If facing left, flip the canvas horizontally
                if (!render.facingRight) {
                    scale(-1, 1);
                }
                imageMode(CENTER);
                image(render.image, 0, 0, bb.w, bb.h);
                pop();
            } else {
                fill(...render.color);
                noStroke();
                rect(bb.left_x, bb.top_y, bb.w, bb.h);
            }
        }

        if (this.debugLineOfSight) {
            const players = this.ecs.getEntitiesWith(Player, Position);
            if (players.length > 0) {
                const playerPos = this.ecs.getComponent(players[0], Position);
                const floatingEnemies = this.ecs.getEntitiesWith(Enemy, Position, Force);
                for (let enemyId of floatingEnemies) {
                    const enemyPos = this.ecs.getComponent(enemyId, Position);

                    push();
                    stroke(255, 0, 0);
                    strokeWeight(1);
                    drawingContext.setLineDash([5, 5]);
                    line (
                        enemyPos.x, enemyPos.y,
                        playerPos.x, playerPos.y
                    );
                    pop();
                }
            }
        }
    }
}