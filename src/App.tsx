import { useState } from "react";
import { Button } from "./components/ui/button";

type Player = 'X' | 'O' | null;

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (board: Player[]): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board: Player[]): boolean => {
    return board.every(cell => cell !== null);
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (checkDraw(newBoard)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (gameOver) return "It's a draw!";
    return `Player ${currentPlayer}'s turn`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tic Tac Toe
        </h1>
        
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">
            {getStatusMessage()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 w-72 h-72 mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className="w-full h-full bg-gray-100 border-2 border-gray-300 rounded-lg
                         text-4xl font-bold text-gray-800 hover:bg-gray-200 
                         transition-colors duration-200 disabled:cursor-not-allowed
                         disabled:hover:bg-gray-100 flex items-center justify-center"
              disabled={!!cell || !!winner || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={resetGame}
            className="px-8 py-2 text-lg"
          >
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
