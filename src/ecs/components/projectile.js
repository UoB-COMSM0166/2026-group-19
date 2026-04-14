class Projectile {
  constructor(damage, range, bounce, pierce = false, duration = 0){
    // piercer, spawnTime, hitEnemies are for Laser
    this.damage = damage;
    this.range = range * width;
    this.bounce = bounce || 0;
    this.pierce = pierce;
    this.duration = duration;
    this.spawnTime = duration > 0 ? millis() : 0;
    this.lastHitEnemy = null;
    this.hitEnemies = pierce ? new Set() : null;
  }
}