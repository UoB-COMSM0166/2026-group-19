class Projectile {
  constructor(damage, range, bounce){
    this.damage = damage;
    this.range = range * width;
    this.bounce = bounce || 0;
    this.lastHitEnemy = null;
  }
}