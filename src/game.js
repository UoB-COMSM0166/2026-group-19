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
        this.walls.push(this.factory.createWall(790, 0, 10, 600));
        this.walls.push(this.factory.createWall(0, 590, 800, 100));
        this.walls.push(this.factory.createWall(0, 500, 300, 10));
        this.walls.push(this.factory.createWall(400, 400, 300, 10));
    }

    update() {
        this.ecs.update();
    }
}