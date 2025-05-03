'use client'

import { _getRaceStartMethod, _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'
import { Card, Flex, Text } from '@radix-ui/themes'

interface RaceInfoCardProps {
  race: Race | null
}

const RaceInfoCard = ({ race }: RaceInfoCardProps) => (
  <Card className="min-h-24 select-none">
    {race && (
      <Flex>
        <Text size="4" className="space-x-2">
          <span>{race.track.name}</span>
          <span>{race.distance + 'm'}</span>
          <span>{_getRaceStartMethod(race.startMethod)}</span>
        </Text>
      </Flex>
    )}
    <Flex>
      {race && race.track.condition && (
        <Text size="2">{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>
      )}
    </Flex>
    <Flex>{race && <Text size="2">{race.name}</Text>}</Flex>
  </Card>
)

export default RaceInfoCard
