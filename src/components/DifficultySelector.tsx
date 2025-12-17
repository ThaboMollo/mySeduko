import React from 'react';
import { Difficulty } from '../types/sudoku';
import { DIFFICULTY_CONFIGS, DIFFICULTIES } from '../core/difficulties';
import { useGameStore } from '../store/gameStore';

export const DifficultySelector: React.FC = () => {
  const { difficulty, startNewGame, isGameOver, isCompleted } = useGameStore();

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        {DIFFICULTIES.map((diff) => {
          const config = DIFFICULTY_CONFIGS[diff];
          const isActive = difficulty === diff;
          
          return (
            <button
              key={diff}
              onClick={() => startNewGame(diff)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-150
                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                }
                active:scale-95
              `}
            >
              {config.label}
              <span className="ml-1 text-xs opacity-75">
                ×{config.multiplier}
              </span>
            </button>
          );
        })}
      </div>
      
      {(isGameOver || isCompleted) && (
        <div className="mt-4 text-center">
          <button
            onClick={() => startNewGame(difficulty)}
            className="
              px-6 py-3 bg-green-600 text-white rounded-lg
              font-semibold text-lg shadow-lg
              hover:bg-green-700 active:bg-green-800
              transition-colors duration-150
              active:scale-95
            "
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};
