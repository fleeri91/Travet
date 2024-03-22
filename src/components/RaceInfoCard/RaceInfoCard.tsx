'use client'

import clsx from 'clsx'
import { Card, Flex, Text } from '@tremor/react'

import { _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'

interface RaceInfoCardProps {
  race: Race
}

const RaceInfoCard = ({ race }: RaceInfoCardProps) => (
  <Card className={clsx('bg-theme-600 mb-2 text-white')}>
    {race && (
      <Flex justifyContent="start" className="space-x-4">
        <Text>{race.track.name}</Text>
        <Text>{race.distance + 'm'}</Text>
        <Text>{race.startMethod}</Text>
      </Flex>
    )}
    <Flex>{race && <Text>{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>}</Flex>
    <Flex>{race && <Text>{race.name}</Text>}</Flex>
  </Card>
)

export default RaceInfoCard
