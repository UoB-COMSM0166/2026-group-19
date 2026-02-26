class Collider {
    constructor(width, height, immovable) {
        this.width = width;
        this.height = height;
        this.immovable = immovable;
    }

    getBoundingBox(pos) {
        // (x, y) is top left corner of bounding box
        return {x: pos.x - this.width / 2, y: pos.y - this.height / 2, w: this.width, h: this.height };
    }
}