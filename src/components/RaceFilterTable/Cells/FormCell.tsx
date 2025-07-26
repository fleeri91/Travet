import { Badge, Flex, Text } from '@radix-ui/themes'

import { _getStartForm } from '@/utils/filter'

import type { FormType } from '@/types/Filter'
import type { RecordResult } from '@/types/ATG/Record'

interface FormCellProps {
  records: RecordResult[]
}

const FormCell = ({ records }: FormCellProps) => {
  if (!records) return null

  const form = _getStartForm(records)

  return (
    <Flex
      justify="start"
      align="center"
      className="h-full min-w-[200px] space-x-2"
    >
      {form.map((record: FormType, index: number) => (
        <Badge
          key={index}
          size="2"
          className="flex w-7 justify-center"
          color={
            record.disqualified || record.place === '0'
              ? 'red'
              : record.place >= '4'
                ? 'gray'
                : 'green'
          }
        >
          <Text size="2">{record.disqualified ? 'D' : record.place}</Text>
        </Badge>
      ))}
    </Flex>
  )
}

export default FormCell
