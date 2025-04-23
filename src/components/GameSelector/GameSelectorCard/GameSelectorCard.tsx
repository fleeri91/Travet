import dayjs from 'dayjs'

import { GameType } from '@/constants/GameType'

import { useCalendarStore } from '@/store/useCalendar'
import { _getGameStatus } from '@/utils/atg'
import { GameStatus } from '@/constants/GameStatus'

interface GameSelectorCardProps {
  gameType: GameType
  tracks?: number[]
  time?: string
  status?: string
  onClick?: () => void
}

const GameSelectorCard = ({
  gameType,
  tracks,
  time,
  status,
  onClick,
}: GameSelectorCardProps): JSX.Element | null => {
  const { calendarData } = useCalendarStore()

  if (!calendarData) return null

  return <></>
  {
    /*
    <Card
      className={`bg-${gameTypeColor(gameType)}-500 cursor-pointer select-none text-sm transition-all sm:text-base sm:hover:opacity-80`}
      onClick={onClick}
    >
      <Grid numItems={3} className="w-full items-center">
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
    </Card>
  */
  }
}

export default GameSelectorCard
