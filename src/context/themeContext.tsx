'use client'

import { useGameStore } from '@/store/useGame'
import { ReactNode, createContext, useEffect } from 'react'

const DEFAULT_THEME = 'default'

interface ThemeContextProps {}

const ThemeContext = createContext<ThemeContextProps>({})

export default ThemeContext

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { gameId } = useGameStore()

  useEffect(() => {
    const [gameType] = gameId.split('_')

    gameId
      ? document.getElementsByTagName('html')[0].setAttribute('data-theme', gameType)
      : document.getElementsByTagName('html')[0].setAttribute('data-theme', DEFAULT_THEME)
  }, [gameId])

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
