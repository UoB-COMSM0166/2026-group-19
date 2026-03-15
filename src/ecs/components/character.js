class Character {
    constructor(health) {
        this.onGround = false;
        this.health = health;
        this.direction = DIR_RIGHT;
        this.jumpBufferTime = 0;
    }
}