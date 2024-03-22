import { Color } from '@tremor/react'

import { GameType } from '@/constants/GameType'

export const applyThemePreference = (darkMode: boolean) => {
  const root = window.document.documentElement
  root.classList.remove(darkMode ? 'light' : 'dark')
  root.classList.add(darkMode ? 'dark' : 'light')
}

export const gameTypeColor = (gameType: GameType): Color => {
  switch (gameType) {
    case 'v75':
      return 'blue'
    case 'gs75':
      return 'emerald'
    case 'v86':
      return 'purple'
    case 'v64':
      return 'orange'
    case 'v65':
      return 'red'
    case 'dd':
      return 'sky'
    case 'v5':
      return 'sky'
    case 'v4':
      return 'sky'
    case 'v3':
      return 'sky'
    default:
      return 'neutral'
  }
}
