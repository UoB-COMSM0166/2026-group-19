let game;
let currentScene;
let gameState = "LANDING";

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    game = new Game(width, height);
    currentScene = new MenuScene();
}

function draw() {
    background(100);
    cursor(ARROW);

    if (gameState === "LANDING") {
        currentScene.display();
    }

    else if (gameState === "PLAY") {
        game.update();
    }

    // Draw the FPS counter on top of everything
    let fps = frameRate();
    fill(0);
    stroke(0);
    textSize(16);
    textAlign(LEFT, TOP);
    text("FPS: " + fps.toFixed(2), 10, 20);
}

function mousePressed() {
    if (gameState === "LANDING") {
        if (currentScene.checkClick()) {
            gameState = "PLAY";
        }
    }
}