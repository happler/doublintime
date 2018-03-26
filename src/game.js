import Board from './board';

class Game{
  constructor(ctx){
    this.board = new Board(ctx);
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    // this.setKeyListeners();
    this.render();

  }

  // setKeyListeners(){
  //   $('body').keydown(e =>{
  //     switch (e.which) {
  //       case 37:
  //       case 65:
  //         this.board.makeMove('left');
  //         this.render();
  //         break;
  //       case 38:
  //       case 87:
  //         this.board.makeMove('up');
  //         this.render();
  //         break;
  //       case 39:
  //       case 68:
  //         this.board.makeMove('right');
  //         this.render();
  //         break;
  //       case 40:
  //       case 83:
  //         this.board.makeMove('down');
  //         this.render();
  //         break;
  //
  //     }
  //   });
  // }

  render(){
    console.log(this.board.grid);
    console.log(this.board.score);
  }

  draw(){
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.fillStyle('#B9ADA1');
    this.ctx.fillRect(0, 0, 500, 500);
    this.board.draw();
  }
}

export default Game;
