const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let nbRows = 0;
let nbCols = 0;
const grid = [];
const cellSize = 10;
let visited = 0;

const fillTheGrid = () => {
  for (let l = 0; l < nbRows; l++) {
    const row = [];
    for (let c = 0; c < nbCols; c++) {
      row.push("wall");
    }
    grid.push(row);
  }
};

const init = () => {
  nbRows = Math.floor(canvas.height / cellSize);
  nbCols = Math.floor(canvas.width / cellSize);
  if (nbRows % 2 === 0) {
    nbRows -= 1;
    canvas.height -= cellSize;
  }
  if (nbCols % 2 === 0) {
    nbCols -= 1;
    canvas.width -= cellSize;
  }
  fillTheGrid();
};

const getDirections = (posRow, posCol) => {
  const dirsList = [];
  if (posRow > 2) {
    if (grid[posRow - 2][posCol] === "wall") {
      dirsList.push("up");
    }
  }
  if (posCol < nbCols - 2) {
    if (grid[posRow][posCol + 2] === "wall") {
      dirsList.push("right");
    }
  }
  if (posRow < nbRows - 2) {
    if (grid[posRow + 2][posCol] === "wall") {
      dirsList.push("down");
    }
  }
  if (posCol > 2) {
    if (grid[posRow][posCol - 2] === "wall") {
      dirsList.push("left");
    }
  }

  return dirsList;
};

const digwall = (posRow, posCol) => {
  grid[posRow][posCol] = "floor";
};

const explore = (posRow, posCol) => {
  digwall(posRow, posCol);
  visited += 1;

  while (visited < Math.floor((canvas.width / cellSize) * (canvas.height / cellSize)) / 2) {
    const directions = getDirections(posRow, posCol);

    if (directions.length !== 0) {
      const index = Math.floor(Math.random() * directions.length);

      if (directions[index] === "up") {
        digwall(posRow - 1, posCol);
        explore(posRow - 2, posCol);
      } else if (directions[index] === "right") {
        digwall(posRow, posCol + 1);
        explore(posRow, posCol + 2);
      } else if (directions[index] === "down") {
        digwall(posRow + 1, posCol);
        explore(posRow + 2, posCol);
      } else if (directions[index] === "left") {
        digwall(posRow, posCol - 1);
        explore(posRow, posCol - 2);
      } else {
        break;
      }
    } else {
      break;
    }
  }
};

const draw = () => {
  for (let l = 0; l < grid.length; l++) {
    for (let c = 0; c < grid[l].length; c++) {
      if (grid[l][c] === "wall") {
        ctx.fillStyle = "black";
        ctx.fillRect(c * cellSize, l * cellSize, cellSize, cellSize);
      }
      if (grid[l][c] === "floor") {
        ctx.fillStyle = "white";
        ctx.fillRect(c * cellSize, l * cellSize, cellSize, cellSize);
      }
    }
  }
};

init();
explore(1, 1);
draw();
