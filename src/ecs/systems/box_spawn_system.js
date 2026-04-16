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

            const boxW = LevelFactory.scaleX(defaults.sizes.box.width, width);
            const boxH = LevelFactory.scaleY(defaults.sizes.box.height, height);

            this.spawner.request(EntityType.BOX, {
                left_x: bb.left_x + this.getRandomPositionOnPlatform(bb, boxW),
                top_y:  bb.top_y - boxH,
                width:  boxW,
                height: boxH
            });
        }
    }

    getRandomPlatform() {
        // Returns entity ID of random platform
        const platformIds = this.ecs.getEntitiesWith(SpawnablePlatform, Wall, Position);
        if (platformIds.length === 0) return;
        return platformIds[Math.floor(random(0, platformIds.length))];
    }

    getRandomPositionOnPlatform(platformBoundingBox, boxW) {
        const max = platformBoundingBox.w - boxW;
        return Math.floor(random(0, max));
    }
}