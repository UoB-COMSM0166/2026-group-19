class MenuScene extends Scene {
    constructor() {
        super();
        this.buttonText = "Start";
        this.background = new bgShader();

        this.btnWidth = 200;
        this.btnHeight = 80;

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('assets/menu_component.svg');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

        // animated Game title Setting
        this.fullTitle = "NEED VISA";
        this.visibleCount = 0;
        this.lastTypedTime = 0;
        this.typingInterval = 150; // in milliseconds
=======
>>>>>>> 15ba5cb (chore : update assets background images)
=======
=======
        this.menuImage = loadImage('UI/menu_component.svg');
>>>>>>> 32540c5 (add : menu image and draw button)
<<<<<<< HEAD
>>>>>>> c7681fd (add : menu image and draw button)
=======
=======
        this.menuImage = loadImage('assets/menu_component.svg');
>>>>>>> 2ddfd7d (chore : update assets background images)
>>>>>>> 7e11de7 (chore : update assets background images)
=======
>>>>>>> 2bc1a2a (fix : resolve merge conflicts in menu scene and sketch files)
    }

    display() {
        this.background.display();
        push();
        translate(-width / 2, -height / 2);
<<<<<<< HEAD

        // base image anomation
        let t = millis();
        this.drawAnimatedGameTitle();
        this.drawBaseImage(Math.max(Math.sin(t / 1000), 0.8) * 255);
=======
        this.drawBaseImage();
>>>>>>> 878f13c (add: background ; adjust window size)
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
<<<<<<< HEAD
            tint(255, dynamicAlpha); // second parameter is the alpha of ticket image
            image(
                this.menuImage,
                width / 2,
                height / 2 + height * 0.2,
                width * 0.65,
                newHeight * 0.65
            );
=======
            tint(255, 225); // the alpha of ticket image
            image(this.menuImage, width / 2, height / 2, width * 0.7, newHeight * 0.7);
>>>>>>> 878f13c (add: background ; adjust window size)
            pop();
        }
    }

<<<<<<< HEAD
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

<<<<<<< HEAD
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
=======
        // 4. Center the text dynamically based on the variables
        text(btnText, this.btnX + (w / 2), this.btnY + (h / 2));
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c7681fd (add : menu image and draw button)
=======
>>>>>>> 2bc1a2a (fix : resolve merge conflicts in menu scene and sketch files)
=======
    drawButton(btnText) {
        const { btnX, btnY, w, h } = this.getButtonBounds();
    
        let isHovering =
            mouseX > btnX - w/2 && mouseX < btnX + w/2 &&
            mouseY > btnY - h/2 && mouseY < btnY + h/2;
    
        if (isHovering) {
            cursor(HAND);
            fill(255, 240, 120); // highlight
        } else {
            fill(255, 255, 255, 180); // white text
        }
    
        textAlign(CENTER, CENTER);
        textSize(64);
    
        text(btnText, btnX -15, btnY + 15);
    }

    getButtonBounds() {
        return {
            btnX: width * 0.75,
            btnY: height * 0.5,
            w: this.btnWidth,
            h: this.btnHeight
        };
>>>>>>> 878f13c (add: background ; adjust window size)
    }

    checkClick() {
        const { btnX, btnY, w, h } = this.getButtonBounds();
        return mouseX > btnX - w / 2 && mouseX < btnX + w / 2 &&
            mouseY > btnY - h / 2 && mouseY < btnY + h / 2;
    }
}
