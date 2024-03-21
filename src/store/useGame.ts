import { create } from 'zustand'

import { GameType } from '@/constants/GameType'

type GameState = {
  gameType?: GameType
}

type GameActions = {}

const initialState: GameState = {
  gameType: undefined,
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,
}))
