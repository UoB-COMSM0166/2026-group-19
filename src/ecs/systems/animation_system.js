class AnimationSystem extends System {
    constructor(ecs) {
        super(ecs);
    }

    update() {
        // Update sets the correct frame to animate
        const now = millis();
        const entities = this.ecs.getEntitiesWith(Animation, Velocity);

        for (const id of entities) {
            const anim = this.ecs.getComponent(id, Animation);
            const vel = this.ecs.getComponent(id, Velocity);

            // ---- Animation selection ----
            const hurtEnded = (anim.current === AnimationType.HURT && now > anim.hurtUntil);

            if (anim.current === AnimationType.HURT && !hurtEnded) {
                // stay in hurt animation
            }
            else if (Math.abs(vel.vx) > 0.05) {
                anim.setAnimation(AnimationType.MOVE);
            }
            else {
                anim.setAnimation(AnimationType.IDLE);
            }

            // ---- Frame update ----

            const animationData = anim.animations[anim.current];
            anim.timer++;

            // If frame update timer has not elapsed yet, continue
            if (anim.timer >= animationData.speed) {
                // Increment frame index
                const nextFrame = anim.frameIndex + 1;
                anim.frameIndex = animationData.loop
                    ? nextFrame % animationData.frames.length               // Wrap-around
                    : Math.min(nextFrame, animationData.frames.length - 1); // No wrap-around
                }

                // Reset timer to 0
                anim.timer = 0;
        }
    }
}
