let game;

function setup() {
    createCanvas(800, 600);
    game = new Game(width, height);
}

function draw() {
    background(100);
    game.update();
}