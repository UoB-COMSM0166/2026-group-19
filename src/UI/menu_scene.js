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

        // Create buttons
        this.startButton = new UIButton(
            "Start", 
            width * 0.75 - 55, 
            height * 0.5 + 440 * 0.425, // Using approx base height for component
            200, 
            80, 
            64
        );

        // Level Selection
        this.selectedLevel = 1;
        this.maxLevel = 3;
        this.leftArrow = new UIButton("<", 0, 0, 50, 50, 48);
        this.rightArrow = new UIButton(">", 0, 0, 50, 50, 48);

        // Settings Button
        this.settingsButton = new UIButton("Settings", 0, 0, 200, 60, 32);

        // fps Display
        this.fpsCounter = new drawFps();
    }

    display() {
        this.background.display();   //very heavy cloud generation currently commented out
        push();
        translate(-width / 2, -height / 2);

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        this.drawBaseImage(Math.max(Math.sin(t / 1000), 0.8) * 255);
        
        // Use our new button class
        this.startButton.display();
        this.settingsButton.display();

        // Display Level Selector
        this.leftArrow.display();
        this.rightArrow.display();
        pop();

        // Draw HUD on top of everything (already deals with WEBGL translation)
        this.fpsCounter.display();
    }

    dispose() {
        this.background.dispose();
    }

    // main components of the menu scene
    drawBaseImage(dynamicAlpha) {
        if (this.menuImage.width > 0) {
            let ratio = this.menuImage.height / this.menuImage.width;
            let newHeight = width * ratio;

            // Calculate the exact scaled dimensions used for the image
            let scaledImageWidth = width * 0.65;
            let scaledImageHeight = (width * ratio) * 0.65;

            push();
            imageMode(CENTER);
            tint(255, dynamicAlpha); 
            image(
                this.menuImage,
                width / 2,
                height * 0.7, // Centered at 70% height
                scaledImageWidth,
                scaledImageHeight
            );
            pop();

            // Refresh button position: use the SAME center as the image (width/2, height*0.7)
            // Offset horizontally by a fixed factor of the scaled image's width
            this.startButton.x = width / 2 + (scaledImageWidth * 0.33); 
            this.startButton.y = height * 0.7 + (scaledImageHeight * 0.06); 
            this.startButton.fontSize = width * 0.045; 

            // Refresh settings button position: slightly below start button
            this.settingsButton.x = this.startButton.x + (scaledImageWidth * 0.003);
            this.settingsButton.y = this.startButton.y + (scaledImageHeight * 0.175);
            this.settingsButton.fontSize = this.startButton.fontSize * 0.6;

            // Position and scale the Level Selector
            let labelX = width / 2 - (scaledImageWidth * 0.185);
            let labelY = height * 0.7 - (scaledImageHeight * 0.04);

            let levelText = new ShadowText(
                "Level " + this.selectedLevel,
                labelX,
                labelY,
                this.startButton.fontSize,
                255,
                color(50, 50, 50, 150),
                3
            );
            levelText.display();

            this.leftArrow.x = width / 2 + (scaledImageWidth * 0.044);
            this.leftArrow.y = height * 0.7 - (scaledImageHeight * 0.012);
            this.leftArrow.fontSize = this.startButton.fontSize;

            this.rightArrow.x = width / 2 + (scaledImageWidth * 0.095);
            this.rightArrow.y = height * 0.7 - (scaledImageHeight * 0.012);
            this.rightArrow.fontSize = this.startButton.fontSize;
        }
    }

    drawAnimatedGameTitle() {
        let now = millis();

        // control tying speed
        if (
            this.visibleCount < this.fullTitle.length &&
            now - this.lastTypedTime > this.typingInterval
        ) {
            this.visibleCount++;
            this.lastTypedTime = now;
        }

        this.titleText.content = this.fullTitle.substring(0, this.visibleCount);
        this.titleText.size = width * 0.10;
        this.titleText.x = width / 2;
        this.titleText.y = height * 0.2;
        this.titleText.display();
    }

    // -- game state function --
    handleMousePressed() {
        if (this.startButton.isClicked()) {
            sceneManager.switchScene(new PlayScene(gameInstance, this.selectedLevel));
        } else if (this.settingsButton.isClicked()) {
            sceneManager.pushScene(new SettingsScene(this));
        } else if (this.leftArrow.isClicked()) {
            this.selectedLevel--;
            if (this.selectedLevel < 1) this.selectedLevel = this.maxLevel;
        } else if (this.rightArrow.isClicked()) {
            this.selectedLevel++;
            if (this.selectedLevel > this.maxLevel) this.selectedLevel = 1;
        }
    }
}