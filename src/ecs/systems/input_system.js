class InputSystem extends System {
    constructor() {
        super();
        this.prev = new Map();
    }
    update(ecs) {
        const players = ecs.getEntitiesWith(Player, Velocity);
        for (let entity of players) {
            const vel = ecs.getComponent(entity, Velocity);
            const player = ecs.getComponent(entity, Player);
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
            if (player.onGround && !this.prev.get(UP_ARROW) && keyIsDown(UP_ARROW)) {
                vel.vy = -jumpSpeed;
            }

            // Update previous key-state
            this.prev.set(UP_ARROW, keyIsDown(UP_ARROW));
            this.prev.set(LEFT_ARROW, keyIsDown(LEFT_ARROW));
            this.prev.set(RIGHT_ARROW, keyIsDown(RIGHT_ARROW));

        }
    }
}