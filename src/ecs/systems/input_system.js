// src/ecs/systems/input_system.js

const SPACE = 32;
const KEY_A = 65;
const KEY_D = 68;
const KEY_W = 87;
const JUMP_BUFFER_MS = 150;

/**
 * Reads keyboard input each frame and translates it into player movement and actions.
 * Supports configurable control schemes for both movement and shooting. Implements a
 * jump buffer so that a jump input pressed just before landing is still registered.
 */
class InputSystem extends System {
    constructor(ecs, spawner) {
        super(ecs);
        this.spawner = spawner;
        this.prev = new Map();
        this.physics = defaults.physics;
        this.moveScheme  = "arrows";
        this.shootScheme = "space";
    }

    applyPhysics(physics) {
        this.physics = physics;
    }

    /**
     * Switches the active movement and shoot key bindings to the named schemes
     * defined in defaults.controls.
     */
    setControlScheme(moveScheme, shootScheme) {
        if (defaults.controls.movement[moveScheme])  this.moveScheme  = moveScheme;
        if (defaults.controls.shoot[shootScheme])    this.shootScheme = shootScheme;
    }

    /**
     * Applies horizontal acceleration from left/right input and decelerates when no key
     * is held. Records the timestamp of a fresh jump-key press so that a jump input
     * within JUMP_BUFFER_MS of landing still triggers a jump. Adds a FireRequest
     * component on a fresh shoot-key press if the player has a weapon equipped.
     */
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

            const moveAccel = this.physics.playerAcceleration;
            const jumpSpeed = this.physics.jumpSpeed;

            const shootKey = controls.shoot;
            const isShootPressed = keyIsDown(shootKey) && !this.prev.get(shootKey);

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

            let upPressed = keyIsDown(controls.up);

            if (upPressed && !this.prev.get('upKey')) {
                character.jumpBufferTime = now;
            }

            if (character.onGround && character.jumpBufferTime && (now - character.jumpBufferTime < JUMP_BUFFER_MS)) {
                vel.vy = -jumpSpeed;
                character.jumpBufferTime = 0;
                character.onGround = false;
                soundManager.play('jump');
            }

            this.prev.set('upKey', upPressed);

            if (isShootPressed && weapon) {
                this.ecs.addComponent(id, new FireRequest());
            }

            this.prev.set(shootKey, keyIsDown(shootKey));
        }
    }
}
