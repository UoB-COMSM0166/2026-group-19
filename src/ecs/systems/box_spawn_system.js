/**
 * Ensures there is always exactly one weapon box present in the level.
 * When no Box entities exist, it picks a random spawnable platform and
 * places a new box on top of it at a random horizontal position.
 */
class BoxSpawnSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
    }

    /**
     * Checks each frame whether a box is present; spawns one if not.
     */
    update(dt) {
        const boxes = this.ecs.getEntitiesWith(Box);
        if (boxes.length === 0) {
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

    /**
     * Returns the entity ID of a randomly chosen platform that allows box spawning.
     */
    getRandomPlatform() {
        const platformIds = this.ecs.getEntitiesWith(SpawnablePlatform, Wall, Position);
        if (platformIds.length === 0) return;
        return platformIds[Math.floor(random(0, platformIds.length))];
    }

    /**
     * Returns a random X offset within the platform bounds that keeps the box fully on the platform.
     */
    getRandomPositionOnPlatform(platformBoundingBox, boxW) {
        const max = platformBoundingBox.w - boxW;
        return Math.floor(random(0, max));
    }
}