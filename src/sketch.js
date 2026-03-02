let game;
let currentScene;

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    game = new Game(width, height);
    currentScene = new MenuScene();
}

function draw() {
    background(100);

    game.update();
    currentScene.display();

    cursor(ARROW);

    let fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 20);
}