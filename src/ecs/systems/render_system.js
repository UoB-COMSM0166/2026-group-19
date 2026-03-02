class RenderSystem extends System {
    /*
    Handles drawing of all renderable entities to the screen
    */
    constructor(ecs) {
        super(ecs);
    }
    update() {
        const entities = this.ecs.getEntitiesWith(Position, Renderable);
        for (let entity of entities) {
            const pos = this.ecs.getComponent(entity, Position);
            const render = this.ecs.getComponent(entity, Renderable);

            const bb = pos.getBoundingBox();
            fill(...render.color);
            noStroke();
            rect(bb.left_x, bb.top_y, bb.w, bb.h);
        }
    }
}