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
    moveScheme:  "arrows",
    shootScheme: "space",
    hasSeenInstructions: false,
    seenIntros: {},
    sfxVolume: 100,
    bgVolume: 100,
    muted: false
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

    const soundFiles = {
        menu_bgMusic:    'src/assets/gameMusic/menu_bgMusic.mp3',
        cave_bgMusic:    'src/assets/gameMusic/cave_bgMusic.mp3',
        ice_bgMusic:     'src/assets/gameMusic/ice_bgMusic.mp3',
        space_bgMusic:   'src/assets/gameMusic/space_bgMusic.mp3',
        jump:            'src/assets/gameMusic/jump.mp3',
        death:           'src/assets/gameMusic/death.mp3',
        getting_hit:     'src/assets/gameMusic/getting_hit.mp3',
        hitting_enemy:   'src/assets/gameMusic/hitting_enemy.mp3',
        weapon_pickup:   'src/assets/gameMusic/weapon_pickup.mp3',
        shotgun:         'src/assets/gameMusic/shotgun.mp3',
        dual_pistols:    'src/assets/gameMusic/dual_pistols.mp3',
        rocket_launcher: 'src/assets/gameMusic/rocket_launcher.mp3',
        bouncing_disc:   'src/assets/gameMusic/bouncing_disc.mp3',
        upSelection:     'src/assets/gameMusic/upSelection.mp3',
        downSelection:   'src/assets/gameMusic/downSelection.mp3',
        select:          'src/assets/gameMusic/select.mp3',
    };
    for (const [name, path] of Object.entries(soundFiles)) {
        soundManager.register(name, path);
    }

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
    soundManager.onUserInteraction();
    sceneManager.handleMousePressed();
}

function keyPressed() {
    soundManager.onUserInteraction();
    sceneManager.handleKeyPressed();
}
