import dayjs from 'dayjs'
import { Card, Title, Subtitle, Flex } from '@tremor/react'

import { gameTypeColor } from '@/utils/theme'
import { GameType } from '@/constants/GameType'

import { useCalendarStore } from '@/store/useCalendar'

interface GameCardProps {
  gameType: GameType
  tracks?: number[]
  time?: string
  onClick?: () => void
}

const GameCard = ({ gameType, tracks, time, onClick }: GameCardProps): JSX.Element | null => {
  const { calendarData } = useCalendarStore()

  if (!calendarData) return null

  return (
    <Card
      className={`bg-${gameTypeColor(gameType)}-500 cursor-pointer transition-opacity hover:opacity-80`}
      onClick={onClick}
    >
      <Flex>
        <Title className="uppercase text-white">{gameType}</Title>
        <Flex flexDirection="col">
          <Subtitle className="text-white">
            {calendarData.tracks
              .filter((track) => tracks?.includes(track.id))
              .map((track) => `${track.name} `)}
          </Subtitle>
          <Subtitle className="text-white">{dayjs(time).format('HH:mm')}</Subtitle>
        </Flex>
      </Flex>
    </Card>
  )
}

export default GameCard
