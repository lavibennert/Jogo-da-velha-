const cells = document.querySelectorAll('.cell');
const messageElement = document.querySelector('.message');
const restartBtn = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) return;

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.textContent = currentPlayer;

    checkWin();
    if (gameActive) switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Jogador ${currentPlayer}`;
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            messageElement.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        messageElement.textContent = 'Empate!';
        gameActive = false;
    }
}

function restartgame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    messageElement.textContent = `Jogador ${currentPlayer}`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
   
}
function chamastring(){
    alert('conectado')
}
// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartgame);

// Initialize message
messageElement.textContent = `Jogador ${currentPlayer}`;