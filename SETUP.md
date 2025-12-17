# Setup Instructions

## Fix NPM Permissions (Required)

Your npm cache has permission issues. Run this command in your terminal:

```bash
sudo chown -R 501:20 "/Users/thabomollomponya/.npm"
```

Then run:

```bash
npm install --legacy-peer-deps
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## PWA Icons

The app needs PWA icons. You can:
1. Create icons at https://realfavicongenerator.net/
2. Or use any 192x192 and 512x512 PNG images
3. Place them in the `public` folder as:
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png` (180x180)

## Testing on iPhone

1. Build the app: `npm run build`
2. Preview: `npm run preview`
3. Open Safari on iPhone
4. Navigate to your local IP (e.g., http://192.168.1.x:4173)
5. Tap Share → Add to Home Screen

## Architecture Notes

### Core Logic (`src/core/`)
- Pure TypeScript functions
- No React dependencies
- Fully testable
- Can be reused in React Native

### State Management (`src/store/`)
- Zustand with localStorage persistence
- Game state survives page refreshes
- Clean separation from UI

### Components (`src/components/`)
- React functional components
- Tailwind for styling
- Mobile-first design
- Touch-optimized

### PWA Features
- Offline support via service worker
- Installable on iOS/Android
- App manifest configured
- Cached assets for fast loading
