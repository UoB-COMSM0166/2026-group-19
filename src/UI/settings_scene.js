class SettingsScene extends Scene {
    constructor(sceneToDisplayUnderneath, sceneToReturnTo) {
        super();
        this.sceneToDisplayUnderneath = sceneToDisplayUnderneath;
        this.sceneToReturnTo = sceneToReturnTo || sceneToDisplayUnderneath;
        
        this.menuIndex = 0;
        this.menuItems = ["VOLUME", "MUTE", "BACK"];
        
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
        let startY = height * 0.45;

        for (let i = 0; i < this.menuItems.length; i++) {
            let item = this.menuItems[i];
            let label = item;
            if (item === "VOLUME") label = "VOLUME " + this.volume + "%";
            if (item === "MUTE") label = "MUTE " + (this.isMuted ? "ON" : "OFF");

            let isSelected = (i === this.menuIndex);
            let displayText = isSelected ? "> " + label + " <" : label;
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
        if (keyCode === UP_ARROW) {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
        } else if (keyCode === DOWN_ARROW) {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
        } else if (keyCode === ENTER || key === ' ') {
            this.handleSelection();
        } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            this.handleHorizontal(keyCode === LEFT_ARROW ? -1 : 1);
        } else if (keyCode === ESCAPE) {
            sceneManager.resumeScene(this.sceneToReturnTo);
        }
    }

    handleHorizontal(dir) {
        let item = this.menuItems[this.menuIndex];
        if (item === "VOLUME") {
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
