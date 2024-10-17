import { Button, ButtonProps } from '@tremor/react'
import clsx from 'clsx'

const IconButton = ({
  children,
  onClick,
  className,
  ...htmlAttributes
}: ButtonProps): JSX.Element | null => {
  return (
    <Button
      className={clsx(
        'inline-flex items-center border-none bg-transparent p-2 text-blue-500 shadow-inner shadow-white/10 transition-colors',
        'hover:bg-blue-200',
        className
      )}
      {...htmlAttributes}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default IconButton
