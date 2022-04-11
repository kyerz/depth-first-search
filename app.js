const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let nbRows = 0;
let nbCols = 0;
const grid = [];
const gridReplay = [];
const digStep = [];
let idReplay = 0;
const cellSize = 10;
let visited = 0;

const fillTheGrid = () => {
  for (let l = 0; l < nbRows; l++) {
    const row = [];
    const replayRow = [];
    for (let c = 0; c < nbCols; c++) {
      row.push("wall");
      replayRow.push("wall");
    }
    grid.push(row);
    gridReplay.push(replayRow);
  }
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
  digStep.push([posRow, posCol]);
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

const draw = (arr) => {
  for (let l = 0; l < arr.length; l++) {
    for (let c = 0; c < arr[l].length; c++) {
      if (arr[l][c] === "wall") {
        ctx.fillStyle = "black";
        ctx.fillRect(c * cellSize, l * cellSize, cellSize, cellSize);
      }
      if (arr[l][c] === "floor") {
        ctx.fillStyle = "white";
        ctx.fillRect(c * cellSize, l * cellSize, cellSize, cellSize);
      }
    }
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

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (idReplay < digStep.length - 1) {
        idReplay++;
        const step = digStep[idReplay];
        console.log("step[0] ", step[0], "step[1] ", step[1]);
        gridReplay[step[0]][step[1]] = "floor";
        draw(gridReplay);
      }
    }
  });
};

init();
explore(1, 1);
// draw(grid);
