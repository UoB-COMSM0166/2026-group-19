/**
 * Sprite sheet data for the weapon currently held by a character.
 * RenderSystem draws frame 0 of this sheet overlaid on the character sprite.
 */
class WeaponSprite {
    constructor(spriteSheet, frameWidth, frameHeight) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
    }
}
