class UIButton {
    constructor(label, x, y, w, h, fontSize = 64) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fontSize = fontSize;
        this.isHovered = false;
    }

    update() {
        // Adjust mouse coordinates if needed based on translation
        // For MenuScene, it uses translate(-width/2, -height/2) 
        // and draws at width/2 etc. but mouseX/Y are global.
        
        this.isHovered = (
            mouseX > this.x - this.w / 2 &&
            mouseX < this.x + this.w / 2 &&
            mouseY > this.y - this.h / 2 &&
            mouseY < this.y + this.h / 2
        );
    }

    display() {
        this.update();

        push();
        if (this.isHovered) {
            cursor(HAND);
            fill(255, 240, 120); // highlight
        } else {
            fill(255, 255, 255, 180); // white text
        }

        textAlign(CENTER, CENTER);
        textSize(this.fontSize);
        text(this.label, this.x, this.y);
        pop();
    }

    isClicked() {
        return this.isHovered;
    }
}