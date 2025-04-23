'use client'

import useSWR from 'swr'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import Filter from '@/components/Filter'

import { GameRoot } from '@/types/ATG/Game'
import { Box, Button, Container, Flex, Spinner, Text } from '@radix-ui/themes'
import { useModalsStore } from '@/store/useModals'
import { useRouter } from 'next/navigation'

const GamePage = ({ params }: { params: { gameId: string } }) => {
  const router = useRouter()
  const { filterOpen, setFilterOpen } = useModalsStore()

  const { data, error, isLoading, mutate } = useSWR<GameRoot>(
    params.gameId ? `game/?id=${params.gameId}` : null,
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

  if (!data?.races) {
    return (
      <Box className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Text as="div" size="4">
          Kunde inte hitta valt spel
        </Text>
        <Button className="cursor-pointer" onClick={() => router.back()}>
          Gå tillbaka
        </Button>
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

export default GamePage
