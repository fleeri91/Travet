'use client'

import { useEffect } from 'react'
import { useCalendarStore } from '@/store/useCalendar'

import useSWR from 'swr'

const Home = () => {
  const { today, selectedDate } = useCalendarStore()

  useEffect(() => {
    console.log(today)
  }, [today])
}

export default Home
