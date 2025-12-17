# 🚀 Quick Start Guide

## ⚠️ IMPORTANT: Fix NPM Permissions First

Run this command in your terminal:

```bash
sudo chown -R $(whoami) ~/.npm
```

Enter your password when prompted.

## Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## That's It! 🎉

The app should now be running. You'll see:
- A 9×9 Sudoku grid
- Difficulty selector (Easy to Divine)
- Lives indicator (3 hearts)
- Score display
- Number pad for input

## How to Play

1. **Select a cell** by clicking/tapping it
2. **Enter a number** using:
   - Number pad on screen
   - Keyboard (1-9)
3. **Clear a cell** with Backspace/Delete or the ✕ button
4. **Change difficulty** to start a new puzzle
5. **Three mistakes** and you're out!

## Mobile Testing

1. Find your local IP:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. On your iPhone, open Safari and go to:
   ```
   http://YOUR_IP:5173
   ```

3. Tap Share → Add to Home Screen

4. The app installs as a PWA with offline support!

## Troubleshooting

### npm install fails?
```bash
# Clear cache and try again
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Port 5173 already in use?
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
npm run dev
```

### TypeScript errors?
These will disappear once `node_modules` is installed.

## Next Steps

- Add PWA icons (see `public/icon-placeholder.txt`)
- Build for production: `npm run build`
- Deploy to Netlify/Vercel

## Need Help?

Check these files:
- `PROJECT_SUMMARY.md` - Complete project overview
- `INSTALL.md` - Detailed installation guide
- `SETUP.md` - Architecture and deployment info
- `README.md` - General information

---

**Enjoy your Sudoku game!** 🎮
