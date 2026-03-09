let game;
let gameState = GameStepConfig.State;
let menuScene;
let uiFont;
let playBg;
let playBgImage;

function preload() {
    uiFont = loadFont("assets/TaipeiSans-font-subset.ttf");
    playBgImage = loadImage("assets/gray_gameBg.png");
}

function setup() {
    setAttributes({ version: 1 });
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    textFont(uiFont);
    game = new Game(width, height);
    menuScene = new MenuScene();
    fps = new drawFps();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (playBg) {
        playBg.resize(width, height);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(100);
    cursor(ARROW);
    fps.display();

    if (gameState === "LANDING") {
        menuScene.display();
    }
    else if (gameState === "PLAY") {
        translate(-width / 2, -height / 2);
        if (playBg) {
            playBg.update();
            playBg.draw();
        }
        menuScene = null; // dispose of menu scene
        game.update();
        pop();
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

    fps.display();
}

function mousePressed() {
    if (gameState === "LANDING") {
        if (menuScene.checkClick()) {
            game.loadLevel(LevelData[3]);
            playBg = new ScrollingPlayBg(playBgImage, {
                speedX: 0,
                speedY: 1.2,
                tileScale: 1
            });
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
