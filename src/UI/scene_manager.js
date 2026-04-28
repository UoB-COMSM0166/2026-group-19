class SceneManager {
    //in charge of deciding which screen is showing, 
    //  and of transitioning between screens.
    constructor() {
        this.currentScene = null;
    }

    switchScene(newScene) {
        if (this.currentScene && this.currentScene.dispose) {
            this.currentScene.dispose(); // Clean up old scene
        }
        this.currentScene = newScene;
        if (this.currentScene && this.currentScene.setup) {
            this.currentScene.setup();
        }
    }

    // Move to a new scene WITHOUT disposing the current one
    // (Used for overlays like Settings)
    pushScene(newScene) {
        this.currentScene = newScene;
        if (this.currentScene && this.currentScene.setup) {
            this.currentScene.setup();
        }
    }

    // Set a scene without calling its setup (useful for returning to existing scenes)
    resumeScene(existingScene) {
        this.currentScene = existingScene;
    }

    update() { 
        if (this.currentScene) this.currentScene.update(); 
    }

    display() { 
        if (this.currentScene) this.currentScene.display(); 
    }

    //placeholder for future development (no muouseclicks in game currently)
    handleMousePressed() {
        if (this.currentScene && this.currentScene.handleMousePressed) {
            this.currentScene.handleMousePressed();
        }
    }

    //handles all keyboard input, allows currentScene to decide behaviour
    handleKeyPressed() {
        if (this.currentScene && this.currentScene.handleKeyPressed) {
            this.currentScene.handleKeyPressed();
        }
    }
}