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

import { useModalsStore } from '@/store/useModals'

const Home = () => {
  const { gameId } = useGameStore()

  const { filterOpen, setFilterOpen, gameSelectorOpen, setGameSelectorOpen } = useModalsStore()

  const { data, isLoading } = useSWR<GameRoot>(gameId ? `game/?id=${gameId}` : null)

  return (
    <Flex flexDirection="row" className="mx-auto mt-16 max-w-screen-md gap-2">
      {data && <RaceTab gameData={data} />}
      <GameSelector isOpen={gameSelectorOpen} onClose={() => setGameSelectorOpen(false)} />
      <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </Flex>
  )
}

export default Home
