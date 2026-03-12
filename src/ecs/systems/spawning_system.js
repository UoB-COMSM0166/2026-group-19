class SpawningSystem extends System {
    /*
    Manages entity creation request from other systems in a controlled manner.

    Purpose:
    - Decouple entity creation from game logic. I.e. other systems do not directly create entities.
      Instead, they request spawns via request(), which queues the request.
    - Process spawns in a controlled order. All spawn requests are collected in this.queue during a frame,
      then processed all at once in update(). The prevents entities from being created mid-frame when other
      systems are updating.
    - The actual entity creation is delgated to EntityFactory.
    */
    constructor(ecs, factory) {
        super(ecs);
        this.factory = factory;

        // Request list for spawning, gets processed all at once
        this.queue = [];
    }

    update(dt) {
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