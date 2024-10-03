import clsx from 'clsx'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import IconButton from '@/components/IconButton'

import { useCalendarStore } from '@/store/useCalendar'

const DateSelector = (): JSX.Element | null => {
  const days = Array.from({ length: 5 }, (_, i) => dayjs().add(i, 'day'))

  const { setPreviousDate, setNextDate, setDate, selectedDate, today } = useCalendarStore()

  return (
    <div className="flex max-w-sm items-center justify-center rounded-lg border bg-white">
      <IconButton className="rounded-r-none" onClick={() => setPreviousDate(selectedDate)}>
        <RiArrowLeftSLine />
      </IconButton>
      <Listbox value={selectedDate} onChange={setDate}>
        <ListboxButton
          className={clsx(
            'block w-full appearance-none rounded-lg bg-white/5 px-3 py-1.5 text-center text-sm capitalize',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-opacity-75'
          )}
        >
          {selectedDate === today ? 'Idag' : dayjs(selectedDate).locale(sv).format('dddd D MMMM')}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'mt-2 w-[var(--button-width)] rounded-xl border border-white/5 bg-white p-1 text-center drop-shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {days.map((day, index) => (
            <ListboxOption
              key={index}
              value={day.format('YYYY-MM-DD')}
              className="group flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-1.5 text-center capitalize data-[focus]:bg-white/10"
            >
              {index === 0 ? 'Idag' : day.locale(sv).format('dddd D MMMM')}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <IconButton className="rounded-l-none" onClick={() => setNextDate(selectedDate)}>
        <RiArrowRightSLine />
      </IconButton>
    </div>
  )
}

export default DateSelector
