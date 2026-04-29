/**
 * Marks an enemy as a floating type, processed by FloatingSystem.
 * wasInRange tracks whether the enemy was in pursuit range last frame so
 * FloatingSystem knows when to switch from chasing to passive drift.
 */
class Floating {
    constructor() {
        this.wasInRange = false;
    }
}