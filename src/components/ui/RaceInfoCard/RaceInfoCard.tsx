'use client'

import { _getRaceStartMethod, _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'
import { Card, Flex, Text } from '@radix-ui/themes'

interface RaceInfoCardProps {
  race: Race | null
}

const RaceInfoCard = ({ race }: RaceInfoCardProps) => (
  <Card className={'select-none'}>
    {race && (
      <Flex>
        <Text className="space-x-2 text-sm md:text-base">
          <span>{race.track.name}</span>
          <span>{race.distance + 'm'}</span>
          <span>{_getRaceStartMethod(race.startMethod)}</span>
        </Text>
      </Flex>
    )}
    <Flex>
      {race && race.track.condition && (
        <Text className="text-xs md:text-sm">{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>
      )}
    </Flex>
    <Flex>{race && <Text className="text-xs md:text-sm">{race.name}</Text>}</Flex>
  </Card>
)

export default RaceInfoCard
