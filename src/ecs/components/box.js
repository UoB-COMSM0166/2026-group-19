const TYPE = Object.values(WeaponType);

class Box {
  static lastWeapon = null;
  constructor() {
    this.weapon = null;
  }


  pickUp() {
    let index = Math.floor(random() * TYPE.length);
    let selected = TYPE[index];
    
    if (selected === Box.lastWeapon){
      index = Math.floor(random() * TYPE.length);
      selected = TYPE[index];
    }
    Box.lastWeapon = selected;
    this.weapon = selected;
  }

}