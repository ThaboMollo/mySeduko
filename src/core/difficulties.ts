import { Difficulty, DifficultyConfig } from '../types/sudoku';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: 'easy',
    multiplier: 1,
    cellsToRemove: 35,
    label: 'Easy'
  },
  mid: {
    name: 'mid',
    multiplier: 1.5,
    cellsToRemove: 45,
    label: 'Medium'
  },
  hard: {
    name: 'hard',
    multiplier: 2,
    cellsToRemove: 50,
    label: 'Hard'
  },
  hardAF: {
    name: 'hardAF',
    multiplier: 3,
    cellsToRemove: 55,
    label: 'Hard AF'
  },
  goat: {
    name: 'goat',
    multiplier: 5,
    cellsToRemove: 60,
    label: 'GOAT'
  },
  divine: {
    name: 'divine',
    multiplier: 10,
    cellsToRemove: 64,
    label: 'Divine'
  }
};

export const DIFFICULTIES: Difficulty[] = ['easy', 'mid', 'hard', 'hardAF', 'goat', 'divine'];
