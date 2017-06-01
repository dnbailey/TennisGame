// Tennis Game

// Initiate canvas
let canvas;
let canvasContext;

// Paddles
let PADDLE_WIDTH = 10;
let PADDLE_HEIGHT = 100;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  drawGame();
}

function drawGame() {
  // Canvas background
  drawRect(0, 0, canvas.width, canvas.height, 'rgb(40,40,40)');

  // Draw net
  for (i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  };

  // Draw ball
  drawRect(250, 250, 10, 10, 'rgb(51,255,0)');

  // Draw Player Paddle
  drawRect(0, 250, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  // Draw Comp Paddle
  drawRect(canvas.width-10, 250, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function drawRect(top, left, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(top, left, width, height);
}
