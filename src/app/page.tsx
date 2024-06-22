'use client'

import { Flex } from '@tremor/react'
import useSWR from 'swr'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import Filter from '@/components/Filter'
import Dashboard from '@/components/Dashboard'

import { useGameStore } from '@/store/useGame'
import { useModalsStore } from '@/store/useModals'

import { GameRoot } from '@/types/ATG/Game'
import { Suspense } from 'react'

const Home = () => {
  const { gameId } = useGameStore()

  const { filterOpen, setFilterOpen } = useModalsStore()

  const { data } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null)

  return (
    <Flex flexDirection="row" className="my-8 max-w-screen-lg gap-2 px-4 lg:my-16">
      {data && <RaceTab gameData={data} />}
      <GameSelector />
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <Suspense>
        <Dashboard />
      </Suspense>
    </Flex>
  )
}

export default Home
