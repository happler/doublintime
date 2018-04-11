import {
  zip,
  reverse,
  unzip,
  isEqual,
  cloneDeep,
  debounce,
  throttle
} from "lodash";

class Board {
  constructor(ctx, size = 4) {
    this.size = size;
    this.ctx = ctx;
    this.grid = this.makeGrid(size);
    this.potScore = 0;
    this.score = 0;
    this.scoreDOM = document.getElementsByClassName("score")[0];
    this.DIRS = ["up", "down", "left", "right"];
    this.draw = this.draw.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.draw();
    this.addRandomCell(this.emptySpaces());
    this.addRandomCell(this.emptySpaces());
    // this.addFixedCell();
  }

  makeGrid(size) {
    const grid = [];
    for (let row = 0; row < size; row++) {
      const newRow = [];
      for (let col = 0; col < size; col++) {
        newRow.push(0);
      }
      grid.push(newRow);
    }
    return grid;
  }

  addRandomCell(empties) {
    const randomCell = empties[Math.floor(Math.random() * empties.length)];
    const val = Math.random() > 0.8 ? 4 : 2;
    this.grid[randomCell[0]][randomCell[1]] = val;
    setTimeout(() => {
      this.drawNewSquare(randomCell[0], randomCell[1], val, 1);
      setTimeout(() => {
        this.drawNewSquare(randomCell[0], randomCell[1], val, 2);
        setTimeout(() => {
          this.drawNewSquare(randomCell[0], randomCell[1], val, 3);
          setTimeout(() => {
            this.drawNewSquare(randomCell[0], randomCell[1], val, 4);
            setTimeout(() => {
              this.drawNewSquare(randomCell[0], randomCell[1], val, 5);
            }, 25);
          }, 25);
        }, 25);
      }, 25);
    }, 25);
  }

  addFixedCell() {
    this.grid[0][0] = 0;
    this.grid[0][1] = 2;
    this.grid[0][2] = 2;
    this.grid[0][3] = 2;
    this.grid[1][0] = 2;
    this.grid[1][1] = 32;
    this.grid[1][2] = 64;
    this.grid[1][3] = 128;
    this.grid[2][0] = 2;
    this.grid[2][1] = 512;
    this.grid[2][2] = 1024;
    this.grid[2][3] = 2048;
    this.grid[3][0] = 2;
    this.grid[3][1] = 2;
    this.grid[3][2] = 2;
    this.grid[3][3] = 2;
    this.draw();
  }

  collapse(arr) {
    const newArr = [];
    const resultArr = [];

    arr.forEach(el => {
      if (el) {
        newArr.push(el);
      }
    });

    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === newArr[i + 1]) {
        resultArr.push(newArr[i] * 2);
        this.potScore += newArr[i] * 2;
        i++;
      } else {
        resultArr.push(newArr[i]);
      }
    }

    while (resultArr.length < this.size) {
      resultArr.push(0);
    }
    return resultArr;
  }

  potMove(dir) {
    let modArr = cloneDeep(this.grid);
    let collArr;
    switch (dir) {
      case "up":
        modArr = zip(...modArr);
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = unzip(collArr);
        break;
      case "down":
        modArr = zip(...modArr);
        modArr = modArr.map(row => reverse(row));
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = collArr.map(row => reverse(row));
        collArr = unzip(collArr);
        break;
      case "right":
        modArr = modArr.map(row => reverse(row));
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = collArr.map(row => reverse(row));
        break;
      case "left":
        collArr = modArr.map(row => this.collapse(row));
        break;
      default:
        collArr = this.grid;
    }
    return collArr;
  }

  delayedMakeMove(dir) {
    throttle(
      () => {
        this.makeMove(dir);
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    );
  }

  makeMove(dir) {
    const postMove = this.potMove(dir);
    if (!isEqual(postMove, this.grid)) {
      this.score += this.potScore;
      this.potScore = 0;
      this.grid = postMove;
      this.draw();
      const empties = this.emptySpaces();
      if (empties.length) {
        this.addRandomCell(empties);
        if (empties.length === 1 && this.isOver()) {
          setTimeout(this.gameOver, 250);
        }
      }
    }
  }

  gameOver() {
    const splash = document.getElementsByClassName("game-over-splash")[0];
    const finalScore = document.getElementById("final-score");
    splash.classList.add("shown");
    finalScore.innerHTML = this.score;
  }

  emptySpaces() {
    const empties = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (!this.grid[row][col]) {
          empties.push([row, col]);
        }
      }
    }
    return empties;
  }

  isOver() {
    for (let i = 0; i < this.DIRS.length; i++) {
      if (!isEqual(this.potMove(this.DIRS[i]), this.grid)) {
        this.potScore = 0;
        return false;
      }
    }
    this.potScore = 0;
    return true;
  }

  drawNewSquare(row, col, val, pass) {
    this.ctx.fillStyle = val === 2 ? "#EDE4DB" : "#EBE0CB";
    this.ctx.fillRect(
      120 * col + 20 + (40 - 10 * (pass - 1)),
      120 * row + 20 + (40 - 10 * (pass - 1)),
      20 * pass,
      20 * pass
    );
    // Below code provides a slight border on new square spawning, current testing likes it without, but leaving for inspiration
    // if (pass < 5) {
    //   this.ctx.lineWidth = 5;
    //   this.ctx.strokeStyle = "#A40E4C";
    //   this.ctx.strokeRect(
    //     120 * col + 20 + (40 - 10 * (pass - 1)),
    //     120 * row + 20 + (40 - 10 * (pass - 1)),
    //     20 * pass,
    //     20 * pass
    //   );
    // }
    this.ctx.font = "30px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#756E66";
    if (pass > 1) {
      this.ctx.fillText(val, 120 * col + 70, 120 * row + 80);
    }
  }

  draw() {
    this.scoreDOM.innerHTML = this.score;
    this.ctx.fillStyle = "#B9ADA1";
    this.ctx.fillRect(0, 0, 500, 500);
    const colors = {
      0: "#CBC1B5",
      2: "#EDE4DB",
      4: "#EBE0CB",
      8: "#EAB381",
      16: "#E9996C",
      32: "#E88266",
      64: "#E66747",
      128: "#ECD590",
      256: "#EACA74",
      512: "#EAC568",
      1024: "#E8C15A",
      2048: "#EABF51",
      4096: "#E06F6F",
      8192: "#DB595C",
      16384: "#D14F41",
      32768: "#2D241B",
      65536: "#69A0DA",
      131072: "#2E7CB7"
    };
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const val = this.grid[i][j];
        this.ctx.fillStyle = colors[val];
        this.ctx.fillRect(120 * j + 20, 120 * i + 20, 100, 100);
        if (val) {
          this.ctx.font = "30px sans-serif";
          this.ctx.textAlign = "center";
          if (val < 8) {
            this.ctx.fillStyle = "#756E66";
          } else {
            this.ctx.fillStyle = "#FFFFFF";
          }
          this.ctx.fillText(val, 120 * j + 70, 120 * i + 80);
        }
      }
    }
  }
}

export default Board;
