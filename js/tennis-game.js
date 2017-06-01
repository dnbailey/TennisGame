// Tennis Game

// Initiate canvas
let canvas;
let canvasContext;


window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  drawGame();
}

function drawGame() {
  // Canvas background
  drawRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawRect(top, left, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(top, left, width, height);
}
