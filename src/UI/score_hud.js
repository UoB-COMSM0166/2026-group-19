class ScoreHUD {
    constructor(ecs) {
        this.ecs = ecs;
    }

    getScore() {
        const ids = this.ecs.getEntitiesWith(Player);

        // This code assumes only 1 player, change if we add players in future
        if (!ids || ids.length !== 1) return;
        const player = this.ecs.getComponent(ids[0], Player);
        return player.score;
    }

    display() {
        push();
        translate(-width / 2, -height / 2);
        
        let baseScale = min(width, height);
        let fontSize = baseScale * 0.08;
        let marginTop = baseScale * 0.02;

        let scoreText = new ShadowText(
            this.getScore(),
            width / 2,
            marginTop,
            fontSize,
            255,
            color(0, 0, 0, 150),
            fontSize * 0.1
        );
        scoreText.setAlignment(CENTER, TOP);
        scoreText.display();
        pop();
    }
}