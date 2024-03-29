import { useState } from 'react'
import clsx from 'clsx'
import { Card, Flex, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'

import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/RaceInfoCard'

import { GameRoot } from '@/types/ATG/Game'
import ButtonGroup from '../ButtonGroup'
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
    <Flex className="lg:gap-2">
      <TabGroup>
        <TabList
          defaultValue="1"
          variant="solid"
          className="flex space-x-2 rounded-xl bg-theme-50 p-2 drop-shadow-md"
        >
          {gameData &&
            gameData.races &&
            gameData.races.map((race, index) => {
              return (
                <Tab
                  key={index}
                  onClick={() => setRaceIndex(index)}
                  className={clsx(
                    'w-full max-w-[initial] select-none justify-center rounded-lg border-none py-1.5 text-sm font-medium uppercase leading-5 focus:outline-none md:py-2.5'
                  )}
                >
                  <Text className="text-xs text-theme-600 md:text-sm">
                    {gameData.type + ':' + (index + 1)}
                  </Text>
                </Tab>
              )
            })}
        </TabList>
        <TabPanels>
          {gameData &&
            gameData.races.map((race, index) => (
              <TabPanel key={index}>
                <RaceInfoCard race={gameData.races[raceIndex]} />
                <Card className="px-4 py-2 md:p-4">
                  <RaceFilterTable
                    game={gameData}
                    race={gameData.races[raceIndex]}
                    raceIndex={index}
                  />
                </Card>
              </TabPanel>
            ))}
        </TabPanels>
      </TabGroup>
      <Flex
        className="right-0 mt-auto h-full px-2 md:sticky md:bottom-2 md:px-0"
        justifyContent="center"
        alignItems="end"
      >
        <ButtonGroup>
          <Icon
            color={theme}
            variant="shadow"
            icon={RiCalendarLine}
            className="cursor-pointer"
            onClick={() => setGameSelectorOpen(true)}
          />
          <Icon
            color={theme}
            variant="shadow"
            icon={RiFilter3Line}
            className="cursor-pointer"
            onClick={() => setFilterOpen(true)}
          />
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default RaceTab
