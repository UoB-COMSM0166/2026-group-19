/**
 * Shared state for any entity that can move and take damage, both the player
 * and enemies. Tracks health, facing direction, ground contact, and a jump
 * buffer timestamp used by InputSystem to allow slightly early jump inputs.
 */
class Character {
    constructor(health) {
        this.onGround = false;
        this.health = health;
        this.direction = DIR_RIGHT;
        this.jumpBufferTime = 0;
    }
}