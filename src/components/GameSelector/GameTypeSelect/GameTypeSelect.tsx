import { useState } from 'react'

import { RadioGroup } from '@headlessui/react'
import { Flex } from '@tremor/react'
import { Game } from '@/types/ATG/CalendarDay'

const GameTypeSelect = ({ games }: { games: [string, Game[]][] }): JSX.Element | null => {
  const [selected, setSelected] = useState(games[0][0])

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className="inline-flex w-full gap-2"
      id="game-type-selector"
    >
      <RadioGroup.Label className="sr-only">Speltyp</RadioGroup.Label>
      {games.map(([gameType, _]) => (
        <RadioGroup.Option
          key={gameType}
          value={gameType}
          className={({ active, checked }) =>
            `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                  ${checked ? 'text-white' : 'bg-slate-300'}
                    group relative flex cursor-pointer rounded-lg px-3 py-2 uppercase shadow-md transition-all hover:scale-105 focus:outline-none`
          }
          data-theme={gameType}
        >
          {({ active, checked }) => (
            <Flex>
              <Flex>
                <RadioGroup.Label as="p" className={`font-medium text-white transition-all`}>
                  {gameType}
                </RadioGroup.Label>
              </Flex>
            </Flex>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}

export default GameTypeSelect
