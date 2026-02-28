class SpawningSystem extends System {
    constructor(ecs, factory) {
        super(ecs);
        this.factory = factory;

        // Request list for spawning, gets processed all at once
        this.queue = [];
    }

    update() {
        while (this.queue.length > 0) {
            const { type, data } = this.queue.shift();
            this.factory.create(type, data);
        }
    }

    request(type, data = {}) {
        /*
        Method for other systems to call if they want to request an entity spawn.
        Example usage: spawner.request(')
        */
        this.queue.push({ type, data });
    }
}