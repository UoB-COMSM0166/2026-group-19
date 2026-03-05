let game;
let currentScene;
let gameState = GameStepConfig.State;

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
    else if (gameState === "PAUSE") {
        // Draw the frozen game state
        game.renderOnly();

        // FEEL free to change to Pause Menu
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(48);
        text("PAUSED", width / 2, height / 2);
        pop();
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
            game.loadLevel(LevelData[1]);
            gameState = "PLAY";
        }
    }
}

function keyPressed() {
    if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
        if (gameState === "PLAY") {
            gameState = "PAUSE"; // Freeze the game
        } else if (gameState === "PAUSE") {
            gameState = "PLAY";  // Unfreeze the game
        }
    }
}