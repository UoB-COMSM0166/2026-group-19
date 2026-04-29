const TYPE = Object.values(WeaponType);

/**
 * Weapon pickup box. The weapon type is not assigned until pickUp() is called,
 * which selects a random weapon while avoiding repeating the last one collected.
 */
class Box {
  static lastWeapon = null;
  constructor() {
    this.weapon = null;
  }

  /**
   * Assigns a random weapon type to this box, re-rolling once if it matches
   * the last weapon picked up to reduce consecutive duplicates.
   */
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