class RenderSystem {
    update(ecs) {
        // Proof of concept, every entity is rendered as a circle for now
        const entities = ecs.getEntitiesWith(Position, Collider, Renderable);
        for (let entity of entities) {
            const collider = ecs.getComponent(entity, Collider);
            const pos = ecs.getComponent(entity, Position);
            const render = ecs.getComponent(entity, Renderable);

            const bb = collider.getBoundingBox(pos);
            fill(...render.color);
            noStroke();
            rect(bb.x, bb.y, bb.w, bb.h);
        }
    }
}