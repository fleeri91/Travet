import { HTMLAttributes, useEffect } from 'react'

import { Switch } from '@headlessui/react'

import { useThemeStore } from '@/store/useTheme'
import { applyThemePreference } from '@/utils/theme'

const DarkModeToggle = (): JSX.Element | null => {
  const { darkMode, setDarkMode } = useThemeStore()

  useEffect(() => {
    applyThemePreference(darkMode)
  }, [darkMode])

  return (
    <Switch
      checked={darkMode}
      onChange={setDarkMode}
      className={`${darkMode ? 'bg-slate-700' : 'bg-slate-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          darkMode ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}

export default DarkModeToggle
