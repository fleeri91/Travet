import { create } from 'zustand'

type SettingsState = {}

type SettingsActions = {}

const initialState: SettingsState = {}

export const useSettingsStore = create<SettingsState & SettingsActions>(
  (set) => ({
    ...initialState,
  })
)
