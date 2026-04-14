class WeaponSystem extends System {
    constructor(ecs, spawner){
      super(ecs);
      this.spawner = spawner
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
            width: weapon.bulletSize.w,
            height: weapon.bulletSize.h,
            damage: weapon.bulletDamage,
            range: weapon.maxRange,
            bounce: weapon.bounce,
        };

        if (weapon.type === WeaponType.LASER){
            this.fireLaser(id, pos, weapon, character);
        } else if (weapon.type === WeaponType.SHOTGUN){
            this.fireShotgun(pos, weapon, character, projectileData);
        } else {
            this.fireBasic(weapon, character, projectileData);
        }
    }

    fireShotgun(pos, weapon, character, projectileData){
        const baseAngle = character.direction === 1 ? 0 : Math.PI;

            for (let pellet of weapon.pellets){
                const angle = baseAngle + pellet.angle * Math.PI / 180;
                const vx = Math.cos(angle) * weapon.bulletSpeed;
                const vy = Math.sin(angle) * weapon.bulletSpeed;
                this.spawner.request(EntityType.PROJECTILE, {
                    ...projectileData,
                    center_y: pos.y - pellet.offsetY,
                    velocity_x: vx,
                    velocity_y: vy,
                });
            }
    }

    fireBasic(weapon, character, projectileData){
        const vx = character.direction * weapon.bulletSpeed;
        const vels = weapon.type === WeaponType.TWOWAYRIFLE ? [vx, -vx] : [vx];

        vels.forEach (vx => {
            this.spawner.request(EntityType.PROJECTILE, {
                ...projectileData,
                velocity_x: vx,
            })
        })
    }

    fireLaser(id, pos, weapon, character) {
        const tip = this.getWeaponTip(id, pos, character);
        const beamX = tip.x + character.direction * weapon.beamLength / 2;
        this.spawner.request(EntityType.PROJECTILE, {
            center_x: beamX,
            center_y: tip.y,
            width: weapon.beamLength,
            height: weapon.bulletSize.h,
            velocity_x: 0,
            velocity_y: 0,
            damage: weapon.bulletDamage,
            range: Infinity,
            bounce: 0,
            pierce: true,
            duration: weapon.duration,
            followEntity: id,
            followDirection: character.direction,
            followOffset: weapon.beamLength / 2,
        });
    }

    applyRecoil(vel, weapon, character) {
        if (weapon.type === WeaponType.TWOWAYRIFLE) return;
        vel.vx += -character.direction * weapon.recoilKick;
    }
}