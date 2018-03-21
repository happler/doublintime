class Board{
  constructor(size = 4){
    this.size = size;
    this.grid = this.makeGrid(4);
  }

  createCell(posX, posY, value = 0){
    return {value, posX, posY};
  }

  makeGrid(size){
    const grid = [];
    for(let row; row < size; row++){
      const newRow = [];
      for(let col; col < size; col++){
        row.push(this.createCell(row, col));
      }
      grid.push(newRow);
    }
    return grid;
  }
  randomCell(score){
    let row = Math.floor(Math.random() * this.size);
    let col = Math.floor(Math.random() * this.size);
    while(this.grid[row][col].value !== 0){
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);
    }
    if(score < 2000){
      this.grid[row][col] = this.createCell(row, col, 2);
    }else{
      const val = Math.floor(Math.random() * 2);

    }
  }
}
