class ScrollingPlayBg {
    constructor(image, options = {}) {
        if (typeof options === "number") {
            options = { speedY: options };
        }

        this.image = image;
        this.speedX = options.speedX ?? 0;
        this.speedY = options.speedY ?? 1.2;
        this.offsetY = 0;
        this.offsetX = 0;
        this.tileScale = options.tileScale ?? 1;
        this.tileWidth = 0;
        this.tileHeight = 0;
        this.resize(width, height);
    }

    resize(canvasWidth, canvasHeight) {
        if (this.image && this.image.width > 0) {
            // Keep original image size (with optional integer scale), no stretching.
            this.tileWidth = Math.max(1, this.image.width * this.tileScale);
            this.tileHeight = Math.max(1, this.image.height * this.tileScale);
        } else {
            this.tileWidth = Math.max(1, canvasWidth);
            this.tileHeight = Math.max(1, canvasHeight);
        }

        this.offsetX = this.wrap(this.offsetX, this.tileWidth);
        this.offsetY = this.wrap(this.offsetY, this.tileHeight);
    }

    update() {
        if (this.tileWidth <= 0 || this.tileHeight <= 0) return;
        this.offsetX = this.wrap(this.offsetX + this.speedX, this.tileWidth);
        this.offsetY = this.wrap(this.offsetY + this.speedY, this.tileHeight);
    }

    draw() {
        if (!this.image || this.image.width <= 0) return;

        push();
        imageMode(CORNER);
        const startX = -this.tileWidth + this.offsetX;
        const startY = -this.tileHeight + this.offsetY;
        for (let y = startY; y < height; y += this.tileHeight) {
            for (let x = startX; x < width; x += this.tileWidth) {
                image(this.image, x, y, this.tileWidth, this.tileHeight);
            }
        }
        pop();
    }

    wrap(value, mod) {
        if (mod <= 0) return 0;
        return ((value % mod) + mod) % mod;
    }
}
