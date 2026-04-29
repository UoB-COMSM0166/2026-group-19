/**
 * Decouples entity creation from game logic by providing a request queue.
 * Other systems call request() to enqueue a spawn; all queued spawns are
 * processed together at the start of the next update() to prevent entities
 * from being created mid-frame while other systems are still iterating.
 * Actual entity construction is delegated to EntityFactory.
 */
class SpawningSystem extends System {
    constructor(ecs, factory) {
        super(ecs);
        this.factory = factory;
        this.queue = [];
    }

    /**
     * Drains the spawn queue, creating each requested entity in order.
     */
    update(dt) {
        while (this.queue.length > 0) {
            const { type, data } = this.queue.shift();
            this.factory.create(type, data);
        }
    }

    /**
     * Enqueues a spawn request to be processed at the next update.
     * @param {EntityType} type - The type of entity to create.
     * @param {Object} data - Spawn parameters passed to EntityFactory.
     */
    request(type, data = {}) {
        this.queue.push({ type, data });
    }
}