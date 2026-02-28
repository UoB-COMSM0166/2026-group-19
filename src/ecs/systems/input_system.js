class InputSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.prev = new Map();
    }
    update() {
        const sprites = this.ecs.getEntitiesWith(Sprite, Velocity);
        for (let id of sprites) {
            const sprite = this.ecs.getComponent(id, Sprite);
            if (!sprite.isPlayer) { continue; }

            const vel = this.ecs.getComponent(id, Velocity);
            const speed = 10;
            const jumpSpeed = 13;

            // Side-to-side
            if (keyIsDown(LEFT_ARROW)) { vel.vx = -speed; }
            else if (keyIsDown(RIGHT_ARROW)) { vel.vx = speed; }
            else {
                vel.vx *= 0.8;
                if (Math.abs(vel.vx) < 0.01) { vel.vx = 0; }
            }

            // Jump
            if (sprite.onGround && !this.prev.get(UP_ARROW) && keyIsDown(UP_ARROW)) {
                vel.vy = -jumpSpeed;
            }

            // Update previous key-state
            this.prev.set(UP_ARROW, keyIsDown(UP_ARROW));
            this.prev.set(LEFT_ARROW, keyIsDown(LEFT_ARROW));
            this.prev.set(RIGHT_ARROW, keyIsDown(RIGHT_ARROW));

        }
    }
}