class WeaponSystem extends System {
    constructor(ecs, spawner){
      super(ecs);
      this.spawner = spawner;
      this.physics = defaults.physics;
    }

    applyPhysics(physics) {
        this.physics = physics;
    }


    update(dt) {
        const now = millis();
        const ids = this.ecs.getEntitiesWith(FireRequest);
        for (let id of ids) {
            this.processFireRequest(id, now);
            this.ecs.removeComponent(id, FireRequest);
        }
    }

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

    applyRecoil(vel, weapon, character) {
        // Damping factor is for ice level, otherwise recoil was too much with higher damping multiplier.
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