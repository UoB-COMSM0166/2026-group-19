class ProjectileSystem extends System {
    constructor(ecs) {
      super(ecs);
    }

    update(dt) {
        const now = millis();
        const projectiles = this.ecs.getEntitiesWith(Projectile);
        for (let id of projectiles) {
            const projectile = this.ecs.getComponent(id, Projectile);
            const vel = this.ecs.getComponent(id, Velocity);

            if (projectile.followEntity !== undefined) {
                const ownerPos = this.ecs.getComponent(projectile.followEntity, Position);
                if (ownerPos) {
                    const pos = this.ecs.getComponent(id, Position);
                    pos.x = ownerPos.x + projectile.followDirection * projectile.followOffset;
                    pos.y = ownerPos.y;
                }
            }

            if (projectile.duration > 0 && now - projectile.spawnTime >= projectile.duration) {
                this.ecs.removeEntity(id);
                continue;
            }

            if (projectile.range > 0){
                projectile.range -= Math.abs(vel.vx) * dt;
            }
            else {
                this.ecs.removeEntity(id);
            }
        }
    }
}