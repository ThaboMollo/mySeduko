# Architecture Documentation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│                    (React Components)                    │
├─────────────────────────────────────────────────────────┤
│  SudokuGrid  │  DifficultySelector  │  ScoreBoard       │
│  SudokuCell  │  LivesIndicator      │  Number Pad       │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│                   State Management                       │
│                   (Zustand Store)                        │
├─────────────────────────────────────────────────────────┤
│  • Game State (grid, lives, score)                      │
│  • Actions (selectCell, placeNumber, etc.)              │
│  • localStorage Persistence                             │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│                   Core Game Logic                        │
│                  (Pure TypeScript)                       │
├─────────────────────────────────────────────────────────┤
│  Generator  │  Solver  │  Validator  │  Scoring         │
└─────────────────────────────────────────────────────────┘
```

## 📦 Module Responsibilities

### Core Layer (Pure TypeScript)
**No React dependencies - portable to React Native**

#### `sudokuGenerator.ts`
- Creates valid 9×9 Sudoku grids
- Removes cells based on difficulty
- Ensures unique solutions (for easier levels)
- Uses Fisher-Yates shuffle for randomization

#### `sudokuSolver.ts`
- Backtracking algorithm for solving
- Validates puzzle solvability
- Checks for unique solutions
- Pure function - no side effects

#### `sudokuValidator.ts`
- Validates number placements
- Checks row/column/box conflicts
- Detects puzzle completion
- Compares against solution

#### `scoring.ts`
- Calculates score with multipliers
- Defines initial lives (3)
- Pure calculation functions

#### `difficulties.ts`
- 6 difficulty configurations
- Multipliers: 1, 1.5, 2, 3, 5, 10
- Cells removed: 35-64

### State Layer (Zustand)

#### `gameStore.ts`
**Single source of truth for game state**

State:
```typescript
{
  grid: SudokuGrid              // Current puzzle state
  solution: SudokuGrid          // Complete solution
  fixedCells: boolean[][]       // Immutable cells
  selectedCell: {row, col}      // Currently selected
  difficulty: Difficulty        // Current level
  lives: number                 // Remaining lives (0-3)
  score: number                 // Current score
  isGameOver: boolean           // Game over flag
  isCompleted: boolean          // Puzzle solved flag
  startTime: number             // Game start timestamp
}
```

Actions:
- `startNewGame(difficulty)` - Generate new puzzle
- `selectCell(row, col)` - Select a cell
- `placeNumber(value)` - Place number in selected cell
- `clearCell()` - Clear selected cell
- `resetGame()` - Reset current puzzle

Persistence:
- Automatic localStorage sync
- Game survives page refresh
- Selective state persistence

### UI Layer (React Components)

#### `App.tsx`
- Main application container
- Layout and composition
- Header, footer, game area

#### `SudokuGrid.tsx`
- Renders 9×9 grid
- Keyboard event handling
- Number pad for mobile
- Maps grid state to cells

#### `SudokuCell.tsx`
- Individual cell rendering
- Visual states (selected, fixed, empty)
- Touch optimization
- Border styling for 3×3 boxes

#### `DifficultySelector.tsx`
- 6 difficulty buttons
- Active state indication
- New game trigger
- Shows multipliers

#### `ScoreBoard.tsx`
- Score display
- Completion message
- Game over message

#### `LivesIndicator.tsx`
- Visual hearts (❤️)
- Fading animation for lost lives
- Shows 3 hearts total

## 🔄 Data Flow

### Starting a New Game
```
User clicks difficulty
    ↓
DifficultySelector calls startNewGame()
    ↓
Store generates new puzzle (core/generator)
    ↓
Store updates state
    ↓
Components re-render with new grid
```

### Placing a Number
```
User selects cell
    ↓
SudokuCell calls selectCell()
    ↓
Store updates selectedCell
    ↓
User enters number (keyboard/pad)
    ↓
