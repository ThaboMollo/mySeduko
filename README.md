# Sudoku PWA

A minimalist Progressive Web App Sudoku game with clean architecture.

## Features

- 6 difficulty levels (easy, mid, hard, hardAF, goat, divine)
- 3-mistake rule with lives system
- Scoring system with difficulty multipliers
- Offline support
- Mobile-first design
- Installable on iOS and Android

## Tech Stack

- React 18
- TypeScript (strict mode)
- Vite
- TailwindCSS
- Zustand (state management)
- vite-plugin-pwa

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

- **Core Logic**: Pure TypeScript functions for Sudoku generation, solving, and validation
- **State Management**: Zustand store with localStorage persistence
- **UI Components**: React components with Tailwind styling
- **PWA**: Service worker and manifest for offline support

## Project Structure

```
src/
├── app/          # Application entry points
├── core/         # Pure game logic (no React)
├── store/        # Zustand state management
├── components/   # React UI components
├── hooks/        # Custom React hooks
├── styles/       # Global styles
└── types/        # TypeScript definitions
```
