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

  const { data, isLoading } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null)

  return (
    <Flex flexDirection="row" className="mx-auto my-16 max-w-screen-md gap-2">
      {data && <RaceTab gameData={data} />}
      <GameSelector />
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Flex>
  )
}

export default Home
