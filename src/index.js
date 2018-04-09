import Board from "./board";
import Game from "./game";
import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  const gameView = new GameView(game, ctx, canvasEl);
  gameView.start();
});
