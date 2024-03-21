import { create } from 'zustand'

import { Colors } from '@/constants/Theme'

import { Settings } from '@/types/Settings'

type CalendarActions = {
  setDarkMode: (mode: boolean) => void
  setTheme: (theme: Colors) => void
}

const initialState: Settings = {
  darkMode: false,
  theme: 'blue',
}

export const useCalendarStore = create<Settings & CalendarActions>((set) => ({
  ...initialState,
  setDarkMode: (mode: boolean) => set((state) => ({ ...state, darkMode: mode })),
  setTheme: (theme: Colors) => set((state) => ({ ...state, theme: theme })),
}))
