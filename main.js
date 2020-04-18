// import { keys } from './keys.js';

let updateIntervalMs = 50;
let boardWidth = 40;
let boardHeight = 40;

/*Conway's Game of Life.
 *
 * A simple Javascript implementation by ankr.
 *
 * @author http://ankr.dk
 */
let canvas = document.getElementById('c').getContext('2d');
let cells = [];
let player = {x: 16, y: 8};

/**
 * Initialize game.
 *
 * Will place a Gosper glider gun in the world and start simulation.
 */
function init() {
  for (let i = 0; i < boardWidth; i++) {
    cells[i] = [];
    for (let j = 0; j < boardHeight; j++) {
      cells[i][j] = new Cell();
    }
  }

  // Prefilled cells
  [
      // Gosper glider gun
      [1, 5],
      [1, 6],
      [2, 5],
      [2, 6],
      [11, 5],
      [11, 6],
      [11, 7],
      [12, 4],
      [12, 8],
      [13, 3],
      [13, 9],
      [14, 3],
      [14, 9],
      [15, 6],
      [16, 4],
      [16, 8],
      [17, 5],
      [17, 6],
      [17, 7],
      [18, 6],
      [21, 3],
      [21, 4],
      [21, 5],
      [22, 3],
      [22, 4],
      [22, 5],
      [23, 2],
      [23, 6],
      [25, 1],
      [25, 2],
      [25, 6],
      [25, 7],
      [35, 3],
      [35, 4],
      [36, 3],
      [36, 4],

      // Random cells
      // If you wait enough time these will eventually take part
      // in destroying the glider gun, and the simulation will be in a "static"
      // state.
      // [60, 47],
      // [61, 47],
      // [62, 47],
      // [60, 48],
      // [61, 48],
      // [62, 48],
      // [60, 49],
      // [61, 49],
      // [62, 49],
      // [60, 51],
      // [61, 51],
      // [62, 51],
  ].forEach((point) => {
    cells[point[0]][point[1]] = new Cell(true);
  });
}

/**
 * Check which cells are still alive.
 */
function update() {
  let result = [];

  /**
   * Return amount of alive neighbors for a cell
   */
  function _countNeighbors(x, y) {
    function _isFilled(x, y) {
      if (player.x == x && player.y == y) return true;
      return cells[x] && cells[x][y] && cells[x][y].on;
    }

    let amount = -_isFilled(x, y);
    for (i = -1; i <= 1; ++i) {
      for (j = -1; j <= 1; ++j) {
        if (_isFilled(x - i, y - j)) amount++;
      }
    }

    return amount;
  }


  cells.forEach((row, x) => {
    row.forEach((cell, y) => {
      cell.updateNeighborCounts({x: x, y: y});
    });
  });

  cells.forEach((row, x) => {
   row.forEach((cell, y) => {
      cell.update({x: x, y: y});
    });
  });

  // The player tramples the grass.
  // result[player.x][player.y] = new Cell(false, CellType.PLAYER);

  draw();
}

function run() {
  update()
  setTimeout(run, updateIntervalMs);
}

/**
 * Draw cells on canvas
 */
function draw() {
  canvas.clearRect(0, 0, boardWidth * 8, boardHeight * 8);
  canvas.strokeStyle = '#e1e1e1';
  canvas.fillStyle = 'cadetblue';

  cells.forEach((row, x) => {
    row.forEach((cell, y) => {
      canvas.beginPath();
      canvas.rect(x * 8, y * 8, 8, 8);
      if (cell.on) {
        canvas.fill();
      } else {
        canvas.stroke();
      }
    });
  });

  canvas.fillStyle = 'red';
  canvas.beginPath();
  canvas.rect(player.x * 8, player.y * 8, 8, 8);
  canvas.fill();
}

initKeyListener({
  37: () => {
    cells[player.x][player.y].type = CellType.NORMAL;
    --player.x;
    if (player.x < 0) player.x = 0;
    cells[player.x][player.y].type = CellType.PLAYER;
  },
  38: () => {
    cells[player.x][player.y].type = CellType.NORMAL;
    --player.y;
    if (player.y < 0) player.y = 0;
    cells[player.x][player.y].type = CellType.PLAYER;
  },
  39: () => {
    cells[player.x][player.y].type = CellType.NORMAL;
    ++player.x;
    if (player.x > 63) player.x = 63;
    cells[player.x][player.y].type = CellType.PLAYER;
  },
  40: () => {
    cells[player.x][player.y].type = CellType.NORMAL;
    ++player.y;
    if (player.y > 63) player.y = 63;
    cells[player.x][player.y].type = CellType.PLAYER;
  }
});

init();
run();