SudokuGrid calls placeNumber()
    ↓
Store validates placement (core/validator)
    ↓
If correct: add score, check completion
If wrong: lose life, check game over
    ↓
Store updates state
    ↓
Components re-render
```

## 🎯 Design Principles

### 1. Separation of Concerns
- **Core**: Pure logic, no UI
- **Store**: State management, no rendering
- **Components**: Presentation, minimal logic

### 2. Immutability
- State updates create new objects
- No direct mutations
- Predictable state changes

### 3. Type Safety
- TypeScript strict mode
- All interfaces defined
- No `any` types in application code

### 4. Performance
- Minimal re-renders
- Efficient validation
- Memoized selectors (if needed)

### 5. Mobile-First
- Touch targets ≥ 48×48px
- No hover dependencies
- Responsive grid sizing
- Number pad for input

### 6. Offline-First
- Service worker caching
- localStorage persistence
- No backend required

## 🔌 Extension Points

### Adding New Features

#### Timer System
```typescript
// Add to gameStore.ts
interface GameState {
  startTime: number;
  elapsedTime: number;
  isPaused: boolean;
}
```

#### Hint System
```typescript
// Add to core/hints.ts
export function getHint(grid: SudokuGrid, solution: SudokuGrid): {
  row: number;
  col: number;
  value: number;
}
```

#### Undo/Redo
```typescript
// Add to gameStore.ts
interface GameStore {
  history: SudokuGrid[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
}
```

## 🧪 Testing Strategy

### Unit Tests (Core Logic)
```typescript
// Example: sudokuValidator.test.ts
test('validates correct placement', () => {
  const grid = createTestGrid();
  expect(isValidPlacement(grid, 0, 0, 5)).toBe(true);
});
```

### Integration Tests (Store)
```typescript
// Example: gameStore.test.ts
test('placing wrong number loses life', () => {
  const store = useGameStore.getState();
  store.placeNumber(9); // wrong number
  expect(store.lives).toBe(2);
});
```

### E2E Tests (UI)
```typescript
// Example: Playwright/Cypress
test('can complete a puzzle', async () => {
  await page.goto('/');
  await page.click('[data-difficulty="easy"]');
  // ... fill in puzzle
  await expect(page.locator('.completion-message')).toBeVisible();
});
```

## 📱 PWA Architecture

### Service Worker
- Caches static assets
- Offline fallback
- Background sync (future)

### App Manifest
- Name, icons, colors
- Display mode: standalone
- Orientation: portrait
- Theme color: white

### Installation
- iOS: Add to Home Screen
- Android: Install prompt
- Desktop: Install button

## 🚀 Deployment

### Build Process
```bash
npm run build
```

Outputs to `dist/`:
- Minified JS/CSS
- Optimized assets
- Service worker
- Manifest

### Hosting Options
- **Netlify**: Drag & drop `dist` folder
- **Vercel**: Connect Git repo
- **GitHub Pages**: Push to `gh-pages` branch
- **Firebase**: `firebase deploy`

### Environment Variables
None required - fully static app

## 🔮 Future Migration to React Native

### Portable Core
All core logic is pure TypeScript:
```typescript
// Can be imported directly in React Native
import { generateSudoku } from './core/sudokuGenerator';
import { useGameStore } from './store/gameStore';
```

### UI Adaptation
Replace web components with React Native:
- `<div>` → `<View>`
- `<button>` → `<TouchableOpacity>`
- Tailwind → StyleSheet

### Store Compatibility
Zustand works in React Native:
```typescript
// Same store, different platform
import { useGameStore } from './store/gameStore';
```

### Storage
Replace localStorage with AsyncStorage:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

---

**This architecture ensures:**
- ✅ Clean separation of concerns
- ✅ Testability at all layers
- ✅ Type safety throughout
- ✅ Performance optimization
- ✅ Mobile-first design
- ✅ Future-proof for React Native
