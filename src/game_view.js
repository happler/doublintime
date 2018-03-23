class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;

  }
  bindKeyHandlers(){
    key('w', () =>{
        this.game.board.makeMove('up');
        this.draw();
      });
    key('a', () =>{
        this.game.board.makeMove('left');
        this.draw();
      });
    key('s', () =>{
        this.game.board.makeMove('down');
        this.draw();
      });
    key('d', () =>{
        this.game.board.makeMove('right');
        this.draw();
      });

  }

  start(){
    this.bindKeyHandlers();
    requestAnimationFrame(() => this.draw());
  }

  draw(){
    this.game.board.draw(this.ctx);
  }
}

export default GameView;
