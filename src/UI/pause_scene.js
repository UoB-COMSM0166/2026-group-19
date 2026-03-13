class PauseScene extends Scene {
    constructor(playScene) {
        super();
        this.playScene = playScene;
        this.resumeButton = new UIButton("RESUME", width / 2, height / 2, 240, 60, 32);
        this.settingsButton = new UIButton("SETTINGS", width / 2, height / 2 + 80, 240, 60, 32);
        this.quitButton = new UIButton("QUIT", width / 2, height / 2 + 160, 240, 60, 32);
    }

    display() {
        // Draw the play scene first so it's visible behind the pause menu
        this.playScene.display();

        push();
        translate(-width / 2, -height / 2);
        
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
        this.settingsButton.fontSize = titleSize * 0.5;
        this.quitButton.fontSize = titleSize * 0.5;
        
        // Display buttons - Responsive positioning
        this.resumeButton.x = width / 2;
        this.resumeButton.y = height / 2;

        this.settingsButton.x = width / 2;
        this.settingsButton.y = height / 2 + (titleSize * 0.8);

        this.quitButton.x = width / 2;
        this.quitButton.y = height / 2 + (titleSize * 1.6);

        this.resumeButton.display();
        this.settingsButton.display();
        this.quitButton.display();
        pop();
    }

    handleKeyPressed() {
        if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
            sceneManager.resumeScene(this.playScene);
        }
    }

    handleMousePressed() {
        if (this.resumeButton.isClicked()) {
            sceneManager.resumeScene(this.playScene);
        } else if (this.settingsButton.isClicked()) {
            // Display: PlayScene, Return: PauseScene (this)
            sceneManager.pushScene(new SettingsScene(this.playScene, this));
        } else if (this.quitButton.isClicked()) {
            sceneManager.switchScene(new MenuScene());
        }
    }
}
