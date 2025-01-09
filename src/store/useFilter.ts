import { create } from 'zustand'

import { FilterType } from '@/types/Filter'

type FilterState = {
  filter: FilterType
}

type FilterActions = {
  setFilter: (filter: FilterType) => void
  resetFilter: (filter: FilterType) => void
}

const initialState: FilterState = {
  filter: {
    shoes: false,
    sulky: false,
    distance: false,
    specificDistance: {
      from: '',
      to: '',
    },
    money: false,
    top: false,
    track: false,
    driver: false,
    condition: false,
    latestMonths: false,
    win: false,
    stl: false,
  },
}

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setFilter: (filter: FilterType) => set((state) => ({ ...state, filter: filter })),
  resetFilter: (filter: FilterType) => set((state) => ({ ...state, filter: initialState.filter })),
}))
