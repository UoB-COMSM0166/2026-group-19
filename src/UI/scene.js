class Scene {
    //sets out functions that actual game scenes should implement
    setup() {
        // Optional: Initialize scene state
    }
    update() {
        // Optional: Update scene logic
    }
    display() {
        throw new Error("display() must be implemented by subclass");
    }
    dispose() {
        // Optional: Clean up resources
    }
    handleMousePressed() {
        // Optional: Handle mouse clicks
    }
    handleKeyPressed() {
        // Optional: Handle key presses
    }
}