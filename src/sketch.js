let gameInstance;
let sceneManager;
let uiFont;
let playBg;
let playBgImage;
let characterSpriteSheet;
let wallTileImage;
let fps;

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
    
    fps = new drawFps();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(100);
    cursor(ARROW);

    sceneManager.update();
    sceneManager.display();

    fps.display();
}

function mousePressed() {
    sceneManager.handleMousePressed();
}

function keyPressed() {
    sceneManager.handleKeyPressed();
}

// --- BUTTON CLICK LOGIC & Global UI ---
document.addEventListener('DOMContentLoaded', () => {
    // Hover glow logic
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
});
