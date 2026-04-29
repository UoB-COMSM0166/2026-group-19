/**
 * Marks an entity as drawable. RenderSystem uses image when set, falls back to
 * a filled rectangle using color, or skips drawing if neither is present.
 */
class Renderable {
    constructor(color, img = null) {
        this.color = color;
        this.image = img;
    }
}