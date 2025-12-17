import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameStats, Difficulty } from '../types/sudoku';

interface StatsStore extends GameStats {
  recordWin: (difficulty: Difficulty, score: number, timeElapsed: number) => void;
  recordLoss: () => void;
}

const createInitialStats = (): GameStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  bestScore: 0,
  bestScoreByDifficulty: {
    easy: 0,
    mid: 0,
    hard: 0,
    hardAF: 0,
    goat: 0,
    divine: 0,
  },
  fastestWinTime: null,
});

export const useStatsStore = create<StatsStore>()(
  persist(
    (set, get) => ({
      ...createInitialStats(),

      recordWin: (difficulty: Difficulty, score: number, timeElapsed: number) => {
        const state = get();
        const newBestScore = Math.max(state.bestScore, score);
        const newBestScoreByDifficulty = {
          ...state.bestScoreByDifficulty,
          [difficulty]: Math.max(state.bestScoreByDifficulty[difficulty], score),
        };
        const newFastestWinTime =
          state.fastestWinTime === null
            ? timeElapsed
            : Math.min(state.fastestWinTime, timeElapsed);

        set({
          gamesPlayed: state.gamesPlayed + 1,
          gamesWon: state.gamesWon + 1,
          bestScore: newBestScore,
          bestScoreByDifficulty: newBestScoreByDifficulty,
          fastestWinTime: newFastestWinTime,
        });
      },

      recordLoss: () => {
        const state = get();
        set({
          gamesPlayed: state.gamesPlayed + 1,
          gamesLost: state.gamesLost + 1,
        });
      },
    }),
    {
      name: 'sudoku_stats_v1',
    }
  )
);
