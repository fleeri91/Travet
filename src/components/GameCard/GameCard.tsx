import dayjs from 'dayjs'
import { Card, Title, Subtitle, Flex } from '@tremor/react'

import { gameTypeColor } from '@/utils/theme'
import { GameType } from '@/constants/GameType'

import { useCalendarStore } from '@/store/useCalendar'
import { _getGameStatus } from '@/utils/atg'
import { GameStatus } from '@/constants/GameStatus'

interface GameCardProps {
  gameType: GameType
  tracks?: number[]
  time?: string
  status?: string
  onClick?: () => void
}

const GameCard = ({
  gameType,
  tracks,
  time,
  status,
  onClick,
}: GameCardProps): JSX.Element | null => {
  const { calendarData } = useCalendarStore()

  if (!calendarData) return null

  return (
    <Card
      className={`bg-${gameTypeColor(gameType)}-500 cursor-pointer transition-all hover:scale-[1.025] hover:opacity-80`}
      onClick={onClick}
    >
      <Flex>
        <Subtitle className="uppercase text-white">{gameType}</Subtitle>
        <Subtitle className="absolute left-1/2 -translate-x-1/2 capitalize text-white">
          {calendarData.tracks
            .filter((track) => tracks?.includes(track.id))
            .map((track) => `${track.name} `)}
        </Subtitle>
        <Subtitle className="text-white">
          {status && (status == GameStatus.ongoing || status == GameStatus.results)
            ? _getGameStatus(status)
            : dayjs(time).format('HH:mm')}
        </Subtitle>
      </Flex>
    </Card>
  )
}

export default GameCard
