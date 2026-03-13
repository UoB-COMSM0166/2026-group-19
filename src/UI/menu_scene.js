class MenuScene extends Scene {
    constructor() {
        super();
        this.background = new bgShader();

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('src/assets/menu_component.svg');

        // animated Game title Setting
        this.fullTitle = "CRATE BOX";
        this.titleText = new ShadowText(this.fullTitle, width / 2, height * 0.2, 0, 255, color(50, 50, 50), 5);
        this.visibleCount = 0;
        this.lastTypedTime = 0;
        this.typingInterval = 150; // in milliseconds

        // Keyboard Navigation
        this.menuIndex = 0;
        this.selectedLevel = 1;
        this.maxLevel = 3;
        this.menuItems = ["START", "LEVEL", "SETTINGS"];

        // fps Display
        this.fpsCounter = new drawFps();
    }

    display() {
        this.background.display();
        push();
        translate(-width / 2, -height / 2);

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        this.drawBaseImage(Math.max(Math.sin(t / 1000), 0.8) * 255);
        
        // Menu Items - Vertically Stacked
        let titleSize = min(width, height) * 0.1;
        let fontSize = titleSize * 0.5;
        let spacing = height * 0.1;
        let startY = height * 0.55;

        for (let i = 0; i < this.menuItems.length; i++) {
            let label = this.menuItems[i];
            let isSelected = (i === this.menuIndex);
            
            let displayText = label;
            if (label === "LEVEL") {
                displayText = `LEVEL < ${this.selectedLevel} >`;
            }
            
            if (isSelected) {
                displayText = "> " + displayText + " <";
            }
            
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

        // Draw HUD on top of everything
        this.fpsCounter.display();
    }

    dispose() {
        this.background.dispose();
    }

    // main components of the menu scene
    drawBaseImage(dynamicAlpha) {
        if (this.menuImage.width > 0) {
            let ratio = this.menuImage.height / this.menuImage.width;
            let scaledImageWidth = width * 0.65;
            let scaledImageHeight = (width * ratio) * 0.65;

            push();
            imageMode(CENTER);
            tint(255, dynamicAlpha * 0.3); // Lower alpha for background graphic
            image(
                this.menuImage,
                width / 2,
                height * 0.6,
                scaledImageWidth,
                scaledImageHeight
            );
            pop();
        }
    }

    drawAnimatedGameTitle() {
        let now = millis();

        if (
            this.visibleCount < this.fullTitle.length &&
            now - this.lastTypedTime > this.typingInterval
        ) {
            this.visibleCount++;
            this.lastTypedTime = now;
        }

        this.titleText.content = this.fullTitle.substring(0, this.visibleCount);
        this.titleText.size = width * 0.12;
        this.titleText.x = width / 2;
        this.titleText.y = height * 0.25;
        this.titleText.display();
    }

    handleKeyPressed() {
        if (keyCode === UP_ARROW) {
            this.menuIndex = (this.menuIndex - 1 + this.menuItems.length) % this.menuItems.length;
        } else if (keyCode === DOWN_ARROW) {
            this.menuIndex = (this.menuIndex + 1) % this.menuItems.length;
        } else if (keyCode === LEFT_ARROW) {
            if (this.menuItems[this.menuIndex] === "LEVEL") {
                this.selectedLevel = (this.selectedLevel - 2 + this.maxLevel) % this.maxLevel + 1;
            }
        } else if (keyCode === RIGHT_ARROW) {
            if (this.menuItems[this.menuIndex] === "LEVEL") {
                this.selectedLevel = (this.selectedLevel % this.maxLevel) + 1;
            }
        } else if (keyCode === ENTER || key === ' ') {
            this.activateSelectedOption();
        }
    }

    activateSelectedOption() {
        let option = this.menuItems[this.menuIndex];
        if (option === "START") {
            sceneManager.switchScene(new PlayScene(gameInstance, this.selectedLevel));
        } else if (option === "SETTINGS") {
            sceneManager.pushScene(new SettingsScene(this));
        }
    }

    handleMousePressed() {
        // Disabled for keyboard only navigation
    }
}