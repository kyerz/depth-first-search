const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const playBtn = document.querySelector("#playBtn");
const clearBtn = document.querySelector("#clearBtn");
const stepBtn = document.querySelector("#stepBtn");
const randomizeBtn = document.querySelector("#randomizeBtn");

let nbRows = 0;
let nbCols = 0;
let idReplay = 0;
let visited = 0;
let isPlaying = false;

const grid = [];
const gridReplay = [];
const cellSize = 8;
const digStep = [];
const WALL_COLOR = "#000";
const FLOOR_COLOR = "#fff";
const READING_HEAD = "red";

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
  const step = digStep[idReplay];
  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr[r].length; c++) {
      if (arr[r][c] === "wall") {
        ctx.fillStyle = WALL_COLOR;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
      if (arr[r][c] === "floor") {
        ctx.fillStyle = FLOOR_COLOR;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
      if (step[0] === r && step[1] === c) {
        ctx.fillStyle = READING_HEAD;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
};

const handleNextStep = () => {
  if (idReplay < digStep.length - 1) {
    idReplay++;
    const step = digStep[idReplay];
    gridReplay[step[0]][step[1]] = "floor";
    draw(gridReplay);
    if (isPlaying) {
      startReplay();
    }
  }
};

const startReplay = () => {
  setTimeout(() => {
    handleNextStep();
  }, 16);
};

const clearCanvas = () => {
  ctx.fillStyle = WALL_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const handleTogglePlayBtn = (text) => {
  if (!text) {
    if (!isPlaying) {
      startReplay();
      isPlaying = true;
      randomizeBtn.disabled = true;

      playBtn.textContent = "stop";
      playBtn.classList.add("stop");
      playBtn.classList.remove("play");
    } else {
      isPlaying = false;
      randomizeBtn.disabled = false;

      playBtn.textContent = "play";
      playBtn.classList.add("play");
      playBtn.classList.remove("stop");
    }
  } else {
    if (playBtn.textContent === "stop") {
      playBtn.textContent = "play";
      playBtn.classList.add("play");
      playBtn.classList.remove("stop");
    }
  }
};

//INIT
const init = () => {
  isPlaying = false;
  grid.length = 0;
  gridReplay.length = 0;
  digStep.length = 0;
  idReplay = 0;
  visited = 0;

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
  clearCanvas();
  explore(1, 1);
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      handleTogglePlayBtn("stop");
      isPlaying = false;
      handleNextStep();
    }
  });
};

init();

//PLAY BTN
playBtn.addEventListener("click", (e) => {
  handleTogglePlayBtn();
  //remove focus from space key
  e.target.blur();
});

//CLEAR BTN
clearBtn.addEventListener("click", (e) => {
  handleTogglePlayBtn("stop");

  init();
  //remove focus from space key
  e.target.blur();
});

//STEP BTN
stepBtn.addEventListener("click", (e) => {
  handleTogglePlayBtn("stop");
  isPlaying = false;
  handleNextStep();
});

//RANDOMIZE BTN
randomizeBtn.addEventListener("click", () => {
  if (isPlaying) {
    randomizeBtn.disabled = true;
  } else {
    randomizeBtn.disabled = false;
  }
  init();
  draw(grid);
});
