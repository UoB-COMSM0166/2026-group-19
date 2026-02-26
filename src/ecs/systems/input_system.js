class InputSystem {
    update(ecs) {
        const players = ecs.getEntitiesWith(Player, Velocity);
        for (let entity of players) {
            const vel = ecs.getComponent(entity, Velocity);
            const speed = 3;

            vel.vx = 0;
            vel.vy = 0;

            if (keyIsDown(LEFT_ARROW)) vel.vx = -speed;
            if (keyIsDown(RIGHT_ARROW)) vel.vx = speed;
            if (keyIsDown(UP_ARROW)) vel.vy = -speed;
            if (keyIsDown(DOWN_ARROW)) vel.vy = speed;
        }
    }
}