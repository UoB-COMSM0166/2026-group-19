class MenuScene extends Scene {
    constructor() {
        super();
        this.buttonText = "Start";

        this.btnWidth = 200;
        this.btnHeight = 50;

        // 1. Update these to match the actual position where you want the button!
        this.btnX = 570;
        this.btnY = 300;

        // Load the SVG images ONCE when the scene is created
        this.menuImage = loadImage('assets/menu_component.svg');
    }

    display() {
        this.drawBaseImage();
        this.drawButton(this.buttonText, this.btnWidth, this.btnHeight);
    }

    drawBaseImage() {
        if (this.menuImage.width > 0) {
            let ratio = this.menuImage.height / this.menuImage.width;
            let newHeight = width * ratio;
            image(this.menuImage, 0, height / 4, width, newHeight);
        }
    }

    drawButton(btnText, w, h) {
        // 2. The hover math now correctly checks 570 and 300
        let isHovering = mouseX > this.btnX && mouseX < this.btnX + w &&
            mouseY > this.btnY && mouseY < this.btnY + h;

        if (isHovering) {
            fill(100, 200, 100, 200);
            cursor(HAND);
        } else {
            fill(200, 200, 200, 200);
        }

        // 3. Use the variables instead of hardcoded numbers
        rect(this.btnX, this.btnY, w, h, 10);

        // Draw the Text
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(24);

        // 4. Center the text dynamically based on the variables
        text(btnText, this.btnX + (w / 2), this.btnY + (h / 2));
    }

    checkClick() {
        let isHovering = mouseX > this.btnX && mouseX < this.btnX + this.btnWidth &&
            mouseY > this.btnY && mouseY < this.btnY + this.btnHeight;

        if (isHovering) {
            return true;
        }
        return false;
    }
}