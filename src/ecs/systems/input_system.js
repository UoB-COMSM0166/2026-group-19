const SPACE = 32;
const DIR_LEFT = -1;
const DIR_RIGHT = 1;

class InputSystem extends System {
    /*
    Reads keyboard input and updates player velocity based on input
    */
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.prev = new Map();
    }
    update() {
        const now = millis();
        const players = this.ecs.getEntitiesWith(Player, Character, Velocity, Position);
        for (let id of players) {
            const character = this.ecs.getComponent(id, Character);
            const weapon = this.ecs.getComponent(id, Weapon);
            const player = this.ecs.getComponent(id, Player);
            const pos = this.ecs.getComponent(id, Position);
            const vel = this.ecs.getComponent(id, Velocity);
            const speed = PhysicsConstants.PLAYER_SPEED;
            const jumpSpeed = PhysicsConstants.JUMP_SPEED;
            const isShootPressed = keyIsDown(SPACE) && !this.prev.get(SPACE);

            // Side-to-side
            if (keyIsDown(LEFT_ARROW)) { 
                vel.vx = -speed; 
                player.direction = DIR_LEFT;
            }
            else if (keyIsDown(RIGHT_ARROW)) { 
                vel.vx = speed; 
                player.direction = DIR_RIGHT;
            }
            else {
                vel.vx *= 0.8;
                if (Math.abs(vel.vx) < 0.01) { vel.vx = 0; }
            }

            // Jump
            if (character.onGround && !this.prev.get(UP_ARROW) && keyIsDown(UP_ARROW)) {
                vel.vy = -jumpSpeed;
            }

            // Spawn Projectile
            if (isShootPressed && weapon) {
                const vx = player.direction * weapon.bulletSpeed;
                if (now - weapon.lastShotTime >= weapon.fireRate){
                    this.spawner.request(EntityType.PROJECTILE, 
                    {center_x: pos.x, 
                     center_y: pos.y, 
                     width: weapon.bulletSize.w, 
                     height: weapon.bulletSize.h, 
                     velocity_x: vx, 
                     damage: weapon.bulletDamage});
                    weapon.lastShotTime = now;
                }
                if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
                    vel.vx = (-1) * player.direction * weapon.recoilKick * width;
                }

                
            }


            // Update previous key-state
            this.prev.set(UP_ARROW, keyIsDown(UP_ARROW));
            this.prev.set(SPACE, keyIsDown(SPACE));

        }
    }
}
