import { Card, Title, Subtitle, Flex } from '@tremor/react'

import { gameTypeColor } from '@/utils/theme'
import { GameType } from '@/constants/GameType'

interface GameCardProps {
  gameType: GameType
  track?: string
  time?: string
  onClick?: () => void
}

const GameCard = ({ gameType, track, time, onClick }: GameCardProps): JSX.Element | null => {
  return (
    <Card
      className={`bg-${gameTypeColor(gameType)}-500 cursor-pointer transition-opacity hover:opacity-80`}
      onClick={onClick}
    >
      <Flex>
        <Title className="uppercase text-white">{gameType}</Title>
        <Subtitle className="text-white">{track}</Subtitle>
        <Subtitle className="text-white">{time}</Subtitle>
      </Flex>
    </Card>
  )
}

export default GameCard
