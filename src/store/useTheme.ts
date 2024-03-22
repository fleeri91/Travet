import { create } from 'zustand'

import { Color } from '@tremor/react'

type ThemeState = {
  darkMode: boolean
  theme?: Color
}

type ThemeActions = {
  setDarkMode: (mode: boolean) => void
  setTheme: (theme: Color) => void
}

const initialState: ThemeState = {
  darkMode: false,
  theme: 'neutral',
}

export const useThemeStore = create<ThemeState & ThemeActions>((set) => ({
  ...initialState,
  setDarkMode: (mode: boolean) => set((state) => ({ ...state, darkMode: mode })),
  setTheme: (theme: Color) => set((state) => ({ ...state, theme: theme })),
}))
