const WeaponType = Object.freeze({
    SHOTGUN: "SHOTGUN",
    TWOWAYRIFLE: "TWOWAYRIFLE",
    ROCKET: "ROCKET",
    DISC: "DISC",
    LASER: "LASER"
})


const WEAPON_CONFIGS = {
  [WeaponType.SHOTGUN]: {
    fireRate: 250,
    bulletDamage: 1,
    bulletSpeed: 10,
    bulletSize: {w: 16, h: 10},
    recoilKick: 0.005,
    maxRange: 0.3,
    pellets: [
      { angle: 0, offsetY: -8},
      { angle: 0, offsetY: 8},
      { angle: 15, offsetY: 0},
      { angle: -15, offsetY: 0},
    ],
    bounce: 0,
  },
  [WeaponType.TWOWAYRIFLE]: {
      fireRate: 100,
      bulletDamage: 1,
      bulletSpeed: 10,
      bulletSize: {w: 12, h: 6},
      recoilKick: 0.003,
      maxRange: 0.3,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 0,
  },

  [WeaponType.DISC]:{
    fireRate: 100,
      bulletDamage: 1,
      bulletSpeed: 15,
      bulletSize: {w: 35, h: 8},
      recoilKick: 0.003,
      maxRange: 2,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 1,
  },

  [WeaponType.ROCKET]: {
      fireRate: 500,
      bulletDamage: 3,
      bulletSpeed: 20,
      bulletSize: {w:24, h:18},
      recoilKick: 0.009,
      maxRange: 0.7,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 0,
  },

  [WeaponType.LASER]: {
    fireRate: 500,
    bulletDamage: 2,
    bulletSize: {h: 8},    // beam thickness
    beamLength: 400,       // fixed beam length in pixels
    recoilKick: 0,
    duration: 120,         // ms the beam stays active/visible
    pierce: true,
  },


}

class Weapon {
  constructor(type = null) {
    this.type = type;
    if (type) {
      const config = WEAPON_CONFIGS[type];
      // Copy all config fields onto this instance. Using Object.assign means
      // new fields (e.g. pierce, duration, beamLength) are picked up automatically
      // without having to update this list every time.
      Object.assign(this, config);
      this.lastShotTime = 0;
    }
  }
}