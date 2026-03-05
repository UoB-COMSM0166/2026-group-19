class drawFps extends Scene{
    constructor(){
        super();
    }

    display(){
        // Draw the FPS counter on top of everything
        let fps = frameRate();
        push();
        translate(-width / 2, -height / 2);
        fill(0);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        text("FPS: " + fps.toFixed(2), 10, 20);
        pop();
    }
}