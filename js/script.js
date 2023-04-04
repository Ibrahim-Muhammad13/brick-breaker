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
    num_row : 4,
    num_column : 4,
    Brick_Width :150,
    Brick_Height :50,
    space_left :2,
    space_top : 2,
    margin_top :80 ,
    margin_left :200 ,
    color :"#0095DD"
    
}
// create the Bricks
let bricks=[];
function create_Bricks(){
  for(let rows = 0 ; rows < brick.num_row ; rows++){
        bricks[rows]=[];
        for(let column = 0; column < brick.num_column; column++){
            bricks[rows][column]={
                x: (column * (brick.space_left +brick.Brick_Width)+brick.space_left+brick.margin_left)/.5,
                y: (rows * (brick.space_top + brick.Brick_Height) + brick.space_top +brick.margin_top)/.5,
                status: 1
            }
        }
    }
}
//Draw Bricks
function draw_Bricks(){
    for(let rows = 0 ; rows < brick.num_row ; rows++){
        for(let column = 0; column < brick.num_column; column++){
            let b=bricks[rows][column];
            if(b.status ==1){
                ctx.beginPath();
                ctx.fillStyle = brick.color;
                ctx.fillRect(b.x, b.y ,brick.Brick_Width, brick.Brick_Height)
                ctx.fill();
                ctx.closePath();
            }
        }
    }   
}


//Game Status Bar

function Score() {
  ctx.font = "1.5rem MatchupPro, sans-serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: 100`, canvasWidth/25, 25);
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
//live()

//move the paddle
let moveRight=false;
let moveLeft=false;

document.addEventListener("keydown",keyDownHandller,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandller(e){
    if(e.key=="ArrowRight"){
        moveRight=true;
    }else if(e.key=="ArrowLeft"){
        moveLeft=true;
    }
}

function keyUpHandler(e){
    if(e.key=="ArrowRight"){
        moveRight=false;
    }else if(e.key=="ArrowLeft"){
        moveLeft=false;
    }
}

function movePaddle(){

if(moveRight){
    paddleX+=paddleDX;
    if(paddleX+paddleWidth>canvasWidth){
        paddleX=canvasWidth-paddleWidth;
    }
}else if(moveLeft){
    paddleX-=paddleDX;
    if(paddleX<0){
        paddleX=0;
    }
}
}


//display txt , img
function showGameStats(text, textOnX, textOnY) {
    // draw text 
     ctx.fillStyle = "red";
    ctx.font = "120px Germania One";
     ctx.fillText(text, textOnX, textOnY);

    //  image
    const game_over_img = new Image();
    game_over_img.src = 'img/game-over3.png';
    ctx.drawImage(game_over_img, canvasWidth /3, canvasHeight/3, 700, 400);

    //button
    
}
function gameOver() {
         showGameStats(`GAME OVER`, (canvasWidth/3), canvasHeight/4);
         stopBall();
}


function run(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Score();
    level();
    live();
    // drawBricks(Brick1.x,Brick1.y,Brick1.BricksWidth,Brick1.BricksHeight);
    drawBall();
    
    drawPaddle();
    movePaddle();
    moveBall();
    ballWallCollision();

    create_Bricks();
    draw_Bricks();
    gameOver();

    requestAnimationFrame(run);
}

run();



////////move the ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    dx = 3,
    dy = -3
    
}
function stopBall(){
     ball.x = canvas.width/2;
    ball.y = paddleY - BALL_RADIUS;
    speed = 0,
    ball.dx = 3 *(Math.random()* -1);
    ball.dy = -3;
    
}
////////Ball and Wall Collision detection
function ballWallCollision(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0 ){
        ball.dx = - ball.dx;
    }
    if(ball.y - ball.radius < 0 ){
        ball.dy = -ball.dy;
        
    }
    if(ball.y + ball.radius > canvas.height){
        //dy = -dy;
        
        resetBall();
    }
}


////reset the ball
function resetBall(){                           
    ball.x = canvas.width/2;
    ball.y = paddleY - BALL_RADIUS;
    speed = 4,
    ball.dx = 3 *(Math.random()* -1);
    ball.dy = -3;
} 
//draw function


//update game function
function update(){
    //movePaddle();
    moveBall();
    ballWallCollision();
}
//update();