let gameInstance;
let sceneManager;
let uiFont;
let playBgImage;
let characterSpriteSheet;
let wallTileImage;
let weaponSpriteSheets = {};

// Global settings manager
const GameSettings = {
    controlScheme: "ARROWS"
};

function preload() {
    uiFont = loadFont("src/assets/8-BIT WONDER.TTF");
    playBgImage = loadImage("src/assets/gray_gameBg.png");
    wallTileImage = loadImage("src/assets/wall_texture.png");
    characterSpriteSheet = loadImage("src/assets/main_characterSprites.png");
    weaponSpriteSheets[WeaponType.SHOTGUN] = loadImage("src/assets/Shotgun.png");
    weaponSpriteSheets[WeaponType.TWOWAYRIFLE] = loadImage("src/assets/TwoWayRifle.png");
    weaponSpriteSheets[WeaponType.LASER] = loadImage("src/assets/Laser.png");
    weaponSpriteSheets[WeaponType.ROCKET] = loadImage("src/assets/Rocket.png");
    // DISC shares TwoWayRifle — assigned after preload in setup()
}

function setup() {
    setAttributes({ version: 1 });
    const { w, h } = getCanvasSize();
    createCanvas(w, h, WEBGL);
    frameRate(60);
    textFont(uiFont);

    weaponSpriteSheets[WeaponType.DISC] = weaponSpriteSheets[WeaponType.TWOWAYRIFLE];

    gameInstance = new Game();
    sceneManager = new SceneManager();
    sceneManager.switchScene(new MenuScene());
}

function getCanvasSize() {
    const targetRatio = 16.0 / 9.0;
    const windowRatio = windowWidth / windowHeight;
    if (windowRatio > targetRatio) {
        return { w: windowHeight * targetRatio, h: windowHeight };
    } else {
        return { w: windowWidth, h: windowWidth / targetRatio };
    }
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
