class RenderSystem {
    update(ecs) {
        // Proof of concept, every entity is rendered as a circle for now
        const entities = ecs.getEntitiesWith(Position, Renderable);
        for (let entity of entities) {
            const pos = ecs.getComponent(entity, Position);
            const render = ecs.getComponent(entity, Renderable);

            fill(...render.color);
            noStroke();
            circle(pos.x, pos.y, render.size);
        }
    }
}