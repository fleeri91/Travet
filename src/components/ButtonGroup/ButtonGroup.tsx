import { HTMLAttributes, useState } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLElement> {}

const ButtonGroup = ({
  children,
  className,
  ...htmlAttributes
}: ButtonGroupProps): JSX.Element | null => (
  <div
    className="group fixed bottom-0 right-0 flex flex-col gap-2 p-4 xl:relative"
    {...htmlAttributes}
  >
    {children}
  </div>
)

export default ButtonGroup
