class System {
    constructor(ecs) {
        this.ecs = ecs;
    }
    update() {
        throw new Error("System subclasses must implement update()");
    }
}