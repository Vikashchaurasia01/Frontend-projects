const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const gameResultDisplay = document.getElementById('game-result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('filled');

            if (checkWin()) {
                gameResultDisplay.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
            } else if (gameBoard.every(cell => cell !== '')) {
                gameResultDisplay.textContent = 'It\'s a tie!';
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

function checkWin() {
    return (
        checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8) ||
        checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8) ||
        checkRow(0, 4, 8) || checkRow(2, 4, 6)
    );
}

function checkRow(a, b, c) {
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
}
