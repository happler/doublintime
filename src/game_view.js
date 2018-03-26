import Game from './game';


class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.score = document.getElementsByClassName('score')[0];


  }
  bindKeyHandlers(){
    key('w, up', () =>{
        this.game.board.makeMove('up');
        this.draw();
      });
    key('a, left', () =>{
        this.game.board.makeMove('left');
        this.draw();
      });
    key('s, down', () =>{
        this.game.board.makeMove('down');
        this.draw();
      });
    key('d, right', () =>{
        this.game.board.makeMove('right');
        this.draw();
      });

  }

  // const button = document.getElementsByClassName('new-game-button')[0];
  // console.log("here's a button");
  // console.log(button);
  // button.addEventListener('click', () => {
  //   this.game = new Game();
  // });

  start(){
    this.bindKeyHandlers();
    requestAnimationFrame(() => this.draw());
  }

  draw(){
    this.game.board.draw(this.ctx);
    this.score.innerHTML = this.game.board.score;
  }
}

export default GameView;
