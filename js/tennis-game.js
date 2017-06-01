// Tennis Game

// Initiate canvas
let canvas;
let canvasContext;

// Ball setup
let ballX = 250;
let ballXSpeed = 5;
let ballY = 250;
let ballYSpeed = 4;

// Paddle setup
let PADDLE_WIDTH = 10;
let PADDLE_HEIGHT = 100;

// Player paddle
let playerPaddleY = 250;

// Comp paddle
let compPaddleY = 250;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  let frameRate = 30;

  setInterval(function(){
    drawGame();
    gameMechanics()
  }, 1000/frameRate);

  canvas.addEventListener('mousemove', playerPaddleFollowMouse);
}

function gameMechanics() {

  compPaddleMove();

  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if (ballX > canvas.width) {
    ballXSpeed = -ballXSpeed;
  } else if (ballX < 0) {
    ballXSpeed = -ballXSpeed;
  }

  if (ballY > canvas.height) {
    ballYSpeed = -ballYSpeed;
  } else if (ballY < 0) {
    ballYSpeed = -ballYSpeed;
  }
}

function drawGame() {
  // Canvas background
  drawRect(0, 0, canvas.width, canvas.height, 'rgb(40,40,40)');

  // Draw net
  for (i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  };

  // Draw ball
  drawRect(ballX, ballY, 10, 10, 'rgb(51,255,0)');

  // Draw player paddle
  drawRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  // Draw comp paddle
  drawRect(canvas.width-10, compPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

// Helper functions

// Create computer paddle movement
function compPaddleMove() {
  let compPaddleYCenter = compPaddleY + PADDLE_HEIGHT/2;
  if (compPaddleYCenter < ballY) {
    compPaddleY += 5;
  } else if (compPaddleY > ballY) {
    compPaddleY -= 5;
  }
}

// Get mouse position relative to canvas size
function playerPaddleFollowMouse(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  // Calculate paddle position based on mouse relative to canvas
  playerPaddleY = evt.clientY - rect.top - root.scrollTop - PADDLE_HEIGHT/2;
}

function drawRect(top, left, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(top, left, width, height);
}
