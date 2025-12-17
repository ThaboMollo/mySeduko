import React from 'react';
import { useGameStore } from '../store/gameStore';
import { INITIAL_LIVES } from '../core/scoring';

export const LivesIndicator: React.FC = () => {
  const { lives } = useGameStore();

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm font-medium text-gray-600">Lives:</span>
      <div className="flex gap-1">
        {Array.from({ length: INITIAL_LIVES }).map((_, index) => (
          <span
            key={index}
            className={`text-2xl transition-all duration-300 ${
              index < lives ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
            }`}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
};
