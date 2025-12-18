import { SudokuGrid } from '../types/sudoku';

export function getCompletedNumbers(
  grid: SudokuGrid,
  solution: SudokuGrid,
  fixedCells: boolean[][]
): number[] {
  void fixedCells;
  const completed: number[] = [];

  for (let n = 1; n <= 9; n++) {
    let correctCount = 0;
    let incorrectCount = 0;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = grid[r]?.[c] ?? null;
        if (v !== n) continue;

        const isCorrect = solution[r]?.[c] === n;
        if (isCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    }

    // Completed means all 9 occurrences are correctly placed, and there are no incorrect placements.
    // Fixed cells are already included in `grid`, but we keep `fixedCells` in the signature
    // to match call sites and allow future rule tweaks.
    if (correctCount === 9 && incorrectCount === 0) {
      completed.push(n);
    }
  }

  return completed;
}

export function getRemainingNumbers(
  grid: SudokuGrid,
  solution: SudokuGrid,
  fixedCells: boolean[][]
): number[] {
  const completed = new Set(getCompletedNumbers(grid, solution, fixedCells));
  const remaining: number[] = [];

  for (let n = 1; n <= 9; n++) {
    if (!completed.has(n)) remaining.push(n);
  }

  return remaining;
}
