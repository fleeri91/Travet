import { Badge, Flex, Text } from '@radix-ui/themes'

import { _getGallopp } from '@/utils/filter'

import type { Race, Start } from '@/types/Game'

interface GalloppCellProps {
  records: any
  currentStart: Start
  currentRace: Race
}

const GalloppCell = ({
  records,
  currentStart,
  currentRace,
}: GalloppCellProps) => {
  const galloppData = _getGallopp(records, currentRace.startMethod)

  return (
    <Flex
      justify="start"
      align="center"
      className="h-full min-w-[172px] space-x-2"
    >
      {galloppData.map((record: any, index: number) => (
        <Badge
          key={index}
          size="2"
          className="flex w-7 justify-center"
          color={
            record.start.postPosition === currentStart.postPosition
              ? 'red'
              : 'yellow'
          }
        >
          <Text size="2">
            {record.disqualified ? 'D' : record.galloped ? 'G' : ''}
          </Text>
        </Badge>
      ))}
    </Flex>
  )
}

export default GalloppCell
