import { useEffect, useState } from 'react'
import { RadioGroup, Radio, Label } from '@headlessui/react'
import { Flex } from '@tremor/react'
import { Game } from '@/types/ATG/CalendarDay'

interface GameTypeSelectProps {
  games: [string, Game[]][]
  onSelectedGameType: (value: string) => void
}

const GameTypeSelect = ({ games, onSelectedGameType }: GameTypeSelectProps): JSX.Element | null => {
  // Set the initial value conditionally to avoid errors when games might be empty
  const [selected, setSelected] = useState(games.length ? games[0][0] : '')

  useEffect(() => {
    if (games.length) {
      const firstGameType = games[0][0]
      setSelected(firstGameType)
      onSelectedGameType(firstGameType)
    }
  }, [games, onSelectedGameType])

  return (
    <RadioGroup
      value={selected}
      onChange={(value) => {
        setSelected(value)
        onSelectedGameType(value)
      }}
      className="no-scrollbar relative inline-flex w-full gap-2 overflow-x-scroll py-2"
      id="game-type-selector"
    >
      <Label className="sr-only">Speltyp</Label>
      {games.map(([gameType, gamesArray]) => {
        if (!gamesArray.length) return null

        return (
          <Radio
            key={gameType}
            value={gameType}
            className={({ checked }) =>
              `${checked ? 'text-white' : 'bg-slate-300'}
              group relative flex cursor-pointer select-none rounded-lg border-none px-3 py-2 text-sm uppercase shadow-md transition-all focus:outline-none sm:text-base`
            }
            data-theme={gameType}
          >
            <Flex>
              {gamesArray.length > 1 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-slate-600">
                  <span className="flex h-4 w-4 items-center justify-center text-xs text-white">
                    {gamesArray.length}
                  </span>
                </span>
              )}
              <Label as="p" className="font-medium text-white transition-all">
                {gameType}
              </Label>
            </Flex>
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

export default GameTypeSelect
