import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { SudokuGrid } from '../components/SudokuGrid';
import { LivesIndicator } from '../components/LivesIndicator';
import { DIFFICULTY_CONFIGS } from '../core/difficulties';
import { formatTime } from '../utils/highlighting';

export const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const { 
    gameStatus, 
    score, 
    difficulty, 
    timeElapsed,
    goHome,
    hasActiveGame
  } = useGameStore();

  // Redirect to home if no active game
  React.useEffect(() => {
    if (!hasActiveGame() && gameStatus === 'idle') {
      navigate('/');
    }
  }, [hasActiveGame, gameStatus, navigate]);

  // Navigate to credits on win/loss
  React.useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      navigate('/credits');
    }
  }, [gameStatus, navigate]);

  const handleGoHome = () => {
    goHome();
    navigate('/');
  };


  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div className="min-h-screen bg-theme-primary px-4 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleGoHome}
            className="
              px-4 py-2 bg-theme-secondary border border-theme rounded-lg
              text-theme-primary font-medium
              hover:opacity-80 active:scale-95
              transition-all duration-150
            "
          >
            ← Home
          </button>
          <div className="text-center">
            <p className="text-theme-muted text-sm">
              {difficultyConfig.label} (×{difficultyConfig.multiplier})
            </p>
            <p className="text-theme-primary font-mono text-lg">
              {formatTime(timeElapsed)}
            </p>
          </div>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>

        {/* Score and Lives */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-theme-secondary rounded-lg px-4 py-2 border border-theme">
            <p className="text-theme-muted text-xs">Score</p>
            <p className="text-theme-primary text-2xl font-bold">{score}</p>
          </div>
          <LivesIndicator />
        </div>

        {/* Sudoku Grid */}
        <div className="mb-6">
          <SudokuGrid />
        </div>


        {/* Instructions */}
        <div className="mt-4 text-center text-theme-muted text-sm">
          <p>Tap a cell, then use the number pad or keyboard (1-9)</p>
        </div>
      </div>
    </div>
  );
};
