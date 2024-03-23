import { useState } from 'react'
import { RiInformationLine } from '@remixicon/react'

import clsx from 'clsx'

import { Flex, Icon } from '@tremor/react'

import { Switch as HeadlessUISwitch } from '@headlessui/react'

interface SwitchProps {
  label?: string
  srLabel?: string
  value: boolean
  onChange?: (value: boolean) => void
  tooltip?: string
}

const Switch = ({ label, srLabel, value, onChange, tooltip }: SwitchProps): JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(value)

  const handleToggle = () => {
    const newValue = !enabled
    setEnabled(newValue)
    onChange && onChange(newValue)
  }

  return (
    <HeadlessUISwitch.Group>
      <Flex>
        <Flex justifyContent="start">
          {label && (
            <HeadlessUISwitch.Label className={'select-none text-lg'}>
              {label}
            </HeadlessUISwitch.Label>
          )}
          {tooltip && <Icon tooltip={tooltip} icon={RiInformationLine} />}
        </Flex>
        <HeadlessUISwitch
          checked={enabled}
          onChange={setEnabled}
          onClick={handleToggle}
          className={clsx(
            enabled ? 'bg-blue-400' : 'bg-blue-50',
            'relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-75'
          )}
        >
          {srLabel && <span className="sr-only">{srLabel}</span>}
          <span
            aria-hidden="true"
            className={clsx(
              enabled ? 'translate-x-8' : 'translate-x-0',
              'pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
            )}
          />
        </HeadlessUISwitch>
      </Flex>
    </HeadlessUISwitch.Group>
  )
}

export default Switch
