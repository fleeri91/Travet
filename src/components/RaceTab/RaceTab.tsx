import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, IconButton, SegmentedControl, Tabs } from '@radix-ui/themes'
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
      <Tabs.List>
        {gameData.races?.map((race, index) => (
          <Tabs.Trigger key={index} value={race.id} className="cursor-pointer">
            {index + 1}
          </Tabs.Trigger>
        ))}
        <Flex gap="2" className="ml-auto">
          {view == 'start' && (
            <IconButton
              variant="soft"
              className="cursor-pointer"
              onClick={() => setFilterOpen(true)}
            >
              <RiFilter3Line />
            </IconButton>
          )}
          <IconButton variant="soft" className="cursor-pointer" onClick={() => router.push('/')}>
            <RiCalendarLine />
          </IconButton>
        </Flex>
      </Tabs.List>
      <Box pt="3">
        <SegmentedControl.Root
          value={view}
          onValueChange={(value: 'start' | 'statistics' | 'h2h') => setView(value)}
          className="mb-4 w-full"
        >
          <SegmentedControl.Item value="start" className="cursor-pointer">
            Startlista
          </SegmentedControl.Item>
          <SegmentedControl.Item value="statistics" className="cursor-pointer">
            Statistik
          </SegmentedControl.Item>
          <SegmentedControl.Item value="h2h" className="cursor-pointer">
            Head 2 Head
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        {gameData?.races?.map((race, index) => (
          <Tabs.Content key={index} value={race.id}>
            <RaceInfoCard race={race} />
            {view === 'start' && <RaceFilterTable game={gameData} race={race} raceIndex={index} />}
            {view === 'statistics' && <RaceStatistics />}
            {view === 'h2h' && <H2H />}
          </Tabs.Content>
        ))}
      </Box>
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Tabs.Root>
  )
}

export default RaceTab
