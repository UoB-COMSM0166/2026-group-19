class IntroScene extends Scene {
    //shows a small comicstrip for each level upon first entry
    constructor(level, playScene, returnScene) {
        super();
        this.level = level;
        this.playScene = playScene;
        this.returnScene = returnScene || null;

        const names = { 1: 'cave', 2: 'ice', 3: 'moon' };
        const name = names[this.level] || 'cave';
        this.path = `image/intro_${name}.jpeg`;
        this.img = loadImage(this.path, () => {}, () => { this.img = null; });
    }

    display() {
        if (this.playScene) this.playScene.display();

        push();
        translate(-width / 2, -height / 2);

        // Dark overlay behind the intro image
        fill(0, 0, 0, 200);
        noStroke();
        rect(0, 0, width, height);

        if (this.img) {
            imageMode(CENTER);
            // Fit image to screen while preserving aspect
            const iw = this.img.width;
            const ih = this.img.height;
            const scale = min(width / iw, height / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            image(this.img, width / 2, height / 2, dw, dh);
        } else {
            // Fallback text if image missing
            new ShadowText(
                "INTRO",
                width / 2, height * 0.4,
                min(width, height) * 0.08,
                color(255, 240, 120),
                color(0),
                min(width, height) * 0.02
            ).display();
        }

        const promptSize = min(width, height) * 0.013;
        const promptText = "Press ENTER or SPACE to continue";
        const promptY = height * 0.975;

        textSize(promptSize);
        const promptW = textWidth(promptText) + promptSize * 2.2;
        const promptH = promptSize * 2.1;

        fill(0, 0, 0, 120);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, promptY, promptW, promptH, promptH / 2);

        new ShadowText(
            promptText,
            width / 2, promptY,
            promptSize, color(255), color(0), promptSize * 0.08
        ).display();

        pop();
    }

    handleKeyPressed() {
        if (keyCode === ENTER || key === ' ') {
            this._finish();
        }
    }

    handleMousePressed() {
        this._finish();
    }

    _finish() {
        if (!GameSettings.seenIntros) GameSettings.seenIntros = {};
        GameSettings.seenIntros[this.level] = true;
        if (!GameSettings.hasSeenInstructions && this.playScene) {
            GameSettings.hasSeenInstructions = true;
            sceneManager.pushScene(new InstructionsScene(this.playScene, this.returnScene));
        } else {
            if (this.returnScene) {
                sceneManager.resumeScene(this.returnScene);
            } else if (this.playScene) {
                sceneManager.resumeScene(this.playScene);
            } else {
                sceneManager.switchScene(new MenuScene());
            }
        }
    }
}
