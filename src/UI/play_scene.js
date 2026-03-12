class PlayScene extends Scene {
    constructor(gameInstance, levelNum = 1) {
        super();
        this.game = gameInstance;
        this.levelToLoad = levelNum;
        this.playBg = null;
        this.isPaused = false;
        this.fpsCounter = new drawFps();
        
        // Buttons for the in-game Pause Menu
        this.resumeButton = new UIButton("RESUME", width / 2, height / 2, 240, 60, 32);
        this.quitButton = new UIButton("QUIT", width / 2, height / 2 + 80, 240, 60, 32);
    }

    setup() {
        console.log("PlayScene setup: loading level " + this.levelToLoad);
        this.game.loadLevel(this.levelToLoad);
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

        // Header Text - Responsive sizing
        fill(255);
        textAlign(CENTER, CENTER);
        let titleSize = min(width, height) * 0.12;
        textSize(titleSize);
        text("PAUSED", width / 2, height * 0.35);

        // Update button parameters
        this.resumeButton.fontSize = titleSize * 0.5;
        this.quitButton.fontSize = titleSize * 0.5;
        
        // Display p5-based buttons - Responsive positioning and scaling
        this.resumeButton.x = width / 2;
        this.resumeButton.y = height / 2;

        this.quitButton.x = width / 2;
        this.quitButton.y = height / 2 + (titleSize * 0.8);

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