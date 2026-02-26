class System {
    update(ecs) {
        throw new Error("System subclasses must implement update()");
    }
}