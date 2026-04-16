class InteractionSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
        this.physics = defaults.physics;
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
                anim.hurtUntil = Math.max(anim.hurtUntil, now + defaults.hurtTime);
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
            box.pickUp();
            this.ecs.addComponent(playerId, new Weapon(box.weapon));
            // Attach weapon sprite if sprite data exists
            const spriteData = WEAPON_SPRITE_DATA[box.weapon];
            const spriteSheet = weaponSpriteSheets[box.weapon];
            if (spriteData && spriteSheet) {
                this.ecs.addComponent(playerId, new WeaponSprite(
                    spriteSheet, spriteData.frameWidth, spriteData.frameHeight
                ));
            } else {
                this.ecs.removeComponent(playerId, WeaponSprite);
            }
            this.ecs.removeEntity(boxId);
            console.log(player.score);
        })
    }

    handleProjectileEnemy(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        const vel = this.ecs.getComponent(projectileId, Velocity);
        const projectile = this.ecs.getComponent(projectileId, Projectile);
        if (!pos) return;
        let hit = false;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            if (projectile.pierce) {
                // Pierce: hit all enemies along the beam, but only once each
                if (projectile.hitEnemies.has(enemyId)) return;

                const enemyChar = this.ecs.getComponent(enemyId, Character);
                const enemyPos = this.ecs.getComponent(enemyId, Position);
                enemyChar.health -= projectile.damage;
                projectile.hitEnemies.add(enemyId);

                if (enemyChar.health <= 0) {
                    this.spawnDeathDroplets(enemyPos.x, enemyPos.y);
                    this.ecs.removeEntity(enemyId);
                }
            } else {
                // Normal: one enemy per frame
                if (hit) return;
                if (projectile.lastHitEnemy === enemyId) return;
                hit = true;

                const enemyVel = this.ecs.getComponent(enemyId, Velocity);
                const enemyChar = this.ecs.getComponent(enemyId, Character);
                const enemyPos = this.ecs.getComponent(enemyId, Position);
                enemyChar.health -= projectile.damage;
                projectile.lastHitEnemy = enemyId;

                // Enemy Knockback
                if (enemyVel && vel) {
                    const knockback = this.physics.projectileKnockback;
                    const dirX = vel.vx >= 0 ? 1 : -1;
                    enemyVel.vx += dirX * pos.width / (enemyPos.width / 1.5) * knockback;
                }

                if (projectile.bounce > 0) {
                    vel.vx = -vel.vx;
                    projectile.bounce -= 1;
                } else {
                    this.ecs.removeEntity(projectileId);
                }

                if (enemyChar.health <= 0) {
                    this.spawnDeathDroplets(enemyPos.x, enemyPos.y);
                    this.ecs.removeEntity(enemyId);
                }

                const enemyAnim = this.ecs.getComponent(enemyId, Animation);
                if (enemyAnim) {
                    enemyAnim.hurtUntil = Math.max(enemyAnim.hurtUntil, millis() + DEFAULTS.hurtTime);
                }
            }
        })
    }

    handleProjectileWall(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        const projectile = this.ecs.getComponent(projectileId, Projectile);
        if (!pos) return;
        if (projectile.pierce) return; // Beams ignore walls
        this.forEachCollision(pos, [Wall, Position], (wallId) => {
            this.ecs.removeEntity(projectileId);
        })
    }

    // Blood Splatter
    spawnDeathDroplets(x, y) {
        for (let i = 0; i < this.physics.dropletsPerDeath; i++) {
            const angle = Math.random() * Math.PI * 2; // radians
            const speed = this.physics.minBloodSpeed + Math.random() * (this.physics.maxBloodSpeed - this.physics.minBloodSpeed);
            const bloodWidth = LevelFactory.scaleX(defaults.sizes.blood.width, width);
            const bloodHeight = LevelFactory.scaleY(defaults.sizes.blood.height, height);

            const id = this.ecs.createEntity();
            this.ecs.addComponent(id, new Position(x, y, bloodWidth, bloodHeight));
            this.ecs.addComponent(id, new Velocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - this.physics.minBloodSpeed  // upward bias so they arc
            ));
            this.ecs.addComponent(id, new Acceleration(0, this.physics.gravity));
            this.ecs.addComponent(id, new Renderable([230, 46, 0, 200], null));
            this.ecs.addComponent(id, new BloodDroplet());
        }
    }
}
