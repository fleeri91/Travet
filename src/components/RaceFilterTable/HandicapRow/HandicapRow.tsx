'use client'

import { TableCell, TableRow, Text } from '@tremor/react'

interface HandicapRowProps {
  handicap: number
}

const HandicapRow = ({ handicap }: HandicapRowProps) => {
  return (
    <TableRow>
      <TableCell className="w-full bg-gray-600 py-1" colSpan={12}>
        <Text className="text-white">{`Tillägg: ${handicap} meter`}</Text>
      </TableCell>
    </TableRow>
  )
}

export default HandicapRow
