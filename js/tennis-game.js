/*

Tennis Game
@dnbailey

Based on the tutorials on Udemy by @gamkedo

*/

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
let playerPaddleY = 250;
let compPaddleY = 250;

// Scoreboard
let playerScore = 0;
let compScore = 0;
const WINNING_SCORE = 3;
let showStartScreen = true;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  let frameRate = 30;

  setInterval(function(){
    drawGame();
    gameMechanics()
  }, 1000/frameRate);

  canvas.addEventListener('mousemove', playerPaddleFollowMouse);
  canvas.addEventListener('mousedown', start);
}

function gameMechanics() {
  if (showStartScreen) {
      return;
  }

  compPaddleMove();

  // Start the ball rolling
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  // Test if ball hits paddle or wall for computer
  if (ballX > canvas.width) {
      playerScore ++; // Must be before reset
      ballReset();
  } else if (ballY > compPaddleY &&
    ballY < compPaddleY + PADDLE_HEIGHT &&
    ballX == canvas.width - PADDLE_WIDTH) {
      ballXSpeed = -ballXSpeed;

      let deltaY = ballY - (compPaddleY + PADDLE_HEIGHT/2);
      ballYSpeed = deltaY * 0.35;
  }

  // Test if ball hits paddle or wall for player
  if (ballX < 0) {
      compScore ++; // Must be before reset
      ballReset();
  } else if (ballY > playerPaddleY &&
    ballY < playerPaddleY + PADDLE_HEIGHT &&
    ballX == PADDLE_WIDTH) {
      ballXSpeed = -ballXSpeed;

      let deltaY = ballY - (playerPaddleY + PADDLE_HEIGHT/2);
      ballYSpeed = deltaY * 0.35;
  }

  // Vertical bounce
  if (ballY > canvas.height) {
    ballYSpeed = -ballYSpeed;
  } else if (ballY < 0) {
    ballYSpeed = -ballYSpeed;
  }
}

function drawGame() {
  // Canvas background
  drawRect(0, 0, canvas.width, canvas.height, 'rgb(40,40,40)');

  if (showStartScreen) {
    canvasContext.fillStyle = 'rgb(51,255,0)';
    canvasContext.font = '30px Courier New';
    canvasContext.textAlign = 'center';
    canvasContext.fillText('Click to Start', canvas.width/2, 500);
    if (playerScore > 0) {
      canvasContext.fillText('You won!', canvas.width/2, 200);
    } else if (compScore > 0) {
      canvasContext.fillText('Computer won!', canvas.width/2, 200);
    }
    return;
  }

  // Draw net
  for (i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'rgb(51,255,0)');
  };

  // Draw ball
  drawRect(ballX, ballY, 10, 10, 'rgb(51,255,0)');

  // Draw player paddle
  drawRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(51,255,0)');

  // Draw comp paddle
  drawRect(canvas.width-10, compPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(51,255,0)');

  // Scoreboard
  canvasContext.font = '30px Courier New';
  canvasContext.fillText(playerScore, 200, 100);
  canvasContext.fillText(compScore, canvas.width - 200, 100);
}

// Helper functions

// Start game
function start(evt) {
  if (showStartScreen) {
    playerScore = 0;
    compScore = 0;
    showStartScreen = false;
  }
}

// Reset the position of the ball when it hits vertical walls
function ballReset() {
  if (playerScore >= WINNING_SCORE ||
      compScore >= WINNING_SCORE) {
          showStartScreen = true;
  }
  ballXSpeed = -ballXSpeed;
  ballYSpeed = 4; // Needed to reset the inertia
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

// Create computer paddle movement
function compPaddleMove() {
  let compPaddleYCenter = compPaddleY + PADDLE_HEIGHT/2;
  if (compPaddleYCenter < ballY - 35) {
    compPaddleY += 6;
  } else if (compPaddleY > ballY - 35) {
    compPaddleY -= 6;
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
