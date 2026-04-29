/**
 * Abstract base class for all ECS systems.
 * Provides shared collision utilities used by multiple systems.
 */
class System {
    constructor(ecs) {
        this.ecs = ecs;
    }

    update(dt) {
        throw new Error("System subclasses must implement update()");
    }

    /**
     * Iterates all entities matching the given components and invokes the callback
     * for each one whose bounding box overlaps with pos's bounding box.
     * @param {Position} pos - The position to test collisions against.
     * @param {Function[]} components - Component types to filter candidate entities.
     * @param {Function} callback - Called with the entity id for each overlapping entity.
     */
    forEachCollision(pos, components, callback) {
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

    /**
     * AABB collision detection.
     * Returns true if bounding box a and bounding box b are overlapping.
     */
    collides(a, b) {
        return a.left_x < b.left_x + b.w &&
            a.left_x + a.w > b.left_x &&
            a.top_y < b.top_y + b.h &&
            a.top_y + a.h > b.top_y;
    }
}