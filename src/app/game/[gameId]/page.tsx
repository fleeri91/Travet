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
  SegmentedControl,
  Spinner,
  Tabs,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceInfoCard from '@/components/RaceInfoCard'
import RaceFilterTable from '@/components/RaceFilterTable'
import RaceStatisticsRanking from '@/components/RaceStatisticsRanking'
import H2H from '@/components/H2H'
import Filter from '@/components/Filter'

import { Game, Race } from '@/types/Game'
import { computeRaceStatistics } from '@/utils/statistics'

const GamePage = (props: { params: Promise<{ gameId: string }> }) => {
  const params = use(props.params)
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [view, setView] = useState<'start' | 'statistics' | 'h2h'>('start')

  const { data, isLoading } = useSWR<Game>(
    params.gameId ? `game/?id=${params.gameId}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  )

  const gameData = useMemo<Game | null>(() => {
    if (!data) return null

    const enrichedRaces: Race[] = data.races.map((apiRace) => ({
      ...apiRace,
      statistics: [computeRaceStatistics(apiRace.starts)],
    }))

    return {
      id: data.id,
      races: enrichedRaces,
    }
  }, [data])

  if (isLoading) {
    return (
      <Flex className="h-screen items-center">
        <Spinner size="3" className="mx-auto" />
      </Flex>
    )
  }

  if (!gameData?.races) {
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
        <Tabs.Root defaultValue={gameData.races[0].id ?? ''}>
          <Tabs.List className="pr-2">
            <Flex>
              {gameData.races?.map((race, index) => (
                <Tabs.Trigger key={index} value={race.id}>
                  <Text size="3" weight="bold">
                    {index + 1}
                  </Text>
                </Tabs.Trigger>
              ))}
            </Flex>
            <Flex gap="2" className="ml-auto">
              {view === 'start' && (
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
              onValueChange={(value: 'start' | 'statistics' | 'h2h') =>
                setView(value)
              }
              className="mb-4 w-full"
            >
              <SegmentedControl.Item value="start" className="cursor-pointer">
                <Text className="text-sm sm:text-base">Startlista</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item
                value="statistics"
                className="cursor-pointer"
              >
                <Text className="text-sm sm:text-base">Statistik</Text>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="h2h" className="cursor-pointer">
                <Text className="text-sm sm:text-base">Head 2 Head</Text>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            {gameData.races?.map((race, index) => (
              <Tabs.Content key={index} value={race.id}>
                <RaceInfoCard race={race} raceIndex={index} />
                {view === 'start' && (
                  <RaceFilterTable
                    game={gameData}
                    race={race}
                    raceIndex={index}
                  />
                )}
                {view === 'statistics' && (
                  <RaceStatisticsRanking raceStatistics={race.statistics[0]} />
                )}
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
