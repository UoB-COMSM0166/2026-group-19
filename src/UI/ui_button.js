class UIButton {
    constructor(label, x, y, w, h, fontSize = 64) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fontSize = fontSize;
        this.isHovered = false;
        
        // Background settings
        this.hasBackground = false;
        this.bgColor = color(0, 0, 0, 100);       // Default dark transparent
        this.hoverBgColor = color(50, 50, 50, 150); // Lighter on hover
        this.cornerRadius = 5;
    }

    setBackground(bgColor, hoverBgColor, radius = 5) {
        this.hasBackground = true;
        if (bgColor) this.bgColor = bgColor;
        if (hoverBgColor) this.hoverBgColor = hoverBgColor;
        this.cornerRadius = radius;
        return this; // For chaining
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

        // Automatically tighten the hit-box to the text dimensions if not manually set high
        // This ensures clickable area matches the visual text
        push();
        textSize(this.fontSize);
        this.w = textWidth(this.label) * 1.2; // Add a small padding for comfort
        this.h = this.fontSize * 0.8;
        pop();

        push();
        // Background drawing logic
        if (this.hasBackground) {
            rectMode(CENTER);
            noStroke();
            if (this.isHovered) {
                fill(this.hoverBgColor);
            } else {
                fill(this.bgColor);
            }
            rect(this.x, this.y, this.w, this.h, this.cornerRadius);
        }

        // DEBUG: Uncomment this to see the actual clickable HIT BOX
        // noFill();
        // stroke(255, 0, 0);
        // rectMode(CENTER);
        // rect(this.x, this.y, this.w, this.h);

        if (this.isHovered) {
            cursor(HAND);
            fill(255, 240, 120); // highlight
        } else {
            fill(255, 255, 255, 255); // opaque white text
        }

        textAlign(CENTER, CENTER);
        
        // Draw shadow using a similar shadow approach since UIButton manages its own state
        let shadowOffset = this.fontSize * 0.08;
        fill(0, 0, 0, 150);
        text(this.label, this.x + shadowOffset, this.y + shadowOffset);

        if (this.isHovered) {
            cursor(HAND);
            fill(255, 240, 120); // highlight
        } else {
            fill(255, 255, 255, 255); // opaque white text
        }

        text(this.label, this.x, this.y);
        pop();
    }

    isClicked() {
        return this.isHovered;
    }
}