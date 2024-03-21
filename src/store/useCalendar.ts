import { create } from 'zustand'
import dayjs from 'dayjs'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'

type CalendarState = {
  today: string
  selectedDate: string
  calendarData: CalendarDayRoot
}

type CalendarActions = {
  setSelectedDate: (date: string) => void
  setCalendarData: (data: CalendarDayRoot) => void
  resetSelectedDate: () => void
}

const initialState: CalendarState = {
  today: dayjs().add(0, 'day').format('YYYY-MM-DD'),
  selectedDate: dayjs().format('YYYY-MM-DD'),
  calendarData: {} as CalendarDayRoot,
}

export const useCalendarStore = create<CalendarState & CalendarActions>((set) => ({
  ...initialState,
  setSelectedDate: (newDate: string) => set((state) => ({ ...state, selectedDate: newDate })),
  setCalendarData: (newCalendarData: CalendarDayRoot) => set((state) => ({ ...state, calendarData: newCalendarData })),
  resetSelectedDate: () => set((state) => ({ ...state, selectedDate: initialState.selectedDate })),
}))
