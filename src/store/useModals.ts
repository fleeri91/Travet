import { create } from 'zustand'

type ModalsState = {
  filterOpen: boolean
  gameSelectorOpen: boolean
}

type ModalsActions = {
  setFilterOpen: (value: boolean) => void
  setGameSelectorOpen: (value: boolean) => void
}

const initialState: ModalsState = {
  filterOpen: false,
  gameSelectorOpen: false,
}

export const useModalsStore = create<ModalsState & ModalsActions>((set) => ({
  ...initialState,
  setFilterOpen: (value: boolean) => set((state) => ({ ...state, filterOpen: value })),
  setGameSelectorOpen: (value: boolean) => set((state) => ({ ...state, gameSelectorOpen: value })),
}))
