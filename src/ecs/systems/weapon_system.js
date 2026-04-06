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

        this.spawnProjectiles(pos, weapon, character);
        this.applyRecoil(vel, weapon, character);
        weapon.lastShotTime = now;
    }

    spawnProjectiles(pos, weapon, character) {
        const vx = character.direction * weapon.bulletSpeed;
        const projectileData = {
            center_x: pos.x,
            center_y: pos.y,
            width: weapon.bulletSize.w,
            height: weapon.bulletSize.h,
            damage: weapon.bulletDamage,
            range: weapon.maxRange
        };

        this.spawner.request(EntityType.PROJECTILE, { ...projectileData, velocity_x: vx });

        if (weapon.type === WeaponType.TWOWAYRIFLE) {
            this.spawner.request(EntityType.PROJECTILE, { ...projectileData, velocity_x: -vx });
        }
    }

    applyRecoil(vel, weapon, character) {
        const isMoving = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW);
        if (!isMoving && weapon.type !== WeaponType.TWOWAYRIFLE) {
            vel.vx = -character.direction * weapon.recoilKick;
        }
    }
}