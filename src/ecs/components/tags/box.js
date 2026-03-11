const TYPE = Object.values(WeaponType)

class Box {
  static lastWeapon = null;

  constructor() {
    this.weapon = null;
  }

  pickUp() {
    let index = Math.floor(random() * TYPE.length);
    let selected = TYPE[index];
    
    // If it's the same as last time, roll ONE more time
    if (selected === Box.lastWeapon) {
      index = Math.floor(random() * TYPE.length);
      selected = TYPE[index];
    }
    console.log(selected);
    Box.lastWeapon = selected; 
    this.weapon = selected;
  }
}
