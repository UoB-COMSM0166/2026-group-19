class ScoreHUD {
    constructor(ecs) {
        this.ecs = ecs;
    }

    getScore() {
        const ids = this.ecs.getEntitiesWith(Player);

        // This code assumes only 1 player, change if we add multiplayer in future
        if (!ids || ids.length !== 1) return 0;
        const player = this.ecs.getComponent(ids[0], Player);
        return player.score;
    }

    getHealth() {
        const ids = this.ecs.getEntitiesWith(Player);
        if (!ids || ids.length !== 1) return 0;
        const char = this.ecs.getComponent(ids[0], Character);
        return char ? char.health : 0;
    }

    display() {
        push();
        translate(-width / 2, -height / 2);
        
        let baseScale = min(width, height);
        let fontSize = baseScale * 0.08;
        let marginTop = baseScale * 0.02;

        // Display Score
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

        // Display Health as pink asterisks
        let health = this.getHealth();
        let heartSize = baseScale * 0.04;
        let heartMargin = baseScale * 0.02;
        let heartString = "";
        for (let i = 0; i < health; i++) {
            heartString += "* ";
        }

        let healthText = new ShadowText(
            heartString.trim(),
            width - heartMargin,
            marginTop,
            heartSize,
            color(255, 100, 100),
            color(0, 0, 0, 150),
            heartSize * 0.1
        );
        healthText.setAlignment(RIGHT, TOP);
        healthText.display();

        pop();
    }
}