class MenuScene extends Scene {
    constructor() {
        super();
        this.buttonText = "Start";
        this.background = new bgShader();

        this.btnWidth = 200;
        this.btnHeight = 80;

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('assets/menu_component.svg');
    }

    display() {
        this.background.display();
        push();
        translate(-width / 2, -height / 2);
        this.drawBaseImage();
        this.drawButton(this.buttonText);
        pop();
    }

    drawBaseImage() {
        if (this.menuImage.width > 0) {
            let ratio = this.menuImage.height / this.menuImage.width;
            let newHeight = width * ratio;

            push();
            imageMode(CENTER);
            tint(255, 225); // the alpha of ticket image
            image(this.menuImage, width / 2, height / 2, width * 0.7, newHeight * 0.7);
            pop();
        }
    }

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
    }

    checkClick() {
        const { btnX, btnY, w, h } = this.getButtonBounds();
        return mouseX > btnX - w / 2 && mouseX < btnX + w / 2 &&
            mouseY > btnY - h / 2 && mouseY < btnY + h / 2;
    }
}
