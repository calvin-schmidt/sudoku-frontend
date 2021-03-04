const solveSudoku = (board) => {
  const findEmpty = (board) => {
    for (let j = 0; j < board.length; j++) {
      for (let i = 0; i < board[0].length; i++) {
        if (board[j][i] === 0) {
          return [j, i];
        }
      }
    }
    return null;
  };

  const valid = (board, num, pos) => {
    // check column
    for (let row = 0; row <= 8; row++) {
      if (board[row][pos[1]] === num && pos[0] !== row) {
        return false;
      }
    }
    // check row
    for (let col = 0; col <= 8; col++) {
      if (board[pos[0]][col] === num && pos[1] !== col) {
        return false;
      }
    }
    // check box
    let boxCol = Math.floor(pos[1] / 3);
    let boxRow = Math.floor(pos[0] / 3);
    for (let i = boxCol * 3; i <= boxCol * 3 + 2; i++) {
      for (let j = boxRow * 3; j <= boxRow * 3 + 2; j++) {
        if (board[j][i] === num && [j, i] != pos) {
          return false;
        }
      }
    }
    return true;
  };

  let find = findEmpty(board);
  if (!find) {
    return true;
  } else {
    var row = find[0];
    var col = find[1];
  }

  for (let num = 1; num <= 9; num++) {
    if (valid(board, num, [row, col])) {
      board[row][col] = num;
      if (solveSudoku(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }
  return false;
};

export default solveSudoku;
