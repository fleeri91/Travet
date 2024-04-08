import { Color } from '@tremor/react'

import { GameType } from '@/constants/GameType'

export const applyThemePreference = (darkMode: boolean) => {
  const root = window.document.documentElement
  root.classList.remove(darkMode ? 'light' : 'dark')
  root.classList.add(darkMode ? 'dark' : 'light')
}

export const gameTypeColor = (gameType: GameType): Color => {
  switch (gameType) {
    case 'V75':
      return 'blue'
    case 'GS75':
      return 'emerald'
    case 'V86':
      return 'purple'
    case 'V64':
      return 'orange'
    case 'V65':
      return 'red'
    case 'dd':
      return 'sky'
    case 'ld':
      return 'sky'
    case 'V5':
      return 'sky'
    case 'V4':
      return 'sky'
    case 'V3':
      return 'sky'
    default:
      return 'neutral'
  }
}
