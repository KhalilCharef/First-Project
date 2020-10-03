setTimeout(function(){
      document.getElementById("bb").play();
    }, 2000)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// game loop
function loop() {
  requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 6) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  // move snake by it's velocity
  snake.a += snake.da;
  snake.b += snake.db;
  //  snake position horizontally on edge of screen
  if (snake.a < 0) {
        snake.a = 160;
        snake.b = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.da = grid;
        snake.db = 0;
        apple.a = getRandomInt(0, 25) * grid;
        apple.b = getRandomInt(0, 25) * grid;
        document.getElementById('score').innerHTML=0;
        score = 0;
        alert('GAME OVER!')
  }
  if (snake.a >= canvas.width) {
        snake.a = 160;
        snake.b = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.da = grid;
        snake.db = 0;
        apple.a = getRandomInt(0, 25) * grid;
        apple.b = getRandomInt(0, 25) * grid;
        document.getElementById('score').innerHTML=0;
        score = 0;
        // alert('GAME OVER!')

  }
  // snake position vertically on edge of screen
  if (snake.b < 0) {
        snake.a = 160;
        snake.b = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.da = grid;
        snake.db = 0;
        apple.a = getRandomInt(0, 25) * grid;
        apple.b = getRandomInt(0, 25) * grid;
        document.getElementById('score').innerHTML=0;
        score = 0;
        alert('GAME OVER!')
  }
  if (snake.b >= canvas.height) {
        snake.a = 160;
        snake.b = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.da = grid;
        snake.db = 0;
        apple.a = getRandomInt(0, 25) * grid;
        apple.b = getRandomInt(0, 25) * grid;
        document.getElementById('score').innerHTML=0;
        score = 0;
        alert('GAME OVER!')
  }
  // track of where snake has been. 
  //"front" of the array is always the head
  snake.cells.unshift({a: snake.a, b: snake.b});
  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  // draw apple
  context.fillStyle = 'green';
  context.fillRect(apple.a, apple.b, grid-1, grid-1);
  // draw snake one cell at a time
  context.fillStyle = 'red';
  snake.cells.forEach(function(cell, index) {
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.a, cell.b, grid-1, grid-1);  
    // snake ate apple
    if (cell.a === apple.a && cell.b === apple.b) {
      snake.maxCells++;
      score++;
      document.getElementById('score').innerHTML = score;
      console.log(score);
      // canvas is 400x400 which is 25x25 grids 
      apple.a = getRandomInt(0, 25) * grid;
      apple.b = getRandomInt(0, 25) * grid;
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      // snake occupies same space as a body part. reset game
      if (cell.a === snake.cells[i].a && cell.b === snake.cells[i].b) {
        snake.a = 160;
        snake.b = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.da = grid;
        snake.db = 0;
        apple.a = getRandomInt(0, 25) * grid;
        apple.b = getRandomInt(0, 25) * grid;
        alert('GAME OVER!')

      }
    }
  });
}
// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's 
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)
  // left arrow key
  if (e.which === 37 && snake.da === 0) {
    snake.da = -grid;
    snake.db = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.db === 0) {
    snake.db = -grid;
    snake.da = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.da === 0) {
    snake.da = grid;
    snake.db = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.db === 0) {
    snake.db = grid;
    snake.da = 0;
  }
});
// start the game
requestAnimationFrame(loop);

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var score = 0;
var count = 0;
var snake = {
  a: 160,
  b: 160,
  
  da: grid,
  db: 0,
  // keep track of all grids the snake body occupies
  cells: [],
  // length of the snake. grows when eating an apple
  maxCells: 4
};
var apple = {
  a: 320,
  b: 320
};




function component(width, height, color, a, b) {
  this.width = width;
  this.height = height;
  this.speedA = 0;
  this.speedB = 0;
  this.a= a;
  this.b = b;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.a, this.b, this.width, this.height);
  }
  this.newPos = function() {
    this.a += this.speedA;
    this.b += this.speedB;
  }
}

function updateGameArea() {
  myGameArea.clear();
  snake.newPos();
  snake.update();
}

function moveup() {
  snake.speedY -= 1;
  snake.db = -grid;
    snake.da = 0;
}

function movedown() {
  snake.speedB += 1;
  snake.db = grid;
    snake.da = 0;
}

function moveleft() {
  snake.speedA -= 1;
  snake.da = -grid;
    snake.db = 0;
}

function moveright() {
  snake.speedA += 1;
  snake.da = grid;
    snake.db = 0;
}


