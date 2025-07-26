import clsx from 'clsx'
import { Badge, Flex, Text } from '@radix-ui/themes'

import { _getHorseSex } from '@/utils/atg'

import type { Start } from '@/types/Game'

interface NameCellProps {
  start: Start
  currentStart: Start
}

const NameCell = ({ start, currentStart }: NameCellProps) => (
  <Flex gap="4" align="center">
    <Badge
      color={start.scratched ? 'gray' : 'blue'}
      size="2"
      className="flex w-7 justify-center"
    >
      <Text size="2">{currentStart.number}</Text>
    </Badge>
    <Flex direction="column" justify="start" align="start" className="mr-8">
      <Text
        size={{ initial: '2', xl: '3' }}
        className={clsx(
          start.scratched && 'text-gray-300 line-through',
          'space-x-2 whitespace-nowrap'
        )}
      >
        {currentStart.horse.name && <span>{currentStart.horse.name}</span>}
        {currentStart.horse.nationality && (
          <span>{`(${currentStart.horse.nationality})`}</span>
        )}
        {currentStart.horse.sex && (
          <span>{`${_getHorseSex(currentStart.horse.sex)}${currentStart.horse.age}`}</span>
        )}
      </Text>
      <Text
        size={{ initial: '1', xl: '2' }}
        className={clsx(start.scratched && 'text-gray-300 line-through')}
      >
        {`${currentStart.driver.firstName} ${currentStart.driver.lastName}`}
      </Text>
    </Flex>
  </Flex>
)

export default NameCell
