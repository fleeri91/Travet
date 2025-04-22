'use client'

import { TableCell, TableRow, Text } from '@tremor/react'

interface HandicapRowProps {
  handicap: number
}

const HandicapRow = ({ handicap }: HandicapRowProps) => {
  return (
    <TableRow className="!border-none bg-gray-600 py-2 odd:dark:bg-slate-900 even:dark:bg-slate-950">
      <TableCell className="w-full" colSpan={12}>
        <Text className="text-white">{`Tillägg: ${handicap} meter`}</Text>
      </TableCell>
    </TableRow>
  )
}

export default HandicapRow
