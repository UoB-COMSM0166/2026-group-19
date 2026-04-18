class GameOverScene extends Scene {
    constructor(playScene, score = 0) {
        super();
        this.playScene = playScene;
        this.playScene.hideHUD = true;
        this.score = score;
        this.menuIndex = 0;
        this.menuItems = ["RESTART", "MENU"];
        this.readyTime = millis() + 700;
    }

    display() {
        // Draw the play scene first so it's visible behind the game over menu
        this.playScene.display();

        push();
        translate(-width / 2, -height / 2);
        
        // Dark red translucent overlay
        fill(100, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);

        // Header Text
        let titleSize = min(width, height) * 0.15;
        new ShadowText(
            "GAME OVER",
            width / 2,
            height * 0.15,
            titleSize,
            255,
            color(0, 0, 0, 200),
            titleSize * 0.1
        ).display();

        // Score
        let scoreSize = titleSize * 0.6;
        new ShadowText(
            "SCORE " + this.score,
            width / 2, height * 0.45,
            scoreSize, color(255), color(0), scoreSize * 0.1
        ).display();

        // Menu Items
        let fontSize = titleSize * 0.4;
        let spacing = height * 0.12;
        let startY = height * 0.65;

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
        if (millis() < this.readyTime) return;
        if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
        } else if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
        } else if (keyCode === ENTER || key === ' ') {
            this.activateSelectedOption();
        }
    }

    activateSelectedOption() {
        let option = this.menuItems[this.menuIndex];
        if (option === "RESTART") {
            // Restart the current level
            sceneManager.switchScene(new PlayScene(gameInstance, this.playScene.levelToLoad, this.playScene.difficulty));
        } else if (option === "MENU") {
            // Return to main menu
            sceneManager.switchScene(new MenuScene());
        }
    }

    handleMousePressed() {
        // Disabled
    }
}
