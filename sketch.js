let playerX = 20;
let playerY = 25;
/* possible values: >, v, <, ^ */ 
let playerChar = '>';
const movementSpeed = 5;
const gridColors_enum = {
    black: 0,
    white: 1,
    green: 2,
    red:   3,
}
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
const endPosX = (GRID_COLUMNS - 1);
const endPosY = Math.floor(Math.random() * (GRID_ROWS - 1));
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

/**
 * @brief checks if current position is bordering existing path
 */
function isAdjacent(posX, posY, direction) {
    /*
           0  1  2  3  4  5  6  7  8  9
        0 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        1 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        2 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        3 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        5 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        6 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        7 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        8 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        9 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    */

    /* the tile directly in front of the current tile */
    let front;
    /* the tile directly to the left/bottom of the current tile */
    let leftBottom;
    /* the tile directly to the right/top of the current tile */
    let rightTop;

    switch (direction) {
        case directions_enum.north:
            front = grid[ constrain(posY - 1, 0, GRID_ROWS - 1) ][posX];
            leftBottom = grid[posY][ constrain(posX - 1, 0, GRID_COLUMNS - 1) ];
            rightTop = grid[posY][ constrain(posX + 1, 0, GRID_COLUMNS - 1) ];
            break;
        case directions_enum.east:
            front = grid[posY][ constrain(posX + 1, 0, GRID_COLUMNS - 1) ];
            leftBottom = grid[ constrain(posY + 1, 0, GRID_ROWS - 1) ][posX];
            rightTop = grid[ constrain(posY - 1, 0, GRID_ROWS - 1) ][posX];
            break;
        case directions_enum.south:
            front = grid[ constrain(posY + 1, 0, GRID_ROWS - 1) ][posX];
            leftBottom = grid[posY][ constrain(posX - 1, 0, GRID_COLUMNS - 1) ];
            rightTop = grid[posY][ constrain(posX + 1, 0, GRID_COLUMNS - 1) ];
            break;
        case directions_enum.west:
            front = grid[posY][ constrain(posX + 1, 0, GRID_COLUMNS - 1) ];
            leftBottom = grid[ constrain(posY + 1, 0, GRID_ROWS - 1) ][posX];
            rightTop = grid[ constrain(posY - 1, 0, GRID_ROWS - 1) ][posX];
            break;
    }

    // // console.debug(`front: ${front} | leftBottom: ${leftBottom} | rightTop: ${rightTop} | direction: ${direction}`);
    return (front || leftBottom || rightTop);
}

/*
    ===== Maze Generation Algorithm =====

    1. Choose starting point on left border. Choose ending point on right border.  
    2. Using starting point as origin, choose a random direction to move in. If the space chosen does not
       border existing path, create new path tile.
    3. Repeat Step 2 until the end tile is reached.
*/
function generateMazePath() {
    /* setting start and end points */
    let mazePosX = 0;
    let mazePosY = floor(random(GRID_ROWS));
    const startingPoint = [mazePosX, mazePosY];

    // console.debug(`Start Position: (${mazePosX}, ${mazePosY})`);
    // console.debug(`Ending Position: (${endPosX}, ${endPosY})`);

    /* setting player to proper position */
    playerX = 25;
    playerY = (mazePosY * interval) + 25;

    /* travelling along the grid until the end point is reached */
    while ( (mazePosX !== endPosX) || (mazePosY !== endPosY) ) {
        let chosenDirection = random(directions);

        switch (chosenDirection) {
            case directions_enum.north:
                if ( !isAdjacent(mazePosX, constrain(mazePosY - 1, 0, GRID_ROWS - 1), chosenDirection) ) {
                    mazePosY = constrain(mazePosY - 1 , 0, GRID_ROWS - 1);
                }
                break;
            case directions_enum.east:
                if ( !isAdjacent( constrain(mazePosX + 1, 0, GRID_COLUMNS - 1), mazePosY, chosenDirection) ) {
                    mazePosX = constrain(mazePosX + 1, 0, GRID_COLUMNS - 1);
                }
                break;
            case directions_enum.south:
                if ( !isAdjacent(mazePosX, constrain(mazePosY + 1, 0, GRID_ROWS - 1), chosenDirection) ) {
                    mazePosY = constrain(mazePosY + 1 , 0, GRID_ROWS - 1);
                }
                break;
            case directions_enum.west:
                if ( !isAdjacent( constrain(mazePosX - 1, 0, GRID_COLUMNS - 1), mazePosY, chosenDirection) ) {
                    mazePosX = constrain(mazePosX - 1, 0, GRID_COLUMNS - 1);
                }
                break;
            default:
                // console.debug("invalid direction");
        }

        grid[mazePosY][mazePosX] = gridColors_enum.white;

        // console.debug(`Current Maze Position (${mazePosX}, ${mazePosY})`);
    }

    grid[ startingPoint[1] ][ startingPoint[0] ] = gridColors_enum.green;
    grid[endPosY][endPosX] = gridColors_enum.red;

    // // console.debug(grid);
}

function setup() {
    createCanvas(500, 500);
    textSize(20);

    interval = ((width + height) / 2) / 10;
    generateMazePath();

}

function drawMazePath() {
    for (let i = 0; i < GRID_ROWS; ++i) {
        for (let j = 0; j < GRID_COLUMNS; ++j) {
            
            switch (grid[j][i]) {
                case gridColors_enum.white:
                    fill(255);
                    break;
                case gridColors_enum.green:
                    fill(0, 255, 0);
                    break;
                case gridColors_enum.red:
                    fill(255, 0, 0);
                    break;
                default:
                    fill(0);
                    break;
            }
            
            rect(i * interval, j * interval, interval, interval);
        }
    }

}

function checkMazeCollision() {
    
}

function checkIfWon() {
    let currentPosX = ceil(playerX / 50) - 1;
    let currentPosY = ceil(playerY / 50) - 1;
    
    // // console.debug(`checking if won... (${playerX}, ${playerY}) -> (${currentPosX}, ${currentPosY})`);

    if ( grid[currentPosY][currentPosX] === grid[endPosY][endPosX] ) {
        alert("You have beaten the maze!! Reload to continue");
    } else {
        // // console.debug("You haven't won yet.");
    }
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

function runTests() {
    grid = [
    /*   0  1  2  3  4  5  6  7  8  9  */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 0 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 1 */
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 2 */ 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 3 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 4 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3], /* 5 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 6 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 7 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 8 */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /* 9 */
    ];

    let result = isAdjacent(1, 2, directions_enum.east);
    // console.debug(`test result: ${result}`);
}

function draw() {
    /** Initialization */
    background(0);

    /** Main Code */
    drawMazePath();
    drawPlayer();
    drawGrid();
    checkBorderCollision();
    checkIfWon();
  
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
