import React from 'react';
import { SudokuCell } from './SudokuCell';
import { useGameStore } from '../store/gameStore';
import { getCellHighlightState } from '../utils/highlighting';

export const SudokuGrid: React.FC = () => {
  const { 
    grid, 
    fixedCells, 
    selectedCell, 
    selectedNumber,
    selectCell, 
    setSelectedNumber,
    placeNumber, 
    clearCell 
  } = useGameStore();

  // Handle keyboard input
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key);
        setSelectedNumber(num);
        placeNumber(num);
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        clearCell();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [placeNumber, clearCell, setSelectedNumber]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Grid */}
      <div className="grid grid-cols-9 gap-0 border-2 border-theme bg-theme-secondary">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const highlightState = getCellHighlightState(
              rowIndex,
              colIndex,
              selectedCell,
              selectedNumber,
              grid,
              fixedCells
            );

            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                highlightState={highlightState}
                row={rowIndex}
                col={colIndex}
                onSelect={selectCell}
              />
            );
          })
        )}
      </div>

      {/* Number pad for mobile */}
      <div className="mt-6 grid grid-cols-5 gap-2 max-w-sm mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => {
              setSelectedNumber(num);
              placeNumber(num);
            }}
            className={`
              aspect-square border-2 rounded-lg text-xl font-semibold
              transition-all duration-150 active:scale-95
              ${selectedNumber === num 
                ? 'bg-cell-selected border-blue-500 text-theme-primary' 
                : 'bg-cell border-theme text-theme-primary hover:opacity-80'
              }
            `}
          >
            {num}
          </button>
        ))}
        <button
          onClick={clearCell}
          className="
            col-span-1 aspect-square bg-red-500 border-2 border-red-600
            rounded-lg text-lg font-semibold text-white
            hover:bg-red-600 active:bg-red-700
            transition-colors duration-150
            active:scale-95
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
};
