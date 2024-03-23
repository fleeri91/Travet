import { useState } from 'react'
import clsx from 'clsx'
import { Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from '@tremor/react'

import RaceFilterTable from '@/components/RaceFilterTable'
import RaceInfoCard from '@/components/RaceInfoCard'

import { GameRoot } from '@/types/ATG/Game'

interface RaceTabProps {
  gameData: GameRoot
}

const RaceTab = ({ gameData }: RaceTabProps) => {
  const [raceIndex, setRaceIndex] = useState<number>(0)

  return (
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
                  'w-full justify-center rounded-lg border-none py-2.5 text-sm font-medium leading-5 focus:outline-none'
                )}
              >
                <Text className="text-theme-600">{gameData.type + ':' + (index + 1)}</Text>
              </Tab>
            )
          })}
      </TabList>
      <TabPanels>
        {gameData &&
          gameData.races.map((race, index) => (
            <TabPanel key={index}>
              <RaceInfoCard race={gameData.races[raceIndex]} />
              <Card>
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
  )
}

export default RaceTab
