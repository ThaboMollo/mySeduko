export type Difficulty = 'easy' | 'mid' | 'hard' | 'hardAF' | 'goat' | 'divine';

export type Theme = 'dark' | 'light' | 'midnight';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export type CellValue = number | null;

export type SudokuGrid = CellValue[][];

export interface Cell {
  value: CellValue;
  isFixed: boolean;
  isValid: boolean;
  isSelected: boolean;
}

export interface GameState {
  grid: SudokuGrid;
  solution: SudokuGrid;
  fixedCells: boolean[][];
  selectedCell: { row: number; col: number } | null;
  selectedNumber: number | null;
  difficulty: Difficulty;
  lives: number;
  score: number;
  gameStatus: GameStatus;
  startTime: number;
  timeElapsed: number;
}

export interface Settings {
  theme: Theme;
  selectedDifficulty: Difficulty;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  bestScore: number;
  bestScoreByDifficulty: Record<Difficulty, number>;
  fastestWinTime: number | null;
}

export interface GameSummary {
  result: 'won' | 'lost';
  score: number;
  difficulty: Difficulty;
  timeElapsed: number;
  mistakes: number;
  completedAt: number;
}

export interface DifficultyConfig {
  name: Difficulty;
  multiplier: number;
  cellsToRemove: number;
  label: string;
}

export interface ScoreConfig {
  baseScore: number;
  correctPlacement: number;
}
