const canvas =  /** @type {HTMLCanvasElement} */ (document.getElementById('myCanvas'));
//the HTMLCanvasElement is a type cast to make vscode autocomplete works for canvas..it doesn't affect the code
const ctx = canvas.getContext('2d');
const BALL_RADIUS = 8;

const canvasWidth = canvas.width=window.innerWidth;
const canvasHeight =canvas.height=window.innerHeight;
const paddleWidth=150;
const paddleHeight=10;
const paddleMarginBottom=100;


let paddleX = canvasWidth/2 - paddleWidth/2;
let paddleY = canvasHeight-paddleHeight-paddleMarginBottom;
let paddleDX=10;
//draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.fillStyle= "#0095DD";
    ctx.fillRect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.fill();
    ctx.closePath();
}

//Create the ball
const ball = {
    x : canvasWidth/2,
    y : paddleY - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3,
    dy : -3
    
}
//Draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}
//drawBall();

//bricks Shape
const brick={
    num_row : 3,
    num_column : 4,
    Brick_Width :150,
    Brick_Height :50,
    space_left :50,
    space_top : 30,
    margin_top :80 ,
    margin_left :200 ,
    color :"#0095DD"
    
}
const Brick2 = {
  BricksWidth :150,
  BricksHeight :50,
  x : paddleX- 300,
  y : 200,  
}
const Brick3 = {
  BricksWidth :150,
  BricksHeight :50,
  x : paddleX+ 300,
  y : 200,  
}
// draw the Bricks
function drawBricks(x,y,width,height){
  ctx.beginPath();
  ctx.fillStyle= "#0095DD";
  ctx.fillRect(x,y,width,height);
  ctx.fill();
  ctx.closePath();


// create Bricks
const Brick1 = {
    BricksWidth :150,
    BricksHeight :50,
    x : paddleX,
    y : 200,  
}
const Brick2 = {
    BricksWidth :150,
    BricksHeight :50,
    x : paddleX- 300,
    y : 200,  
}
const Brick3 = {
    BricksWidth :150,
    BricksHeight :50,
    x : paddleX+ 300,
    y : 200,  
}
// draw the Bricks
function drawBricks(x,y,width,height){
    ctx.beginPath();
    ctx.fillStyle= "#0095DD";
    ctx.fillRect(x,y,width,height);
    ctx.fill();
    ctx.closePath();

}


//Game Status Bar

function Score() {
  ctx.font = "1.5rem MatchupPro, sans-serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: 100`, 35, 25);
}

function level() {
  ctx.font = "1.5rem MatchupPro, sans-serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Level: 3`, (canvasWidth/2), 25);
}

function live() {
  const img = new Image();
  img.src = 'img/heart.png';
    ctx.drawImage(img, canvasWidth - 75, 10, 25, 25);
    ctx.drawImage(img, canvasWidth - 110, 10, 25, 25);
    ctx.drawImage(img, canvasWidth - 145, 10, 25, 25);
    
  }
  
}
live()

//this aya