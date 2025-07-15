/*-------------------------------- Constants --------------------------------*/
const paperImg = [
  "../assets/exam1.png",
  "../assets/exam3.png",
  "../assets/exam4.png",
  "../assets/exam5.png",
  "../assets/exam6.png"
]
const sliceSound = document.getElementById("sliceAudio")
const gameBoard = document.getElementsByClassName("gameBoard")[0]
const scoreDisplay = document.getElementById("score");
const missesDisplay = document.getElementById("misses");
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
const image = document.getElementById('school')

let score = 0
let misses = 0
let gameOver = false
/*-------------------------------- Functions --------------------------------*/
function spawnPaper (){
  const img=new Image()
  const randomz = Math.floor(Math.random() * paperImages.length);
  img.src = paperImg[randomz]
const paper = {
  x:Math.random()* (canvas.width - 130),
  y: -160,
  width:470,
  speedY: Math.random()* 5+ 2,
  gravity:0.2,
  image:img
  sliced:false
}
papers.push(paper)
}
function updatePapers(){
  for (const paper of papers){
    paper.y += paper.speedY
    paper.speedY+= paper.gravity
  }
  for (let i=paper.length - 1; i>= 0; i--){
    const paper=papers[i];
    if (paper.y>canvas.height && !paper.sliced){
      papers.splice(i,1)
      misses++
      if(misses>= 3)
        gameOver=true
    }
  }
}

function drawPapers(){
  for (const paper of papers){
    if (!paper.sliced){
      ctx.drawImage(paper.image,paper.x,paper.y,paper.width,paper.height)
    }
  }
  function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "60px Pixelify Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}
function checkSlice(mouseX, mouseY) {
  for (const paper of papers) {
    if (!paper.sliced &&
      mouseX >= paper.x &&
      mouseX <= paper.x + paper.width &&
      mouseY >= paper.y &&
      mouseY <= paper.y + paper.height
    ) {
      paper.sliced = true;
      score++;
    }
  }
}

function gameLoop() {
  if (gameOver) {
    drawGameOver();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePapers();
  drawPapers();
  requestAnimationFrame(gameLoop);
}
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePapers();
  drawPapers();
  requestAnimationFrame(gameLoop);
}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("DOMContentLoaded", function () {

  setInterval(spawnPaper, 1000);
  gameLoop();

  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    checkSlice(mouseX, mouseY);
  });
});

