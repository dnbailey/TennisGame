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
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}
