import { HTMLAttributes, useState } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLElement> {}

const ButtonGroup = ({
  children,
  className,
  ...htmlAttributes
}: ButtonGroupProps): JSX.Element | null => (
  <div className="group flex flex-col gap-2" {...htmlAttributes}>
    {children}
  </div>
)

export default ButtonGroup
