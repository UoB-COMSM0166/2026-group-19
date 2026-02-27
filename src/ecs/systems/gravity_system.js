class GravitySystem extends System {
    constructor() {
        super();
        this.maxFall = 50; // Terminal velocity
    }
    update(ecs) {
        const ids = ecs.getEntitiesWith(Position, Velocity, Gravity);
        for (let id of ids) {
            const velComp = ecs.getComponent(id, Velocity);
            const gComp = ecs.getComponent(id, Gravity);
            const g = gComp.g;

            // Update velocity (v = a * t)
            velComp.vy = Math.min(velComp.vy + g, this.maxFall);
        }
    }
}