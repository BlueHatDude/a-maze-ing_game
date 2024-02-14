let playerX = 10;
let playerY = 10;
/* >, v, <, ^ */ 
let playerChar = '>';


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


function drawPlayer() {
    if ( keyIsDown(RIGHT_ARROW) ) {
        playerChar = '>';
        playerX++;
    } else if ( keyIsDown(LEFT_ARROW) ) {
        playerChar = '<';
        playerX--;
    } else if ( keyIsDown(UP_ARROW) ) {
        playerChar = '^';
        playerY--;
    } else if ( keyIsDown(DOWN_ARROW) ) {
        playerChar = 'v';
        playerY++;
    }

    text(playerChar, playerX, playerY);
}


function draw() { background(255);
    /** Main Code */
    drawGrid();
    drawPlayer();
  
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
