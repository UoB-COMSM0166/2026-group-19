class SettingsScene extends Scene {
    constructor(sceneToDisplayUnderneath, sceneToReturnTo) {
        super();
        this.sceneToDisplayUnderneath = sceneToDisplayUnderneath;
        this.sceneToReturnTo = sceneToReturnTo || sceneToDisplayUnderneath;
        this.backButton = new UIButton("BACK", width / 2, height * 0.8, 200, 60, 48);
        
        // Settings state (could be moved to a global config later)
        this.volume = 100;
        this.isMuted = false;
    }

    display() {
        // Draw the play scene or menu scene first so it's visible behind the settings menu
        if (this.sceneToDisplayUnderneath) {
            this.sceneToDisplayUnderneath.display();
        }

        push();
        // Since other scenes use WEBGL translation, we need to handle it or match it
        translate(-width / 2, -height / 2);

        // Dark translucent overlay
        fill(0, 0, 0, 180); 
        noStroke();
        rect(0, 0, width, height);

        let titleSize = min(width, height) * 0.1;

        // Uses ShadowText for title
        new ShadowText("SETTINGS", width/2, height*0.2, titleSize, 255, color(0), titleSize*0.1).display();

        // Control texts with ShadowText
        new ShadowText("Volume: " + this.volume + "%", width/2, height*0.45, titleSize*0.4, 255, color(0), titleSize*0.04).display();
        new ShadowText("Mute: " + (this.isMuted ? "ON" : "OFF"), width/2, height*0.55, titleSize*0.4, 255, color(0), titleSize*0.04).display();

        // Update back button position if screen size changes
        this.backButton.x = width / 2;
        this.backButton.y = height * 0.8;
        this.backButton.fontSize = titleSize * 0.5;
        this.backButton.display();
        pop();
    }

    handleMousePressed() {
        if (this.backButton.isClicked()) {
            // Return to the scene we actually want to show (like the Pause menu)
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    dispose() {
        // Cleanup if needed
    }
}
