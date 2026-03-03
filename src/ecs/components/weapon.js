const WeaponType = Object.freeze({
    PISTOL: "PISTOL",
    ROCKET: "ROCKET"
})

const WEAPON_CONFIGS = {
  [WeaponType.PISTOL]: {fireRate: 400, bulletDamage: 1, bulletSpeed: 12, bulletSize: {w: 6, h: 4}},
  [WeaponType.ROCKET]: {fireRate: 1200, bulletDamage: 5, bulletSpeed: 20, bulletSize: {w:12, h:8}},
}

class Weapon {
  constructor(type=null){
    this.type = type;
    if (type){
      const config = WEAPON_CONFIGS[type]
      // Map config data to the component instance
      this.fireRate = config.fireRate;
      this.bulletDamage = config.bulletDamage;
      this.bulletSpeed = config. bulletSpeed;
      this.bulletSize = config.bulletSize;
    }
  }
}