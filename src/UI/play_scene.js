class PlayScene extends Scene {
    constructor(gameInstance, level, difficulty = "NORMAL") {
        super();
        this.level = level;
        this.game = gameInstance;
        this.levelToLoad = level;
        this.difficulty = difficulty;

        let bgPath = "src/assets/cave_background.png";
        if (this.level === 2) {
            bgPath = "src/assets/ice_background.png";
        } else if (this.level === 3) {
            bgPath = "src/assets/space_background.png";
        }
        this.playBg = loadImage(bgPath);
        this.fpsCounter = new drawFps();
        this.scoreHUD = new ScoreHUD(this.game.ecs);
    }

    setup() {
        console.log("PlayScene setup: loading level " + this.levelToLoad + " with difficulty " + this.difficulty);
        this.game.loadLevel(this.levelToLoad, this.difficulty);
    }

    update() {
        this.game.update();
    }

    display() {
        push();
        translate(-width / 2, -height / 2);
        image(this.playBg, 0, 0, width, height);
        this.game.renderOnly(); 
        
        pop();
        
        // Draw HUD on top of everything
        // this.drawGrid();
        this.scoreHUD.display();
        this.fpsCounter.display();
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

        const cellW = width  / 32;
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