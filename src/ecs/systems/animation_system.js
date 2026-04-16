class AnimationSystem extends System {
    constructor(ecs) {
        super(ecs);
    }

    update(dt) {
        // Update sets the correct frame to animate
        const now = millis();
        const entities = this.ecs.getEntitiesWith(Animation, Velocity);

        for (const id of entities) {
            const anim = this.ecs.getComponent(id, Animation);
            const vel = this.ecs.getComponent(id, Velocity);
            const char = this.ecs.getComponent(id, Character);
            const player = this.ecs.getComponent(id, Player);

            if (char) {
                this.selectAnimation(char, anim, vel, now, player);
            }
            this.advanceFrame(anim, dt);
        }
    }

    selectAnimation(char, anim, vel, now, player) {
        const hurtEnded = (anim.current === AnimationType.HURT && now > anim.hurtUntil);
        if (anim.current === AnimationType.HURT && !hurtEnded) return; // locked in hurt

        // Only update direction from velocity for non-players — player direction is
        // set exclusively by input so recoil and other external forces don't flip the sprite.
        if (!player) {
            if (vel.vx > 0.05) {
                char.direction = DIR_RIGHT;
            } else if (vel.vx < -0.05) {
                char.direction = DIR_LEFT;
            }
        }

        const isMoving = Math.abs(vel.vx) > 0.05;
        anim.setAnimation(isMoving ? AnimationType.MOVE : AnimationType.IDLE);
    }

    advanceFrame(anim, dt) {
        const animationData = anim.animations[anim.current];
        if (!animationData) return;

        anim.timer += dt * 0.006;
        if (anim.timer < animationData.duration_s) return;

        // Increment frame index
        const nextFrame = anim.frameIndex + 1;
        anim.frameIndex = animationData.loop
            ? nextFrame % animationData.frames.length               // Wrap-around
            : Math.min(nextFrame, animationData.frames.length - 1); // No wrap-around

        anim.timer -= animationData.duration_s;
    }
}
