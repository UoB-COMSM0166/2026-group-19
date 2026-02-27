class RenderSystem {
    update(ecs) {
        const entities = ecs.getEntitiesWith(Position, Collider, Renderable);
        for (let entity of entities) {
            const collider = ecs.getComponent(entity, Collider);
            const pos = ecs.getComponent(entity, Position);
            const render = ecs.getComponent(entity, Renderable);

            const bb = collider.getBoundingBox(pos);
            fill(...render.color);
            noStroke();
            rect(bb.left_x, bb.top_y, bb.w, bb.h);
        }
    }
}