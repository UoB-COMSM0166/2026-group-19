/**
 * Draws all renderable entities to the screen each frame.
 * Wall tiles are rendered once into an offscreen buffer (wallCache) and stamped
 * as a single image call for performance. All other entities are drawn individually,
 * dispatching to an animated sprite path, a plain image path, or a fallback rectangle.
 */
class RenderSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.wallCache = null;
    }

    /**
     * Draws the wall cache first, then iterates all non-wall Position+Renderable entities,
     * choosing the animated, plain-image, or rectangle draw path for each.
     */
    update(dt) {
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
            if (anim && anim.spriteSheet && anim.spriteSheet.width > 0) {
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

    /**
     * Renders all wall entities into an offscreen graphics buffer so they can be
     * drawn as a single image call each frame instead of tile by tile.
     */
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

    /**
     * Draws an entity using its sprite sheet animation. Applies rotation for dying entities,
     * a red tint during the hurt window, and horizontal flipping based on facing direction.
     * Also draws the held weapon sprite, mirrored on the opposite side for the two-way rifle.
     */
    drawAnimated(id, char, anim, pos, bb, weapSprite) {
        const animData = anim.animations[anim.current];
        if (!animData) return;

        const frameNum = animData.frames[anim.frameIndex];
        const cols = anim.columns;
        const sx = (frameNum % cols) * anim.frameWidth;
        const sy = Math.floor(frameNum / cols) * anim.frameHeight;

        push();
        translate(pos.x, pos.y);

        const dying = this.ecs.getComponent(id, Dying);
        if (dying) {
            // Apply rotation based on dying state
            dying.rotation += dying.rotationSpeed;
            rotate(dying.rotation);
        }

        const now = millis();
        if (anim.hurtUntil > now) {
            tint(255, 0, 0); // Red tint when hurt
        }


        if (char && char.direction !== DIR_RIGHT) {
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
