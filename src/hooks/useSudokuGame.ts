import { useGameStore } from '../store/gameStore';

/**
 * Custom hook for accessing Sudoku game state and actions
 * Provides a clean interface to the game store
 */
export function useSudokuGame() {
  const store = useGameStore();

  return {
    // State
    grid: store.grid,
    solution: store.solution,
    fixedCells: store.fixedCells,
    selectedCell: store.selectedCell,
    difficulty: store.difficulty,
    lives: store.lives,
    score: store.score,
    isGameOver: store.isGameOver,
    isCompleted: store.isCompleted,
    startTime: store.startTime,

    // Actions
    startNewGame: store.startNewGame,
    selectCell: store.selectCell,
    placeNumber: store.placeNumber,
    clearCell: store.clearCell,
    resetGame: store.resetGame,
  };
}
