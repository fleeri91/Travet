import { Fragment, useEffect } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'

import { Dialog, Transition } from '@headlessui/react'
import { Flex, Icon, Subtitle } from '@tremor/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import GameCard from '@/components/GameCard'
import IconButton from '@/components/IconButton'

import { useCalendarStore } from '@/store/useCalendar'
import { useGameStore } from '@/store/useGame'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'

import { ALLOWED_GAME_TYPES, GameType } from '@/constants/GameType'

interface GameSelectorProps {
  isOpen: boolean
  onClose: () => void
}

const GameSelector = ({ isOpen, onClose }: GameSelectorProps): JSX.Element | null => {
  const {
    setCalendarData,
    setIsLoading,
    setPreviousDate,
    setNextDate,
    selectedDate,
    biggestGame,
    setBiggestGame,
    today,
    calendarData,
  } = useCalendarStore()
  const { setGameId } = useGameStore()

  const { data, isLoading } = useSWR<CalendarDayRoot>(selectedDate ? `day/${selectedDate}` : null)

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (data) {
      setCalendarData(data)
      setBiggestGame(data.tracks[0].biggestGameType)
    }
  }, [data])

  useEffect(() => {
    if (biggestGame && calendarData) {
      Object.entries(calendarData.games)
        .filter(([gameType, gamesArray]) => gamesArray.length > 0 && gameType.includes(biggestGame))
        .map(([_gameType, gamesArray], _index) => setGameId(gamesArray[0].id))
    }
  }, [biggestGame])

  useEffect(() => {
    isLoading && setIsLoading(isLoading)
  }, [isLoading])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <Flex className="fixed inset-0 overflow-y-auto">
          <Flex className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Flex flexDirection="col" className="gap-4">
                  <Flex className="select-none gap-4" justifyContent="center">
                    <IconButton onClick={() => setPreviousDate(selectedDate)}>
                      <Icon color={'neutral'} icon={RiArrowLeftSLine} />
                    </IconButton>
                    <Subtitle className="min-w-20 text-center capitalize">
                      {selectedDate == today
                        ? 'Idag'
                        : dayjs(selectedDate).locale(sv).format('DD/MM dd')}
                    </Subtitle>
                    <IconButton onClick={() => setNextDate(selectedDate)}>
                      <Icon color={'neutral'} icon={RiArrowRightSLine} />
                    </IconButton>
                  </Flex>
                  <Flex flexDirection="col" className="gap-2">
                    {calendarData &&
                      calendarData.games &&
                      Object.entries(calendarData.games)
                        .filter(
                          ([gameType, gamesArray]) =>
                            gamesArray.length > 0 && ALLOWED_GAME_TYPES.includes(gameType)
                        )
                        .map(([gameType, gamesArray], index) => (
                          <GameCard
                            key={index}
                            gameType={gameType as GameType}
                            tracks={gamesArray[0].tracks}
                            time={gamesArray[0].scheduledStartTime}
                            onClick={() => {
                              setGameId(gamesArray[0].id)
                              handleClose()
                            }}
                          />
                        ))}
                  </Flex>
                </Flex>
              </Dialog.Panel>
            </Transition.Child>
          </Flex>
        </Flex>
      </Dialog>
    </Transition>
  )
}

export default GameSelector
