//game settings
var edgeWrap = true; //sets whether or not the edges cause a game over or wrap around
var textSize = 20;

//board
const blockSize = 25;
const rows = 20;
const cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var xVelocity = 0;
var yVelocity = 0;
var snakeBody = [];

//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

var collision = false;
var score = 0;



window.onload = function(){
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing on the board
  
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update,1000/5);
}

function gameOver(){
  drawBoard();
  context.font="60px Courier New";
  context.fillStyle="red";
  context.fillText("GAME OVER", board.width/6, board.height/2);
}

function update(){
  if(collision){
    gameOver();
    return;
  }

  drawBoard();
  drawScore();
  drawLocation();
  drawFood();
  checkFoodCollision();
  drawSnake();
  checkBodyCollision();
  checkEdgeCollision();
}

function drawBoard(){
  context.fillStyle = "black";
  context.fillRect(0,0,board.width,board.height);


}

function drawLocation(){
  context.font="20px Courier New";
  context.fillStyle="yellow";
  context.fillText(`snakeX: ${snakeX}`, 120, textSize)
  context.fillText(`snakeY: ${snakeY}`, 280, textSize)
}

function drawScore(){
  context.font="20px Courier New";
  context.fillStyle="yellow";
  context.fillText(`Score: ${score}`, 0, textSize)
}

function drawFood(){
  context.fillStyle = "red";
  context.fillRect(foodX,foodY,blockSize,blockSize);
}

function drawSnake(){
  for(let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];
  }

  if(snakeBody.length > 0){
    snakeBody[0] = [snakeX,snakeY];
  }

  context.fillStyle = "lime";
  snakeX += xVelocity * blockSize;
  snakeY += yVelocity * blockSize;

  
  context.fillRect(snakeX,snakeY,blockSize,blockSize);

  for(let i = 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize,blockSize);
  }
}

function checkFoodCollision(){
  if(snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX,foodY])
    placeFood();
    score++;
  }
}

function checkBodyCollision(){
  for(let i = 0; i < snakeBody.length; i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      collision = true;
    }
  }
}

function checkEdgeCollision(){
  if(edgeWrap){
    if(snakeX < 0){
      snakeX = board.width-blockSize;
    }
    if(snakeY < 0){
      snakeY = board.height-blockSize;
    }
    if(snakeX > board.width){
      snakeX = 0;
    }
    if(snakeY > board.height){
      snakeY = 0;
    }
  }
  else{
    if(snakeX < 0 || snakeX > board.width || snakeY > board.height ||snakeY < 0){
      collision = true;
    }
  }
}

function changeDirection(e){
  if(e.code == "ArrowUp" && yVelocity != 1){
    xVelocity =0;
    yVelocity = -1;
  }
  else if(e.code == "ArrowDown" && yVelocity != -1){
    xVelocity = 0;
    yVelocity = 1;
  }
  else if(e.code == "ArrowLeft" && xVelocity != 1){
    xVelocity = -1;
    yVelocity = 0;
  }
  else if(e.code == "ArrowRight" && xVelocity != -1){
    xVelocity = 1;
    yVelocity = 0
  }

}

function placeFood(){
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

