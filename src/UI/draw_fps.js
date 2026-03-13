class drawFps extends Scene{
    constructor(){
        super();
    }

    display(){
        // Draw the FPS counter on top of everything
        let fps = frameRate();
        push();
        translate(-width / 2, -height / 2);
        
        let fpsText = new ShadowText(
            "FPS " + Math.floor(fps),
            10,
            20,
            24,
            255,
            color(0, 0, 0, 150),
            2
        );
        fpsText.setAlignment(LEFT, TOP);
        fpsText.display();
        pop();
    }
}