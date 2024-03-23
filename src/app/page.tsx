'use client'

import { useEffect, useState } from 'react'
import { Flex, Icon } from '@tremor/react'
import useSWR from 'swr'

import { RiFilter3Line, RiCalendarLine } from '@remixicon/react'

import GameSelector from '@/components/GameSelector'
import RaceTab from '@/components/RaceTab'
import ButtonGroup from '@/components/ButtonGroup'

import { useGameStore } from '@/store/useGame'
import { GameRoot } from '@/types/ATG/Game'
import IconButton from '@/components/IconButton'
import Filter from '@/components/Filter'

const Home = () => {
  const { gameId } = useGameStore()

  const [gameSelectorOpen, setGameSelectorOpen] = useState<boolean>(false)
  const [filterOpen, setfilterOpen] = useState<boolean>(false)

  const { data, isLoading } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null)

  useEffect(() => {
    gameId && console.log(gameId)
  }, [gameId])

  return (
    <Flex flexDirection="row" className="mx-auto mt-16 max-w-screen-md gap-2">
      {data && <RaceTab gameData={data} />}
      <Flex className="mt-auto h-full flex-1" justifyContent="center" alignItems="end">
        <ButtonGroup>
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
        </ButtonGroup>
      </Flex>
      <GameSelector isOpen={gameSelectorOpen} onClose={() => setGameSelectorOpen(false)} />
      <Filter isOpen={filterOpen} onClose={() => setfilterOpen(false)} />
    </Flex>
  )
}

export default Home
