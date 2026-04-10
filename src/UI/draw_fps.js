class drawFps extends Scene{
    constructor(){
        super();
    }

    display(){
        // Draw the FPS counter on top of everything
        let fps = frameRate();
        let baseScale = min(width, height);
        push();
        translate(-width / 2, -height / 2);
        
        let fontSize = baseScale * 0.03;
        let margin = baseScale * 0.02;

        let fpsText = new ShadowText(
            "FPS " + Math.floor(fps),
            margin,
            margin,
            fontSize,
            255,
            color(0, 0, 0, 150),
            fontSize * 0.1
        );
        fpsText.setAlignment(LEFT, TOP);
        fpsText.display();
        pop();
    }
}