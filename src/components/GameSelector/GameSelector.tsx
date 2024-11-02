import { useEffect, useState } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'

import { Flex, Icon, Subtitle } from '@tremor/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import Modal from '@/components/ui/Modal'
import GameCard from '@/components/GameSelector/GameSelectorCard'
import IconButton from '@/components/ui/IconButton'
import GameTypeSelect from './GameTypeSelect'

import { useCalendarStore } from '@/store/useCalendar'
import { useGameStore } from '@/store/useGame'
import { useModalsStore } from '@/store/useModals'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'

import { GameType } from '@/constants/GameType'
import { filterGamesByTrack } from '@/utils/track'

const GameSelector = (): JSX.Element | null => {
  const {
    setCalendarData,
    setIsLoading,
    setPreviousDate,
    setNextDate,
    selectedDate,
    today,
    calendarData,
    setGames,
    games,
  } = useCalendarStore()
  const { setGameId } = useGameStore()
  const { gameSelectorOpen, setGameSelectorOpen } = useModalsStore()

  const [selectedGameType, setSelectedGameType] = useState<string | null>(null)

  const { data, isLoading } = useSWR<CalendarDayRoot>(selectedDate ? `day/${selectedDate}` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  })

  const FIVE_DAYS = dayjs(today).add(5, 'day')

  useEffect(() => {
    if (data) {
      setCalendarData(data)
    }
  }, [data])

  useEffect(() => {
    if (games.length) {
      let gameId = ''
      for (let i = 0; i < games.length; i++) {
        const potentialId = games[i]?.[1]?.[0]?.id
        if (potentialId) {
          gameId = potentialId
          break
        }
      }

      setGameId(gameId)
    }
  }, [games])

  useEffect(() => {
    isLoading && setIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (calendarData.games && calendarData.tracks) {
      setGames(filterGamesByTrack(calendarData.games, calendarData.tracks))
    }
  }, [calendarData.games, calendarData.tracks])

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
          <GameTypeSelect games={games} onSelectedGameType={setSelectedGameType} />
        </Flex>
        <Flex flexDirection="col" className="gap-2">
          {games &&
            games
              .filter(([gameType]) => gameType == selectedGameType)
              .map(([gameType, gamesArray], index) =>
                gamesArray
                  .sort(
                    (a, b) =>
                      dayjs(a.scheduledStartTime).unix() - dayjs(b.scheduledStartTime).unix()
                  )
                  .map((game, gameIndex) => (
                    <GameCard
                      key={`${index}-${gameIndex}`}
                      gameType={gameType as GameType}
                      tracks={game.tracks}
                      time={game.scheduledStartTime}
                      status={game.status}
                      onClick={() => {
                        setGameId(game.id)
                        setGameSelectorOpen(false)
                      }}
                    />
                  ))
              )}
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GameSelector
