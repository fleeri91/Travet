import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, IconButton, Tabs } from '@radix-ui/themes'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/ui/RaceInfoCard'
import Filter from '@/components/Filter'

import { GameRoot } from '@/types/ATG/Game'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

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
          <IconButton variant="soft" className="cursor-pointer" onClick={() => router.push('/')}>
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
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Tabs.Root>
  )
}

export default RaceTab
