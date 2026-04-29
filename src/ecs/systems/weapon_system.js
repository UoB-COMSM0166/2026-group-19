/**
 * Processes weapon fire requests and spawns projectiles for the firing entity.
 * Enforces fire-rate limiting, calculates the spawn point at the weapon tip,
 * dispatches to weapon-specific fire logic, and applies recoil to the shooter.
 */
class WeaponSystem extends System {
    constructor(ecs, spawner){
      super(ecs);
      this.spawner = spawner;
      this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    /**
     * Processes all pending FireRequest components, then removes them.
     */
    update(dt) {
        const now = millis();
        const ids = this.ecs.getEntitiesWith(FireRequest);
        for (let id of ids) {
            this.processFireRequest(id, now);
            this.ecs.removeComponent(id, FireRequest);
        }
    }

    /**
     * Fires the weapon if the fire-rate cooldown has elapsed, then records the
     * shot time and plays the appropriate sound.
     */
    processFireRequest(id, now) {
        const weapon = this.ecs.getComponent(id, Weapon);
        if (now - weapon.lastShotTime < weapon.fireRate) return;

        const pos = this.ecs.getComponent(id, Position);
        const vel = this.ecs.getComponent(id, Velocity);
        const character = this.ecs.getComponent(id, Character);

        this.spawnProjectiles(id, pos, weapon, character);
        this.applyRecoil(vel, weapon, character);
        weapon.lastShotTime = now;
        soundManager.play(WeaponSystem.SOUNDS[weapon.type]);
    }

    /**
     * Returns the world position of the weapon tip, derived from the weapon sprite
     * dimensions so projectiles appear to come from the end of the gun barrel.
     * Falls back to the entity's center if no weapon sprite is present.
     */
    getWeaponTip(id, pos, character) {
        const bb = pos.getBoundingBox();
        const weapSprite = this.ecs.getComponent(id, WeaponSprite);
        if (weapSprite) {
            const aspect = weapSprite.frameWidth / weapSprite.frameHeight;
            const weaponH = bb.h * 0.6;
            const weaponW = weaponH * aspect;
            const tipX = pos.x + character.direction * (bb.w * 0.35 + weaponW / 2);
            const tipY = pos.y + bb.h * 0.05;
            return { x: tipX, y: tipY };
        }
        return { x: pos.x, y: pos.y };
    }

    /**
     * Builds the shared projectile data from the weapon config and dispatches to
     * the shotgun or basic fire path depending on weapon type.
     */
    spawnProjectiles(id, pos, weapon, character) {
        const tip = this.getWeaponTip(id, pos, character);
        const projectileData = {
            center_x: tip.x,
            center_y: tip.y,
            velocity_y: 0,
            width: LevelFactory.scaleX(weapon.bulletSize.w, width),
            height: LevelFactory.scaleY(weapon.bulletSize.h, height),
            damage: weapon.bulletDamage,
            range: weapon.maxRange,
            bounce: weapon.bounce,
            isRocket: weapon.type === WeaponType.ROCKET,
        };

        if (weapon.type === WeaponType.SHOTGUN){
            this.fireShotgun(pos, weapon, character, projectileData);
        } else {
            this.fireBasic(weapon, character, projectileData);
        }
    }

    /**
     * Spawns one projectile per pellet, each offset by the pellet's defined angle
     * and vertical offset relative to the base firing direction.
     */
    fireShotgun(pos, weapon, character, projectileData){
        const baseAngle = character.direction === 1 ? 0 : Math.PI;

            for (let pellet of weapon.pellets){
                const angle = baseAngle + pellet.angle * Math.PI / 180;
                const vx = Math.cos(angle) * LevelFactory.scaleX(weapon.bulletSpeed, width);
                const vy = Math.sin(angle) * LevelFactory.scaleY(weapon.bulletSpeed, height);
                this.spawner.request(EntityType.PROJECTILE, {
                    ...projectileData,
                    center_y: pos.y - pellet.offsetY,
                    velocity_x: vx,
                    velocity_y: vy,
                });
            }
    }

    /**
     * Spawns one projectile in the character's facing direction, or two in opposite
     * directions for the two-way rifle.
     */
    fireBasic(weapon, character, projectileData){
        const vx = character.direction * LevelFactory.scaleX(weapon.bulletSpeed, width);
        const vels = weapon.type === WeaponType.TWOWAYRIFLE ? [vx, -vx] : [vx];

        vels.forEach (vx => {
            this.spawner.request(EntityType.PROJECTILE, {
                ...projectileData,
                velocity_x: vx,
            })
        })
    }

    /**
     * Applies a recoil impulse opposite to the firing direction. The damping factor
     * normalises recoil across levels with different damping multipliers (e.g. the ice
     * level), preventing excessive kick at lower friction settings.
     */
    applyRecoil(vel, weapon, character) {
        const dampingFactor = (1 - 0.9 * this.physics.playerDampingMultiplier) / (1 - 0.9 * defaults.physics.playerDampingMultiplier);;
        vel.recoilVx += -character.direction * weapon.recoilKick * dampingFactor;
    }
}

WeaponSystem.SOUNDS = {
    [WeaponType.SHOTGUN]:     'shotgun',
    [WeaponType.TWOWAYRIFLE]: 'dual_pistols',
    [WeaponType.ROCKET]:      'rocket_launcher',
    [WeaponType.DISC]:        'bouncing_disc',
};