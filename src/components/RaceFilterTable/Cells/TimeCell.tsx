import { Badge, Flex, Text } from '@radix-ui/themes'

import { _getStartRecord } from '@/utils/filter'

import type { TableData } from '@/components/RaceFilterTable'

interface TimeCellProps {
  row: TableData
}

const TimeCell = ({ row }: TimeCellProps) => {
  const { records, filteredRecords } = row
  if (!records || !filteredRecords) return null

  const startRecord = _getStartRecord(records, filteredRecords)
  if (!startRecord.time && !startRecord.distance?.type) return null

  return (
    <Flex
      justify="start"
      align="center"
      gap="2"
      className="h-full min-w-[148px]"
    >
      <span>
        {startRecord.time && <Text size="3">{startRecord.time}</Text>}
      </span>
      <Badge size="2" className="flex min-w-12 justify-center">
        <Text size="2">{startRecord.distance?.type}</Text>
      </Badge>
      {startRecord.recent && (
        <Badge size="2" className="flex w-6 justify-center">
          <Text size="2">🔥</Text>
        </Badge>
      )}
    </Flex>
  )
}

export default TimeCell
