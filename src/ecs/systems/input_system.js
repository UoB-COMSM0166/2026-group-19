// src/ecs/systems/input_system.js

const SPACE = 32;
const KEY_A = 65;
const KEY_D = 68;
const KEY_W = 87;
const JUMP_BUFFER_MS = 150;

class InputSystem extends System {
    /*
    Reads keyboard input and updates player velocity based on input
    */
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.prev = new Map();

        // Use the default physics config
        this.physics = defaults.physics;
        
        this.moveScheme  = "arrows";
        this.shootScheme = "space";
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    setControlScheme(moveScheme, shootScheme) {
        if (defaults.controls.movement[moveScheme])  this.moveScheme  = moveScheme;
        if (defaults.controls.shoot[shootScheme])    this.shootScheme = shootScheme;
    }

    update(dt) {
        const now = millis();
        const players = this.ecs.getEntitiesWith(Player, Character, Velocity, Position);
        const movement = defaults.controls.movement[this.moveScheme];
        const controls = { ...movement, shoot: defaults.controls.shoot[this.shootScheme] };

        for (let id of players) {
            const character = this.ecs.getComponent(id, Character);
            const weapon = this.ecs.getComponent(id, Weapon);
            const vel = this.ecs.getComponent(id, Velocity);
            const accel = this.ecs.getComponent(id, Acceleration);

            // Correctly access physics constants
            const moveAccel = this.physics.playerAcceleration;
            const jumpSpeed = this.physics.jumpSpeed;

            const shootKey = controls.shoot;
            const isShootPressed = keyIsDown(shootKey) && !this.prev.get(shootKey);

            // --- SIDE-TO-SIDE MOVEMENT ---
            if (keyIsDown(controls.left)) {
                accel.ax = -moveAccel;
                character.direction = DIR_LEFT;
            }
            else if (keyIsDown(controls.right)) {
                accel.ax = moveAccel;
                character.direction = DIR_RIGHT;
            }
            else {
                accel.ax = 0;
                vel.vx *= Math.pow(this.physics.playerDampingMultiplier, dt);
                if (Math.abs(vel.vx) < 0.01) { vel.vx = 0; }
            }

            // --- THE JUMP BUFFER FIX ---
            let upPressed = keyIsDown(controls.up);

            // 1. Record the exact time the jump key was first pressed
            if (upPressed && !this.prev.get('upKey')) {
                character.jumpBufferTime = now;
            }

            // 2. If on the ground AND jump was pressed within the last JUMP_BUFFER_MS, JUMP
            if (character.onGround && character.jumpBufferTime && (now - character.jumpBufferTime < JUMP_BUFFER_MS)) {
                vel.vy = -jumpSpeed;
                character.jumpBufferTime = 0; // Clear buffer so we don't double jump
                character.onGround = false;   // Instantly leave the ground
            }

            // Save jump key state for next frame
            this.prev.set('upKey', upPressed);

            if (isShootPressed && weapon) {
                this.ecs.addComponent(id, new FireRequest());
            }

            // Update previous key-state
            this.prev.set(shootKey, keyIsDown(shootKey));
        }
    }
}
