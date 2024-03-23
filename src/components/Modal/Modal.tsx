import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Flex } from '@tremor/react'

interface ModalProps {
  /** Content rendered as children */
  children?: React.ReactNode

  /** Title of the modal */
  title?: string

  /** Description of the modal */
  description?: string

  /** If the modal should be open */
  isOpen: boolean

  /** Function to close the modal */
  onClose: (value: boolean) => void
}

const Modal = ({ children, title, description, isOpen, onClose }: ModalProps): JSX.Element => (
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
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Flex className="mb-4">
                {title && (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                )}
                {description && <Dialog.Description>{description}</Dialog.Description>}
              </Flex>
              <Flex flexDirection="col">{children}</Flex>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

export default Modal
