const WeaponType = Object.freeze({
    RIFLE: "RIFLE",
    ROCKET: "ROCKET"
})

const WEAPON_CONFIGS = {
  [WeaponType.RIFLE]: {fireRate: 100, 
                       bulletDamage: 1, 
                       bulletSpeed: 12, 
                       bulletSize: {w: 6, h: 4},
                       recoilKick: 0.003,
                       maxRange: 1.0,
                      },

  [WeaponType.ROCKET]: {fireRate: 500, 
                        bulletDamage: 5, 
                        bulletSpeed: 20, 
                        bulletSize: {w:12, h:8},
                        recoilKick: 0.009,
                        maxRange: 1.5,
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