import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { useStatsStore } from '../store/statsStore';
import { DIFFICULTY_CONFIGS, DIFFICULTIES } from '../core/difficulties';
import { Theme } from '../types/sudoku';
import { formatTime } from '../utils/highlighting';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { hasActiveGame, startNewGame } = useGameStore();
  const { theme, setTheme, selectedDifficulty, setSelectedDifficulty } = useSettingsStore();
  const stats = useStatsStore();

  const handleContinue = () => {
    navigate('/game');
  };

  const handleNewGame = () => {
    startNewGame(selectedDifficulty);
    navigate('/game');
  };

  const themes: Theme[] = ['dark', 'light', 'midnight'];

  return (
    <div className="min-h-screen bg-theme-primary px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-theme-primary mb-2">Sudoku</h1>
          <p className="text-theme-secondary">Minimalist Puzzle Game</p>
        </header>

        {/* Stats Card */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-theme-muted text-sm">Games Played</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.gamesPlayed}</p>
            </div>
            <div>
              <p className="text-theme-muted text-sm">Best Score</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.bestScore}</p>
            </div>
            <div>
              <p className="text-theme-muted text-sm">Wins</p>
              <p className="text-2xl font-bold text-green-500">{stats.gamesWon}</p>
            </div>
            <div>
              <p className="text-theme-muted text-sm">Losses</p>
              <p className="text-2xl font-bold text-red-500">{stats.gamesLost}</p>
            </div>
          </div>
          {stats.fastestWinTime !== null && (
            <div className="mt-4 pt-4 border-t border-theme">
              <p className="text-theme-muted text-sm">Fastest Win</p>
              <p className="text-xl font-bold text-theme-primary">
                {formatTime(stats.fastestWinTime)}
              </p>
            </div>
          )}
        </div>

        {/* Best Scores by Difficulty */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">Best Scores</h2>
          <div className="space-y-2">
            {DIFFICULTIES.map((diff) => (
              <div key={diff} className="flex justify-between items-center">
                <span className="text-theme-secondary">
                  {DIFFICULTY_CONFIGS[diff].label}
                </span>
                <span className="text-theme-primary font-semibold">
                  {stats.bestScoreByDifficulty[diff] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">Select Difficulty</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DIFFICULTIES.map((diff) => {
              const config = DIFFICULTY_CONFIGS[diff];
              const isSelected = selectedDifficulty === diff;
              
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`
                    px-4 py-3 rounded-lg font-medium text-sm
                    transition-all duration-150 border-2
                    ${
                      isSelected
                        ? 'btn-accent border-transparent shadow-lg scale-105'
                        : 'bg-theme-tertiary border-theme text-theme-primary hover:opacity-80'
                    }
                    active:scale-95
                  `}
                >
                  {config.label}
                  <span className="block text-xs opacity-75 mt-1">
                    ×{config.multiplier}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="bg-theme-secondary rounded-lg p-6 mb-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">Theme</h2>
          <div className="flex gap-3">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium capitalize
                  transition-all duration-150 border-2
                  ${
                    theme === t
                      ? 'btn-accent border-transparent shadow-lg'
                      : 'bg-theme-tertiary border-theme text-theme-primary hover:opacity-80'
                  }
                  active:scale-95
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {hasActiveGame() && (
            <button
              onClick={handleContinue}
              className="
                w-full px-6 py-4 btn-accent rounded-lg
                font-semibold text-lg shadow-lg
                hover:opacity-90 active:scale-95
                transition-all duration-150
              "
            >
              Continue Game
            </button>
          )}
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
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-theme-muted text-sm">
          <p>Three mistakes and you're out!</p>
        </footer>
      </div>
    </div>
  );
};
