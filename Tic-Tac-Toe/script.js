const { tsNonNullExpression } = require("@babel/types");

const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Let's create a function to initialize game

function initGame() {
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pe empty bhi krna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // green color ko bhi remove karna hai
        // initialise box with css properties again
        box.classList = `box box${index}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current Player - ${currPlayer}`;
}

initGame();

function swapTurn() {
    if(currPlayer === "X"){
        currPlayer = "0";
    } else {
        currPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `current Player - ${currPlayer}`;
}

function checkgameOver(){
    let ans = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // Check idf winner is x
            if(gameGrid[position[0]] === "X")
                ans = "X";
            else
                ans = "0";

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know X/0 is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // we have a winner
    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        fillCount++;
    });

    // board is filled, game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapTurn();
        // Check koi jeet to nhi gya
        checkgameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);