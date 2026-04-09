class InteractionSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
        this.physics = DEFAULTS.physics;
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

        const droplets = this.ecs.getEntitiesWith(BloodDroplet, Position);
    }

    applyPhysics(physics) {
        this.physics = physics;
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
                const enemyPos = this.ecs.getComponent(enemyId, Position);
                this.spawnDeathDroplets(enemyPos.x, enemyPos.y);
                this.ecs.removeEntity(enemyId);
            }
        })
    }

    handleProjectileWall(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Wall, Position], (wallId) => {
            this.ecs.removeEntity(projectileId);
        })
    }

    // Blood Splatter
    spawnDeathDroplets(x, y) {
        for (let i = 0; i < this.physics.DROPLETS_PER_DEATH; i++) {
            const angle = Math.random() * Math.PI * 2; // radians
            const speed = this.physics.MIN_BLOOD_SPEED + Math.random() * (this.physics.MAX_BLOOD_SPEED - this.physics.MIN_BLOOD_SPEED);
            const bloodWidth = LevelFactory.scaleX(DEFAULTS.sizes.blood.width, width);
            const bloodHeight = LevelFactory.scaleY(DEFAULTS.sizes.blood.height, height);

            const id = this.ecs.createEntity();
            this.ecs.addComponent(id, new Position(x, y, bloodWidth, bloodHeight));
            this.ecs.addComponent(id, new Velocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - this.physics.MIN_BLOOD_SPEED  // upward bias so they arc
            ));
            this.ecs.addComponent(id, new Acceleration(0, this.physics.GRAVITY));
            this.ecs.addComponent(id, new Renderable([230, 46, 0, 200], null));
            this.ecs.addComponent(id, new BloodDroplet());
        }
    }
}
