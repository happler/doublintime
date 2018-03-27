import Game from './game';


class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.resetGame = this.resetGame.bind(this);
    this.newButton = document.getElementsByClassName('new-game-button')[0];
    this.resetButton = document.getElementsByClassName('play-again-button')[0];
    this.splash = document.getElementsByClassName('game-over-splash')[0];

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
    this.newButton.addEventListener('click', this.resetGame);
    this.resetButton.addEventListener('click', this.resetGame);

  }

  removeKeyHandlers(){
    this.newButton.removeEventListener('click', this.resetGame);
    this.resetButton.removeEventListener('click', this.resetGame);
    key.deleteScope('all');
    }



  start(){
    this.removeKeyHandlers();
    this.bindKeyHandlers();
    this.splash.classList.remove('shown');

  }

}

export default GameView;
