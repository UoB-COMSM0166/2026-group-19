class AnimationSystem extends System {
    constructor(ecs) {
        super(ecs);
    }

    update() {
        const now = millis();
        const entities = this.ecs.getEntitiesWith(Sprite, Velocity);

        for (const id of entities) {
            const sprite = this.ecs.getComponent(id, Sprite);
            const vel = this.ecs.getComponent(id, Velocity);
            const player = this.ecs.getComponent(id, Player);

            if (player) {
                if (player.direction > 0) sprite.flipX = false;
                else if (player.direction < 0) sprite.flipX = true;
            } else if (Math.abs(vel.vx) > 0.05) {
                sprite.flipX = vel.vx < 0;
            }

            let nextAnim = "IDLE";
            if (now < sprite.hurtUntil) {
                nextAnim = "HURT";
            } else if (Math.abs(vel.vx) > 0.1) {
                nextAnim = "MOVE";
            }

            sprite.setAnimation(nextAnim);
            const anim = sprite.animations[sprite.currentAnimation];
            if (!anim) continue;

            sprite.frameTick++;
            if (sprite.frameTick < anim.speed) continue;

            sprite.frameTick = 0;
            if (anim.loop === false) {
                sprite.currentFrame = Math.min(sprite.currentFrame + 1, anim.count - 1);
            } else {
                sprite.currentFrame = (sprite.currentFrame + 1) % anim.count;
            }
        }
    }
}
