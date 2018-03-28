[Link to the Live Version](https://www.harryappler.com/doublintime)
# Doublin Time
  A JavaScript game played on a 4x4 grid, in which users combine tiles of like numbers to form a new tile of the sum of those numbers until they run out space, and there are no more moves left.  Users move by pressing the arrow keys or WASD, which moves all tiles in that direction, and merges like tiles.

## Technologies
  Vanilla JavaScript, HTML5, CSS3, Keymaster.js, lodash.js

## Implementation
  The crux of the game is in the combining of the tiles, done by a method I named collapse. Initially, I tried to iterate through the array, skip over zeros (empty spaces), and add any subsequent like digits to a result array, but I kept ending up with an OBOE.  A colleague pointed out that I was doing a lot of logic to skip the zeros, and I could likely simplify everything by removing the zeros before I start any processing.  After this realization, the solution became obvious.
  ```javascript
  collapse(arr){
    const newArr = [];
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

    while(resultArr.length < this.size){
      resultArr.push(0);
    }
    return resultArr;
  }
  ```
  The other tricky part was actually using the collapse function.  The board is stored in a 2d 4x4 array caled the grid, but this means that the grid can be directly fed into the method only for a left movement .  For every other direction, I had to first do some combination of transforming or reversing the arrays, (and then undo those changes before setting the result as the new grid) as shown here
  ```javascript
  case 'down':
    modArr = zip(...modArr);
    modArr = modArr.map(row => reverse(row));
    collArr = modArr.map(tRow => this.collapse(tRow));
    collArr = collArr.map(row => reverse(row));
    collArr = unzip(collArr);
    break;
```

## Future Updates
  Future versions will include a lightweight firebase backend for high score tracking, better formatting for mobile versions, touch input for supported devices, and movement via trackpad swipes.  I would also like to add in a variable board size, likely in conjunction with the mobile formatting.
