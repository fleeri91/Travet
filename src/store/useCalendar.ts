import { create } from 'zustand'
import dayjs from 'dayjs'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'

type CalendarState = {
  today: string
  selectedDate: string
  calendarData: CalendarDayRoot
}

type CalendarActions = {
  setPreviousDate: (date: string) => void
  setNextDate: (date: string) => void
  setCalendarData: (data: CalendarDayRoot) => void
}

const initialState: CalendarState = {
  today: dayjs().format('YYYY-MM-DD'),
  selectedDate: dayjs().format('YYYY-MM-DD'),
  calendarData: {} as CalendarDayRoot,
}

export const useCalendarStore = create<CalendarState & CalendarActions>((set) => ({
  ...initialState,
  setPreviousDate: (date: string) =>
    set((state) => ({ ...state, selectedDate: dayjs(date).subtract(1, 'day').format('YYYY-MM-DD') })),
  setNextDate: (date: string) =>
    set((state) => ({ ...state, selectedDate: dayjs(date).add(1, 'day').format('YYYY-MM-DD') })),
  setCalendarData: (newCalendarData: CalendarDayRoot) => set((state) => ({ ...state, calendarData: newCalendarData })),
}))
