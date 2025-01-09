let X = document.querySelector("#X");
  let O = document.querySelector("#O");
  let hardGame = document.querySelector("#hard");
  let SimpleGame = document.querySelector("#simple");
  let box_1 = document.querySelector("#box-1");
  let box_2 = document.querySelector("#box-2");
  let box_3 = document.querySelector("#box-3");
  let box_4 = document.querySelector("#box-4");
  let box_5 = document.querySelector("#box-5");
  let box_6 = document.querySelector("#box-6");
  let box_7 = document.querySelector("#box-7");
  let box_8 = document.querySelector("#box-8");
  let box_9 = document.querySelector("#box-9");
  let result = document.querySelector("#details");
  let reset_button = document.querySelector("#restart");

  let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];
let count = 0;

let currentPlayer = "X"; 
let computerPlayer = "O";



let gameOver = false;
let startGame = false;
// Function to render game board
function renderBoard() {
  count++;
    for (let i = 0; i < gameBoard.length; i++) {
        let cell = document.getElementById(`box-${i + 1}`);
        cell.innerText = gameBoard[i];
    }

    if(count == 9 && !gameOver){
      alert("draw");
    }
}

// Function to handle user move
function handleUserMove(cellIndex) {
    if (gameOver) return;
if (gameBoard[cellIndex] !== "") return;

    gameBoard[cellIndex] = currentPlayer;
    renderBoard();

    // Check if user won
    if (checkWin(currentPlayer)) {
        gameOver = true;
        alert(currentPlayer + " win");
        return;
    }

    let computerMoveIndex = getComputerMove();
    gameBoard[computerMoveIndex] = computerPlayer;
    renderBoard();

    // Check if computer won
    if (checkWin(computerPlayer)){
        gameOver = true;
        alert(computerPlayer + " win");
    }
}

// Function to get computer move
function getComputerMove() {
    // Try to win
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            gameBoard[i] = computerPlayer;
            if (checkWin(computerPlayer)){
                gameBoard[i] = "";
                console.log(i);
                return i;
            }
            gameBoard[i] = "";
        }
    }

    // Block user win
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            gameBoard[i] = currentPlayer;
            if (checkWin(currentPlayer)) {
                gameBoard[i] = "";
                return i;
            }
            gameBoard[i] = "";
        }
    }

    if(startGame == true){
      if (gameBoard[4] === "") {
        return 4;
    };

    if (gameBoard[8] === "") {
        return 8;
    };
};

    // Play center

    // Play random
    let availableMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === ""){
            availableMoves.push(i);
        }
    }
    let random = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[random];
}

// Function to check win    
function checkWin(player) {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    for (let condition of winConditions) {
        if (
            gameBoard[condition[0]] === player &&
            gameBoard[condition[1]] === player &&
            gameBoard[condition[2]] === player
        ) {
            return true;
        }
    }
    return false;
}

// Event listeners
    document.querySelectorAll(".box").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        handleUserMove(index);
    });
});

reset_button.addEventListener("click", () => {
    gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];
    gameOver = false;
    renderBoard();
});
   
hardGame.addEventListener("click" , ()=>{
  startGame = true;
  console.log(startGame);
});
