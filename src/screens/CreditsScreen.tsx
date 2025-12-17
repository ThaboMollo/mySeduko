import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { DIFFICULTY_CONFIGS } from '../core/difficulties';
import { INITIAL_LIVES } from '../core/scoring';
import { formatTime } from '../utils/highlighting';

export const CreditsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { lastGameSummary, startNewGame, clearLastSummary } = useGameStore();
  const { selectedDifficulty } = useSettingsStore();

  // Redirect to home if no game summary exists
  React.useEffect(() => {
    if (!lastGameSummary) {
      navigate('/', { replace: true });
    }
  }, [lastGameSummary, navigate]);

  if (!lastGameSummary) {
    return null;
  }

  const { result, score, difficulty, timeElapsed, mistakes } = lastGameSummary;
  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];
  const isWin = result === 'won';

  const handleHome = () => {
    navigate('/');
  };

  const handleNewGame = () => {
    clearLastSummary();
    startNewGame(selectedDifficulty);
    navigate('/game');
  };

  const handlePlayAgain = () => {
    clearLastSummary();
    startNewGame(difficulty);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${isWin ? 'animate-bounce' : ''}`}>
            {isWin ? '🎉' : '💔'}
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${
            isWin ? 'text-green-500' : 'text-red-500'
          }`}>
            {isWin ? 'You Won!' : 'You Lost'}
          </h1>
          <p className="text-theme-secondary text-lg">
            {isWin ? 'Congratulations on completing the puzzle!' : 'Better luck next time!'}
          </p>
        </div>

        {/* Game Summary Card */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">Game Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-theme-secondary">Final Score</span>
              <span className="text-2xl font-bold text-theme-primary">{score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-theme-secondary">Difficulty</span>
              <span className="text-theme-primary font-semibold">
                {difficultyConfig.label} (×{difficultyConfig.multiplier})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-theme-secondary">Time</span>
              <span className="text-theme-primary font-mono font-semibold">
                {formatTime(timeElapsed)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-theme-secondary">Mistakes</span>
              <span className={`font-semibold ${
                mistakes === INITIAL_LIVES ? 'text-red-500' : 'text-theme-primary'
              }`}>
                {mistakes}/{INITIAL_LIVES}
              </span>
            </div>
          </div>
        </div>

        {/* Credits Card */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-8 border border-theme text-center">
          <p className="text-theme-muted text-sm mb-2">Created by</p>
          <h3 className="text-2xl font-bold text-theme-primary leading-relaxed">
            Thabo Keorapetse<br />
            Molefi Mollo Mponya
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="
              w-full px-6 py-4 btn-accent rounded-lg
              font-semibold text-lg shadow-lg
              hover:opacity-90 active:scale-95
              transition-all duration-150
            "
          >
            Play Again ({difficultyConfig.label})
          </button>
          <button
            onClick={handleNewGame}
            className="
              w-full px-6 py-4 bg-theme-tertiary border-2 border-theme rounded-lg
              font-semibold text-lg text-theme-primary
              hover:opacity-80 active:scale-95
              transition-all duration-150
            "
          >
            New Game
          </button>
          <button
            onClick={handleHome}
            className="
              w-full px-6 py-3 bg-transparent border border-theme rounded-lg
              font-medium text-theme-secondary
              hover:bg-theme-tertiary active:scale-95
              transition-all duration-150
            "
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
