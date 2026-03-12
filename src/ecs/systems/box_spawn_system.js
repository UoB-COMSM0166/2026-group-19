class BoxSpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
    }

    update(dt) {
        /*
        Update checks if there are currently no boxes in game.
        If so, spawns a new box on a platform.
        */
        const boxes = this.ecs.getEntitiesWith(Box);
        if (boxes.length === 0) {
            // Spawn a new box
            const id = this.getRandomPlatform();
            if (!id) return;

            const pos = this.ecs.getComponent(id, Position);
            if (!pos) return;

            const bb = pos.getBoundingBox();

            this.spawner.request(EntityType.BOX, {
                left_x: bb.left_x + this.getRandomPositionOnPlatform(bb),
                top_y: bb.top_y - DEFAULTS.sizes.box.height,
                width: DEFAULTS.sizes.box.width,
                height: DEFAULTS.sizes.box.height
            });
        }
    }

    getRandomPlatform() {
        // Returns entity ID of random platform
        const platformIds = this.ecs.getEntitiesWith(SpawnablePlatform, Wall, Position);
        if (platformIds.length === 0) return;
        return platformIds[Math.floor(random(0, platformIds.length))];
    }

    getRandomPositionOnPlatform(platformBoundingBox) {
        // Returns a random left_x position on platform, relative to platform start
        const min = 0;
        const max = platformBoundingBox.w - DEFAULTS.sizes.box.width;
        return Math.floor(random(min, max));
    }
}