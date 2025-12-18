import React from 'react';
import { useGameStore } from '../store/gameStore';
import { INITIAL_LIVES } from '../core/scoring';

export const LivesIndicator: React.FC = () => {
  const { lives } = useGameStore();
  const mistakes = INITIAL_LIVES - lives;

  return (
    <div className="bg-theme-secondary rounded-lg px-4 py-2 border border-theme">
      <p className="text-theme-muted text-xs">Mistakes</p>
      <p className="text-theme-primary text-xl font-semibold tabular-nums">
        {mistakes}/{INITIAL_LIVES}
      </p>
    </div>
  );
};
