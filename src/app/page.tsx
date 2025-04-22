'use client'

import { Flex, Text, Button } from '@tremor/react'
import useSWR from 'swr'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import Filter from '@/components/Filter'
import SkeletonLoading from '@/components/ui/SkeletonLoading'

import { useGameStore } from '@/store/useGame'
import { useModalsStore } from '@/store/useModals'

import { GameRoot } from '@/types/ATG/Game'

const Home = () => {
  const { gameId } = useGameStore()
  const { filterOpen, setFilterOpen } = useModalsStore()

  const { data, error, isLoading, mutate } = useSWR<GameRoot>(
    gameId ? `game/?id=${gameId}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  )

  if (isLoading) {
    return (
      <Flex flexDirection="row" className="my-4 max-w-screen-lg px-2 sm:my-8 sm:px-4 lg:my-16">
        <SkeletonLoading />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex
        flexDirection="col"
        justifyContent="center"
        alignItems="center"
        className="h-screen max-w-screen-lg px-2"
      >
        <p className="mb-8 text-xl leading-6 text-tremor-content dark:text-dark-tremor-content">
          Misslyckades med att ladda data
        </p>
        <Button onClick={() => mutate()} color="blue" variant="primary">
          Försök igen
        </Button>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="row" className="my-4 max-w-screen-lg px-2 sm:my-8 sm:px-4 lg:my-16">
      {data && <RaceTab gameData={data} />}
      <GameSelector />
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Flex>
  )
}

export default Home
