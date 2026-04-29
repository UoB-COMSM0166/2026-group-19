/** Per-frame acceleration applied by PhysicsSystem before integrating velocity. Defaults to gravity on the y-axis. */
class Acceleration {
    constructor(ax = 0, ay = defaults.physics.gravity) {
        this.ax = ax;
        this.ay = ay;
    }
}