class MovementSystem extends System {
    update(ecs) {
        const entities = ecs.getEntitiesWith(Position, Velocity);

        for (let id of entities) {
            const pos = ecs.getComponent(id, Position);
            const vel = ecs.getComponent(id, Velocity);

            pos.x += vel.vx;
            pos.y += vel.vy;
        }
    }
}