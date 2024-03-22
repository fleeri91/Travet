'use client'

import { useEffect } from 'react'

import { useCalendarStore } from '@/store/useCalendar'

import useSWR from 'swr'
import RaceFilterTable from '@/components/RaceFilterTable'
import { Flex } from '@tremor/react'
import GameSelector from '@/components/GameSelector'
import RaceInfoCard from '@/components/RaceInfoCard'

const Home = () => {
  const { selectedDate, calendarData } = useCalendarStore()

  useEffect(() => {
    calendarData && console.log(calendarData)
  }, [calendarData])

  return (
    <Flex
      flexDirection="col"
      className="mx-auto mt-24 max-w-screen-md"
      alignItems="center"
      justifyContent="center"
    >
      <RaceInfoCard race={null} />
      <RaceFilterTable race={null} />
      <GameSelector isOpen={false} onClose={() => null} />
    </Flex>
  )
}

export default Home
