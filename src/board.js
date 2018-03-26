import { zip, reverse, unzip, isEqual, cloneDeep } from 'lodash';

const BOARD_DISPLAY=[
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];


class Board{
  constructor(ctx, size = 4){
    this.size = size;
    this.ctx = ctx;
    this.grid = this.makeGrid(size);
    this.potScore = 0;
    this.score = 0;
    this.gameOver = false;
    this.scoreDOM = document.getElementsByClassName('score')[0];
    this.DIRS = ['up', 'down', 'left', 'right'];

    this.draw = this.draw.bind(this);
    this.addRandomCell(this.emptySpaces());
    this.addRandomCell(this.emptySpaces());
    // this.addFixedCell();
  }

  makeGrid(size){
    const grid = [];
    for(let row = 0; row < size; row++){

      const newRow = [];
      for(let col = 0; col < size; col++){
        newRow.push(0);
      }
      grid.push(newRow);
    }
    return grid;
  }


  addRandomCell(empties){
    const randomCell = empties[Math.floor(Math.random() * empties.length)];
    const val = Math.random() > .8 ? 4 : 2;
    this.grid[randomCell[0]][randomCell[1]] = val;

    // debugger
    // debugger
    // this.drawNewSquare(randomCell[0], randomCell[1], val, 3);
    // debugger
    // this.drawNewSquare(randomCell[0], randomCell[1], val, 4);
    setTimeout(() => {
      this.drawNewSquare(randomCell[0], randomCell[1], val, 1);
      setTimeout(() => {
        this.drawNewSquare(randomCell[0], randomCell[1], val, 2);
        setTimeout(() => {
          this.drawNewSquare(randomCell[0], randomCell[1], val, 3);
          setTimeout(() => {
            this.drawNewSquare(randomCell[0], randomCell[1], val, 4);

          }, 35);

        }, 35);

      }, 35);
    }, 35 );
  }

  addFixedCell(){
    this.grid[0][0] = 0;
    this.grid[0][1] = 2;
    this.grid[0][2] = 4;
    this.grid[0][3] = 8;
    this.grid[1][0] = 16;
    this.grid[1][1] = 32;
    this.grid[1][2] = 64;
    this.grid[1][3] = 128;
    this.grid[2][0] = 256;
    this.grid[2][1] = 512;
    this.grid[2][2] = 1024;
    this.grid[2][3] = 2048;
    this.grid[3][0] = 4;
    this.grid[3][1] = 2;
    this.grid[3][2] = 4;
    this.grid[3][3] = 8;

  }


  collapse(arr){
    let newArr = [];
    const resultArr = [];
    arr.forEach(el => {
      if (el) {newArr.push(el);}
    });
    for(let i = 0; i < newArr.length; i++){
      if (newArr[i] === newArr[i + 1]){
        resultArr.push(newArr[i] * 2);
        this.potScore += (newArr[i] * 2);
        i++;
      } else{
        resultArr.push(newArr[i]);
      }
    }
    while(resultArr.length < this.size){ resultArr.push(0);}
    return resultArr;
  }

  potMove(dir){
    let modArr = cloneDeep(this.grid);
    let collArr;
    switch (dir) {
      case 'up':
        modArr = zip(...modArr);
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = unzip(collArr);
        break;
      case 'down':
        modArr = zip(...modArr);
        modArr = modArr.map(row => reverse(row));
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = collArr.map(row => reverse(row));
        collArr = unzip(collArr);
        break;
      case 'right':
        modArr = modArr.map(row => reverse(row));
        collArr = modArr.map(tRow => this.collapse(tRow));
        collArr = collArr.map(row =>reverse(row));
        break;
      case 'left':
        collArr = modArr.map(row => this.collapse(row));
        break;
      default:
        collArr = this.grid;
    }
    return collArr;
  }

  makeMove(dir){
    const postMove = this.potMove(dir);
    if(!isEqual(postMove, this.grid)){
      this.score += this.potScore;
      this.potScore = 0;
      this.grid = postMove;
      this.draw();
      const empties = this.emptySpaces();
      if(empties.length){
        this.addRandomCell(empties);
        if(empties.length === 1 && this.isOver()){
          this.gameOver = true;
        }
      }
    }

  }
  emptySpaces(){
    const empties = [];
    for(let row = 0; row < this.size; row++){
      for(let col = 0; col < this.size; col++){
        if(!this.grid[row][col]){
          empties.push([row, col]);
        }
      }
    }
    return empties;
  }
  isOver(){
    for(let i = 0; i < this.DIRS.length; i++){

       if(!isEqual(this.potMove(this.DIRS[i]), this.grid)){
         this.potScore = 0;
         return false;
       }
    }
    this.potScore = 0;
    return true;
  }

  drawNewSquare(row, col, val, pass){
    this.ctx.fillStyle = val === 2 ? '#EDE4DB' : '#EBE0CB';
    this.ctx.fillRect( ((120) * col) + 20, ((120) * row) + 20, 25 * pass, 25 * pass );
    this.ctx.font = '30px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#756E66';
    if (pass > 2 ){
      this.ctx.fillText(val, ((120) * col) + 70, ((120) * row) + 80);
    }
  }

  draw(){
    this.scoreDOM.innerHTML = this.score;
    this.ctx.fillStyle = '#B9ADA1';
    this.ctx.fillRect(0, 0, 500, 500);
    const colors ={
      0:'#CBC1B5',
      2:'#EDE4DB',
      4:'#EBE0CB',
      8:'#EAB381',
      16:'#E9996C',
      32:'#E88266',
      64:'#E66747',
      128:'#ECD590',
      256:'#EACA74',
      512:'#EAC568',
      1024:'#E8C15A',
      2048:'#EABF51',
    };
    // console.log(this.grid);
    for(let i = 0; i < this.size; i++){
      for(let j = 0; j < this.size; j++){
        const val = this.grid[i][j];
        this.ctx.fillStyle = colors[val];
        this.ctx.fillRect( ((120) * j) + 20, ((120) * i) + 20, 100, 100 );
        if (val){
          this.ctx.font = '30px sans-serif';
          this.ctx.textAlign = 'center';
          if(val < 8){
            this.ctx.fillStyle = '#756E66';
          } else {
          this.ctx.fillStyle = '#FFFFFF';
          }
          this.ctx.fillText(val, ((120) * j) + 70, ((120) * i) + 80);

        }
      }
    }
  }
}

export default Board;
