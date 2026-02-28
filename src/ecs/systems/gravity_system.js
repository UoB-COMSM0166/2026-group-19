class GravitySystem extends System {
    constructor(ecs) {
        super(ecs);
        this.maxFall = 50; // Terminal velocity
    }
    
    update() {
        const ids = this.ecs.getEntitiesWith(Position, Velocity, Gravity);
        for (let id of ids) {
            const velComp = this.ecs.getComponent(id, Velocity);
            const gComp = this.ecs.getComponent(id, Gravity);
            const g = gComp.g;

            // Update velocity (v = a * t)
            velComp.vy = Math.min(velComp.vy + g, this.maxFall);
        }
    }
}