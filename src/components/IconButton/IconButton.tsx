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
        'cursor-pointer rounded-full transition-colors hover:bg-slate-400/10 focus:outline-none focus:ring-2 focus:ring-slate-300/50'
      }
      {...htmlAttributes}
    >
      {children}
    </button>
  )
}

export default IconButton
