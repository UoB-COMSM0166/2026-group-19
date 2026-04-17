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

        const scheme   = GameSettings.controlScheme;
        const isArrows = scheme === "arrows";

        const moveKeys = isArrows ? "LEFT and RIGHT ARROW" : "A and D";
        const jumpKey  = isArrows ? "UP ARROW"             : "W";
        const shootKey = isArrows ? "SPACEBAR"             : "ENTER";
        const pauseKey = "ESCAPE";

        new ShadowText(
            "HOW TO PLAY",
            width / 2, height * 0.18,
            titleSize, color(255, 240, 120), color(0), titleSize * 0.08
        ).display();

        const lines = [
            `Move   ${moveKeys}`,
            `Jump   ${jumpKey}`,
            `Shoot  ${shootKey}`,
            `Pause  ${pauseKey}`,
            "",
            "Collect weapon crates to increase your score",
        ];

        const blockH   = lines.length * lineGap;
        const blockTop = height * 0.35;

        for (let i = 0; i < lines.length; i++) {
            const isObjective = lines[i].startsWith("Collect");
            new ShadowText(
                lines[i],
                width / 2,
                blockTop + i * lineGap,
                bodySize,
                isObjective ? color(255, 240, 120) : color(255),
                color(0),
                bodySize * 0.08
            ).display();
        }

        const promptSize = baseScale * 0.032;
        const promptY    = blockTop + blockH + lineGap * 1.4;
        const promptText = isArrows
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
