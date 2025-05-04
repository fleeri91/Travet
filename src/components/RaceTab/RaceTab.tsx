import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, IconButton, SegmentedControl, Tabs, Text, Tooltip } from '@radix-ui/themes'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceStatistics from '@/components/RaceStatistics'
import H2H from '@/components/H2H'
import RaceInfoCard from '@/components/ui/RaceInfoCard'
import Filter from '@/components/Filter'

import { GameRoot } from '@/types/ATG/Game'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [view, setView] = useState<'start' | 'statistics' | 'h2h'>('start')

  if (!gameData) {
    return null
  }

  return (
    <Tabs.Root defaultValue={gameData.races[0].id ?? ''}>
      <Tabs.List className="gap-x-4">
        <Flex>
          {gameData.races?.map((race, index) => (
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
            <IconButton variant="soft" className="cursor-pointer" onClick={() => router.push('/')}>
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
        {gameData?.races?.map((race, index) => (
          <Tabs.Content key={index} value={race.id}>
            <RaceInfoCard race={race} raceIndex={index} />
            {view === 'start' && <RaceFilterTable game={gameData} race={race} raceIndex={index} />}
            {view === 'statistics' && (
              <RaceStatistics game={gameData} race={race} raceIndex={index} />
            )}
            {view === 'h2h' && <H2H />}
          </Tabs.Content>
        ))}
      </Box>
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Tabs.Root>
  )
}

export default RaceTab
