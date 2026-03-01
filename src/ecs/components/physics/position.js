class Position {
    constructor(x, y, width, height) {
        // x and y are the center point of the entity
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getBoundingBox() {
        // Helper method to convert variables to AABB collision algorithm convention
        // (left_x, top_y) is top left corner of bounding box
        return {left_x: this.x - this.width / 2, top_y: this.y - this.height / 2, w: this.width, h: this.height };
    }
}