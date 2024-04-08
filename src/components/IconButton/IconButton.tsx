import { Button, ButtonProps } from '@tremor/react'

const IconButton = ({
  children,
  onClick,
  className,
  ...htmlAttributes
}: ButtonProps): JSX.Element | null => {
  return (
    <button
      onClick={onClick}
      className={
        'cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300/50 disabled:cursor-not-allowed disabled:opacity-25 sm:hover:bg-slate-400/10'
      }
      {...htmlAttributes}
    >
      {children}
    </button>
  )
}

export default IconButton
