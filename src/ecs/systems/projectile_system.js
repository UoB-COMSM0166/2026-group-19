class ProjectileSystem extends System {
  constructor(ecs) {
    super(ecs);
  }

  update() {
    const projectiles = this.ecs.getEntitiesWith(Projectile);
    for (let id of projectiles) {
      const projectile = this.ecs.getComponent(id, Projectile);
      const vel = this.ecs.getComponent(id, Velocity);
      if (projectile.range > 0){
        projectile.range -= Math.abs(vel.vx);
      }
      else {
        this.ecs.removeEntity(id);
      }
    }
  }
}