class SoundManager {
    constructor() {
        this.sounds = {};
        this.currentBg = null;
        this.pendingBg = null;
        this.userInteracted = false;
    }

    register(name, path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds[name] = audio;
    }

    // Call once on the first user gesture — browser blocks audio until then
    onUserInteraction() {
        if (this.userInteracted) return;
        this.userInteracted = true;
        if (this.pendingBg) {
            this._startBg(this.pendingBg);
            this.pendingBg = null;
        }
    }

    play(name) {
        const src = this.sounds[name];
        if (!src) return;
        src.cloneNode().play().catch(() => {});
    }

    playBg(name) {
        if (this.currentBg && this.currentBg._bgName === name) return;
        if (this.currentBg) {
            this.currentBg.pause();
            this.currentBg = null;
        }
        if (!this.userInteracted) {
            this.pendingBg = name;
            return;
        }
        this._startBg(name);
    }

    stopBg() {
        if (this.currentBg) {
            this.currentBg.pause();
            this.currentBg = null;
        }
        this.pendingBg = null;
    }

    _startBg(name) {
        const src = this.sounds[name];
        if (!src) return;
        const bg = src.cloneNode();
        bg.loop = true;
        bg._bgName = name;
        bg.play().catch(() => {});
        this.currentBg = bg;
    }
}

const soundManager = new SoundManager();
