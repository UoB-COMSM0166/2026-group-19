class SettingsScene extends Scene {
    constructor(sceneToDisplayUnderneath, sceneToReturnTo) {
        super();
        this.sceneToDisplayUnderneath = sceneToDisplayUnderneath;
        this.sceneToReturnTo = sceneToReturnTo || sceneToDisplayUnderneath;
        
        this.menuIndex = 0;
        this.controlSchemes = Object.keys(defaults.controls);
        this.controlIndex = this.controlSchemes.indexOf(GameSettings.controlScheme);
        if (this.controlIndex === -1) this.controlIndex = 0;

        this.menuItems = ["CONTROLS", "VOLUME", "MUTE", "BACK"];
        
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
        let fontSize = titleSize * 0.4;
        let spacing = height * 0.12;
        let startY = height * 0.42;

        for (let i = 0; i < this.menuItems.length; i++) {
            let item = this.menuItems[i];
            let label = item;
            if (item === "CONTROLS") label = "CONTROLS [ " + this.controlSchemes[this.controlIndex].toUpperCase() + " ]";
            if (item === "VOLUME") label = "VOLUME [ " + this.volume + " ]";
            if (item === "MUTE") label = "MUTE [ " + (this.isMuted ? "ON" : "OFF") + " ]";

            let isSelected = (i === this.menuIndex);
            let displayText = label;
            let displayColor = isSelected ? color(255, 240, 120) : color(255);

            new ShadowText(
                displayText,
                width / 2,
                startY + (i * spacing),
                fontSize,
                displayColor,
                color(0),
                fontSize * 0.1
            ).display();
        }
        pop();
    }

    handleKeyPressed() {
        if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
        } else if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
        } else if (keyCode === ENTER || key === ' ') {
            this.handleSelection();
        } else if (keyCode === LEFT_ARROW || key === 'a' || key === 'A' || keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
            this.handleHorizontal(
                (keyCode === LEFT_ARROW || key === 'a' || key === 'A') ? -1 : 1
            );
        } else if (keyCode === ESCAPE) {
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    handleHorizontal(dir) {
        let item = this.menuItems[this.menuIndex];
        if (item === "CONTROLS") {
            this.controlIndex = (this.controlIndex + dir + this.controlSchemes.length) % this.controlSchemes.length;
            GameSettings.controlScheme = this.controlSchemes[this.controlIndex];
            // If we are currently in a game, update the system immediately
            if (gameInstance && gameInstance.ecs) {
                const inputSys = gameInstance.ecs.getSystem(InputSystem);
                if (inputSys) inputSys.setControlScheme(GameSettings.controlScheme);
            }
        } else if (item === "VOLUME") {
            this.volume = constrain(this.volume + dir * 5, 0, 100);
        } else if (item === "MUTE") {
            this.isMuted = !this.isMuted;
        }
    }

    handleSelection() {
        if (this.menuItems[this.menuIndex] === "BACK") {
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    handleMousePressed() {
        // Disabled
    }

    dispose() {
        // Cleanup if needed
    }
}
