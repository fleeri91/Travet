'use client'

import DarkModeToggle from '@/components/DarkModeToggle'
import { HTMLAttributes } from 'react'

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...htmlAttributes }: HeaderProps): JSX.Element | null => {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div></div>
        <div></div>
        <div>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header
