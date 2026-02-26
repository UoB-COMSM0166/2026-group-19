class Game {
    constructor(width, height) {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.player = null;
        this.init();
    }

    init() {
        this.player = this.factory.createPlayer(width / 2, height / 2);
    }

    update() {
        this.ecs.update();
    }
}