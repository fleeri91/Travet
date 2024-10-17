import { useState } from 'react'
import clsx from 'clsx'
import { Card, Flex, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/ui/RaceInfoCard'
import { GameRoot } from '@/types/ATG/Game'
import { useModalsStore } from '@/store/useModals'
import { useThemeStore } from '@/store/useTheme'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const [raceIndex, setRaceIndex] = useState<number>(0)
  const { setFilterOpen, setGameSelectorOpen } = useModalsStore()
  const { theme } = useThemeStore()

  return (
    <TabGroup>
      <Card className="flex rounded-xl px-4 py-2 shadow-md ring-0">
        <Flex>
          <TabList color={theme} variant="solid" className="bg-theme-50">
            {gameData?.races?.map((race, index) => (
              <Tab
                key={index}
                onClick={() => setRaceIndex(index)}
                className={clsx(
                  'w-full max-w-[initial] select-none justify-center rounded-lg border-none px-4 py-2 text-sm font-medium uppercase drop-shadow-sm hover:bg-black/5 hover:drop-shadow-sm focus:outline-none'
                )}
              >
                <Text className="text-xs font-black text-theme-600 md:text-base">
                  {`${index + 1}`}
                </Text>
              </Tab>
            ))}
          </TabList>
          <Flex className="space-x-2" justifyContent="end" alignItems="end">
            <Icon
              color={theme}
              variant="shadow"
              icon={RiCalendarLine}
              className="cursor-pointer"
              tooltip="Spelkalender"
              onClick={() => setGameSelectorOpen(true)}
            />
            <Icon
              color={theme}
              variant="shadow"
              icon={RiFilter3Line}
              className="cursor-pointer"
              tooltip="Filter"
              onClick={() => setFilterOpen(true)}
            />
          </Flex>
        </Flex>
      </Card>
      <TabPanels>
        {gameData?.races?.map((race, index) => (
          <TabPanel key={index}>
            <Card className="mt-4 p-0 shadow-md ring-0">
              <RaceInfoCard race={race} />
              <RaceFilterTable game={gameData} race={race} raceIndex={index} />
            </Card>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

export default RaceTab
