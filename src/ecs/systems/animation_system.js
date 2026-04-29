/**
 * Drives sprite animation for all entities with Animation and Velocity components.
 * Each tick it selects the appropriate clip based on entity state, then advances the frame.
 */
class AnimationSystem extends System {
    constructor(ecs) {
        super(ecs);
    }

    update(dt) {
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

    /**
     * Chooses which animation clip should be playing based on movement and hurt state.
     * While a HURT animation is active it is held until its timer expires, after which
     * normal selection resumes. Facing direction is updated from velocity for non-player
     * entities (enemies); the player's direction is managed by the input system instead.
     */
    selectAnimation(char, anim, vel, now, player) {
        const hurtEnded = (anim.current === AnimationType.HURT && now > anim.hurtUntil);
        if (anim.current === AnimationType.HURT && !hurtEnded) return;

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

    /**
     * Advances the current clip by one frame when enough time has elapsed.
     * Looping clips wrap back to frame 0; non-looping clips clamp at the last frame.
     * The timer remainder is preserved across frame boundaries to keep cadence accurate.
     */
    advanceFrame(anim, dt) {
        const animationData = anim.animations[anim.current];
        if (!animationData) return;

        anim.timer += dt * 0.006;
        if (anim.timer < animationData.duration_s) return;

        const nextFrame = anim.frameIndex + 1;
        anim.frameIndex = animationData.loop
            ? nextFrame % animationData.frames.length               // Wrap-around
            : Math.min(nextFrame, animationData.frames.length - 1); // No wrap-around

        anim.timer -= animationData.duration_s;
    }
}
