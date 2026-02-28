class RenderSystem extends System {
    constructor(ecs) {
        super(ecs);
    }
    update() {
        const entities = this.ecs.getEntitiesWith(Position, Collider, Renderable);
        for (let entity of entities) {
            const collider = this.ecs.getComponent(entity, Collider);
            const pos = this.ecs.getComponent(entity, Position);
            const render = this.ecs.getComponent(entity, Renderable);

            const bb = collider.getBoundingBox(pos);
            fill(...render.color);
            noStroke();
            rect(bb.left_x, bb.top_y, bb.w, bb.h);
        }
    }
}