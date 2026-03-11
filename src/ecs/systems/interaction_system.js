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
        const anim = this.ecs.getComponent(playerId, Animation);
        if (!pos) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            const now = millis();
            if (anim) {
                anim.setAnimation(AnimationType.HURT);
                anim.hurtUntil = Math.max(anim.hurtUntil, now + DEFAULTS.hurtTime);
            }
        })
    }

    handlePlayerBox(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Box, Position], (boxId) => {
            // Player gets weapon, box is removed
            const box = this.ecs.getComponent(boxId, Box);
            box.pickUp()
            this.ecs.addComponent(playerId, new Weapon(box.weapon));
            this.ecs.removeEntity(boxId);
        })
    }

    handleProjectileEnemy(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            // TODO: Implement logic
            const proj = this.ecs.getComponent(projectileId, Projectile);
            const character = this.ecs.getComponent(enemyId, Character);
            if (!proj || !character) return;
            character.health -= proj.damage;
            if (character.health <= 0){
                this.ecs.removeEntity(enemyId);
            }
            this.ecs.removeEntity(projectileId);
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
