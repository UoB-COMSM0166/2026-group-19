class Renderable {
    constructor(color, img = null) {
        this.color = color;
        this.image = img;

        // Cache fields for drawTiledImage in RenderSystem
        this._tiledCache    = null;
        this._tiledCacheW   = null;
        this._tiledCacheH   = null;
        this._tiledCacheImg = null;
    }
}