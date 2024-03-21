import { create } from 'zustand'

import { Colors } from '@/constants/Theme'

type SettingsState = {
  darkMode: boolean
  theme?: Colors
}

type SettingsActions = {
  setDarkMode: (mode: boolean) => void
  setTheme: (theme: Colors) => void
}

const initialState: SettingsState = {
  darkMode: false,
  theme: undefined,
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
  ...initialState,
  setDarkMode: (mode: boolean) => set((state) => ({ ...state, darkMode: mode })),
  setTheme: (theme: Colors) => set((state) => ({ ...state, theme: theme })),
}))
