class PauseScene extends Scene {
    constructor(playScene) {
        super();
        this.playScene = playScene;
        this.menuIndex = 0;
        this.menuItems = ["RESUME", "SETTINGS", "QUIT"];
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
        let titleSize = min(width, height) * 0.12;
        let pausedText = new ShadowText(
            "PAUSED",
            width / 2,
            height * 0.35,
            titleSize,
            255,
            color(0, 0, 0, 200),
            titleSize * 0.1
        );
        pausedText.display();

        // Menu Items
        let fontSize = titleSize * 0.5;
        let spacing = height * 0.12;
        let startY = height * 0.55;

        for (let i = 0; i < this.menuItems.length; i++) {
            let label = this.menuItems[i];
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
            this.activateSelectedOption();
        } else if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
            sceneManager.resumeScene(this.playScene);
        }
    }

    activateSelectedOption() {
        let option = this.menuItems[this.menuIndex];
        if (option === "RESUME") {
            sceneManager.resumeScene(this.playScene);
        } else if (option === "SETTINGS") {
            sceneManager.pushScene(new SettingsScene(this.playScene, this));
        } else if (option === "QUIT") {
            sceneManager.switchScene(new MenuScene());
        }
    }

    handleMousePressed() {
        // Disabled
    }
}
