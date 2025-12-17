import { SudokuGrid, Difficulty } from '../types/sudoku';
import { hasUniqueSolution } from './sudokuSolver';
import { DIFFICULTY_CONFIGS } from './difficulties';

/**
 * Create an empty 9x9 grid
 */
function createEmptyGrid(): SudokuGrid {
  return Array(9).fill(null).map(() => Array(9).fill(null));
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Fill the grid with a valid complete Sudoku solution
 */
function fillGrid(grid: SudokuGrid): boolean {
  const emptyCell = findEmptyCell(grid);
  
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;

      if (fillGrid(grid)) {
        return true;
      }

      grid[row][col] = null;
    }
  }

  return false;
}

/**
 * Find next empty cell
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
 * Check if placement is valid
 */
function isValidPlacement(grid: SudokuGrid, row: number, col: number, value: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === value) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === value) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === value) return false;
    }
  }

  return true;
}

/**
 * Remove cells from a complete grid to create a puzzle
 */
function removeNumbers(grid: SudokuGrid, cellsToRemove: number): SudokuGrid {
  const puzzle = grid.map(row => [...row]);
  let removed = 0;
  const attempts = cellsToRemove * 3; // Limit attempts to avoid infinite loop
  let attemptCount = 0;

  while (removed < cellsToRemove && attemptCount < attempts) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== null) {
      const backup = puzzle[row][col];
      puzzle[row][col] = null;

      // For harder difficulties, we skip the unique solution check for performance
      // The puzzle will still be solvable but may have multiple solutions
      const shouldCheckUnique = cellsToRemove < 55;

      if (!shouldCheckUnique || hasUniqueSolution(puzzle)) {
        removed++;
      } else {
        puzzle[row][col] = backup;
      }
    }

    attemptCount++;
  }

  return puzzle;
}

/**
 * Generate a complete Sudoku puzzle with solution
 */
export function generateSudoku(difficulty: Difficulty): {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
} {
  const grid = createEmptyGrid();
  fillGrid(grid);
  
  const solution = grid.map(row => [...row]);
  const config = DIFFICULTY_CONFIGS[difficulty];
  const puzzle = removeNumbers(grid, config.cellsToRemove);

  return { puzzle, solution };
}

/**
 * Create a fixed cells map (cells that cannot be changed)
 */
export function createFixedCellsMap(puzzle: SudokuGrid): boolean[][] {
  return puzzle.map(row => row.map(cell => cell !== null));
}
