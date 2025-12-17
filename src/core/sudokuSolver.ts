import { SudokuGrid } from '../types/sudoku';
import { isValidPlacement } from './sudokuValidator';

/**
 * Find next empty cell in the grid
 */
function findEmptyCell(grid: SudokuGrid): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Solve Sudoku using backtracking algorithm
 */
export function solveSudoku(grid: SudokuGrid): boolean {
  const emptyCell = findEmptyCell(grid);
  
  if (!emptyCell) {
    return true; // Puzzle solved
  }

  const [row, col] = emptyCell;

  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      // Backtrack
      grid[row][col] = null;
    }
  }

  return false;
}

/**
 * Create a deep copy of the grid and solve it
 */
export function getSolution(grid: SudokuGrid): SudokuGrid {
  const gridCopy = grid.map(row => [...row]);
  solveSudoku(gridCopy);
  return gridCopy;
}

/**
 * Check if a Sudoku puzzle has a unique solution
 */
export function hasUniqueSolution(grid: SudokuGrid): boolean {
  const gridCopy = grid.map(row => [...row]);
  let solutionCount = 0;

  function countSolutions(g: SudokuGrid): void {
    if (solutionCount > 1) return;

    const emptyCell = findEmptyCell(g);
    
    if (!emptyCell) {
      solutionCount++;
      return;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num;
        countSolutions(g);
        g[row][col] = null;
      }
    }
  }

  countSolutions(gridCopy);
  return solutionCount === 1;
}
