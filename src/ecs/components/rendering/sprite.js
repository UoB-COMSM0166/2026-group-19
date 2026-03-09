class Sprite {
    constructor(image, frameWidth, frameHeight, animations, scale = 1) {
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animations = animations;
        this.scale = scale;

        this.currentAnimation = "IDLE";
        this.currentFrame = 0;
        this.frameTick = 0;
        this.flipX = false;

        // Transient state flags set by input/collision systems
        this.hurtUntil = 0;
    }

    setAnimation(name) {
        if (this.currentAnimation === name) return;
        this.currentAnimation = name;
        this.currentFrame = 0;
        this.frameTick = 0;
    }
}
