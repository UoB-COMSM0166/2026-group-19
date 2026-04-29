/**
 * Tag component marking an entity as an enemy.
 * The powerful flag is set when the enemy falls off the bottom of the screen
 * and respawns at the top, granting it a permanent speed boost.
 */
class Enemy {
    constructor() {
        this.powerful = false;
    }
}