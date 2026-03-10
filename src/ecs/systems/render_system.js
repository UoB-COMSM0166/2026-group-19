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
            const player = this.ecs.getComponent(entity, Player);
            const vel = this.ecs.getComponent(entity, Velocity);
            const bb = pos.getBoundingBox();

            // Keep track of which way the entity is facing
            if (render.facingRight === undefined) {
                render.facingRight = true; // Default to facing right
            }
            
            // player's facing direction should base on the last key, or the recoil will make it flip
            if (player) {
                if (player.direction === 1){
                    render.facingRight = true;
                }
                else if (player.direction === -1){
                    render.facingRight = false;
                }
            }

            // Update the facing direction
            if (vel && !player) {
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
                    
                    const dashLength = 5;
                    const gapLength = 5;
                    const dx = enemyPos.x - playerPos.x;
                    const dy = enemyPos.y - playerPos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const steps = distance / (dashLength + gapLength);
                    const stepX = dx / steps;
                    const stepY = dy / steps;
                    
                    for (let i = 0; i < steps; i++) {
                        const x1 = playerPos.x + stepX * i;
                        const y1 = playerPos.y + stepY * i;
                        const x2 = x1 + (stepX * dashLength / (dashLength + gapLength));
                        const y2 = y1 + (stepY * dashLength / (dashLength + gapLength));
                        line(x1, y1, x2, y2);
                    }

                    pop();
                }
            }
        }
    }
}