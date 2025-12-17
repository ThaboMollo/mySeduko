import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings, Theme, Difficulty } from '../types/sudoku';

interface SettingsStore extends Settings {
  setTheme: (theme: Theme) => void;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      selectedDifficulty: 'easy',

      setTheme: (theme: Theme) => {
        set({ theme });
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme-color meta tag for PWA
        const themeColors = {
          dark: '#1a1a1a',
          light: '#ffffff',
          midnight: '#0f172a'
        };
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', themeColors[theme]);
        }
      },

      setSelectedDifficulty: (difficulty: Difficulty) => {
        set({ selectedDifficulty: difficulty });
      },
    }),
    {
      name: 'sudoku_settings_v1',
    }
  )
);

// Initialize theme on load
const initialTheme = useSettingsStore.getState().theme;
document.documentElement.setAttribute('data-theme', initialTheme);
