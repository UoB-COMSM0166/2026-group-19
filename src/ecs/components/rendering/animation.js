const AnimationType = Object.freeze({
    IDLE: "IDLE",
    HURT: "HURT",
    MOVE: "MOVE"
})

class Animation {
    constructor(spriteSheet, frameWidth, frameHeight, columns, initial = AnimationType.IDLE) {
        // --- Sprite Sheet Metadata ---
        this.spriteSheet = spriteSheet;   // Image that contains animation frames for character
        this.frameWidth = frameWidth;     // Width of individual frame within sheet
        this.frameHeight = frameHeight;   // Height of individual frame within sheet
        this.columns = columns;           // Number of columns in sprite sheet, allows for multiple rows

        // --- Animation definitions (static data) ---
        /*
        Format:
        {
            AnimationType.IDLE: {
                frames: [0,1,2,3],
                speed: 8,
                loop: true
            }
        }
        */
        this.animations = animations;

        // --- Runtime Animation State ---
        this.current = initial;     // current animation type
        this.frameIndex = 0;        // index within frames[]
        this.timer = 0;             // timer until next frame
        this.hurtUntil = 0;         // time in milliseconds for hurt animation to run
    }

    setAnimation(type) {
        if (this.current === type) return;
        animation.current = type;
        animation.frameIndex = 0;
        animation.tick = 0;
    }
}
