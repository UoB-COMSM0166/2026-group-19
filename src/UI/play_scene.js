class PlayScene extends Scene {
    constructor(gameInstance, levelNum = 1) {
        super();
        this.game = gameInstance;
        this.levelToLoad = levelNum;
        this.playBg = loadImage("src/assets/cave_background.jpg");
        this.fpsCounter = new drawFps();
    }

    setup() {
        console.log("PlayScene setup: loading level " + this.levelToLoad);
        this.game.loadLevel(this.levelToLoad);
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
}