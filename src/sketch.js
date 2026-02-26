const MIN_SIZE = 5;
const MAX_SIZE = 200;

const palette = [
  { name: "Black",   r: 0,   g: 0,   b: 0   },
  { name: "White",   r: 255, g: 255, b: 255 },
  { name: "Red",     r: 255, g: 0,   b: 0   },
  { name: "Green",   r: 0,   g: 255, b: 0   },
  { name: "Blue",    r: 0,   g: 0,   b: 255 },
  { name: "Yellow",  r: 255, g: 255, b: 0   },
  { name: "Cyan",    r: 0,   g: 255, b: 255 },
  { name: "Magenta", r: 255, g: 0,   b: 255 },
  { name: "Orange",  r: 255, g: 165, b: 0   },
  { name: "Gray",    r: 128, g: 128, b: 128 }
];


const drawMode = {
  DRAW: 0,
  ERASE: 1
}

const brush = {
  size: 10,
  colour: {
    r: 0,
    g: 0,
    b: 0
  }
};

let mode;
let currentColorIndex = 0;

function setup() {
  // Canvas init
  createCanvas(1000, 800);
  background(230);
  
  // Brush init
  applyBrush();
  
  // Draw mode init
  mode = drawMode.DRAW;
}

function draw() {
  // Draw
  if (mode === drawMode.DRAW && mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  
  // Erase
  if (mode === drawMode.ERASE && mouseIsPressed) {
    stroke(230);
    line(pmouseX, pmouseY, mouseX, mouseY);
    applyBrush();
  }
  
  drawHUD();
}

function eraseAll() {
  background(230);
}

function applyBrush() {
  stroke(brush.colour.r, brush.colour.g, brush.colour.b);
  strokeWeight(brush.size);
}

function setBrushColour(r, g, b) {
  brush.colour.r = r;
  brush.colour.g = g;
  brush.colour.b = b;
  applyBrush();
}

function setBrushSize(size) {
  brush.size = size;
  applyBrush();
}

function updateColour() {
  currentColorIndex =
    (currentColorIndex + 1) % palette.length;

  const c = palette[currentColorIndex];
  setBrushColour(c.r, c.g, c.b);
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    mode = drawMode.ERASE;
  }
  
  if (key === 'c' || key === 'C') {
    updateColour();
  }
  
  if (key === 'a' || key === 'A') {
    eraseAll();
  }
}

function keyReleased() {
  if (key === 'e' || key === 'E') {
    mode = drawMode.DRAW;
  }
}

function mouseWheel(event) {
  ds = event.delta;
  brush.size -= ds * 0.01;
  brush.size = constrain(brush.size, MIN_SIZE, MAX_SIZE);
  applyBrush();
  
  return false;
}

function drawHUD() {
  push(); // isolate HUD state

  // Clear HUD area only
  noStroke();
  fill(230);
  rect(0, 0, 170, 140);
  
  
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);

  const c = palette[currentColorIndex];

  text(`Brush size: ${brush.size.toFixed(1)}`, 10, 10);
  text(`Colour: ${c.name}`, 10, 30);
  text(`Mode: ${mode === drawMode.DRAW ? "DRAW" : "ERASE"}`, 10, 50);
  text(`Erase: 'e'`, 10, 70);
  text(`Change Colour: 'c'`, 10, 90);
  text(`Erase All: 'a'`, 10, 110);

  pop(); // restore drawing state
}