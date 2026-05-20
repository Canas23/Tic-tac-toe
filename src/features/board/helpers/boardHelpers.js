export const createEmptyBoard = () => {
  return Array(9).fill(null);
};

export const checkSquareAvailability = (board, position) => {
  return board[position] === null;
};