'use client'

import clsx from 'clsx'
import { Card, Flex, Text } from '@tremor/react'

import { _getRaceStartMethod, _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'

interface RaceInfoCardProps {
  race: Race | null
}

const RaceInfoCard = ({ race }: RaceInfoCardProps) => {
  return (
    <Card className={clsx('select-none bg-theme-600 text-white shadow-none ring-0')}>
      {race && (
        <Flex justifyContent="start">
          <Text className="space-x-2 text-sm text-white md:text-base">
            <span>{race.track.name}</span>
            <span>{race.distance + 'm'}</span>
            <span>{_getRaceStartMethod(race.startMethod)}</span>
          </Text>
        </Flex>
      )}
      <Flex>
        {race && race.track.condition && (
          <Text className="text-xs  text-white md:text-sm">{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>
        )}
      </Flex>
      <Flex>{race && <Text className="text-xs  text-white md:text-sm">{race.name}</Text>}</Flex>
    </Card>
  )
}

export default RaceInfoCard
