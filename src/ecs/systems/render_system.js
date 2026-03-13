class RenderSystem extends System {
    /*
    Handles drawing of all renderable entities to the screen
    */
    constructor(ecs) {
        super(ecs);
        this.wallCache = null;
    }

    update(dt) {
        /*
        Called every frame. Iterates over all entities with a Position and Renderable
        component and dispatches to the correct drawing method based on what other
        components the entity has (animated, tiled wall, or plain image/rectangle).
        */
        const rend_ids = this.ecs.getEntitiesWith(Position, Renderable);

        // Draw wall cache first as a single image call
        if (this.wallCache) {
            imageMode(CORNER);
            image(this.wallCache, 0, 0);
        }

        for (let id of rend_ids) {
            const pos    = this.ecs.getComponent(id, Position);
            const render = this.ecs.getComponent(id, Renderable);
            const anim   = this.ecs.getComponent(id, Animation);
            const char   = this.ecs.getComponent(id, Character);
            const wall   = this.ecs.getComponent(id, Wall);
            const bb     = pos.getBoundingBox();
            // Fallback: If no image or animation, draw a rectangle
            if (!render.image && !anim) {
                fill(...render.color);
                noStroke();
                rect(bb.left_x, bb.top_y, bb.w, bb.h);
                continue;
            }

            if (anim) {
                this.drawAnimated(char, anim, pos, bb);
            }
            else if (wall) {
                continue;
            }
            else {
                imageMode(CENTER);
                image(render.image, pos.x, pos.y, bb.w, bb.h);
            }
        }
    }

    buildWallCache(img) {
        const buf = createGraphics(width, height);
        buf.imageMode(CORNER);
        buf.noSmooth();

        const wallIds = this.ecs.getEntitiesWith(Position, Renderable, Wall);
        for (let id of wallIds) {
            const pos = this.ecs.getComponent(id, Position);
            const bb  = pos.getBoundingBox();
            const tileSize = Math.min(bb.w, bb.h);
            if (tileSize < 1) continue;
            for (let y = bb.top_y; y < bb.top_y + bb.h; y += tileSize) {
                const drawH = Math.min(tileSize, bb.top_y + bb.h - y);
                for (let x = bb.left_x; x < bb.left_x + bb.w; x += tileSize) {
                    const drawW = Math.min(tileSize, bb.left_x + bb.w - x);
                    buf.image(img, x, y, drawW, drawH);
                }
            }
        }
        this.wallCache = buf;
    }

    drawAnimated(char, anim, pos, bb) {
        /*
        Draws the current frame of a sprite sheet animation for an entity.
        Handles horizontal flipping based on the character's facing direction.
        The correct frame and its position on the sprite sheet are determined
        by the Animation component's current state, which is managed by AnimationSystem.
        */
        const animData = anim.animations[anim.current];
        if (!animData) return;

        // Calculate the top left coordinates of frame in sprite sheet image
        const frameNum = animData.frames[anim.frameIndex];
        const sx = frameNum * anim.frameWidth;
        const sy = 0;

        push();
        translate(pos.x, pos.y);
        if (char.direction !== DIR_RIGHT) {
            scale(-1, 1);
        }
        imageMode(CENTER);
        image(anim.spriteSheet, 0, 0, bb.w, bb.h, sx, sy, anim.frameWidth, anim.frameHeight);
        pop();
    }
}
