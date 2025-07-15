/*-------------------------------- Constants --------------------------------*/
const paperImg = [
  "../assets/exam1.png",
  "../assets/exam3.png",
  "../assets/exam4.png",
  "../assets/exam5.png",
  "../assets/exam6.png"
]
const gameBoard = document.getElementsByClassName("gameBoard")[0]
const scoreDisplay = document.getElementById("score");
const missesDisplay = document.getElementById("misses");
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
const image = document.getElementById('school')
const gameOverAudio = document.getElementById('gameOverAudio')
const slicerAudio = document.getElementById('sliceAudio')
const missAudio = document.getElementById('missAudio')
const winAudio = document.getElementById('winAudio')
const restartBtn = document.getElementsByClassName("myButton")[0]

let score = 0
let misses = 0
let papers = []
let gameOver = false
let youWon= false
/*-------------------------------- Functions --------------------------------*/
function spawnPaper() {
  const img = new Image();
  const randomIndex = Math.floor(Math.random() * paperImg.length);
  img.src = paperImg[randomIndex];

  const paper = {
    x: Math.random() * (canvas.width - 80),
    y: -160,
    width: 70,
    height: 80,
    speedY: Math.random() * 5 + 2,
    gravity: 0.2,
    image: img,
    sliced: false
  };

  papers.push(paper);
}

function updatePapers() {
  for (const paper of papers) {
    paper.y += paper.speedY;
    paper.speedY += paper.gravity;
  }

  for (let i = papers.length - 1; i >= 0; i--) {
    const paper = papers[i];
    if (paper.y > canvas.height && !paper.sliced) {
      papers.splice(i, 1);
      misses++;
      missesDisplay.textContent = misses;
      missAudio.play()
      if (misses >= 3) gameOver = true;

    }
  }
}

function drawPapers() {
  for (const paper of papers) {
    if (!paper.sliced) {
      ctx.drawImage(paper.image, paper.x, paper.y, paper.width, paper.height);
    }
  }
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "60px Pixelify Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("You Lose", canvas.width / 2, canvas.height / 2);
}
function drawYouWon() {
  ctx.fillStyle = "rgba(26, 255, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "60px Pixelify Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("You Won !", canvas.width / 2, canvas.height / 2);
}
function checkSlice(mouseX, mouseY) {
  for (const paper of papers) {
    if (
      !paper.sliced &&
      mouseX >= paper.x &&
      mouseX <= paper.x + paper.width &&
      mouseY >= paper.y &&
      mouseY <= paper.y + paper.height
    ) {
      paper.sliced = true;
      score++;
      scoreDisplay.textContent = score;
      slicerAudio.play()
      if (score >= 5) youWon = true;

    }
  }
}

function gameLoop() {
  if (gameOver) {
    drawGameOver()
    gameOverAudio.play()

    return
  }
  if (youWon){
    drawYouWon()
    winAudio.play()

    return
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
  restartBtn.addEventListener("click",()=>{
score = 0
misses = 0
papers = []
gameOver = false
youWon= false
 scoreDisplay.textContent = score
  missesDisplay.textContent = misses

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  gameLoop()
  })
});