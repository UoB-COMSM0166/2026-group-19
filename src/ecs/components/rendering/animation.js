const AnimationType = Object.freeze({
    IDLE: "IDLE",
    HURT: "HURT",
    MOVE: "MOVE"
})

const PlayerAnimations = {
    [AnimationType.IDLE]: {
        frames: [0, 1, 2, 3, 4],
        duration_s: 0.15,
        loop: true
    },

    [AnimationType.MOVE]: {
        frames: [5, 6, 7, 8, 9],
        duration_s: 0.02,
        loop: true
    },

    [AnimationType.JUMP]: {
        frames: [10, 11, 12],
        duration_s: 0.15,
        loop: true
    },

    [AnimationType.HURT]: {
        frames: [10, 12, 10, 12, 10, 12, 10, 12], // Flash between hurt frame and normal frame
        duration_s: 0.1,
        loop: false
    }
};

const EnemyAnimations = {
    [AnimationType.IDLE]: {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        duration_s: 0.03,
        loop: true
    },
    
    [AnimationType.MOVE]: {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        duration_s: 0.03,
        loop: true
    },
}

const LargeEnemyAnimations = {
    [AnimationType.IDLE]: {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        duration_s: 0.2,
        loop: true
    },
    
    [AnimationType.MOVE]: {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        duration_s: 0.03,
        loop: true
    },
}

const EnemyAngryAnimations = {
    [AnimationType.IDLE]: {
        frames: [0, 1, 2, 3, 4, 5, 6],
        duration_s: 0.03,
        loop: true
    },
    
    [AnimationType.MOVE]: {
        frames: [0, 1, 2, 3, 4, 5, 6],
        duration_s: 0.03,
        loop: true
    },
}

const LargeEnemyAngryAnimations = {
    [AnimationType.IDLE]: {
        frames: [0, 1, 2, 3, 4],
        duration_s: 0.2,
        loop: true
    },
    
    [AnimationType.MOVE]: {
        frames: [0, 1, 2, 3, 4],
        duration_s: 0.03,
        loop: true
    },
}

class Animation {
    constructor(spriteSheet, frameWidth, frameHeight, columns, animations, initial = AnimationType.IDLE) {
        // --- Sprite Sheet Metadata ---
        this.spriteSheet = spriteSheet;   // Image that contains animation frames for character, assumed to be in single row
        this.frameWidth = frameWidth;     // Width of individual frame within sheet
        this.frameHeight = frameHeight;   // Height of individual frame within sheet
        this.columns = columns;

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
        this.current = type;
        this.frameIndex = 0;
        this.timer = 0;
    }

    setSpriteSheet(spriteSheet, newColumns, newAnimations) {
        if (this.spriteSheet === spriteSheet) return;
        this.spriteSheet = spriteSheet;
        this.columns = newColumns;

        if (newAnimations) {
            this.animations = newAnimations
            this.frameIndex = 0;
        }
    }
}
