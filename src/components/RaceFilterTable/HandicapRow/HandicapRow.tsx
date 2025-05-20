'use client'

import { Table, Text } from '@radix-ui/themes'

interface HandicapRowProps {
  handicap: number
}

const HandicapRow = ({ handicap }: HandicapRowProps) => (
  <Table.Row>
    <Table.Cell colSpan={12} style={{ backgroundColor: 'var(--color-panel)' }}>
      <Text className="font-extrabold">{`Tillägg: ${handicap} meter`}</Text>
    </Table.Cell>
  </Table.Row>
)

export default HandicapRow
