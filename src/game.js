class Game {
    constructor(width, height) {
        this.ecs = new ECS();
        this.factory = new EntityFactory(this.ecs);
        this.player = null;
        this.walls = [];
        this.init();
    }

    init() {
        this.player = this.factory.createPlayer(width / 2, height / 2, 20, 20);
        this.walls.push(this.factory.createWall(0, 0, 10, 600));
    }

    update() {
        this.ecs.update();
    }
}