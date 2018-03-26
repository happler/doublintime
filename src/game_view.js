import Game from './game';


class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.resetGame = this.resetGame.bind(this);
    // this.draw = this.draw.bind(this);

  }

  resetGame(){
    this.game = new Game(this.ctx);
    this.start();
  }

  bindKeyHandlers(){
    key('w, up', 'all',  () =>{
        this.game.board.makeMove('up');
      });
    key('a, left', 'all', () =>{
        this.game.board.makeMove('left');
      });
    key('s, down', 'all', () =>{
        this.game.board.makeMove('down');
      });
    key('d, right', 'all', () =>{
        this.game.board.makeMove('right');
      });
    const button = document.getElementsByClassName('new-game-button')[0];
    button.addEventListener('click', this.resetGame);

  }

  removeKeyHandlers(){
    const button = document.getElementsByClassName('new-game-button')[0];
    button.removeEventListener('click', this.resetGame);
    key.deleteScope('all');
    }



  start(){
    this.removeKeyHandlers();
    this.bindKeyHandlers();
    // requestAnimationFrame(() => this.draw());
  }

  // draw(){
  //   this.game.board.draw();
  // }
}

export default GameView;
