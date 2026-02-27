class Collider {
    constructor(width, height, immovable) {
        this.width = width;
        this.height = height;
    }

    getBoundingBox(pos) {
        // (x, y) is top left corner of bounding box
        return {left_x: pos.x - this.width / 2, top_y: pos.y - this.height / 2, w: this.width, h: this.height };
    }
}