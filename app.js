const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let nbRows = 0;
let nbCols = 0;
const grid = [];
const cellSize = 10;
let visited = 0;

const fillTheGrid = () => {
  nbRows = Math.floor(canvas.height / cellSize);
  nbCols = Math.floor(canvas.width / cellSize);
  for (let l = 0; l < nbRows; l++) {
    const row = [];
    for (let c = 0; c < nbCols; c++) {
      row.push("wall");
    }
    grid.push(row);
  }
  console.log(grid);
};

const init = () => {
  console.log("init");
  fillTheGrid();
};

const getDirections = (posRow, posCol) => {
  const dirsList = [];
  if (posRow > 2) {
    if (grid[(posRow - 2, posCol)] === "wall") {
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
    if (grid[posRow][posCol - 2]) {
      dirsList.push("left");
    }
  }

  return dirsList;
};

const explore = (posRow, posCol) => {
  //digwall(posRow, posCol);
  while (visited < Math.floor(canvas.width * canvas.height) / 2) {
    visited += 1;
    console.log(getDirections(posRow, posCol));
    break;
  }
};

const draw = () => {
  for (let l = 0; l < grid.length; l++) {
    for (let c = 0; c < grid[l].length; c++) {
      if (grid[l][c] === "wall") {
        ctx.fillStyle = "black";
        ctx.fillRect(c * cellSize, l * cellSize, cellSize, cellSize);
      }
    }
  }
};

init();
explore(2, 2);
draw();
