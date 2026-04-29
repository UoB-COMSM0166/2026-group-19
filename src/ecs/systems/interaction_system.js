/**
 * Handles all gameplay-driven collisions: player-enemy contact, player-box pickups,
 * projectile-enemy hits, and projectile-wall destruction. Also manages the consequences
 * of those collisions: damage, knockback, score, weapon equipping, enemy death, and
 * spawning blood-droplet particles.
 */
class InteractionSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.ecs = ecs;
        this.spawner = spawner;
        this.physics = defaults.physics;
    }

    /**
     * Checks all player-enemy, player-box, projectile-enemy, and projectile-wall
     * collisions each frame and dispatches to the appropriate handler.
     */
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

    /**
     * Reduces player health on contact with an enemy, subject to an invincibility window
     * set by hurtUntil. Triggers the Game Over scene when health reaches zero and
     * starts the HURT animation timer on the player.
     */
    handlePlayerEnemy(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        const anim = this.ecs.getComponent(playerId, Animation);
        const char = this.ecs.getComponent(playerId, Character);
        if (!pos || !char) return;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            const now = millis();
            if (anim.hurtUntil < now) {
                char.health--;
                soundManager.play('getting_hit');
            }
            console.log(char.health);

            if (char.health <= 0) {
                console.log("Player dead");
                soundManager.play('death');
                soundManager.stopBg();
                if (sceneManager.currentScene instanceof PlayScene) {
                    const playerComp = this.ecs.getComponent(playerId, Player);
                    const finalScore = playerComp ? playerComp.score : 0;
                    sceneManager.pushScene(new GameOverScene(sceneManager.currentScene, finalScore));
                }
            }

            if (anim) {
                anim.hurtUntil = Math.max(anim.hurtUntil, now + defaults.hurtTime);
            }
        })
    }

    /**
     * Handles player contact with a weapon box: increments score, equips the weapon,
     * attaches the weapon sprite if one exists, shows the pickup banner, and removes
     * the box entity.
     */
    handlePlayerBox(playerId) {
        const pos = this.ecs.getComponent(playerId, Position);
        if (!pos) return;
        this.forEachCollision(pos, [Box, Position], (boxId) => {
            const box = this.ecs.getComponent(boxId, Box);
            const player = this.ecs.getComponent(playerId, Player);
            player.score++;
            box.pickUp();
            soundManager.play('weapon_pickup');
            this.ecs.addComponent(playerId, new Weapon(box.weapon));
            const spriteData = WEAPON_SPRITE_DATA[box.weapon];
            const spriteSheet = weaponSpriteSheets[box.weapon];

            if(sceneManager.currentScene instanceof PlayScene){
                const displayName = WEAPON_NAMES[box.weapon] || box.weapon;
                sceneManager.currentScene.showPickup(displayName);
            }

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

    /**
     * Applies damage when a projectile overlaps an enemy. Projectiles hit one enemy per frame, 
     * apply knockback, and are removed on impact unless they have remaining bounces. 
     * Triggers handleDeath when an enemy's health reaches zero.
     */
    handleProjectileEnemy(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        const vel = this.ecs.getComponent(projectileId, Velocity);
        const projectile = this.ecs.getComponent(projectileId, Projectile);
        if (!pos) return;
        let hit = false;
        this.forEachCollision(pos, [Enemy, Position], (enemyId) => {
            if (hit) return;
            if (projectile.lastHitEnemy === enemyId) return;
            hit = true;

            const enemyVel = this.ecs.getComponent(enemyId, Velocity);
            const enemyChar = this.ecs.getComponent(enemyId, Character);
            const enemyPos = this.ecs.getComponent(enemyId, Position);
            enemyChar.health -= projectile.damage;
            projectile.lastHitEnemy = enemyId;
            soundManager.play('hitting_enemy');

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
                this.handleDeath(enemyId, enemyPos);
            }

            const enemyAnim = this.ecs.getComponent(enemyId, Animation);
            if (enemyAnim) {
                enemyAnim.hurtUntil = Math.max(enemyAnim.hurtUntil, millis() + defaults.hurtTime);
            }
        })
    }

    /**
     * Destroys a projectile when it contacts a wall.
     */
    handleProjectileWall(projectileId) {
        const pos = this.ecs.getComponent(projectileId, Position);
        const projectile = this.ecs.getComponent(projectileId, Projectile);
        if (!pos) return;
        this.forEachCollision(pos, [Wall, Position], (wallId) => {
            this.ecs.removeEntity(projectileId);
        })
    }

    /**
     * Spawns blood-droplet particles that arc outward from the given position.
     * Droplet count and speed are driven by the physics config.
     */
    spawnDeathDroplets(x, y) {
        for (let i = 0; i < this.physics.dropletsPerDeath; i++) {
            const angle = Math.random() * Math.PI * 2;
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

    /**
     * Transitions a killed enemy into the Dying state: strips Enemy/Character components,
     * applies a random upward/sideways velocity, and spawns death droplets.
     */
    handleDeath(enemyId, enemyPos) {
        const vel = this.ecs.getComponent(enemyId, Velocity);
        if (vel) {
            vel.vy = -18;
            vel.vx = (Math.random() - 0.5) * 15;
        }
        this.ecs.removeComponent(enemyId, Enemy);
        this.ecs.removeComponent(enemyId, Character);

        this.ecs.addComponent(enemyId, new Dying());
        this.spawnDeathDroplets(enemyPos.x, enemyPos.y);
    }
}
