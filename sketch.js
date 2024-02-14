function setup() {
    createCanvas(500, 500);
}


function drawGrid() {
    let interval = ((width + height) / 2) / 10;

    /* creating columns */
    for (let i = 0; i < width; i += interval) {
        line(i, 0, i, height);
        line(0, i, width, i);
    }

}


function draw() { background(255);
    /** Main Code */
    drawGrid();
  
    /** Debugging */
    // printMousePosition();
}


function printMousePosition() {
    fill(0);
    rect(10, 10, 150, 50);
    fill(255);
    textSize(20)
    text(`(${mouseX}, ${mouseY})`, 35, 40);
}
