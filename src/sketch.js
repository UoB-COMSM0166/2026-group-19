let game;
let gameState = "LANDING";
let menuScene;
let uiFont;
let playBg;
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
//    setAttributes({ version: 1 });
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    textFont(uiFont);
    game = new Game();
    game.loadLevel(1);
    menuScene = new MenuScene();
    fps = new drawFps();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (playBg) {
        playBg.resize(width, height);
    }
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
        menuScene = null; // dispose of menu scene
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

    fps.display();
}

function mousePressed() {
    if (gameState === "LANDING") {
        if (menuScene.checkClick()) {

            game.loadLevel(1);
            playBg = new ScrollingPlayBg(playBgImage, {
                speedX: 0,
                speedY: 0.6,
                tileScale: 2
            });
            gameState = "PLAY";
        }
    }
}

function keyPressed() {
    if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
        let tl = document.getElementById('split-tl');
        let tr = document.getElementById('split-tr');
        let bl = document.getElementById('split-bl');
        let br = document.getElementById('split-br');
        let overlay = document.getElementById('pause-overlay');

        if (gameState === "PLAY") {
            // 1. Force a clean render of the current frame
            game.renderOnly();

            // 2. Capture the canvas exactly as it appears
            let canvasElt = document.querySelector('canvas');
            let dataUrl = canvasElt.toDataURL('image/jpeg');

            document.querySelectorAll('.split-image').forEach(el => {
                el.style.backgroundImage = `url(${dataUrl})`;
            });

            // 4. Update state and trigger animation
            gameState = "PAUSE";
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.add('split');
            }, 50);

        } else if (gameState === "PAUSE") {
            resumeGame();
        }
    }
}

// --- HELPER FUNCTION TO SLIDE DOORS BACK TOGETHER ---
function resumeGame() {
    let overlay = document.getElementById('pause-overlay');

    // 1. Slide doors back together
    overlay.classList.remove('split');

    // 2. Wait 600ms for the CSS animation to finish, then hide overlay and resume
    setTimeout(() => {
        overlay.classList.remove('active');
        gameState = "PLAY";
    }, 600);
}

// --- BUTTON CLICK LOGIC ---
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

    // Button clicks
    document.getElementById('btn-resume').addEventListener('click', () => {
        if (gameState === "PAUSE") resumeGame();
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
        if (gameState === "PAUSE") {
            let overlay = document.getElementById('pause-overlay');
            overlay.classList.remove('split'); // Slide doors together first

            setTimeout(() => {
                overlay.classList.remove('active');
                gameState = "LANDING";
                menuScene = new MenuScene();
            }, 600);
        }
    });
});
