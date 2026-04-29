/**
 * Manages the lifetime of all active projectiles each frame.
 * Despawns projectiles when they exhaust their travel distance.
 */
class ProjectileSystem extends System {
    constructor(ecs) {
      super(ecs);
    }

    /**
     * Decrements remaining range for each projectile and removes it when exhausted.
     */
    update(dt) {
        const projectiles = this.ecs.getEntitiesWith(Projectile);
        for (let id of projectiles) {
            const projectile = this.ecs.getComponent(id, Projectile);
            const vel = this.ecs.getComponent(id, Velocity);

            if (projectile.range > 0){
                projectile.range -= Math.abs(vel.vx) * dt;
            }
            else {
                this.ecs.removeEntity(id);
            }
        }
    }
}
