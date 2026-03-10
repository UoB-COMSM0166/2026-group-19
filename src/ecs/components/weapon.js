const WeaponType = Object.freeze({
    RIFLE: "RIFLE",
    TWOWAYRIFLE: "TWOWAYRIFLE",
    ROCKET: "ROCKET"
})

const BASICRIFLE = {
    fireRate: 100, 
    bulletDamage: 1, 
    bulletSpeed: 10, 
    bulletSize: {w: 6, h: 4},
    recoilKick: 0.003,
    maxRange: 0.3,

}

const WEAPON_CONFIGS = {
  [WeaponType.RIFLE]: BASICRIFLE,
  [WeaponType.TWOWAYRIFLE]: BASICRIFLE,
  [WeaponType.ROCKET]: {fireRate: 500, 
                        bulletDamage: 5, 
                        bulletSpeed: 20, 
                        bulletSize: {w:18, h:12},
                        recoilKick: 0.009,
                        maxRange: 0.7,
                      },
}

class Weapon {
  constructor(type=null){
    this.type = type;
    if (type){
      const config = WEAPON_CONFIGS[type]
      this.lastShotTime = 0;
      // Map config data to the component instance
      this.fireRate = config.fireRate;
      this.bulletDamage = config.bulletDamage;
      this.bulletSpeed = config. bulletSpeed;
      this.bulletSize = config.bulletSize;
      this.recoilKick = config.recoilKick;
      this.maxRange = config.maxRange;
    }
  }
}