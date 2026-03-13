class ShadowText {
    /**
     * @param {string} content The text content to display
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} size Font size
     * @param {p5.Color} color Main text color
     * @param {p5.Color} shadowColor Shadow color (usually darker)
     * @param {number} offset Shadow offset in pixels
     */
    constructor(content, x, y, size = 32, color = 255, shadowColor = 0, offset = 4) {
        this.content = content;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.shadowColor = shadowColor;
        this.offset = offset;
        this.alignmentH = CENTER;
        this.alignmentV = CENTER;
    }

    setAlignment(h, v) {
        this.alignmentH = h;
        this.alignmentV = v;
        return this; // Chaining
    }

    display() {
        push();
        textSize(this.size);
        textAlign(this.alignmentH, this.alignmentV);

        // Draw shadow first
        fill(this.shadowColor);
        text(this.content, this.x + this.offset, this.y + this.offset);

        // Draw main text on top
        fill(this.color);
        text(this.content, this.x, this.y);
        pop();
    }
}
