const canvas = document.querySelector("#canvas");
let nbRows = 0;
let nbCols = 0;
const grid = [];
const cellSize = 10;

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

init();
