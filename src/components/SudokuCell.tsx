import React from 'react';
import { CellHighlightState } from '../utils/highlighting';

interface SudokuCellProps {
  value: number | null;
  highlightState: CellHighlightState;
  row: number;
  col: number;
  onSelect: (row: number, col: number) => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  highlightState,
  row,
  col,
  onSelect
}) => {
  const { isSelectedCell, isSameRow, isSameCol, isSameBox, isSameNumber, isFixed } = highlightState;
  const getBorderClasses = () => {
    const classes = [];
    
    // Thicker borders for 3x3 boxes
    if (row % 3 === 0) classes.push('border-t-2');
    if (col % 3 === 0) classes.push('border-l-2');
    if (row === 8) classes.push('border-b-2');
    if (col === 8) classes.push('border-r-2');
    
    return classes.join(' ');
  };

  const getBackgroundClass = () => {
    if (isSelectedCell) return 'bg-cell-selected';
    if (isSameNumber) return 'bg-cell-number-match';
    if (isSameRow || isSameCol || isSameBox) return 'bg-cell-highlighted';
    return 'bg-cell';
  };

  return (
    <button
      onClick={() => onSelect(row, col)}
      className={`
        aspect-square w-full border border-theme
        flex items-center justify-center
        text-lg sm:text-xl md:text-2xl font-medium
        transition-all duration-150
        ${getBorderClasses()}
        ${getBackgroundClass()}
        ${isSelectedCell ? 'ring-2 ring-blue-500 ring-inset' : ''}
        ${isFixed ? 'text-theme-primary font-bold' : 'text-theme-secondary'}
        ${!isFixed && !isSelectedCell ? 'hover:opacity-80' : ''}
        active:scale-95
      `}
    >
      {value || ''}
    </button>
  );
};
