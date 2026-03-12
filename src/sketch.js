let gameInstance;
let sceneManager;
let uiFont;
let playBgImage;
let characterSpriteSheet;
let wallTileImage;

function preload() {
    uiFont = loadFont("src/assets/TaipeiSans-font-subset.ttf");
    playBgImage = loadImage("src/assets/gray_gameBg.png");
    wallTileImage = loadImage("src/assets/Idle_block.png");
    characterSpriteSheet = loadImage("src/assets/main_characterSprites.png");
}

function setup() {
    setAttributes({ version: 1 });
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    textFont(uiFont);
    
    gameInstance = new Game();
    sceneManager = new SceneManager();
    sceneManager.switchScene(new MenuScene());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(100);
    cursor(ARROW);

    sceneManager.update();
    sceneManager.display();
}

function mousePressed() {
    sceneManager.handleMousePressed();
}

function keyPressed() {
    sceneManager.handleKeyPressed();
}
