/*-------------------------------- Constants --------------------------------*/
const paperImg = [
  "../assets/exam1.png",
  "../assets/exam3.png",
  "../assets/exam4.png",
  "../assets/exam5.png",  "../assets/exam6.png"
]
const sliceSound = document.getElementById("sliceAudio")
const gameBoard = document.getElementsByClassName("gameBoard")[0]
const scoreDisplay = document.getElementById("score");
const missesDisplay = document.getElementById("misses");

let score = 0
let misses = 0let gameOver = false
/*-------------------------------- Functions --------------------------------*/
