class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    switchScene(newScene) {
        if (this.currentScene) {
            this.currentScene.dispose(); // Clean up old scene
        }
        this.currentScene = newScene;
        if (this.currentScene && this.currentScene.setup) {
            this.currentScene.setup();
        }
    }

    update() { 
        if (this.currentScene) this.currentScene.update(); 
    }

    display() { 
        if (this.currentScene) this.currentScene.display(); 
    }

    handleMousePressed() {
        if (this.currentScene && this.currentScene.handleMousePressed) {
            this.currentScene.handleMousePressed();
        }
    }

    handleKeyPressed() {
        if (this.currentScene && this.currentScene.handleKeyPressed) {
            this.currentScene.handleKeyPressed();
        }
    }
}