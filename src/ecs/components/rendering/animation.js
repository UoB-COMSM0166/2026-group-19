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
        frames: [10, 12, 10, 12, 10, 12, 10, 12],
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

/**
 * Stores all animation state for a sprite-sheet-animated entity
 */
class Animation {
    constructor(spriteSheet, frameWidth, frameHeight, columns, animations, initial = AnimationType.IDLE) {
        this.spriteSheet = spriteSheet;   // image containing all frames, assumed single row
        this.frameWidth = frameWidth;     // width of one frame within the sheet
        this.frameHeight = frameHeight;   // height of one frame within the sheet
        this.columns = columns;

        this.animations = animations;

        this.current = initial;
        this.frameIndex = 0;
        this.timer = 0;
        this.hurtUntil = 0;
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
