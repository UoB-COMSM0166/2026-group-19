class PlayScene extends Scene {
    constructor(gameInstance, level, difficulty = "normal") {
        super();
        this.level = level;
        this.game = gameInstance;
        this.levelToLoad = level;
        this.difficulty = difficulty;

        this.pickupText = "";
        this.pickupTextTimer = 0;
        this.pickupDuration = 1500; // in ms

        let bgPath = "src/assets/cave_background.png";
        if (this.level === 2) {
            bgPath = "src/assets/ice_background.png";
        } else if (this.level === 3) {
            bgPath = "src/assets/space_background.png";
        }
        this.playBg = loadImage(bgPath);
        this.fpsCounter = new drawFps();
        this.scoreHUD = new ScoreHUD(this.game.ecs);

        this.spotlightGraphic = null;
    }

        showPickup(name) {
            this.pickupText = name;
            this.pickupTextTimer = millis();
        }

    setup() {
        console.log("PlayScene setup: loading level " + this.levelToLoad + " with difficulty " + this.difficulty);
        this.game.loadLevel(this.levelToLoad, this.difficulty);

        if (this.level === 1) {
            this.generateSpotlight();
        }
    }

    generateSpotlight() {
        let outerRadius = width * 0.35;
        // Make the canvas ONLY as big as the spotlight itself
        let dim = outerRadius * 2;
        this.spotlightGraphic = createGraphics(dim, dim);

        let ctx = this.spotlightGraphic.drawingContext;
        let innerRadius = width * 0.08;

        let gradient = ctx.createRadialGradient(dim / 2, dim / 2, innerRadius, dim / 2, dim / 2, outerRadius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');    // Inner
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.75)'); // Outer

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dim, dim);

        // Save the radius to draw the surrounding rectangles later
        this.spotlightRadius = outerRadius;
    }

    update() {
        this.game.update();
    }

    display() {
        push();
        translate(-width / 2, -height / 2);
        image(this.playBg, 0, 0, width, height);
        this.game.renderOnly();

        if (this.level === 1 && this.spotlightGraphic) {
            this.drawSpotlight();
        }

        const now = millis();
        if (now - this.pickupTextTimer < this.pickupDuration) {
            this.drawPickupText();
        }


        pop();

        // Draw HUD on top of everything
        // this.drawGrid();
        this.scoreHUD.display();
        this.fpsCounter.display();
    }

    drawPickupText() {
        const playerIds = this.game.ecs.getEntitiesWith(Player, Position);
        if (playerIds.length === 0) return;
        const pos = this.game.ecs.getComponent(playerIds[0], Position);
        
        let alpha = map(millis() - this.pickupTextTimer, 0, this.pickupDuration, 255, 0);
        let floatY = map(millis() - this.pickupTextTimer, 0, this.pickupDuration, 0, -40);

        new ShadowText(
            this.pickupText,
            pos.x,
            pos.y - pos.height - 20 + floatY,
            24,
            color(255, 255, 255, alpha),
            color(0, 0, 0, alpha * 0.5)
        ).display();
    }

    handleKeyPressed() {
        if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
            sceneManager.pushScene(new PauseScene(this));
        }
    }

    handleMousePressed() {
        //currently no mousecontrols ingame
    }

    dispose() {
        console.log("PlayScene: Disposing");
    }

    drawSpotlight() {
        const playerIds = this.game.ecs.getEntitiesWith(Player, Position);

        if (playerIds && playerIds.length > 0) {
            const playerPos = this.game.ecs.getComponent(playerIds[0], Position);

            push();

            // Draw the small soft gradient exactly over the player
            imageMode(CENTER);
            image(this.spotlightGraphic, playerPos.x, playerPos.y);

            // Draw 4 solid rectangles around the player to cover the rest of the screen
            fill(0, 0, 0, 191);
            noStroke();
            rectMode(CORNER);

            let cx = playerPos.x;
            let cy = playerPos.y;
            let r = this.spotlightRadius;

            // Draw Top Box
            rect(0, 0, width, cy - r);
            // Draw Bottom Box
            rect(0, cy + r, width, height - (cy + r));
            // Draw Left Box
            rect(0, cy - r, cx - r, r * 2);
            // Draw Right Box
            rect(cx + r, cy - r, width - (cx + r), r * 2);

            pop();
        }
    }

    // TEMPORARY
    drawGrid() {
        push();
        translate(-width / 2, -height / 2);
        stroke(255, 255, 255);
        strokeWeight(1);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 255, 255, 120);
        noStroke();

        const cellW = width / 32;
        const cellH = height / 18;

        for (let col = 0; col <= 31; col++) {
            const x = col * cellW;
            stroke(255, 255, 255);
            line(x, 0, x, height);
            text(col, x + cellW / 2, 6);
        }
        for (let row = 0; row <= 17; row++) {
            const y = row * cellH;
            stroke(255, 255, 255);
            line(0, y, width, y);
            text(row, 6, y + cellH / 2);
        }
        pop();
    }
}