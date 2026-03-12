class PlayScene extends Scene {
    constructor(gameInstance) {
        super();
        this.game = gameInstance;
        this.playBg = null;
        this.isPaused = false;
        this.fpsCounter = new drawFps();
        
        // Buttons for the in-game Pause Menu
        this.resumeButton = new UIButton("RESUME", width / 2, height / 2, 240, 60, 32);
        this.quitButton = new UIButton("QUIT", width / 2, height / 2 + 80, 240, 60, 32);
    }

    setup() {
        console.log("PlayScene setup: loading level 1");
        this.game.loadLevel(1);
    }

    update() {
        if (!this.isPaused) {
            this.game.update();
        }
    }

    display() {
        push();
        translate(-width / 2, -height / 2);
        
        if (this.isPaused) {
            this.game.renderOnly();
            this.drawPauseOverlay();
        } else {
            background(50); 
            this.game.renderOnly(); 
        }
        pop();
        
        // Draw HUD on top of everything
        this.fpsCounter.display();
    }

    drawPauseOverlay() {
        // Darken the background
        fill(0, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);

        // Header Text
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(64);
        text("PAUSED", width / 2, height / 2 - 120);

        // Display p5-based buttons
        this.resumeButton.display();
        this.quitButton.display();
    }

    handleKeyPressed() {
        if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
            this.isPaused = !this.isPaused;
        }
    }

    handleMousePressed() {
        if (this.isPaused) {
            if (this.resumeButton.isClicked()) {
                this.isPaused = false;
            } else if (this.quitButton.isClicked()) {
                sceneManager.switchScene(new MenuScene());
            }
        }
    }

    dispose() {
        console.log("PlayScene: Disposing");
    }
}