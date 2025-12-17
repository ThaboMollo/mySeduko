import { SudokuGrid } from '../types/sudoku';

/**
 * Check if a value is valid in a specific cell position
 */
export function isValidPlacement(
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === value) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === value) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c] === value) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Check if the current grid state is valid (no conflicts)
 */
export function isGridValid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== null) {
        // Temporarily remove value to check if it's valid
        grid[row][col] = null;
        const valid = isValidPlacement(grid, row, col, value);
        grid[row][col] = value;
        
        if (!valid) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * Check if the puzzle is completely solved
 */
export function isPuzzleComplete(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return false;
      }
    }
  }
  return isGridValid(grid);
}

/**
 * Check if a placement matches the solution
 */
export function isCorrectPlacement(
  grid: SudokuGrid,
  solution: SudokuGrid,
  row: number,
  col: number
): boolean {
  return grid[row][col] === solution[row][col];
}
