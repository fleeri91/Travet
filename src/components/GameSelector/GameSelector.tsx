import { useEffect } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'

import { Flex, Icon, Subtitle } from '@tremor/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import Modal from '@/components/Modal'
import GameCard from '@/components/GameCard'
import IconButton from '@/components/IconButton'

import { useCalendarStore } from '@/store/useCalendar'
import { useGameStore } from '@/store/useGame'
import { useModalsStore } from '@/store/useModals'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'

import { GameType } from '@/constants/GameType'
import GameTypeSelect from './GameTypeSelect'

const GameSelector = ({}): JSX.Element | null => {
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
    setGames,
    games,
  } = useCalendarStore()
  const { setGameId } = useGameStore()
  const { gameSelectorOpen, setGameSelectorOpen } = useModalsStore()

  const { data, isLoading } = useSWR<CalendarDayRoot>(selectedDate ? `day/${selectedDate}` : null)

  const FIVE_DAYS = dayjs(today).add(5, 'day')

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

  useEffect(() => {
    if (calendarData.games) {
      const filteredGames = Object.entries(calendarData.games).filter(([gameType]) =>
        Object.values(GameType).includes(gameType as GameType)
      )
      setGames(filteredGames)
    }
  }, [calendarData.games])

  return (
    <Modal isOpen={gameSelectorOpen} onClose={() => setGameSelectorOpen(false)}>
      <Flex flexDirection="col" className="gap-4">
        <Flex className="select-none gap-4" justifyContent="center">
          <IconButton
            onClick={() => setPreviousDate(selectedDate)}
            disabled={dayjs(selectedDate).isSame(today, 'day')}
          >
            <Icon color={'neutral'} icon={RiArrowLeftSLine} />
          </IconButton>
          <Subtitle className="min-w-20 text-center capitalize">
            {selectedDate == today ? 'Idag' : dayjs(selectedDate).locale(sv).format('DD/MM dd')}
          </Subtitle>
          <IconButton
            onClick={() => setNextDate(selectedDate)}
            disabled={dayjs(selectedDate).isAfter(FIVE_DAYS, 'day')}
          >
            <Icon color={'neutral'} icon={RiArrowRightSLine} />
          </IconButton>
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
          className="scroll-x-fade relative"
        >
          <GameTypeSelect games={games} />
        </Flex>
        <Flex flexDirection="col" className="gap-2">
          {games &&
            games.map(([gameType, gamesArray], index) => (
              <GameCard
                key={index}
                gameType={gameType as GameType}
                tracks={gamesArray[0].tracks}
                time={gamesArray[0].scheduledStartTime}
                status={gamesArray[0].status}
                onClick={() => {
                  setGameId(gamesArray[0].id)
                  setGameSelectorOpen(false)
                }}
              />
            ))}
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GameSelector
