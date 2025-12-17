import { SudokuGrid } from '../types/sudoku';

export interface CellHighlightState {
  isSelectedCell: boolean;
  isSameRow: boolean;
  isSameCol: boolean;
  isSameBox: boolean;
  isSameNumber: boolean;
  isFixed: boolean;
}

export function getCellHighlightState(
  row: number,
  col: number,
  selectedCell: { row: number; col: number } | null,
  selectedNumber: number | null,
  grid: SudokuGrid,
  fixedCells: boolean[][]
): CellHighlightState {
  const isSelectedCell = selectedCell !== null && 
    selectedCell.row === row && 
    selectedCell.col === col;

  const isSameRow = selectedCell !== null && 
    selectedCell.row === row && 
    !isSelectedCell;

  const isSameCol = selectedCell !== null && 
    selectedCell.col === col && 
    !isSelectedCell;

  const isSameBox = selectedCell !== null && 
    isInSameBox(selectedCell.row, selectedCell.col, row, col) && 
    !isSelectedCell;

  const cellValue = grid[row]?.[col];
  const isSameNumber = selectedNumber !== null && 
    cellValue === selectedNumber && 
    cellValue !== null && 
    !isSelectedCell;

  const isFixed = fixedCells[row]?.[col] ?? false;

  return {
    isSelectedCell,
    isSameRow,
    isSameCol,
    isSameBox,
    isSameNumber,
    isFixed,
  };
}

function isInSameBox(row1: number, col1: number, row2: number, col2: number): boolean {
  const boxRow1 = Math.floor(row1 / 3);
  const boxCol1 = Math.floor(col1 / 3);
  const boxRow2 = Math.floor(row2 / 3);
  const boxCol2 = Math.floor(col2 / 3);
  return boxRow1 === boxRow2 && boxCol1 === boxCol2;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
