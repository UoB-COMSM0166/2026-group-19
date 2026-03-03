class InputSystem extends System {
    /*
    Reads keyboard input and updates player velocity based on input
    */
    constructor(ecs, factory) {
        super(ecs);
        this.factory = factory;
        this.prev = new Map();
    }
    update() {
        const players = this.ecs.getEntitiesWith(Player, Character, Velocity, Position);
        for (let id of players) {
            const character = this.ecs.getComponent(id, Character);
            const weapon = this.ecs.getComponent(id, Weapon);
            const pos = this.ecs.getComponent(id, Position);
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
            if (character.onGround && !this.prev.get(UP_ARROW) && keyIsDown(UP_ARROW)) {
                vel.vy = -jumpSpeed;
            }

            // Spawn Projectile
            if ((weapon.type != null) && keyIsDown(32)) {
                console.log("inside");
                // This should be altered, cuz input_system shouldn't spawn anything
                const local_x = pos.x;
                const local_y = pos.y;
                const damage = weapon.bulletDamage;
                const width = weapon.bulletSize.w;
                const height = weapon.bulletSize.h;
                const sign = vel.vx < 0 ? -1 : 1;
                const velocity_x = sign * weapon.bulletSpeed;
            
                this.factory.create(EntityType.Projectile, {center_x: local_x, center_y: local_y, width: width, height: height, velocity_x: velocity_x, damage: damage});

            }


            // Update previous key-state
            this.prev.set(UP_ARROW, keyIsDown(UP_ARROW));
            this.prev.set(LEFT_ARROW, keyIsDown(LEFT_ARROW));
            this.prev.set(RIGHT_ARROW, keyIsDown(RIGHT_ARROW));
            this.prev.set(32, keyIsDown(32));

        }
    }
}