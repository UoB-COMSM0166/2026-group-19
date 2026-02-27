let game;

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    game = new Game(width, height);
}

function draw() {
    background(100);
    game.update();

    let fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 20);
}