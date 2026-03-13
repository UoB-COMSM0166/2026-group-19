class SettingsScene extends Scene {
    constructor(previousScene) {
        super();
        this.previousScene = previousScene;
        this.backButton = new UIButton("BACK", width / 2, height * 0.8, 200, 60, 48);
        
        // Settings state (could be moved to a global config later)
        this.volume = 100;
        this.isMuted = false;
    }

    display() {
        // Dark background for settings
        background(30); 
        
        push();
        // Since other scenes use WEBGL translation, we need to handle it or match it
        // The SceneManager usually handles the setup/display calls
        translate(-width / 2, -height / 2);

        fill(255);
        textAlign(CENTER, CENTER);
        let titleSize = min(width, height) * 0.1;
        textSize(titleSize);
        text("SETTINGS", width / 2, height * 0.2);

        // Placeholder for settings controls
        textSize(titleSize * 0.4);
        text("Volume: " + this.volume + "%", width / 2, height * 0.45);
        text("Mute: " + (this.isMuted ? "ON" : "OFF"), width / 2, height * 0.55);

        // Update back button position if screen size changes
        this.backButton.x = width / 2;
        this.backButton.y = height * 0.8;
        this.backButton.fontSize = titleSize * 0.5;
        this.backButton.display();
        pop();
    }

    handleMousePressed() {
        if (this.backButton.isClicked()) {
            // Return to the scene we came from without re-running setup
            sceneManager.resumeScene(this.previousScene);
        }
    }

    dispose() {
        // Cleanup if needed
    }
}
