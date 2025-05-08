'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  SegmentedControl,
  Spinner,
  Tabs,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceInfoCard from '@/components/RaceInfoCard'
import RaceFilterTable from '@/components/RaceFilterTable'
import RaceStatisticsView from '@/components/RaceStatisticsView'
import H2H from '@/components/H2H'
import Filter from '@/components/Filter'

import { Game } from '@/types/Game'

const GamePage = ({ params }: { params: { gameId: string } }) => {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [view, setView] = useState<'start' | 'statistics' | 'h2h'>('start')

  const { data, isLoading } = useSWR<Game>(params.gameId ? `game/?id=${params.gameId}` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  })

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
      <Container size="4" className="px-4">
        <Tabs.Root defaultValue={data.races[0].id ?? ''}>
          <Tabs.List className="gap-x-4">
            <Flex>
              {data.races?.map((race, index) => (
                <Tabs.Trigger key={index} value={race.id} className="cursor-pointer">
                  <Text size="3" weight="bold">
                    {index + 1}
                  </Text>
                </Tabs.Trigger>
              ))}
            </Flex>
            <Flex gap="2" className="ml-auto">
              {view == 'start' && (
                <Tooltip content="Filter">
                  <IconButton
                    variant="soft"
                    className="cursor-pointer"
                    onClick={() => setFilterOpen(true)}
                  >
                    <RiFilter3Line />
                  </IconButton>
                </Tooltip>
              )}
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
            <SegmentedControl.Root
              value={view}
              size="3"
              onValueChange={(value: 'start' | 'statistics' | 'h2h') => setView(value)}
              className="mb-4 w-full"
            >
              <SegmentedControl.Item value="start" className="cursor-pointer">
                <Text className="text-sm sm:text-base">Startlista</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="statistics" className="cursor-pointer">
                <Text className="text-sm sm:text-base">Statistik</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="h2h" className="cursor-pointer">
                <Text className="text-sm sm:text-base">Head 2 Head</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            {data?.races?.map((race, index) => (
              <Tabs.Content key={index} value={race.id}>
                <RaceInfoCard race={race} raceIndex={index} />
                {view === 'start' && <RaceFilterTable game={data} race={race} raceIndex={index} />}
                {view === 'statistics' && <RaceStatisticsView raceId={race.id} />}
                {view === 'h2h' && <H2H />}
              </Tabs.Content>
            ))}
          </Box>
          <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
        </Tabs.Root>
      </Container>
    </Box>
  )
}

export default GamePage
