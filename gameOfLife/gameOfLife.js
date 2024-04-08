// Create a 2D array to represent the grid
let grid = [];

// Function to create the grid
function createGrid() {
    const page = document.getElementById("page");
    for (let i = 0; i < 30; i++) {
        grid[i] = [];
        for (let j = 0; j < 30; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            page.appendChild(cell);
            grid[i][j] = false;
        }
    }
}

// Function to handle cell click
function toggleCell(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (!grid[row][col]) {
        cell.classList.add('active');
    } else {
        cell.classList.remove('active');
    }
    grid[row][col] = !grid[row][col];
}

// Function to apply rules and update grid
function updateGrid() {
    const newGrid = [];
    for (let i = 0; i < 30; i++) {
        newGrid[i] = [];
        for (let j = 0; j < 30; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j]) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[i][j] = neighbors === 3;
            }
        }
    }
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            grid[i][j] = newGrid[i][j];
            const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            if (grid[i][j]) {
                cell.classList.add('active');
            } else {
                cell.classList.remove('active');
            }
        }
    }
}

// Function to count live neighbors of a cell
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const r = row + i;
            const c = col + j;
            if (r >= 0 && r < 30 && c >= 0 && c < 30 && !(i === 0 && j === 0)) {
                count += grid[r][c] ? 1 : 0;
            }
        }
    }
    return count;
}

// Function to start the simulation
let intervalId;
function startSimulation() {
    intervalId = setInterval(updateGrid, 100);
}

// Function to stop the simulation
function stopSimulation() {
    clearInterval(intervalId);
}

// Function to reset the grid
function resetGrid() {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            grid[i][j] = false;
            const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            cell.classList.remove('active');
        }
    }
}

// Event 
document.getElementById('startBtn').addEventListener('click', startSimulation);
document.getElementById('stopBtn').addEventListener('click', stopSimulation);
document.getElementById('resetBtn').addEventListener('click', resetGrid);

// Call the function to create the grid
createGrid();

// Add event  to the container for cell clicks
document.getElementById('page').addEventListener('click', toggleCell);
