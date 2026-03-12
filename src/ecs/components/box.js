const TYPE = [
  WeaponType.RIFLE,
  WeaponType.TWOWAYRIFLE,
  WeaponType.ROCKET
]

class Box {
  constructor() {
    this.weapon = this.pickUp();
  }


  pickUp() {
    const index = Math.floor(random() * TYPE.length);
    return TYPE[index];
  }

}