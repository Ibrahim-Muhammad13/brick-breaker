const canvas =  /** @type {HTMLCanvasElement} */ (document.getElementById('myCanvas'));
//the HTMLCanvasElement is a type cast to make vscode autocomplete works for canvas..it doesn't affect the code
const ctx = canvas.getContext('2d');
const BALL_RADIUS = 10;

const canvasWidth = canvas.width=window.innerWidth;
const canvasHeight =canvas.height=window.innerHeight;
const paddleWidth=300;
const paddleHeight=20;
const paddleMarginBottom=100;


let paddleX = canvasWidth/2 - paddleWidth/2;
let paddleY = canvasHeight-paddleHeight-paddleMarginBottom;
let paddleDX=20;
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
    num_row : 2,
    num_column : 3,
    Brick_Width :300,
    Brick_Height :40,
    space_left :5,
    space_top : 5,
    margin_top :200 ,
    margin_left :850 ,
  //   color :"#0095DD"
 
    
}
// create the Bricks
let bricks=[];
function create_Bricks(){
  for(let rows = 0 ; rows < brick.num_row ; rows++){
        bricks[rows]=[];
        for(let column = 0; column < brick.num_column; column++){
            bricks[rows][column]={
                x: (column * (brick.space_left +brick.Brick_Width)+brick.space_left+brick.margin_left),
                y: (rows * (brick.space_top + brick.Brick_Height) + brick.space_top +brick.margin_top),
                status: 1,
                color:"#0095DD",
                hited:false
            }
        }
    }
}
create_Bricks();
//Draw Bricks
function draw_Bricks(){
    for(let rows = 0 ; rows < brick.num_row ; rows++){
        for(let column = 0; column < brick.num_column; column++){
            let b=bricks[rows][column];
            if(b.status ==1){
                ctx.beginPath();
                ctx.fillStyle = b.color;
                ctx.fillRect(b.x, b.y ,brick.Brick_Width, brick.Brick_Height)
                ctx.fill();
                ctx.closePath();
            }
        }
    }   
}

// Bricks collision
function bricksCollision() {
    for(let rows = 0 ; rows < brick.num_row ; rows++){
        for(let column = 0; column < brick.num_column; column++){
            let b=bricks[rows][column];
            if(b.status){
                if (ball.x + ball.radius > b.x &&
                    ball.x - ball.radius < b.x + brick.Brick_Width &&
                    ball.y + ball.radius > b.y &&
                    ball.y - ball.radius < b.y + brick.Brick_Height){
                        if(!b.hited){
                            b.color="red";
                            b.hited=true;
                        }else{
                            score+=scoreIncrement;
                            b.status = 0;
                        }
                        ball.dy = -ball.dy;
                        if(score==brick.num_row*brick.num_column*10){
                            // lvlup=true;
                            Level++;
                            brick.num_row+=1;
                            brick.num_column+=1;
                            brick.margin_left-=180;
                            create_Bricks();
                            // levelup_div.style.display='block';
                            // continue_img.addEventListener('click',hide_levelup)
                            // continue_img.addEventListener('click',levelUp)
                        }
                    }
            }
        }
    }
}
// levelup_div=document.getElementById('LevelUp');
// continue_img=document.getElementById('continue');

// win_img=document.getElementById('win');
// // let lvlup =false;
// function hide_levelup(){
//     continue_img.hidden = true;
//     win_img.hidden = true;
//     resetBall();
//     restPaddle();
// }
// function levelUp(){
//     Level++;
//     brick.num_row+=1;
//     brick.num_column+=1;
//     brick.margin_left-=180;
//     create_Bricks();
//     StopBall();

// }
//stop the Ball
function StopBall(){                           
    ball.x = canvas.width/2;
    ball.y = paddleY - BALL_RADIUS;
    speed = 0,
    ball.dx = ballSpeed *(Math.random()*2 -1);
    ball.dy = -ballSpeed;
} 

//Game Status Bar
let score =0;
let scoreIncrement=10;
function Score() {
  ctx.font = "3rem MatchupPro, sans-serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, canvasWidth/25, 25);
}
let Level =1;
function level() {
  ctx.font = "3rem MatchupPro, sans-serif";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Level: ${Level}`, (canvasWidth/2), 25);
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
    document.getElementById('score').innerText+=score;
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
    document.addEventListener("click", resetBall());

}


////////move the ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    dx = 3;
    dy = -3;
    
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
       let point = ball.x-(paddleX+paddleWidth/2);
       point = point/(paddleWidth/2);
       let angle = point*Math.PI/3;
       ball.dx = ballSpeed*Math.sin(angle);
        ball.dy= -ballSpeed*Math.cos(angle); 
        // ball.dx = -ballSpeed;
        // ball.dy= -ball.dy; 
    }
}


//move with mouse 
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
    if(paddleX+paddleWidth>canvasWidth){
        paddleX=canvasWidth-paddleWidth;
    }
    if(paddleX<0){
        paddleX=0;
    }
  }
  

//keep this function at the bottom

start_img=document.getElementById('start');
start_img.addEventListener('click',hide)
start_img.addEventListener('click',run)
function hide() {
    start_img.hidden = true;
 }
 function run(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Score();
    level();
    live();
    drawBall();
    drawPaddle();
    draw_Bricks();
    movePaddle();
    moveBall();
    ballWallCollision();
    bricksCollision()
    gameOver();
    paddleBallCollision();
    if(!gameover){
        requestAnimationFrame(run);
    }
    

    

}

//run();
