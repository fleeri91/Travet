import { useState } from 'react'
import clsx from 'clsx'
import { Card, Flex, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'
import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/ui/RaceInfoCard'
import { GameRoot } from '@/types/ATG/Game'
import ButtonGroup from '../ui/ButtonGroup'
import { useModalsStore } from '@/store/useModals'
import { useThemeStore } from '@/store/useTheme'
import TravsportStatisticsTable from '../TravsportStatisticsTable'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const [raceIndex, setRaceIndex] = useState<number>(0)
  const { setFilterOpen, setGameSelectorOpen } = useModalsStore()
  const { theme } = useThemeStore()

  return (
    <Flex className="lg:gap-2">
      <TabGroup>
        <TabList
          variant="solid"
          className="flex space-x-2 rounded-xl bg-theme-50 p-2 sm:drop-shadow-md"
        >
          {gameData?.races?.map((race, index) => (
            <Tab
              key={index}
              onClick={() => setRaceIndex(index)}
              className={clsx(
                'w-full max-w-[initial] select-none justify-center rounded-lg border-none py-1.5 text-sm font-medium uppercase drop-shadow-sm hover:bg-black/5 hover:drop-shadow-sm focus:outline-none sm:hover:scale-105 md:py-2.5'
              )}
            >
              <Text className="text-xs font-bold text-theme-600 md:text-sm dark:text-theme-600">
                {`${gameData.type}:${index + 1}`}
              </Text>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {gameData?.races?.map((race, index) => (
            <TabPanel key={index}>
              <RaceInfoCard race={race} />
              <Card className="mt-4 px-4 py-2 md:p-4">
                <TabGroup>
                  <TabList className="w-full" variant="solid">
                    <Tab className="w-full justify-center" value="info-horse">
                      <Text className="text-xs font-semibold text-theme-600 md:text-sm dark:text-theme-600">
                        Häst
                      </Text>
                    </Tab>
                    <Tab className="w-full justify-center" value="info-drive">
                      <Text className="text-xs font-semibold text-theme-600 md:text-sm dark:text-theme-600">
                        Kusk
                      </Text>
                    </Tab>
                    <Tab className="w-full justify-center" value="info-trainer">
                      <Text className="text-xs font-semibold text-theme-600 md:text-sm dark:text-theme-600">
                        Tränare
                      </Text>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <RaceFilterTable game={gameData} race={race} raceIndex={index} />
                    </TabPanel>
                    <TabPanel>
                      <TravsportStatisticsTable amount={50} currentTrack={7} />
                    </TabPanel>
                    <TabPanel>
                      <TravsportStatisticsTable amount={50} chartType={2} currentTrack={7} />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </Card>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
      <Flex
        className="right-0 mt-auto h-full w-auto px-2 md:sticky md:bottom-2 md:px-0"
        justifyContent="center"
        alignItems="end"
      >
        <ButtonGroup>
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
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default RaceTab
