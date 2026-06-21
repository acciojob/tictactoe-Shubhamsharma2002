//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
	const player1 = document.getElementById('player-1').value.trim();
	const player2 = document.getElementById('player-2').value.trim();

	// Validation to make sure names are entered
	if (!player1 || !player2) {
		alert("Please enter names for both players!");
		return;
	}

	// Setup game state
	let currentPlayer = player1;
	let currentSymbol = 'x';
	let gameActive = true;
	let boardState = Array(9).fill('');

	const messageDiv = document.querySelector('.message');
	const setupScreen = document.getElementById('setup-screen');
	const gameScreen = document.getElementById('game-screen');
	const cells = document.querySelectorAll('.cell');

	// Switch views
	setupScreen.classList.add('hidden');
	gameScreen.classList.remove('hidden');

	// Set initial turn message
	messageDiv.textContent = `${currentPlayer}, you're up`;

	// Winning combinations
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
		[0, 4, 8], [2, 4, 6]             // Diagonals
	];

	function checkWin() {
		return winningCombinations.some(combination => {
			return combination.every(index => {
				return boardState[index] === currentSymbol;
			});
		});
	}

	function checkDraw() {
		return boardState.every(cell => cell !== '');
	}

	cells.forEach(cell => {
		cell.addEventListener('click', function() {
			const index = parseInt(cell.id) - 1;

			// If cell is already taken or game is over, do nothing
			if (boardState[index] !== '' || !gameActive) {
				return;
			}

			// Update backend state and UI
			boardState[index] = currentSymbol;
			cell.textContent = currentSymbol;

			// Check condition
			if (checkWin()) {
				messageDiv.textContent = `${currentPlayer} congratulations you won!`;
				gameActive = false;
				return;
			}

			if (checkDraw()) {
				messageDiv.textContent = `It's a draw!`;
				gameActive = false;
				return;
			}

			// Switch turn
			if (currentPlayer === player1) {
				currentPlayer = player2;
				currentSymbol = 'o';
			} else {
				currentPlayer = player1;
				currentSymbol = 'x';
			}

			messageDiv.textContent = `${currentPlayer}, you're up`;
		});
	});
});