class System {
    constructor(ecs) {
        this.ecs = ecs;
    }

    update(dt) {
        throw new Error("System subclasses must implement update()");
    }

    // Perhaps not the cleanest to have collision methods in base class when not all systems need it
    // Maybe move to somewhere else later?
    forEachCollision(pos, components, callback) {
        /*
        Iterates through all entities with the given components and calls the
        callback for each entity whose bounding box collides with the given positition's bounding box.

        Position pos - The position to check collisions against
        Component[] components - Array of component types to query (e.g., [Enemy, Position])
        Function callback - A function reference/pointer called with entity id for each collision found
        */
        const ids = this.ecs.getEntitiesWith(...components);
        const bb_a = pos.getBoundingBox();
        for (let id of ids) {
            const otherPos = this.ecs.getComponent(id, Position);
            if (otherPos === pos) continue;
            const bb_b = otherPos.getBoundingBox();
            if (this.collides(bb_a, bb_b)) {
                callback(id);
            }
        }
    }

    collides(a, b) {
        /*
        AABB collision detection.
        Returns true if bounding box a and bounding box b are overlapping.
        */
        return a.left_x < b.left_x + b.w &&
            a.left_x + a.w > b.left_x &&
            a.top_y < b.top_y + b.h &&
            a.top_y + a.h > b.top_y;
    }
}