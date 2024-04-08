import { useState } from 'react'

import { RadioGroup } from '@headlessui/react'
import { Flex } from '@tremor/react'
import { Game } from '@/types/ATG/CalendarDay'

const GameTypeSelect = ({ games }: { games: [string, Game[]][] }): JSX.Element | null => {
  const [selected, setSelected] = useState(games[0][0])

  return (
    <RadioGroup value={selected} onChange={setSelected} className="inline-flex gap-2">
      <RadioGroup.Label className="sr-only">Speltyp</RadioGroup.Label>
      {games.map(([gameType, _]) => (
        <RadioGroup.Option
          key={gameType}
          value={gameType}
          className={({ active, checked }) =>
            `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-3 py-2 uppercase shadow-md focus:outline-none`
          }
        >
          {({ active, checked }) => (
            <Flex>
              <Flex>
                <RadioGroup.Label
                  as="p"
                  className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                >
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
