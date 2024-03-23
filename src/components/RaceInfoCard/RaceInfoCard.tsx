'use client'

import clsx from 'clsx'
import { Card, Flex, Text } from '@tremor/react'

import { _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'

interface RaceInfoCardProps {
  race: Race | null
}

const RaceInfoCard = ({ race }: RaceInfoCardProps) => {
  return (
    <Card className={clsx('mb-2 select-none bg-theme-600 text-white')}>
      {race && (
        <Flex justifyContent="start" className="space-x-2 ">
          <Text className="text-white">{race.track.name}</Text>
          <Text className="text-white">{race.distance + 'm'}</Text>
          <Text className="text-white">{race.startMethod}</Text>
        </Flex>
      )}
      <Flex>
        {race && race.track.condition && (
          <Text className="text-white">{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>
        )}
      </Flex>
      <Flex>{race && <Text className="text-white">{race.name}</Text>}</Flex>
    </Card>
  )
}

export default RaceInfoCard
