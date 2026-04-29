/**
 * Center-anchored world position with dimensions.
 * x and y refer to the center of the entity, not the top-left corner.
 */
class Position {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Returns the AABB bounding box with a top-left origin, as expected by the
     * collision detection routines in System.collides().
     */
    getBoundingBox() {
        return {left_x: this.x - this.width / 2, top_y: this.y - this.height / 2, w: this.width, h: this.height };
    }
}

if (typeof module !== 'undefined') module.exports = { Position };