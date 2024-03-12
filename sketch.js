let playerX = 20;
let playerY = 25;
/* possible values: >, v, <, ^ */ 
let playerChar = '>';
const movementSpeed = 5;
let grid = [];
const GRID_ROWS = 10;
const GRID_COLUMNS = 10;
let interval;


function boundByMax(num, max) {
    return (num > max) ? max : num ;
}


function boundByMin(num, min) {
    return (num < min) ? min : num ; 
}


function generateMazePath() {

    const DIRECTIONS = ["NORTH",     /* (x, y) -> (x, y - 1)     */
                        "NORTHEAST", /* (x, y) -> (x + 1, y - 1) */
                        "EAST",      /* (x, y) -> (x + 1, y)     */
                        "SOUTHEAST", /* (x, y) -> (x + 1, y + 1) */
                        "SOUTH",     /* (x, y) -> (x, y + 1)     */
                        "SOUTHWEST", /* (x, y) -> (x - 1, y + 1) */
                        "WEST",      /* (x, y) -> (x - 1, y)     */
                        "NORTHWEST"  /* (x, y) -> (x - 1, y - 1)  */
    ];

    /** Maze Generating Algorithm (not good) */
    /*
        1. Start from a random point on the left side of the maze
        2. Generate a valid path starting from the left side of the
            maze until the other side is reached
    */

    let mazePosX = 0;
    let mazePosY = 0;
    console.log(`Maze Positions: (${mazePosX}, ${mazePosY})`);

    mazePosY = random(10);

    while (mazePosX != (GRID_COLUMNS - 1)) {
        let direction = random(DIRECTIONS);

        if (direction == "NORTH") {
            mazePosY = boundByMin(mazePosY - 1, 0);
        } else if (direction == "NORTHEAST") {
            mazePosY = boundByMin(mazePosY - 1, 0);
            mazePosX = boundByMax(mazePosX + 1, GRID_COLUMNS);
        } else if (direction == "EAST") {
            mazePosX = boundByMax(mazePosX + 1, GRID_COLUMNS);
        } else if (direction == "SOUTHEAST") {
            mazePosX = boundByMax(mazePosX + 1, GRID_COLUMNS);
            mazePosY = boundByMax(mazePosY + 1, GRID_ROWS);
        } else if (direction == "SOUTH") {
            mazePosY = boundByMax(mazePosY + 1, GRID_COLUMNS);
        } else if (direction == "SOUTHWEST") {
            mazePosY = boundByMax(mazePosY + 1, GRID_ROWS);
            mazePosX = boundByMin(mazePosX - 1, 0);
        } else if (direction == "WEST") {
            mazePosX = boundByMin(mazePosX - 1, 0);
        } else if (direction == "NORTHWEST") {
            mazePosX = boundByMin(mazePosX - 1, 0);
            mazePosY = boundByMin(mazePosY - 1, 0);
        }
    
        grid[mazePosX][mazePosY] = 1;
    }

    // playerY = mazePosY * (interval - 10);
    // console.log(`playerY position set to ${playerX}`);
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
    

}


function setup() {
    createCanvas(500, 500);
    textSize(20);

    initializeGrid();
    generateMazePath();
    interval = ((width + height) / 2) / 10;
}


function drawMazePath() {
    fill(255);

    for (let i = 0; i < GRID_ROWS; ++i) {
        for (let j = 0; j < GRID_COLUMNS; ++j) {
            if (grid[i][j] == 1) {
            
                rect(i * interval, j * interval, interval, interval);
            }
        }
    }

}


function checkMazeCollision() {

}


function drawGrid() {
    stroke(150);

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

    fill(0, 100, 0);
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
    /** Initialization */
    background(0);

    /** Main Code */
    drawMazePath();
    drawPlayer();
    drawGrid();
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
