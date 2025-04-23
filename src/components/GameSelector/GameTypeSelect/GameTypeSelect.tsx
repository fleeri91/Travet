import { useEffect, useState } from 'react'

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

  return <></>
}

export default GameTypeSelect
