class MenuScene extends Scene {
    constructor() {
        super();
        this.buttonText = "Start";
        this.background = new bgShader();

        this.btnWidth = 200;
        this.btnHeight = 80;

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('assets/menu_component.svg');

        // animated Game title Setting
        this.fullTitle = "NEED VISA";
        this.visibleCount = 0;
        this.lastTypedTime = 0;
        this.typingInterval = 150; // in milliseconds
    }

    display() {
        this.background.display();
        push();
        translate(-width / 2, -height / 2);

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        this.drawBaseImage(Math.max(Math.sin(t / 1000), 0.8) * 255);
        this.drawButton(this.buttonText);
        pop();
    }

    dispose() {
        this.background.dispose();
    }

    // main components of the menu scene
    drawBaseImage(dynamicAlpha) {
        if (this.menuImage.width > 0) {
            let ratio = this.menuImage.height / this.menuImage.width;
            let newHeight = width * ratio;

            push();
            imageMode(CENTER);
            tint(255, dynamicAlpha); // second parameter is the alpha of ticket image
            image(
                this.menuImage,
                width / 2,
                height / 2 + height * 0.2,
                width * 0.65,
                newHeight * 0.65
            );
            pop();
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
        textSize(240);
        fill(255);
        text(currentText, width / 2, height / 4);
        pop();
    }

    drawButton(btnText) {
        const { btnX, btnY, w, h } = this.getButtonBounds();

        let isHovering =
            mouseX > btnX - w / 2 && mouseX < btnX + w / 2 &&
            mouseY > btnY - h / 2 && mouseY < btnY + h / 2;

        if (isHovering) {
            cursor(HAND);
            fill(255, 240, 120); // highlight
        } else {
            fill(255, 255, 255, 180); // white text
        }

        textAlign(CENTER, CENTER);
        textSize(64);

        text(btnText, btnX, btnY);
    }

    // -- helper function --
    getButtonBounds() {
        return {
            btnX: width * 0.75 - 55,
            btnY: height * 0.5 + this.menuImage.height * 0.425,
            w: this.btnWidth,
            h: this.btnHeight
        };
    }

    // -- game state function --
    checkClick() {
        const { btnX, btnY, w, h } = this.getButtonBounds();
        return mouseX > btnX - w / 2 && mouseX < btnX + w / 2 &&
            mouseY > btnY - h / 2 && mouseY < btnY + h / 2;
    }
}