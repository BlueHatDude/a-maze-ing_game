let playerX = 20;
let playerY = 25;
/* possible values: >, v, <, ^ */ 
let playerChar = '>';
const movementSpeed = 5;
let grid = [
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
const GRID_ROWS = 10;
const GRID_COLUMNS = 10;
let interval;
const directions_enum = {
    north:     1,
    east:      2,
    south:     3,
    west:      4,
};

const directions = [
    directions_enum.north,     /* (x, y) -> (x, y - 1)     */
    directions_enum.east,      /* (x, y) -> (x + 1, y)     */
    directions_enum.south,     /* (x, y) -> (x, y + 1)     */
    directions_enum.west,      /* (x, y) -> (x - 1, y)     */
];


function constrainNum(num, min, max) {

    if (num < min) {
        return min;
    } else if (num > max) {
        return max;
    } else {
        return num;
    }

}

/**
 * @brief checks if current position is bordering existing path
 */
function isAdjacent(posX, posY, direction) {

}

/* ===== Maze Generation Algorithm =====

    1. Choose starting point on left border. Choose ending point on right border.  
    2. Using starting point as origin, choose a random direction to move in. If the space chosen does not
       border existing path, create new path tile.
    3. Repeat Step 2 until the end tile is reached.
*/
function generateMazePath() {
    const startingPoint = [ random(GRID_ROWS), 0 ];
    const endingPoint = [ random(GRID_ROWS),  GRID_COLUMNS - 1];
    let mazePosX = startingPoint[1];
    let mazePosY = startingPoint[0];

    while ( (mazePosX !== endingPoint[1]) && (mazePosY !== endingPoint[0]) ) {
        let chosenDirection = random(directions);

        switch (chosenDirection) {
            case directions_enum.north:
                mazePosY = constrainNum(mazePosY - 1, 0, GRID_ROWS);
                break;
            case directions_enum.east:
                mazePosX = constrainNum(mazePosX + 1, 0, GRID_COLUMNS);
                break;
            case directions_enum.south:
                mazePosY = constrainNum(mazePosY + 1, 0, GRID_ROWS);
                break;
            case directions_enum.west:
                mazePosX = constrainNum(mazePosX - 1, 0, GRID_COLUMNS);
                break;
        }
        
    }
}


function setup() {
    createCanvas(500, 500);
    textSize(20);

    interval = ((width + height) / 2) / 10;
    generateMazePath();
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
