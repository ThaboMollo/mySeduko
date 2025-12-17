import { Difficulty, ScoreConfig } from '../types/sudoku';
import { DIFFICULTY_CONFIGS } from './difficulties';

export const SCORE_CONFIG: ScoreConfig = {
  baseScore: 10,
  correctPlacement: 10
};

export const INITIAL_LIVES = 3;

export function calculateScore(difficulty: Difficulty): number {
  const config = DIFFICULTY_CONFIGS[difficulty];
  return SCORE_CONFIG.correctPlacement * config.multiplier;
}

export function getMultiplier(difficulty: Difficulty): number {
  return DIFFICULTY_CONFIGS[difficulty].multiplier;
}
