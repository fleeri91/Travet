import { create } from 'zustand'

type GameState = {
  gameId: string
}

type GameActions = {
  setGameId: (id: string) => void
}

const initialState: GameState = {
  gameId: '',
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,
  setGameId: (value: string) => set((state) => ({ ...state, gameId: value })),
}))
