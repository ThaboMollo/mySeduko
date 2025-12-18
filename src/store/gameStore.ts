import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Difficulty, GameSummary } from '../types/sudoku';
import { generateSudoku, createFixedCellsMap } from '../core/sudokuGenerator';
import { isCorrectPlacement, isPuzzleComplete } from '../core/sudokuValidator';
import { calculateScore, INITIAL_LIVES } from '../core/scoring';
import { useStatsStore } from './statsStore';

interface GameStore extends GameState {
  lastGameSummary: GameSummary | null;
  lastCorrectMove: { row: number; col: number; value: number; id: string } | null;
  // Actions
  startNewGame: (difficulty: Difficulty) => void;
  selectCell: (row: number, col: number) => void;
  setSelectedNumber: (num: number | null) => void;
  placeNumber: (value: number) => void;
  clearCell: () => void;
  resetGame: () => void;
  updateTimer: () => void;
  hasActiveGame: () => boolean;
  goHome: () => void;
  clearLastSummary: () => void;
}

const createInitialState = () => {
  return {
    grid: [],
    solution: [],
    fixedCells: [],
    selectedCell: null,
    selectedNumber: null,
    difficulty: 'easy' as Difficulty,
    lives: INITIAL_LIVES,
    score: 0,
    gameStatus: 'idle' as const,
    startTime: 0,
    timeElapsed: 0,
    lastGameSummary: null,
    lastCorrectMove: null
  };
};

// Timer interval ID
let timerInterval: ReturnType<typeof setInterval> | null = null;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      lastGameSummary: null,

      startNewGame: (difficulty: Difficulty) => {
        // Clear existing timer
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }

        const { puzzle, solution } = generateSudoku(difficulty);
        set({
          grid: puzzle,
          solution,
          fixedCells: createFixedCellsMap(puzzle),
          selectedCell: null,
          selectedNumber: null,
          lastCorrectMove: null,
          difficulty,
          lives: INITIAL_LIVES,
          score: 0,
          gameStatus: 'playing',
          startTime: Date.now(),
          timeElapsed: 0
        });

        // Start timer
        timerInterval = setInterval(() => {
          const state = get();
          if (state.gameStatus === 'playing') {
            set({ timeElapsed: Math.floor((Date.now() - state.startTime) / 1000) });
          }
        }, 1000);
      },

      selectCell: (row: number, col: number) => {
        const { gameStatus, grid } = get();
        
        if (gameStatus !== 'playing') return;

        const cellValue = grid[row][col];
        
        // If clicking a filled cell, set selectedNumber to that value
        if (cellValue !== null) {
          set({ 
            selectedCell: { row, col },
            selectedNumber: cellValue
          });
        } else {
          set({ selectedCell: { row, col } });
        }
      },

      setSelectedNumber: (num: number | null) => {
        set({ selectedNumber: num });
      },

      placeNumber: (value: number) => {
        const { selectedCell, grid, solution, fixedCells, lives, score, difficulty, gameStatus, timeElapsed } = get();
        
        if (!selectedCell || gameStatus !== 'playing') return;
        
        const { row, col } = selectedCell;
        
        if (fixedCells[row][col]) return; // Can't modify fixed cells

        // Create new grid with the value
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = value;

        // Check if placement is correct
        const isCorrect = isCorrectPlacement(newGrid, solution, row, col);
        
        if (isCorrect) {
          const correctMoveId = `${Date.now()}_${row}_${col}_${value}`;
          set({
            lastCorrectMove: { row, col, value, id: correctMoveId }
          });

          setTimeout(() => {
            const state = get();
            if (state.lastCorrectMove?.id === correctMoveId) {
              set({ lastCorrectMove: null });
            }
          }, 320);

          // Correct placement - add score
          const points = calculateScore(difficulty);
          const newScore = score + points;
          
          // Check if puzzle is complete
          const isComplete = isPuzzleComplete(newGrid);
          
          if (isComplete) {
            // Stop timer
            if (timerInterval) {
              clearInterval(timerInterval);
              timerInterval = null;
            }
            // Record win
            useStatsStore.getState().recordWin(difficulty, newScore, timeElapsed);
            
            // Create game summary
            const summary: GameSummary = {
              result: 'won',
              score: newScore,
              difficulty,
              timeElapsed,
              mistakes: INITIAL_LIVES - lives,
              completedAt: Date.now()
            };
            
            set({
              grid: newGrid,
              score: newScore,
              gameStatus: 'won',
              selectedNumber: value,
              lastGameSummary: summary
            });
          } else {
            set({
              grid: newGrid,
              score: newScore,
              selectedNumber: value
            });
          }
        } else {
          // Wrong placement - lose a life
          const newLives = lives - 1;
          
          if (newLives <= 0) {
            // Stop timer
            if (timerInterval) {
              clearInterval(timerInterval);
              timerInterval = null;
            }
            // Record loss
            useStatsStore.getState().recordLoss();
            
            // Create game summary
            const summary: GameSummary = {
              result: 'lost',
              score,
              difficulty,
              timeElapsed,
              mistakes: INITIAL_LIVES,
              completedAt: Date.now()
            };
            
            set({
              lives: 0,
              gameStatus: 'lost',
              lastGameSummary: summary
            });
          } else {
            set({ lives: newLives });
          }
        }
      },

      clearCell: () => {
        const { selectedCell, grid, fixedCells, gameStatus } = get();
        
        if (!selectedCell || gameStatus !== 'playing') return;
        
        const { row, col } = selectedCell;
        
        if (fixedCells[row][col]) return;

        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = null;
        
        set({ grid: newGrid, selectedNumber: null });
      },

      resetGame: () => {
        const { difficulty } = get();
        get().startNewGame(difficulty);
      },

      updateTimer: () => {
        const { startTime, gameStatus } = get();
        if (gameStatus === 'playing') {
          set({ timeElapsed: Math.floor((Date.now() - startTime) / 1000) });
        }
      },

      hasActiveGame: () => {
        const state = get();
        return state.gameStatus === 'playing' && state.grid.length > 0;
      },

      goHome: () => {
        // Stop timer
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        // Don't clear game state, just stop playing
        const state = get();
        if (state.gameStatus === 'playing') {
          set({ gameStatus: 'idle' });
        }
      },

      clearLastSummary: () => {
        set({ lastGameSummary: null });
      }
    }),
    {
      name: 'sudoku_saved_game_v1',
      partialize: (state) => ({
        grid: state.grid,
        solution: state.solution,
        fixedCells: state.fixedCells,
        selectedCell: state.selectedCell,
        selectedNumber: state.selectedNumber,
        difficulty: state.difficulty,
        lives: state.lives,
        score: state.score,
        gameStatus: state.gameStatus,
        startTime: state.startTime,
        timeElapsed: state.timeElapsed,
        lastGameSummary: state.lastGameSummary
      })
    }
  )
);
