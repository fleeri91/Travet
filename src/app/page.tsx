'use client'

import { useEffect, useState } from 'react'
import { Flex, Icon } from '@tremor/react'
import useSWR from 'swr'

import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import SpeedDial from '@/components/SpeedDial'

import { useGameStore } from '@/store/useGame'
import { GameRoot } from '@/types/ATG/Game'
import IconButton from '@/components/IconButton'
import Filter from '@/components/Filter'

const Home = () => {
  const { gameId } = useGameStore()

  const [gameSelectorOpen, setGameSelectorOpen] = useState<boolean>(true)
  const [filterOpen, setfilterOpen] = useState<boolean>(true)

  const { data, isLoading } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null)

  useEffect(() => {
    gameId && console.log(gameId)
  }, [gameId])

  return (
    <Flex
      flexDirection="col"
      className="mx-auto mt-16 max-w-screen-md"
      alignItems="center"
      justifyContent="center"
    >
      {data && <RaceTab gameData={data} />}
      <GameSelector isOpen={gameSelectorOpen} onClose={() => setGameSelectorOpen(false)} />
      <Filter isOpen={filterOpen} onClose={() => setfilterOpen(false)} />
      <SpeedDial>
        <Icon
          variant="shadow"
          icon={RiCalendarLine}
          className="cursor-pointer"
          onClick={() => setGameSelectorOpen(true)}
        />
        <Icon
          variant="shadow"
          icon={RiFilter3Line}
          className="cursor-pointer"
          onClick={() => setfilterOpen(true)}
        />
      </SpeedDial>
    </Flex>
  )
}

export default Home
