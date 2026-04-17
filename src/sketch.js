let gameInstance;
let sceneManager;
let uiFont;
let playBgImage;
let characterSpriteSheet;
let enemySpriteSheet;
let enemyAngrySpriteSheet;
let enemyLargeSpriteSheet;
let enemyLargeAngrySpriteSheet;
let enemyFloatingImage;
let wallTileImage;
let boxImage;
let weaponSpriteSheets = {};
let bulletImage;
let rocketImage;

// Global settings manager
const GameSettings = {
    controlScheme: "arrows",
    hasSeenInstructions: false
};

function preload() {
    uiFont = loadFont("src/assets/8-BIT WONDER.TTF");
    playBgImage = loadImage("src/assets/gray_gameBg.png");
    wallTileImage = loadImage("src/assets/wall_texture.png");
    characterSpriteSheet = loadImage("src/assets/testsprite.png");
    enemySpriteSheet = loadImage("src/assets/spriteEnemy.png");
    enemyAngrySpriteSheet = loadImage("src/assets/spriteEnemyAngry.png");
    enemyLargeSpriteSheet = loadImage("src/assets/spriteEnemyLarge.png");
    enemyLargeAngrySpriteSheet = loadImage("src/assets/spriteEnemyLargeAngry.png");

    enemyFloatingImage = loadImage("src/assets/spriteEnemyFloating.png");
    boxImage = loadImage("src/assets/crate2.png");
    weaponSpriteSheets[WeaponType.SHOTGUN] = loadImage("src/assets/Shotgun.png");
    weaponSpriteSheets[WeaponType.TWOWAYRIFLE] = loadImage("src/assets/TwoWayRifle.png");
    weaponSpriteSheets[WeaponType.ROCKET] = loadImage("src/assets/rocketlauncher.png");
    bulletImage = loadImage("src/assets/bullet.png");
    rocketImage = loadImage("src/assets/rocket.png");
    // DISC shares TwoWayRifle — assigned after preload in setup()
}

function setup() {
    setAttributes({ version: 1 });
    const { w, h } = getCanvasSize();
    createCanvas(w, h, WEBGL);
    noSmooth();
    frameRate(60);
    textFont(uiFont);

    weaponSpriteSheets[WeaponType.DISC] = weaponSpriteSheets[WeaponType.TWOWAYRIFLE];

    const assets = {
        bulletImage,
        rocketImage,
        characterSpriteSheet,
        enemySpriteSheet,
        enemyAngrySpriteSheet,
        enemyLargeSpriteSheet,
        enemyLargeAngrySpriteSheet,
        enemyFloatingImage,
        boxImage,
        wallTileImage
    };

    gameInstance = new Game(assets);
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
