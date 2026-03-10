class InteractionSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
    }

    update() {
        const playerIds = this.ecs.getEntitiesWith(Player, Position);

        for (let playerId of playerIds) {
            this.handlePlayerEnemy(playerId);
            this.handlePlayerBox(playerId);
        }

        const projectiles = this.ecs.getEntitiesWith(Projectile, Position);

        for (let projectileId of projectiles) {
            this.handleProjectileEnemy(projectileId);
            this.handleProjectileWall(projectileId);
        }
    }


    handlePlayerEnemy(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        const sprite = this.ecs.getComponent(playerId, Sprite);
        if (!pos) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            const now = millis();
            if (sprite) {
                // Extend hurt state while colliding, with tiny anti-jitter buffer.
                sprite.hurtUntil = Math.max(sprite.hurtUntil, now + 280);
            }
        })
    }

    handlePlayerBox(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Box, Position], (boxId) => {
            // Player gets weapon, box is removed
            const box = this.ecs.getComponent(boxId, Box);
            this.ecs.addComponent(playerId, new Weapon(box.weapon));
            this.ecs.removeEntity(boxId);
        })
    }

    handleProjectileEnemy(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            // TODO: Implement logic
            // So far disappear
            this.ecs.removeEntity(projectileId);
            this.ecs.removeEntity(enemyId);
        })
    }

    handleProjectileWall(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Wall, Position], (wallId) => {
            // TODO: Implement logic
            this.ecs.removeEntity(projectileId);
        })
    }
}
