import { useEffect, useState } from 'react'

import { RadioGroup } from '@headlessui/react'
import { Flex } from '@tremor/react'
import { Game } from '@/types/ATG/CalendarDay'
import { GameType } from '@/constants/GameType'

interface GameTypeSelectProps {
  games: [string, Game[]][]
  setSelectedGameType: (value: string) => void
}

const GameTypeSelect = ({
  games,
  setSelectedGameType,
}: GameTypeSelectProps): JSX.Element | null => {
  const [selected, setSelected] = useState(games[0][0])

  useEffect(() => {
    if (games) {
      setSelected(games[0][0])
      setSelectedGameType(games[0][0])
    }
  }, [games])

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className="no-scrollbar relative inline-flex w-full gap-2 overflow-x-scroll p-2 "
      id="game-type-selector"
    >
      <RadioGroup.Label className="sr-only">Speltyp</RadioGroup.Label>
      {games.map(([gameType, _]) => (
        <RadioGroup.Option
          key={gameType}
          value={gameType}
          onClick={() => setSelectedGameType(gameType as GameType)}
          className={({ active, checked }) =>
            `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                  ${checked ? 'text-white' : 'bg-slate-300'}
                    group relative flex cursor-pointer rounded-lg px-3 py-2 uppercase shadow-md transition-all hover:scale-105 focus:outline-none`
          }
          data-theme={gameType}
        >
          <Flex>
            <Flex>
              <RadioGroup.Label as="p" className={`font-medium text-white transition-all`}>
                {gameType}
              </RadioGroup.Label>
            </Flex>
          </Flex>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}

export default GameTypeSelect
