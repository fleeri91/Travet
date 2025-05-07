'use client'

import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'
import { Card, Flex, Text, Heading } from '@radix-ui/themes'

import { _getRaceStartMethod, _getTrackCondition } from '@/utils/atg'

import { Race } from '@/types/ATG/Game'

import { useCalendarStore } from '@/store/useCalendar'

interface RaceInfoCardProps {
  race: Race | null
  raceIndex: number
}

const RaceInfoCard = ({ race, raceIndex }: RaceInfoCardProps) => {
  const { today } = useCalendarStore()

  const getFormattedDate = (scheduledTime: string) => {
    const raceDate = dayjs(scheduledTime)
    const baseDate = dayjs(today)

    if (raceDate.isSame(baseDate, 'day')) {
      return `idag ${raceDate.locale(sv).format('HH:mm')}`
    }
    if (raceDate.isSame(baseDate.subtract(1, 'day'), 'day')) {
      return `igår ${raceDate.locale(sv).format('HH:mm')}`
    }
    if (raceDate.isSame(baseDate.add(1, 'day'), 'day')) {
      return `imorgon ${raceDate.locale(sv).format('HH:mm')}`
    }

    return raceDate.locale(sv).format('dddd HH:mm')
  }

  return (
    <Card className="min-h-32 select-none">
      {race && (
        <Flex>
          <Heading size="5" className="space-x-2">
            {`Avdelning ${raceIndex + 1} ${getFormattedDate(race.scheduledStartTime)}`}
          </Heading>
        </Flex>
      )}
      {race && (
        <Flex>
          <Text size="3">
            {`${race.track.name} ${race.distance + 'm'} ${_getRaceStartMethod(race.startMethod)}`}
          </Text>
        </Flex>
      )}
      <Flex>
        {race && race.track.condition && (
          <Text size="3">{`Banförhållande: ${_getTrackCondition(race.track.condition)}`}</Text>
        )}
      </Flex>
      <Flex>{race && <Text size="3">{race.name}</Text>}</Flex>
    </Card>
  )
}

export default RaceInfoCard
