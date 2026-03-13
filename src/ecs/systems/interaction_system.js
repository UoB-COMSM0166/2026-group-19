class InteractionSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
    }

    update(dt) {
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
        const char = this.ecs.getComponent(playerId, Character);
        if (!pos || !char) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            const now = millis();
            if (anim.hurtUntil < now) {
                char.health--; // Update health of player
            }
            console.log(char.health);

            if (char.health <= 0) {
                // Trigger Game Over
                console.log("Player dead");
                if (sceneManager.currentScene instanceof PlayScene) {
                    sceneManager.pushScene(new GameOverScene(sceneManager.currentScene));
                }
            }


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
            // Player gets weapon, box is removed, player score increments
            const box = this.ecs.getComponent(boxId, Box);
            const player = this.ecs.getComponent(playerId, Player);
            player.score++;
            this.ecs.addComponent(playerId, new Weapon(box.weapon));
            this.ecs.removeEntity(boxId);
            console.log(player.score);
        })
    }

    handleProjectileEnemy(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        const projectile = this.ecs.getComponent(projectileId, Projectile);
        if (!pos) return;
        let hit = false;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            // Only let projectile hit one enemy
            if (hit) return;
            hit = true;

            const enemyChar = this.ecs.getComponent(enemyId, Character);
            enemyChar.health -= projectile.damage;
            this.ecs.removeEntity(projectileId);

            if (enemyChar.health <= 0) {
                this.ecs.removeEntity(enemyId);
            }
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
