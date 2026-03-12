class MenuScene extends Scene {
    constructor() {
        super();
        this.background = new bgShader();

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('src/assets/menu_component.svg');

        // animated Game title Setting
        this.fullTitle = "CRATE BOX";
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
    }

    display() {
        // this.background.display();   //very heavy cloud generation currently commented out
        push();
        translate(-width / 2, -height / 2);

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        this.drawBaseImage(Math.max(Math.sin(t / 1000), 0.8) * 255);
        
        // Use our new button class
        this.startButton.display();
        pop();
    }

    dispose() {
        // this.background.dispose();
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
            
            // Scale font and hit-box dimensions relative to width
            this.startButton.w = scaledImageWidth * 0.2; 
            this.startButton.h = scaledImageHeight * 0.15;
            this.startButton.fontSize = width * 0.045; 
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

        let currentText = this.fullTitle.substring(0, this.visibleCount);

        push();
        textAlign(CENTER, CENTER);
        // Scale title dynamically: approx 15% of width
        let dynamicFontSize = width * 0.15;
        textSize(dynamicFontSize);
        fill(255);
        text(currentText, width / 2, height * 0.2); // Position at 20% height
        pop();
    }

    // -- game state function --
    handleMousePressed() {
        if (this.startButton.isClicked()) {
            sceneManager.switchScene(new PlayScene(gameInstance));
        }
    }
}