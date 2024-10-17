import { Fragment } from 'react'
import clsx from 'clsx'

import { Dialog, Transition } from '@headlessui/react'
import { Flex, Size } from '@tremor/react'

interface ModalProps {
  /** Content rendered as children */
  children?: React.ReactNode

  /** Title of the modal */
  title?: string

  /** Size of the modal */
  size?: Size

  /** If the modal should be fullwidth */
  fullWidth?: boolean

  /** If the modal should be open */
  isOpen: boolean

  /** Function to close the modal */
  onClose: (value: boolean) => void
}

const Modal = ({
  children,
  title,
  size = 'md',
  fullWidth,
  isOpen,
  onClose,
}: ModalProps): JSX.Element => {
  const SizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'min-h-96 w-full transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  size && fullWidth ? '' : SizeClasses[size]
                )}
              >
                <Flex className="mb-4">
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                  )}
                </Flex>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
