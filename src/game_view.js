import Game from "./game";
import { zip, reverse, unzip, isEqual, cloneDeep, debounce } from "lodash";

class GameView {
  constructor(game, ctx, canvasEl) {
    this.game = game;
    this.ctx = ctx;
    this.canvasEl = canvasEl;
    this.resetGame = this.resetGame.bind(this);
    this.newButton = document.getElementsByClassName("new-game-button")[0];
    this.resetButton = document.getElementsByClassName("play-again-button")[0];
    this.splash = document.getElementsByClassName("game-over-splash")[0];
    this.lockChangeAlert = this.lockChangeAlert.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  resetGame() {
    this.game = new Game(this.ctx);
    this.start();
  }

  lockChangeAlert() {
    if (
      document.pointerLockElement === this.canvas ||
      document.mozPointerLockElement === this.canvas
    ) {
      console.log("The pointer lock status is now locked");
      document.addEventListener(
        "mousemove",
        debounce(this.updatePosition, 50, {
          leading: true,
          trailing: false
        }),
        false
      );
    } else {
      console.log("The pointer lock status is now unlocked");
      document.removeEventListener(
        "mousemove",
        debounce(this.updatePosition, 50, {
          leading: true,
          trailing: false
        }),
        false
      );
    }
  }

  updatePosition(e) {
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    console.log(`deltaX =>${deltaX}, deltaY =>${deltaY}`);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      switch (Math.sign(deltaX)) {
        case 1:
          console.log("right");
          this.game.board.makeMove("right");
          break;
        case -1:
          console.log("left");
          this.game.board.makeMove("left");
          break;
        default:
          break;
      }
    } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
      switch (Math.sign(deltaY)) {
        case 1:
          console.log("down");
          this.game.board.makeMove("down");
          break;
        case -1:
          console.log("up");
          this.game.board.makeMove("up");
          break;
        default:
          break;
      }
    }
  }

  bindKeyHandlers() {
    key("w, up", "all", this.game.board.delayedMakeMove("up"));
    key("a, left", "all", this.game.board.delayedMakeMove("left"));
    key("s, down", "all", this.game.board.delayedMakeMove("down"));
    key("d, right", "all", this.game.board.delayedMakeMove("right"));
    this.newButton.addEventListener("click", this.resetGame);
    this.resetButton.addEventListener("click", this.resetGame);
    this.canvasEl.addEventListener("click", () =>
      this.canvasEl.requestPointerLock()
    );
    document.addEventListener("pointerlockchange", this.lockChangeAlert, false);
  }

  removeKeyHandlers() {
    this.newButton.removeEventListener("click", this.resetGame);
    this.resetButton.removeEventListener("click", this.resetGame);
    key.deleteScope("all");
  }

  start() {
    this.removeKeyHandlers();
    this.bindKeyHandlers();
    this.splash.classList.remove("shown");
  }
}

export default GameView;
