'use client'

import useSWR from 'swr'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import Filter from '@/components/Filter'

import { useGameStore } from '@/store/useGame'

import { GameRoot } from '@/types/ATG/Game'
import { Box, Container, Spinner } from '@radix-ui/themes'
import { useModalsStore } from '@/store/useModals'

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
      <Box className="flex h-screen w-full items-center justify-center">
        <Spinner size="3" />
      </Box>
    )
  }

  return (
    <Box className="my-16">
      <Container size="3">
        {data && <RaceTab gameData={data} />}
        <GameSelector />
        <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      </Container>
    </Box>
  )
}

export default Home
