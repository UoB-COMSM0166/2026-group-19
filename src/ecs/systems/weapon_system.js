class WeaponSystem extends System {
    constructor(ecs, spawner){
      super(ecs);
      this.spawner = spawner
    }


    update() {
      // Catch the latest time in ms
      const now = millis();
      
      // get the player Id when it simultaneously has Weapon and FireRequest components
      const players = this.ecs.getEntitiesWith(Player, Weapon, FireRequest);
      for (let id of players){
        // Get the access of each component
          const pos = this.ecs.getComponent(id, Position);
          const vel = this.ecs.getComponent(id, Velocity);
          const player = this.ecs.getComponent(id, Player);
          const weapon = this.ecs.getComponent(id, Weapon);
          
          const vx = character.direction * weapon.bulletSpeed;
          // Count the time if exceed the weapon fireRate
          if (now - weapon.lastShotTime >= weapon.fireRate){
              this.spawner.request(EntityType.PROJECTILE, {center_x: pos.x, 
                  center_y: pos.y, 
                  width: weapon.bulletSize.w, 
                  height: weapon.bulletSize.h, 
                  velocity_x: vx, 
                  damage: weapon.bulletDamage,
                  range: weapon.maxRange});
              if (weapon.type === WeaponType.TWOWAYRIFLE){
                  this.spawner.request(EntityType.PROJECTILE, {center_x: pos.x, 
                  center_y: pos.y, 
                  width: weapon.bulletSize.w, 
                  height: weapon.bulletSize.h, 
                  velocity_x: -vx, 
                  damage: weapon.bulletDamage,
                  range: weapon.maxRange});
              }
              weapon.lastShotTime = now;
              this.ecs.removeComponent(id, FireRequest);
              // Control recoil feature when there is a fire 
              if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && weapon.type != WeaponType.TWOWAYRIFLE){
                  vel.vx = (-1) * character.direction * weapon.recoilKick * width;
              }
          }
          this.ecs.removeComponent(id, FireRequest);
          
      }
    }
}