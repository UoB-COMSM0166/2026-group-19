class WeaponSystem extends System {
    constructor(ecs, spawner){
      super(ecs);
      this.spawner = spawner
    }


    update() {
        // Catch the latest time in ms
        const now = millis();

        // Get the player with FireRequest
        const ids = this.ecs.getEntitiesWith(FireRequest, Position, Velocity, Character, Weapon);
        for (let id of ids){
            // Access the value we need
            const weap = this.ecs.getComponent(id, Weapon);
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const char = this.ecs.getComponent(id, Character);
            const isTwoWayRIFLE = (weap.type === WeaponType.TWOWAYRIFLE);
            const isMoving = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW);
            
            // If pass the fireRate, spawning new bullet
            if (now - weap.lastShotTime >= weap.fireRate){
                const ProjectileBase = {
                    center_x: pos.x,
                    center_y: pos.y,
                    width: weap.bulletSize.w,
                    height: weap.bulletSize.h,
                    damage: weap.bulletDamage,
                    range: weap.maxRange
                };

                const vx = char.direction * weap.bulletSpeed;
                const directions = (isTwoWayRIFLE) ? [vx, -vx] : [vx]

                directions.forEach(speed_x=> {
                    this.spawner.request(EntityType.PROJECTILE, {
                        ...ProjectileBase,
                        velocity_x: speed_x
                    });
                });

                weap.lastShotTime = now;
                this.ecs.removeComponent(id, FireRequest);

                // Recoil for player
                if (!isMoving && !isTwoWayRIFLE) {
                    vel.vx = -char.direction * weap.recoilKick * width;
                }
            }
            this.ecs.removeComponent(id, FireRequest);   
        } 
    }
}