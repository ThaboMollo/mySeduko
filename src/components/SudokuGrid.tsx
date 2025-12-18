import React from 'react';
import { SudokuCell } from './SudokuCell';
import { useGameStore } from '../store/gameStore';
import { getCellHighlightState } from '../utils/highlighting';
import { getRemainingNumbers } from '../core/remainingNumbers';

export const SudokuGrid: React.FC = () => {
  const { 
    grid, 
    solution,
    fixedCells, 
    selectedCell, 
    selectedNumber,
    lastCorrectMove,
    selectCell, 
    setSelectedNumber,
    placeNumber, 
    clearCell 
  } = useGameStore();

  const remainingNumbers = React.useMemo(() => {
    if (!grid?.length || !solution?.length || !fixedCells?.length) return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return getRemainingNumbers(grid, solution, fixedCells);
  }, [fixedCells, grid, solution]);

  React.useEffect(() => {
    if (selectedNumber !== null && !remainingNumbers.includes(selectedNumber)) {
      setSelectedNumber(null);
    }
  }, [remainingNumbers, selectedNumber, setSelectedNumber]);

  // Handle keyboard input
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key);
        if (!remainingNumbers.includes(num)) return;
        setSelectedNumber(num);
        placeNumber(num);
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        clearCell();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [placeNumber, clearCell, remainingNumbers, setSelectedNumber]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Grid */}
      <div className="grid grid-cols-9 gap-0 rounded-2xl overflow-hidden border border-theme bg-theme-secondary shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
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
                shouldAnimateCorrect={
                  lastCorrectMove !== null &&
                  lastCorrectMove.row === rowIndex &&
                  lastCorrectMove.col === colIndex
                }
                onSelect={selectCell}
              />
            );
          })
        )}
      </div>

      {/* Number pad for mobile */}
      <div className="mt-6">
        <div className="grid grid-cols-9 gap-2">
        {remainingNumbers.map((num) => (
          <button
            key={num}
            onClick={() => {
              setSelectedNumber(num);
              placeNumber(num);
            }}
            className={`
              aspect-square rounded-2xl text-xl font-semibold
              transition-all duration-150 active:scale-95
              border border-theme
              ${selectedNumber === num 
                ? 'bg-cell-selected text-theme-primary shadow-[0_0_0_1px_rgba(96,165,250,0.55),0_10px_25px_rgba(0,0,0,0.35)]'
                : 'bg-cell text-theme-primary hover:opacity-90'
              }
            `}
          >
            {num}
          </button>
        ))}
        </div>

        <div className="mt-3 grid grid-cols-9 gap-2">
          <button
            onClick={clearCell}
            className="
              col-span-3 h-12 rounded-2xl
              bg-theme-tertiary border border-theme
              text-theme-primary font-semibold
              hover:opacity-90 active:scale-[0.99]
              transition-all duration-150
            "
          >
            Erase
          </button>
        </div>
      </div>
    </div>
  );
};
