class MenuScene extends Scene {
    constructor() {
        super();
        this.background = new bgShader();

        // animated Game title Setting
        this.titleLine1 = "CRATE";
        this.titleLine2 = "EXPECTATIONS";
        this.visibleCount = 0;
        this.lastTypedTime = 0;
        this.typingInterval = 150; // in milliseconds

        // Keyboard Navigation
        this.menuIndex = 0;
        this.selectedLevel = 1;
        this.maxLevel = 3;
        this.difficultyOptions = ["normal", "hard"];
        this.difficultyIndex = 0; // Default to NORMAL
        this.menuItems = ["START", "LEVEL", "DIFFICULTY", "SETTINGS"];

        // fps Display
        // this.fpsCounter = new drawFps();

        soundManager.playBg('menu_bgMusic');
    }

    display() {
        this.background.display();
        push();
        translate(-width / 2, -height / 2);

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        
        // Menu Items - Vertically Stacked
        let baseScale = min(width, height);
        let titleSize = baseScale * 0.1;
        let fontSize = baseScale * 0.05;
        let spacing = height * 0.08;
        let startY = height * 0.58;

        for (let i = 0; i < this.menuItems.length; i++) {
            let label = this.menuItems[i];
            let isSelected = (i === this.menuIndex);
            
            let displayText = label;
            if (label === "LEVEL") {
                displayText = `LEVEL [ ${this.selectedLevel} ]`;
            } else if (label === "DIFFICULTY") {
                displayText = `DIFFICULTY [ ${this.difficultyOptions[this.difficultyIndex].toUpperCase()} ]`;
            }
            
            let displayColor = isSelected ? color(255, 240, 120) : color(255);

            new ShadowText(
                displayText,
                width / 2,
                startY + (i * spacing),
                fontSize,
                displayColor,
                color(0),
                fontSize * 0.08
            ).display();
        }
        this.drawControlBanner(fontSize);
        pop();

        // Draw HUD on top of everything
        // this.fpsCounter.display();
    }

    drawControlBanner(menuFontSize) {
        const isArrows = GameSettings.moveScheme === "arrows";
        const isSpace  = GameSettings.shootScheme === "space";

        const navKeys  = isArrows ? "ARROW KEYS" : "WASD";
        const selKey   = isSpace  ? "SPACEBAR"   : "ENTER";
        const navLine  = `${navKeys} and ${selKey} to use menu`;

        const bannerY = height * 0.94;
        const labelSize = menuFontSize * 0.38;
        const bannerH = labelSize * 2.2;

        textSize(labelSize);
        const bannerW = textWidth(navLine) + labelSize * 4;

        // Background pill
        fill(0, 0, 0, 100);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, bannerY, bannerW, bannerH, bannerH / 2);

        new ShadowText(
            navLine,
            width / 2,
            bannerY,
            labelSize,
            color(200, 200, 200),
            color(0),
            labelSize * 0.08
        ).display();
    }

    dispose() {
        this.background.dispose();
    }

    drawAnimatedGameTitle() {
        let now = millis();

        if (
            this.visibleCount < (this.titleLine1.length + this.titleLine2.length) &&
            now - this.lastTypedTime > this.typingInterval
        ) {
            this.visibleCount++;
            this.lastTypedTime = now;
        }

        let baseScale = min(width, height);
        let fontSize = baseScale * 0.145;
        let titleX = width / 2;
        let titleY = height * 0.135;
        let titleGap = fontSize * 1.28;

        const firstLineCount = Math.min(this.visibleCount, this.titleLine1.length);
        const secondLineCount = Math.max(0, this.visibleCount - this.titleLine1.length);

        new ShadowText(
            this.titleLine1.substring(0, firstLineCount),
            titleX,
            titleY,
            fontSize,
            color(255, 255, 255, 250),
            color(0, 0, 0, 220),
            fontSize * 0.1
        ).display();

        new ShadowText(
            this.titleLine2.substring(0, secondLineCount),
            titleX,
            titleY + titleGap,
            fontSize,
            color(255, 255, 255, 250),
            color(0, 0, 0, 220),
            fontSize * 0.1
        ).display();
    }

    handleKeyPressed() {
        if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
            soundManager.play('upSelection');
        } else if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
            soundManager.play('downSelection');
        } else if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
            if (this.menuItems[this.menuIndex] === "LEVEL") {
                this.selectedLevel = (this.selectedLevel - 2 + this.maxLevel) % this.maxLevel + 1;
                soundManager.play('downSelection');
            } else if (this.menuItems[this.menuIndex] === "DIFFICULTY") {
                this.difficultyIndex = (this.difficultyIndex - 1 + this.difficultyOptions.length) % this.difficultyOptions.length;
                soundManager.play('downSelection');
            }
        } else if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
            if (this.menuItems[this.menuIndex] === "LEVEL") {
                this.selectedLevel = (this.selectedLevel % this.maxLevel) + 1;
                soundManager.play('upSelection');
            } else if (this.menuItems[this.menuIndex] === "DIFFICULTY") {
                this.difficultyIndex = (this.difficultyIndex + 1) % this.difficultyOptions.length;
                soundManager.play('upSelection');
            }
        } else if (keyCode === ENTER || key === ' ') {
            soundManager.play('select');
            this.activateSelectedOption();
        }
    }

    activateSelectedOption() {
        let option = this.menuItems[this.menuIndex];
        if (option === "START") {
            const level      = this.selectedLevel;
            const difficulty = this.difficultyOptions[this.difficultyIndex];
            const playScene  = new PlayScene(gameInstance, level, difficulty);
            playScene.setup();
            const lvl = playScene.levelToLoad || playScene.level;
            if (!GameSettings.seenIntros || !GameSettings.seenIntros[lvl]) {
                sceneManager.pushScene(new IntroScene(lvl, playScene));
            } else if (!GameSettings.hasSeenInstructions) {
                GameSettings.hasSeenInstructions = true;
                sceneManager.pushScene(new InstructionsScene(playScene));
            } else {
                sceneManager.resumeScene(playScene);
            }
        } else if (option === "SETTINGS") {
            sceneManager.pushScene(new SettingsScene(this));
        }
    }

    handleMousePressed() {
        // Disabled for keyboard only navigation
    }
}