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
let paddleDX=15;
//draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.fillStyle= "#0095DD";
    ctx.fillRect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.fill();
    ctx.closePath();
}
let ballSpeed =15;
//Create the ball
const ball = {
    x : canvasWidth/2,
    y : paddleY - BALL_RADIUS,
    radius : BALL_RADIUS,
    dx : ballSpeed*(Math.random()*2 -1),
    dy : -ballSpeed
    
}
console.log(ball.dx)
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

let life = 3;
function live() {
    let imgg = 75;    
  const img = new Image();
  
  img.src = 'img/heart.png';
  
  for(let i=0 ;i<life;i++){
    
    ctx.drawImage(img, canvasWidth - imgg, 10, 25, 25);
    imgg +=35 ;

}
}
//    ctx.drawImage(img, canvasWidth - 75, 10, 25, 25);
//    ctx.drawImage(img, canvasWidth - 110, 10, 25, 25);
//    ctx.drawImage(img, canvasWidth - 145, 10, 25, 25);
//}
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



let gameover= false;
function showGameOVer(){
    document.getElementById('gameover').style.display='block';
    document.getElementById('lost').style.display='block';
    document.getElementById('restart').addEventListener('click',function(){
        location.reload();
    })

}
function gameOver(){
    if(life==0){
       showGameOVer();
        gameover=true;
    }
}



function playAgain(){
    ctx.beginPath();
    ctx.fillStyle= "rgba(0,225,225,0.5)";
    ctx.fillRect(1100,700,300,150);
    ctx.fill();
    ctx.closePath();
    ctx.font = '40pt Kremlin Pro Web';
    ctx.fillStyle = 'red';
    ctx.fillText('Play Again', 1140,785);
   document.addEventListener("click", resetBall);


}


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
    ball.dx = ballSpeed *(Math.random()*2 -1);
    ball.dy = -ballSpeed;
    
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
    life--;
    live();
        resetBall();
        restPaddle();
    }
}


////reset the ball
function resetBall(){                           
    ball.x = canvas.width/2;
    ball.y = paddleY - BALL_RADIUS;
    speed = 4,
    ball.dx = ballSpeed *(Math.random()*2 -1);
    ball.dy = -ballSpeed;
} 
//rest the paddle

function restPaddle(){

paddleX = canvasWidth/2 - paddleWidth/2;
paddleY = canvasHeight-paddleHeight-paddleMarginBottom;
}

//hit ball with paddle

function paddleBallCollision(){
    if(ball.x<paddleX+paddleWidth&&ball.x>paddleX &&ball.y<paddleY+paddleHeight&&ball.y>paddleY){
        ball.dx = -ballSpeed;
        ball.dy= -ball.dy; 
    }
}


//keep this function at the bottom
function run(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Score();
    level();
    live();
    drawBall();
    drawPaddle();
    movePaddle();
    moveBall();
    ballWallCollision();
    create_Bricks();
    draw_Bricks();
    gameOver();
 
    paddleBallCollision();
    if(!gameover){
        requestAnimationFrame(run);
    }
}

run();
