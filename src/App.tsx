import { useState } from 'react';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState<null[] | string[]>(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board: null[] | string[]) => {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [firstEl, secondEl, thirdEl] = winningPatterns[i];

      if (
        board[firstEl] &&
        board[firstEl] === board[secondEl] &&
        board[firstEl] === board[thirdEl]
      ) {
        return board[firstEl];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    const winner = checkWinner(board);

    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard as string[]);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const getStatus = () => {
    const winner = checkWinner(board);

    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null!)) return `Draw!`;

    return `Player ${isXNext ? 'X' : 'O'}'s turn`;
  };

  return (
    <>
      <div className='w-2/3 mx-auto mt-20 max-w-[300px] text-white'>
        <div className='mb-5 w-full flex justify-between items-center'>
          <h1 className='font-bold text-[20px]'>{getStatus()}</h1>
          <button
            onClick={resetGame}
            className='py-2 px-4 border-[1px] border-white rounded-md hover:bg-sky-500 hover:text-white duration-150'
          >
            Reset
          </button>
        </div>
        <div className='w-full border-gray-400 border-[1px] grid grid-cols-3 justify-center'>
          {board.map((tile, index) => {
            return (
              <button
                className='p-4 text-center h-[100px] text-[32px] flex items-center justify-center cursor-pointer transition-all duration-100 border-[1px] border-gray-400 hover:bg-gray-300'
                key={index}
                onClick={() => handleClick(index)}
                disabled={tile !== null}
              >
                {tile}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
