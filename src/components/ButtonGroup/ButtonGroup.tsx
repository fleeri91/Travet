import { HTMLAttributes, useState } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLElement> {}

const ButtonGroup = ({
  children,
  className,
  ...htmlAttributes
}: ButtonGroupProps): JSX.Element | null => (
  <div
    className="fixed bottom-4 right-0 flex flex-col gap-2 p-4 md:relative md:bottom-0 md:p-0"
    {...htmlAttributes}
  >
    {children}
  </div>
)

export default ButtonGroup
