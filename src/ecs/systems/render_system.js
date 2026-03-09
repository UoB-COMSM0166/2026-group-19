class RenderSystem extends System {
    /*
    Handles drawing of all renderable entities to the screen
    */
    constructor(ecs) {
        super(ecs);
    }

    update() {
        const entities = this.ecs.getEntitiesWith(Position, Renderable);
        for (let entity of entities) {
            const pos = this.ecs.getComponent(entity, Position);
            const render = this.ecs.getComponent(entity, Renderable);
            const player = this.ecs.getComponent(entity, Player);
            const wall = this.ecs.getComponent(entity, Wall);
            const vel = this.ecs.getComponent(entity, Velocity);
            const sprite = this.ecs.getComponent(entity, Sprite);
            const bb = pos.getBoundingBox();

            if (sprite && sprite.image && sprite.image.width > 0) {
                const anim = sprite.animations[sprite.currentAnimation];
                if (anim) {
                    const frameIndex = anim.start + sprite.currentFrame;
                    const sx = frameIndex * sprite.frameWidth;
                    const sy = 0;
                    const drawW = bb.w * sprite.scale;
                    const drawH = bb.h * sprite.scale;

                    push();
                    translate(pos.x, pos.y);
                    if (sprite.flipX) {
                        scale(-1, 1);
                    }
                    imageMode(CENTER);
                    image(
                        sprite.image,
                        0,
                        0,
                        drawW,
                        drawH,
                        sx,
                        sy,
                        sprite.frameWidth,
                        sprite.frameHeight
                    );
                    pop();
                    continue;
                }
            }

            // Keep track of which way the entity is facing
            if (render.facingRight === undefined) {
                render.facingRight = true; // Default to facing right
            }

            // player's facing direction should base on the last key, or the recoil will make it flip
            if (player) {
                if (player.direction === 1) {
                    render.facingRight = true;
                }
                else if (player.direction === -1) {
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
                if (wall) {
                    const tileSize = Math.max(1, Math.min(bb.w, bb.h));
                    this.drawTiledImage(render.image, bb.left_x, bb.top_y, bb.w, bb.h, tileSize);
                    continue;
                }

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
    }

    drawTiledImage(img, leftX, topY, width, height, tileSize) {
        const src = this.getOpaqueSourceRect(img);
        push();
        noSmooth();
        imageMode(CORNER);

        for (let y = topY; y < topY + height; y += tileSize) {
            const drawH = Math.min(tileSize, topY + height - y);
            const srcH = src.h * (drawH / tileSize);

            for (let x = leftX; x < leftX + width; x += tileSize) {
                const drawW = Math.min(tileSize, leftX + width - x);
                const srcW = src.w * (drawW / tileSize);
                image(img, x, y, drawW, drawH, src.x, src.y, srcW, srcH);
            }
        }

        pop();
    }

    getOpaqueSourceRect(img) {
        if (img.__opaqueSourceRect) {
            return img.__opaqueSourceRect;
        }

        img.loadPixels();
        const pixels = img.pixels || [];

        let minX = img.width;
        let minY = img.height;
        let maxX = -1;
        let maxY = -1;

        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                const alpha = pixels[4 * (y * img.width + x) + 3];
                if (alpha > 0) {
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }
        }

        if (maxX < minX || maxY < minY) {
            img.__opaqueSourceRect = { x: 0, y: 0, w: img.width, h: img.height };
            return img.__opaqueSourceRect;
        }

        img.__opaqueSourceRect = {
            x: minX,
            y: minY,
            w: maxX - minX + 1,
            h: maxY - minY + 1
        };
        return img.__opaqueSourceRect;
    }
}
