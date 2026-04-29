/**
 * Current velocity of an entity. recoilVx is a separate horizontal impulse
 * applied on shooting that decays independently of the main vx each frame.
 */
class Velocity {
    constructor(vx = 0, vy = 0) {
        this.vx = vx;
        this.vy = vy;
        this.recoilVx = 0;
    }
}

if (typeof module !== 'undefined') module.exports = { Velocity };