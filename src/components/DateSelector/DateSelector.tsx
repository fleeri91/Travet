import clsx from 'clsx'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import { useCalendarStore } from '@/store/useCalendar'

const DateSelector = (): JSX.Element | null => {
  const days = Array.from({ length: 5 }, (_, i) => dayjs().add(i, 'day'))

  const { setPreviousDate, setNextDate, setDate, selectedDate, today } = useCalendarStore()

  return (
    <div className="flex max-w-sm items-center justify-center rounded-lg border bg-white">
      <button className="rounded-r-none" onClick={() => setPreviousDate(selectedDate)}>
        <RiArrowLeftSLine />
      </button>
      <button className="rounded-l-none" onClick={() => setNextDate(selectedDate)}>
        <RiArrowRightSLine />
      </button>
    </div>
  )
}

export default DateSelector
