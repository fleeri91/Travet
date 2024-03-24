'use client'

import { ReactNode, createContext, useEffect } from 'react'

import { useGameStore } from '@/store/useGame'
import { useThemeStore } from '@/store/useTheme'

import { gameTypeColor } from '@/utils/theme'

import { GameType } from '@/constants/GameType'

const DEFAULT_THEME = 'default'

interface ThemeContextProps {}

const ThemeContext = createContext<ThemeContextProps>({})

export default ThemeContext

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { gameId } = useGameStore()
  const { setTheme } = useThemeStore()

  useEffect(() => {
    if (gameId) {
      const [gameType] = gameId.split('_')
      setTheme(gameTypeColor(gameType as GameType))
      document.getElementsByTagName('html')[0].setAttribute('data-theme', gameType)
    } else {
      setTheme('blue')
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'V75')
    }
  }, [gameId])

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
