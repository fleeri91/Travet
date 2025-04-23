import clsx from 'clsx'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/ui/RaceInfoCard'

import { GameRoot } from '@/types/ATG/Game'
import { Box, Flex, IconButton, Tabs } from '@radix-ui/themes'
import { useModalsStore } from '@/store/useModals'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const { filterOpen, setFilterOpen } = useModalsStore()

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
          <IconButton variant="soft" className="cursor-pointer" onClick={() => setFilterOpen(true)}>
            <RiFilter3Line />
          </IconButton>
          <IconButton variant="soft" className="cursor-pointer">
            <RiCalendarLine />
          </IconButton>
        </Flex>
      </Tabs.List>
      <Box pt="3">
        {gameData?.races?.map((race, index) => (
          <Tabs.Content key={index} value={race.id}>
            <RaceInfoCard race={race} />
            <RaceFilterTable game={gameData} race={race} raceIndex={index} />
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  )
}

export default RaceTab
