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
            // Wall tiles are rendered through cache
            if (this.ecs.getComponent(id, Wall)) continue;

            const pos    = this.ecs.getComponent(id, Position);
            const render = this.ecs.getComponent(id, Renderable);
            if (!pos || !render) continue;
            const bb = pos.getBoundingBox();

            const anim   = this.ecs.getComponent(id, Animation);
            const char   = this.ecs.getComponent(id, Character);
            const weapSprite = this.ecs.getComponent(id, WeaponSprite);

            // Animated draw only when sprite sheet is valid
            if (anim && anim.spriteSheet && anim.spriteSheet.width !== undefined) {
                this.drawAnimated(id, char, anim, pos, bb, weapSprite);
                continue;
            }

            // Plain image draw only when image is valid
            if (render.image && render.image.width !== undefined) {
                push();
                imageMode(CENTER);
                image(render.image, pos.x, pos.y, bb.w, bb.h);
                pop();
                continue;
            }

            // Fallback rectangle (prevents WEBGL image(undefined) crash)
            if (render.color) {
            fill(...render.color);
            noStroke();
            rect(bb.left_x, bb.top_y, bb.w, bb.h);
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

    drawAnimated(id, char, anim, pos, bb, weapSprite) {
        const animData = anim.animations[anim.current];
        if (!animData) return;

        const frameNum = animData.frames[anim.frameIndex];
        const cols = anim.columns;
        const sx = (frameNum % cols) * anim.frameWidth;
        const sy = Math.floor(frameNum / cols) * anim.frameHeight;

        push();
        translate(pos.x, pos.y);

        const now = millis();
        if (anim.hurtUntil > now) {
            tint(255, 0, 0); // Red tint when hurt
        }


        if (char.direction !== DIR_RIGHT) {
            scale(-1, 1);
        }
        imageMode(CENTER);
        image(anim.spriteSheet, 0, 0, bb.w, bb.h, sx, sy, anim.frameWidth, anim.frameHeight);

        // Draw weapon sprite (frame 0 only) on character's hand
        if (weapSprite && weapSprite.spriteSheet) {
            const aspect = weapSprite.frameWidth / weapSprite.frameHeight;
            const weaponH = bb.h * 0.6;
            const weaponW = weaponH * aspect;
            const weaponOffsetX = bb.w * 0.35;
            // Adjust Y offset based on animation — move animation lowers the head
            const isMoving = anim.current === AnimationType.MOVE;
            const weaponOffsetY = isMoving ? bb.h * 0.15 : bb.h * 0.05;

            // Front-facing weapon
            image(weapSprite.spriteSheet, weaponOffsetX, weaponOffsetY, weaponW, weaponH,
                  0, 0, weapSprite.frameWidth, weapSprite.frameHeight);

            // TwoWayRifle: draw a second gun on the opposite side (mirrored)
            const weapon = this.ecs.getComponent(id, Weapon);
            if (weapon && weapon.type === WeaponType.TWOWAYRIFLE) {
                push();
                scale(-1, 1); // flip horizontally
                image(weapSprite.spriteSheet, weaponOffsetX, weaponOffsetY, weaponW, weaponH,
                      0, 0, weapSprite.frameWidth, weapSprite.frameHeight);
                pop();
            }
        }

        pop();
    }

}
