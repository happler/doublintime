import Board from './board';

class Game{
  constructor(ctx){
    this.board = new Board(ctx);
    this.ctx = ctx;
  }

}

export default Game;
