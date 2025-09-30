// 🎵 Load sound effects (make sure these files exist in /sounds/)
let clickSound = new Audio("sounds/click.wav");
let winSound   = new Audio("sounds/win.wav");
let drawSound  = new Audio("sounds/draw.wav");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn = document.querySelector("#start-btn");
let startContainer = document.querySelector(".start-container");
let gameBoard = document.querySelector("#game-board");
let turnMsg = document.querySelector("#turn-msg");

let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");

let player1 = "Player O";
let player2 = "Player X";

let turnO = true; // O starts
let count = 0;

// All winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// 🎮 Start game after entering names
startBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player O";
  player2 = player2Input.value || "Player X";

  startContainer.classList.add("hide");
  gameBoard.classList.remove("hide");

  turnMsg.innerText = `${player1}'s Turn (O)`;
});

// 🎮 Game logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // 🔊 Play click sound
    clickSound.currentTime = 0;
    clickSound.play();

    if (turnO) {
      box.innerText = "O";
      turnO = false;
      turnMsg.innerText = `${player2}'s Turn (X)`;
    } else {
      box.innerText = "X";
      turnO = true;
      turnMsg.innerText = `${player1}'s Turn (O)`;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// 🎮 Game Draw
const gameDraw = () => {
  drawSound.currentTime = 0;
  drawSound.play();

  msg.innerText = `😮 It's a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// 🔒 Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// 🔓 Enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7"; // reset background
  }
};

// 🏆 Show Winner
const showWinner = (winner) => {
  winSound.currentTime = 0;
  winSound.play();

  let winnerName = winner === "O" ? player1 : player2;
  msg.innerText = `🎉 Congratulations, ${winnerName} Wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// ✅ Check Winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos2Val && pos3Val) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // Highlight winning boxes
        pattern.forEach(i => boxes[i].style.backgroundColor = "#90ee90");
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// 🔄 Reset Game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnMsg.innerText = `${player1}'s Turn (O)`;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
