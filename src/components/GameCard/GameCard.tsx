import dayjs from 'dayjs'
import { Card, Subtitle, Flex, Grid } from '@tremor/react'

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
      className={`bg-${gameTypeColor(gameType)}-500 cursor-pointer transition-all sm:hover:scale-[1.025] sm:hover:opacity-80`}
      onClick={onClick}
    >
      <Flex>
        <Grid numItems={3} className="w-full">
          <Grid>
            <Subtitle className="uppercase text-white">{gameType}</Subtitle>
          </Grid>
          <Grid>
            <Subtitle className="text-center capitalize text-white">
              {calendarData.tracks
                .filter((track) => tracks?.includes(track.id))
                .map((track) => `${track.name} `)}
            </Subtitle>
          </Grid>
          <Grid>
            <Subtitle className="text-right text-white">
              {status && (status == GameStatus.ongoing || status == GameStatus.results)
                ? _getGameStatus(status)
                : dayjs(time).format('HH:mm')}
            </Subtitle>
          </Grid>
        </Grid>
      </Flex>
    </Card>
  )
}

export default GameCard
