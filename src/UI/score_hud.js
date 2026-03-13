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
        
        let scoreText = new ShadowText(
            this.getScore(),
            width / 2,
            16,
            48,
            255,
            color(0, 0, 0, 150),
            4
        );
        scoreText.setAlignment(CENTER, TOP);
        scoreText.display();
        pop();
    }
}