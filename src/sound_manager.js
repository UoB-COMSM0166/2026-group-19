class SoundManager {
    constructor() {
        this.sounds = {};
        this.currentBg = null;
        this.pendingBg = null;
        this.userInteracted = false;
        this.sfxVolume = 1.0;
        this.bgVolume = 1.0;
        this.muted = false;
    }

    setSfxVolume(percent) {
        this.sfxVolume = constrain(percent, 0, 100) / 100;
    }

    setBgVolume(percent) {
        this.bgVolume = constrain(percent, 0, 100) / 100;
        if (this.currentBg) this.currentBg.volume = this.muted ? 0 : this.bgVolume;
    }

    setMuted(muted) {
        this.muted = muted;
        if (this.currentBg) this.currentBg.volume = this.muted ? 0 : this.bgVolume;
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
        const node = src.cloneNode();
        node.volume = this.muted ? 0 : this.sfxVolume;
        node.play().catch(() => {});
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
        bg.volume = this.muted ? 0 : this.bgVolume;
        bg.play().catch(() => {});
        this.currentBg = bg;
    }
}

const soundManager = new SoundManager();
