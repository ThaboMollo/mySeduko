# Quick Reference Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Fix npm permissions (if needed)
sudo chown -R $(whoami) ~/.npm

# Install packages
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:5173`

## 🎮 How to Use

### Home Screen (`/`)
1. View your statistics
2. Select difficulty (easy → divine)
3. Choose theme (dark/light/midnight)
4. Click "Continue Game" (if available) or "New Game"

### Game Screen (`/game`)
1. Tap a cell to select it
2. Use number pad or keyboard (1-9) to place numbers
3. Tap filled cells to highlight that number globally
4. Watch your lives (3 mistakes = game over)
5. Complete the puzzle to win!

## 🎨 Features

### Highlighting System
- **Selected Cell** - Bright blue background
- **Same Number** - Light blue background (all matching numbers)
- **Same Row/Column/Box** - Gray background
- **Fixed Numbers** - Bold text
- **User Numbers** - Regular text

### Theme System
- **Dark** - Default dark theme with blue accents
- **Light** - Clean light theme
- **Midnight** - Dark theme with purple accents

### Difficulty Levels
| Level | Multiplier | Cells Removed |
|-------|------------|---------------|
| Easy | ×1 | 35 |
| Mid | ×1.5 | 45 |
| Hard | ×2 | 50 |
| Hard AF | ×3 | 55 |
| GOAT | ×5 | 60 |
| Divine | ×10 | 64 |

## 📊 Statistics Tracked
- Games played
- Games won
- Games lost
- Best score (all-time)
- Best score per difficulty
- Fastest win time

## ⌨️ Keyboard Shortcuts
- `1-9` - Place number
- `Backspace` / `Delete` / `0` - Clear cell
- Click cells with mouse/touch

## 🔄 Game Flow

```
Home Screen
    ↓
Select Difficulty
    ↓
Click "New Game"
    ↓
Game Screen (difficulty locked)
    ↓
Play Game
    ↓
Win or Lose
    ↓
Modal: "New Game" or "Home"
```

## 💾 Data Persistence

### localStorage Keys
- `sudoku_saved_game_v1` - Current game (ONE slot)
- `sudoku_settings_v1` - Theme and difficulty
- `sudoku_stats_v1` - Lifetime statistics

### Clear All Data
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## 🎯 Scoring System
```
Score = Base Points (10) × Difficulty Multiplier

Examples:
- Easy: 10 × 1 = 10 points per correct number
- Hard: 10 × 2 = 20 points per correct number
- Divine: 10 × 10 = 100 points per correct number
```

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📱 PWA Installation

### iPhone (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"
4. Tap "Add"

### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click "Install"

## 🐛 Troubleshooting

### App Not Loading
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Theme Not Applying
- Check browser console for errors
- Verify `data-theme` attribute on `<html>` element
- Clear localStorage and refresh

### Highlighting Not Working
- Ensure you're clicking cells (not just hovering)
- Try clicking a filled cell to set selectedNumber
- Check that game is in 'playing' status

### Stats Not Updating
- Complete a full game (win or lose)
- Check localStorage for `sudoku_stats_v1`
- Verify no console errors

### Timer Not Running
- Check that gameStatus is 'playing'
- Verify timer interval is running (check console)
- Try starting a new game

## 📝 Code Structure

```
Key Files:
├── src/screens/HomeScreen.tsx    - Home page
├── src/screens/GameScreen.tsx    - Game page
├── src/store/gameStore.ts        - Game state
├── src/store/settingsStore.ts    - Settings
├── src/store/statsStore.ts       - Statistics
├── src/utils/highlighting.ts     - Highlight logic
└── src/styles/themes.css         - Theme colors
```

## 🎨 Customizing Themes

Edit `src/styles/themes.css`:

```css
:root[data-theme="your-theme"] {
  --bg-primary: #your-color;
  --bg-secondary: #your-color;
  --text-primary: #your-color;
  /* ... more variables */
}
```

Then add to theme list in `src/store/settingsStore.ts` and `src/screens/HomeScreen.tsx`.

## 🔍 Debugging

### Check Game State
```javascript
// In browser console
JSON.parse(localStorage.getItem('sudoku_saved_game_v1'))
```

### Check Settings
```javascript
JSON.parse(localStorage.getItem('sudoku_settings_v1'))
```

### Check Stats
```javascript
JSON.parse(localStorage.getItem('sudoku_stats_v1'))
```

### Reset Everything
```javascript
localStorage.clear();
location.reload();
```

## 📊 Performance Tips

1. **Avoid excessive re-renders** - Zustand handles this well
2. **Timer updates** - Only updates every second
3. **Highlighting** - Computed on demand, not stored
4. **localStorage** - Writes are throttled by Zustand

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Netlify
```bash
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to Vercel
```bash
# Connect GitHub repo or use Vercel CLI
vercel
```

### Deploy to GitHub Pages
```bash
# Build first
npm run build

# Deploy dist folder to gh-pages branch
```

## 📞 Support

### Common Issues
1. **npm install fails** - Fix permissions with `sudo chown -R $(whoami) ~/.npm`
2. **React Router errors** - Make sure `react-router-dom` is installed
3. **Theme not loading** - Check `themes.css` is imported in `index.css`
4. **Highlighting broken** - Verify `highlighting.ts` utility is working

### Check Logs
- Browser console (F12)
- Terminal output
- Network tab (for PWA issues)

---

**Quick Reference Complete! Start playing at http://localhost:5173** 🎮
