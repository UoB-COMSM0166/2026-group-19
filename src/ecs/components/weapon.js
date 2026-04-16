const WeaponType = Object.freeze({
    SHOTGUN: "SHOTGUN",
    TWOWAYRIFLE: "TWOWAYRIFLE",
    ROCKET: "ROCKET",
    DISC: "DISC",
})


const WEAPON_SPRITE_DATA = {
  [WeaponType.SHOTGUN]:    { frameWidth: 64, frameHeight: 32 },
  [WeaponType.TWOWAYRIFLE]:{ frameWidth: 77, frameHeight: 48 },
  [WeaponType.DISC]:       { frameWidth: 77, frameHeight: 48 }, // shares TwoWayRifle image
  [WeaponType.ROCKET]:     { frameWidth: 154, frameHeight: 32 },
};

const WEAPON_CONFIGS = {
  [WeaponType.SHOTGUN]: {
    fireRate: 250,
    bulletDamage: 1,
    bulletSpeed: 20.0 / 32.0,
    bulletSize: {w: 0.4, h: 0.25},
    recoilKick: 60,
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
      bulletSpeed: 20.0 / 32.0,
      bulletSize: {w: 0.3, h: 0.15},
      recoilKick: 0,
      maxRange: 0.3,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 0,
  },

  [WeaponType.DISC]:{
    fireRate: 100,
      bulletDamage: 1,
      bulletSpeed: 25.0 / 32.0,
      bulletSize: {w: 0.875, h: 0.2},
      recoilKick: 10,
      maxRange: 2,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 1,
  },

  [WeaponType.ROCKET]: {
      fireRate: 500,
      bulletDamage: 10,
      bulletSpeed: 15.0 / 32.0,
      bulletSize: {w: 0.6, h: 0.45},
      recoilKick: 80,
      maxRange: 0.7,
      pellets: [{ angle: 0, offsetY: 0 }],
      bounce: 0,
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