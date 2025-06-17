'use client'

import { useMemo, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Spinner,
  Tabs,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceInfoCard from '@/components/RaceInfoCard'
import RaceFilterTable from '@/components/RaceFilterTable'
import Filter from '@/components/Filter'

import { Game, Race } from '@/types/Game'
import AdBanner from '@/components/AdSense/AdBanner'

const GamePage = (props: { params: Promise<{ gameId: string }> }) => {
  const params = use(props.params)
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, isLoading } = useSWR<Game>(
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
      <Flex className="h-screen items-center">
        <Spinner size="3" className="mx-auto" />
      </Flex>
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
    <Box my="9">
      <Container size="4" px="4">
        <Tabs.Root defaultValue={data.races[0].id ?? ''}>
          <Tabs.List className="pr-2">
            <Flex>
              {data.races?.map((race, index) => (
                <Tabs.Trigger key={index} value={race.id}>
                  <Text size="3" weight="bold">
                    {index + 1}
                  </Text>
                </Tabs.Trigger>
              ))}
            </Flex>
            <Flex gap="2" className="ml-auto">
              <Tooltip content="Filter">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => setFilterOpen(true)}
                >
                  <RiFilter3Line />
                </IconButton>
              </Tooltip>
              <Tooltip content="Kalender">
                <IconButton
                  variant="soft"
                  className="cursor-pointer"
                  onClick={() => router.push('/')}
                >
                  <RiCalendarLine />
                </IconButton>
              </Tooltip>
            </Flex>
          </Tabs.List>
          <Box pt="3">
            {data.races?.map((race, index) => (
              <Tabs.Content key={index} value={race.id}>
                <RaceInfoCard race={race} raceIndex={index} />
                <RaceFilterTable game={data} race={race} raceIndex={index} />
              </Tabs.Content>
            ))}
          </Box>
          <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
        </Tabs.Root>
        {process.env.NODE_ENV === 'production' && (
          <Box mt="9">
            <AdBanner pId="1299064064705433" dataAdSlot="8253813352" />
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default GamePage
