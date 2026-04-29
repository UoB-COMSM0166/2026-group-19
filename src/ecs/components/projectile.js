/**
 * Data for an in-flight projectile. Range is stored in pixels (converted from
 * the weapon's canvas-relative value on construction). lastHitEnemy prevents
 * a projectile from hitting the same enemy twice in consecutive frames.
 */
class Projectile {
  constructor(damage, range, bounce){
    this.damage = damage;
    this.range = range * width;
    this.bounce = bounce || 0;
    this.lastHitEnemy = null;
  }
}