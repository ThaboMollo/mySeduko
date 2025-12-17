import React from 'react';
import { useGameStore } from '../store/gameStore';

export const ScoreBoard: React.FC = () => {
  const { score, isCompleted, isGameOver } = useGameStore();

  return (
    <div className="text-center">
      <div className="inline-block bg-white rounded-lg shadow-md px-6 py-3 border-2 border-gray-200">
        <div className="text-sm text-gray-600 font-medium">Score</div>
        <div className="text-3xl font-bold text-gray-900">{score}</div>
      </div>
      
      {isCompleted && (
        <div className="mt-4 text-green-600 font-bold text-xl animate-pulse">
          🎉 Puzzle Completed!
        </div>
      )}
      
      {isGameOver && (
        <div className="mt-4 text-red-600 font-bold text-xl">
          ❌ Game Over
        </div>
      )}
    </div>
  );
};
