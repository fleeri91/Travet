'use client'

import { Flex } from '@tremor/react'
import useSWR from 'swr'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import Filter from '@/components/Filter'

import { useGameStore } from '@/store/useGame'
import { useModalsStore } from '@/store/useModals'

import { GameRoot } from '@/types/ATG/Game'

const Home = () => {
  const { gameId } = useGameStore()

  const { filterOpen, setFilterOpen } = useModalsStore()

  const { data } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return (
    <Flex flexDirection="row" className="my-4 max-w-screen-lg px-2 sm:my-8 sm:px-4 lg:my-16">
      {data && <RaceTab gameData={data} />}
      <GameSelector />
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Flex>
  )
}

export default Home
