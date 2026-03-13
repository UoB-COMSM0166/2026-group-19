class GameOverScene extends Scene {
    constructor(playScene) {
        super();
        this.playScene = playScene;
        this.restartButton = new UIButton("RESTART", width / 2, height / 2 + 50, 240, 60, 48);
        this.menuButton = new UIButton("MENU", width / 2, height / 2 + 150, 240, 60, 48);
    }

    display() {
        // Draw the play scene first so it's visible behind the game over menu
        // We still call its display() but since we're not calling update(), 
        // objects just won't move based on user input, however spawning systems
        // might still run if they are part of the game.update()
        this.playScene.display();

        push();
        translate(-width / 2, -height / 2);
        
        // Dark red translucent overlay
        fill(100, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);

        // Header Text
        fill(255);
        textAlign(CENTER, CENTER);
        let titleSize = min(width, height) * 0.15;
        textSize(titleSize);
        text("GAME OVER", width / 2, height * 0.35);

        // Display Buttons
        this.restartButton.display();
        this.menuButton.display();
        pop();
    }

    handleMousePressed() {
        if (this.restartButton.isClicked()) {
            // Restart the current level
            sceneManager.switchScene(new PlayScene(gameInstance, this.playScene.levelToLoad));
        } else if (this.menuButton.isClicked()) {
            // Return to main menu
            sceneManager.switchScene(new MenuScene());
        }
    }
}
