const canvas =  /** @type {HTMLCanvasElement} */ (document.getElementById('myCanvas'));
//the HTMLCanvasElement is a type cast to make vscode autocomplete works for canvas..it doesn't affect the code
const ctx = canvas.getContext('2d');


const canvasWidth = canvas.width=1500;
const canvasHeight =canvas.height=900;
const paddleWidth=150;
const paddleHeight=10;

let paddleX = canvasWidth/2 - paddleWidth/2;
//draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.fillStyle= "#0095DD";
    ctx.fillRect(paddleX,canvasHeight-paddleHeight-100,paddleWidth,paddleHeight);
    ctx.fill();
    ctx.closePath();
}
drawPaddle();

