let playerX = 20;
let playerY = 25;
/* >, v, <, ^ */ 
let playerChar = '>';
const movementSpeed = 5;
let grid = [];


function setup() {
    createCanvas(500, 500);
    textSize(20);
}


function initializeGrid() {
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const ROWS = 10;
    const COLUMNS = 20;
    const DIRECTIONS = ["NORTH", "NORTHEAST", "EAST", "SOUTHEAST",
                        "SOUTH", "SOUTHWEST", "WEST", "NORTHWEST"];

    /** Maze Generating Algorithm (not good) */
    /*
        1. Start from a random point on the left side of the maze
        2. Generate a valid path starting from the left side of the
            maze until the other side is reached
    */

    const startingPoint = random(10);
    

}


function drawMazePath() {

}


function checkMazeCollision() {

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
        playerX += movementSpeed;
    } else if ( keyIsDown(LEFT_ARROW) ) {
        playerChar = '<';
        playerX -= movementSpeed;
    } else if ( keyIsDown(UP_ARROW) ) {
        playerChar = '^';
        playerY -= movementSpeed;
    } else if ( keyIsDown(DOWN_ARROW) ) {
        playerChar = 'v';
        playerY += movementSpeed;
    }

    text(playerChar, playerX, playerY);
}


function checkBorderCollision() {
    
    if (playerX <= 0) {
        playerX = 5;
    } else if (playerX >= width) {
        playerX = width - 20;
    }

    if (playerY <= 0) {
        playerY = 20;
    } else if (playerY >= height) {
        playerY = height - 20;
    }

}


function draw() {
    background(255);
    
    /** Main Code */
    drawGrid();
    drawPlayer();
    checkBorderCollision();
  
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
