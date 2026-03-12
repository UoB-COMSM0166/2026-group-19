class RenderSystem extends System {
    /*
    Handles drawing of all renderable entities to the screen
    */
    constructor(ecs) {
        super(ecs);
    }

    update(dt) {
        /*
        Called every frame. Iterates over all entities with a Position and Renderable
        component and dispatches to the correct drawing method based on what other
        components the entity has (animated, tiled wall, or plain image/rectangle).
        */
        const rend_ids = this.ecs.getEntitiesWith(Position, Renderable);
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
                this.drawTiledImage(render.image, bb, render);
            }
            else {
                imageMode(CENTER);
                image(render.image, pos.x, pos.y, bb.w, bb.h);
            }
        }
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

    drawTiledImage(img, bb, render) {
        /*
        Draws a wall entity by tiling a texture across its bounding box.
        Uses a cached off-screen buffer (stored on the render component) to avoid
        re-tiling every frame. The cache is only rebuilt if the wall's dimensions
        or source image change, which in a static level only happens once at startup.
        */
        if (!render._tiledCache ||
            render._tiledCacheW !== bb.w  ||
            render._tiledCacheH !== bb.h  ||
            render._tiledCacheImg !== img) {
                this.buildCachedTiledImage(img, bb, render);
        }

        imageMode(CORNER);
        image(render._tiledCache, bb.left_x, bb.top_y);
    }

    buildCachedTiledImage(img, bb, render) {
        /*
        Builds an off-screen graphics buffer containing the fully tiled texture
        for a wall entity. The tile size is the smaller of the wall's width and
        height. Partial tiles at the right and bottom edges are cropped by
        scaling the source region proportionally. The finished buffer and the
        parameters used to create it are stored on the render component so
        drawTiledImage can detect when a rebuild is needed.
        */
        const tileSize = Math.min(bb.w, bb.h);

        // createGraphics makes an off-screen canvas the exact size of the wall.
        // All the tiling work happens here, in memory, just once.
        const buf = createGraphics(bb.w, bb.h); // Make off-screen canvas the exact size of the wall
        buf.noSmooth();
        buf.imageMode(CORNER); // Draw images from top-left instead of center

        // Step through bounding box vertically, one tile at a time
        for (let y = 0; y < bb.h; y += tileSize) {
            const drawH = Math.min(tileSize, bb.h - y);
            const srcH  = img.height * (drawH / tileSize);
            // Step through bounding box horizontally, one tile at a time
            for (let x = 0; x < bb.w; x += tileSize) {
                const drawW = Math.min(tileSize, bb.w - x);
                const srcW  = img.width * (drawW / tileSize);
                buf.image(img, x, y, drawW, drawH, 0, 0, srcW, srcH);
            }
        }

        // Store the finished buffer and the parameters used to build it
        // on the render component so we can detect when it needs rebuilding
        render._tiledCache = buf;
        render._tiledCacheW = bb.w;
        render._tiledCacheH = bb.h;
        render._tiledCacheImg = img;
    }
}
