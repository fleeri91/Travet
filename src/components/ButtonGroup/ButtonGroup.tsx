import { HTMLAttributes, useState } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLElement> {}

const ButtonGroup = ({
  children,
  className,
  ...htmlAttributes
}: ButtonGroupProps): JSX.Element | null => (
  <div className="group fixed bottom-6 end-6 flex flex-col gap-2" {...htmlAttributes}>
    {children}
  </div>
)

export default ButtonGroup
