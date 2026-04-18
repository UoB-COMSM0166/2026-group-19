class InstructionsScene extends Scene {
    constructor(playScene, returnScene) {
        super();
        this.playScene   = playScene;
        this.returnScene = returnScene || null;
    }

    display() {
        this.playScene.display();

        push();
        translate(-width / 2, -height / 2);

        fill(0, 0, 0, 200);
        noStroke();
        rect(0, 0, width, height);

        const baseScale = min(width, height);
        const titleSize = baseScale * 0.08;
        const bodySize  = baseScale * 0.038;
        const lineGap   = bodySize * 2.2;

        const isArrows = GameSettings.moveScheme === "arrows";
        const isSpace  = GameSettings.shootScheme === "space";

        const moveKeys = isArrows ? "LEFT and RIGHT ARROWS" : "A and D";
        const jumpKey  = isArrows ? "UP ARROW"              : "W";
        const shootKey = isSpace  ? "SPACEBAR"              : "ENTER";
        const pauseKey = "ESCAPE";

        new ShadowText(
            "HOW TO PLAY",
            width / 2, height * 0.18,
            titleSize, color(255, 240, 120), color(0), titleSize * 0.08
        ).display();

        const controlLines = [
            { action: "Move",  key: moveKeys },
            { action: "Jump",  key: jumpKey  },
            { action: "Shoot", key: shootKey },
            { action: "Pause", key: pauseKey },
        ];

        const leftX    = width * 0.20;
        const rightX   = width * 0.80;
        const blockTop = height * 0.35;

        for (let i = 0; i < controlLines.length; i++) {
            const y = blockTop + i * lineGap;
            new ShadowText(controlLines[i].action, leftX,  y, bodySize, color(255), color(0), bodySize * 0.08)
                .setAlignment(LEFT, CENTER).display();
            new ShadowText(controlLines[i].key,    rightX, y, bodySize, color(255), color(0), bodySize * 0.08)
                .setAlignment(RIGHT, CENTER).display();
        }

        const objectiveY = blockTop + controlLines.length * lineGap + lineGap * 0.5;
        new ShadowText(
            "Collect weapon crates to increase your score",
            width / 2, objectiveY,
            bodySize, color(255, 240, 120), color(0), bodySize * 0.08
        ).display();

        const promptSize = baseScale * 0.032;
        const promptY    = objectiveY + lineGap * 1.4;
        const promptText = isSpace
            ? "Press SPACEBAR or ENTER to continue"
            : "Press ENTER or SPACEBAR to continue";

        new ShadowText(
            promptText,
            width / 2, promptY,
            promptSize, color(255), color(0), promptSize * 0.08
        ).display();

        pop();
    }

    handleKeyPressed() {
        if (keyCode === ENTER || key === ' ') {
            if (this.playScene.startControlsHint) this.playScene.startControlsHint();
            sceneManager.resumeScene(this.playScene);
        } else if (keyCode === ESCAPE) {
            if (this.returnScene) {
                sceneManager.resumeScene(this.returnScene);
            } else {
                sceneManager.switchScene(new MenuScene());
            }
        }
    }

    handleMousePressed() {}
    dispose() {}
}
