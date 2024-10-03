import { create } from 'zustand'
import dayjs from 'dayjs'

import { CalendarDayRoot, Game } from '@/types/ATG/CalendarDay'

type CalendarState = {
  today: string
  selectedDate: string
  calendarData: CalendarDayRoot
  isLoading: boolean
  games: [string, Game[]][]
}

type CalendarActions = {
  setPreviousDate: (date: string) => void
  setNextDate: (date: string) => void
  setDate: (date: string) => void
  setCalendarData: (data: CalendarDayRoot) => void
  setIsLoading: (value: boolean) => void
  setGames: (value: [string, Game[]][]) => void
}

const initialState: CalendarState = {
  today: dayjs().format('YYYY-MM-DD'),
  selectedDate: dayjs().format('YYYY-MM-DD'),
  calendarData: {} as CalendarDayRoot,
  isLoading: false,
  games: [],
}

export const useCalendarStore = create<CalendarState & CalendarActions>((set) => ({
  ...initialState,
  setPreviousDate: (date: string) =>
    set((state) => ({
      ...state,
      selectedDate: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
    })),
  setNextDate: (date: string) =>
    set((state) => ({ ...state, selectedDate: dayjs(date).add(1, 'day').format('YYYY-MM-DD') })),
  setDate: (date: string) =>
    set((state) => ({ ...state, selectedDate: dayjs(date).format('YYYY-MM-DD') })),
  setCalendarData: (data: CalendarDayRoot) => set((state) => ({ ...state, calendarData: data })),
  setIsLoading: (value: boolean) => set((state) => ({ ...state, isLoading: value })),
  setGames: (value: [string, Game[]][]) => set((state) => ({ ...state, games: value })),
}))
