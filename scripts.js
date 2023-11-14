const canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
const score = document.getElementById('bounce-score');
const fallScore = document.getElementById('fall-score');

const CW = canvas.width;
const CH = canvas.height;
const halfCW = CW / 2;
const halfCH = CH / 2;

let bounces = 0;
let falls = 0;

let ballIconSrc = "https://cdn-icons-png.flaticon.com/512/53/53283.png";
let ballImage = new Image();
ballImage.crossOrigin = "anonymous";
ballImage.src = ballIconSrc;

let netIconSrc = "https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-color-icon---football-goal-post-game-icon-penalty-vector-png-image_37947066.png";
let netImage = new Image();
netImage.crossOrigin = "anonymous";
netImage.src = netIconSrc;



let ballW = 30;
let ballH = 30;
let ballX = halfCW - ballW/2;
let ballY = halfCH - ballH/2;

function drawRect(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function drawBall() {
  ctx.drawImage(ballImage, ballX, ballY, ballW, ballH);
}

function drawPaddle() {
  drawRect(paddleX, paddleY, paddleW, paddleH)
}

let netW = 150;
let netH = 30;
let netX = CW/2 - netW/2;
let netY = CH/2 - 200;
function drawNet() {
  ctx.drawImage(netImage, netX, netY, netW, netH)
}

drawNet();

let paddleW = 100;
let paddleH = 25;
let paddleX = halfCW - paddleW / 2;
let paddleY = CH - paddleH - 50;

drawBall();
drawPaddle();


function drawHUD() {
  ctx.font = "12px Arial";
  ctx.fillText("Goals: " + bounces, 50, 50)
  ctx.fillText("Fails: " + falls, 50, 75)
}

let ballSpeedX = 6;
let ballSpeedY = 5;

function paddleCollision() {
  if (
    ballX < paddleX + paddleW
    &&
    ballX + ballW > paddleX
    &&
    ballY < paddleY + paddleH
    &&
    ballY + ballH > paddleY
  ) {
    return true;
  }
}

function netCollision() {
  if (
    ballX < netX + netW
    &&
    ballX + ballW > netX
    &&
    ballY < netY + netH
    &&
    ballY + ballH > netY
  ) {
    return true;
  }
}

// event listener
let moveRight = false;
let moveLeft = false;
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    // paddleX += 20;
    moveRight = true;
  }
  if (event.key === "ArrowLeft") {
    // paddleX -= 20;
    moveLeft = true;
  }
});
// event listener
document.addEventListener("keyup", function(event) {
  if (event.key === "ArrowRight") {
    // paddleX += 20;
    moveRight = false;
  }
  if (event.key === "ArrowLeft") {
    // paddleX -= 20;
    moveLeft = false;
  }
});

function movePaddleL() {
  paddleX -= 20;
}

function movePaddleR() {
  paddleX += 20;
}

let fillColor = "black";

function playGame() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ctx.clearRect(0, 0, CW, CH);
  if (ballX + ballW > CW || ballX < 0) {
    ballSpeedX *= -1
  }
  if (ballY + ballH > CH || ballY < 0) {
    ballSpeedY *= -1
  }
  
  if (ballY + ballH > CH) {
    falls++;
    
    ballY = CH / 2;
    ballX = CW / 2;
    bounces = 0;
  }
  
  
  
  if (paddleCollision()) {
    ballSpeedY *= -1;
    ballSpeedX *= 1;
    ballY = paddleY - ballH;
   
  }
  
  if (netCollision()) {
    ballSpeedY *= -1;
    ballSpeedX *= -1;
    bounces++;
    console.log(bounces);
  }
  drawHUD();
  drawNet();
  
  if (moveRight && paddleX + paddleW < CW) {
    paddleX += 10;
  }
  if (moveLeft && paddleX > 0) {
    paddleX -= 10;
  }
  
  drawBall();
  drawPaddle();
  
  requestAnimationFrame(playGame);
}