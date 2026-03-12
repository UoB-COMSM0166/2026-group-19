class PlayScene extends Scene {
    constructor(gameInstance) {
        super();
        this.game = gameInstance;
        this.playBg = null;
        this.isPaused = false;
        
        // Bind methods for DOM listeners
        this.boundResume = this.resumeGame.bind(this);
        this.boundQuit = this.quitToMenu.bind(this);
    }

    setup() {
        console.log("PlayScene setup: loading level 1");
        this.game.loadLevel(1);
        // this.playBg = new ScrollingPlayBg(playBgImage, {
        //     speedX: 0,
        //     speedY: 0.6,
        //     tileScale: 2
        // });

        // Add DOM listeners for pause menu
        const resumeBtn = document.getElementById('btn-resume');
        const quitBtn = document.getElementById('btn-quit');
        if (resumeBtn) resumeBtn.addEventListener('click', this.boundResume);
        if (quitBtn) quitBtn.addEventListener('click', this.boundQuit);
    }

    update() {
        if (!this.isPaused) {
            this.game.update();
        }
    }

    display() {
        if (this.isPaused) {
            push();
            translate(-width / 2, -height / 2);
            this.game.renderOnly();
            this.drawPauseOverlay();
            pop();
        } else {
            push();
            translate(-width / 2, -height / 2);
            background(50); //temporarily removed tiled bg, performance issues
            this.game.renderOnly(); 
            pop();
        }
    }

    drawPauseOverlay() {
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

    handleKeyPressed() {
        if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
            if (!this.isPaused) {
                this.pauseGame();
            } else {
                this.resumeGame();
            }
        }
    }

    pauseGame() {
        this.isPaused = true;
        let overlay = document.getElementById('pause-overlay');
        if (!overlay) return;

        // 1. Force a clean render so capture is accurate
        this.game.renderOnly();

        // 2. Capture canvas
        let canvasElt = document.querySelector('canvas');
        if (canvasElt) {
            let dataUrl = canvasElt.toDataURL('image/jpeg');
            document.querySelectorAll('.split-image').forEach(el => {
                el.style.backgroundImage = `url(${dataUrl})`;
            });
        }

        overlay.classList.add('active');
        setTimeout(() => {
            overlay.classList.add('split');
        }, 50);
    }

    resumeGame() {
        let overlay = document.getElementById('pause-overlay');
        if (!overlay) {
            this.isPaused = false;
            return;
        }

        overlay.classList.remove('split');
        setTimeout(() => {
            overlay.classList.remove('active');
            this.isPaused = false;
        }, 600);
    }

    quitToMenu() {
        console.log("PlayScene: Quitting to menu");
        let overlay = document.getElementById('pause-overlay');
        if (overlay) {
            overlay.classList.remove('split');
            setTimeout(() => {
                overlay.classList.remove('active');
                sceneManager.switchScene(new MenuScene());
            }, 600);
        } else {
            sceneManager.switchScene(new MenuScene());
        }
    }

    dispose() {
        console.log("PlayScene: Disposing");
        // Clean up DOM listeners
        const resumeBtn = document.getElementById('btn-resume');
        const quitBtn = document.getElementById('btn-quit');
        if (resumeBtn) resumeBtn.removeEventListener('click', this.boundResume);
        if (quitBtn) quitBtn.removeEventListener('click', this.boundQuit);
        
        let overlay = document.getElementById('pause-overlay');
        if (overlay) {
            overlay.classList.remove('active', 'split');
        }
    }
}