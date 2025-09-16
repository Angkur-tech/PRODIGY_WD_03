const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartBtn.addEventListener('click', restartGame);

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isXTurn ? 'X' : 'O';
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    messageEl.textContent = `🎉 Player ${currentPlayer} Wins!`;
    endGame();
  } else if ([...cells].every(cell => cell.textContent !== '')) {
    messageEl.textContent = "It's a Draw!";
  } else {
    isXTurn = !isXTurn;
    messageEl.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  isXTurn = true;
  messageEl.textContent = "Player X's Turn";
}
