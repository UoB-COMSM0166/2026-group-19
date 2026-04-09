const WeaponType = Object.freeze({
    RIFLE: "RIFLE",
    TWOWAYRIFLE: "TWOWAYRIFLE",
    ROCKET: "ROCKET"
})

const BASICRIFLE = {
    fireRate: 100, 
    bulletDamage: 1, 
    bulletSpeed: 0.2, 
    bulletSize: {w: 0.12, h: 0.08},
    recoilKick: 0.3,
    maxRange: 0.3,

}

const WEAPON_CONFIGS = {
  [WeaponType.RIFLE]: BASICRIFLE,
  [WeaponType.TWOWAYRIFLE]: BASICRIFLE,
  [WeaponType.ROCKET]: {fireRate: 500, 
                        bulletDamage: 3, 
                        bulletSpeed: 0.4, 
                        bulletSize: {w:0.36, h:0.24},
                        recoilKick: 0.6,
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
      this.maxRange = config.maxRange;

      this.bulletSpeed = LevelFactory.scaleX(config.bulletSpeed, width);
      this.recoilKick  = LevelFactory.scaleX(config.recoilKick, width);

      this.bulletSize = {
          w: LevelFactory.scaleX(config.bulletSize.w, width),
          h: LevelFactory.scaleY(config.bulletSize.h, height)
      };
    }
  }
}