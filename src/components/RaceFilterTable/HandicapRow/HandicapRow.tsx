'use client'

import { Table, Text, Card } from '@radix-ui/themes'

interface HandicapRowProps {
  handicap: number
}

const HandicapRow = ({ handicap }: HandicapRowProps) => (
  <Table.Row>
    <Table.Cell colSpan={12} className="p-0">
      <Card className="rounded-none before:rounded-none after:rounded-none after:border-none after:shadow-none">
        <Text className="font-extrabold">{`Tillägg: ${handicap} meter`}</Text>
      </Card>
    </Table.Cell>
  </Table.Row>
)

export default HandicapRow
