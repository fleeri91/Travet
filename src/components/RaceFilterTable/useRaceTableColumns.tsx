import { ColumnDef } from '@tanstack/react-table'
import { RiInformationLine } from '@remixicon/react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'

import { NameCell, TimeCell, FormCell, GalloppCell } from './Cells'
import { _getStartRecord } from '@/utils/filter'

import type { TableData } from './RaceFilterTable'

export const useRaceTableColumns = (): ColumnDef<TableData>[] => [
  {
    accessorKey: 'name',
    header: () => <Text size={{ initial: '2', xl: '3' }}>Namn</Text>,
    enableSorting: false,
    cell: ({ row }) => (
      <NameCell
        start={row.original.start}
        currentStart={row.original.currentStart}
      />
    ),
  },
  {
    accessorKey: 'tid',
    header: () => (
      <Flex align="center" gap="2">
        <Text size={{ initial: '2', xl: '3' }}>Tid</Text>
        <Tooltip content="Rekordtid utifrån filter">
          <IconButton variant="soft" radius="full">
            <RiInformationLine />
          </IconButton>
        </Tooltip>
      </Flex>
    ),
    enableSorting: true,
    cell: ({ row }) => <TimeCell row={row.original} />,
    sortingFn: (rowA, rowB) => {
      const recordA = _getStartRecord(
        rowA.original.records,
        rowA.original.filteredRecords
      )
      const recordB = _getStartRecord(
        rowB.original.records,
        rowB.original.filteredRecords
      )
      const timeA = recordA.time ? parseFloat(recordA.time) : Infinity
      const timeB = recordB.time ? parseFloat(recordB.time) : Infinity

      return timeA - timeB
    },
  },
  {
    accessorKey: 'form',
    header: () => (
      <Flex align="center" gap="2">
        <Text size={{ initial: '2', xl: '3' }}>Form</Text>
        <Tooltip content="Form 5 senaste starter inom 3 månader">
          <IconButton variant="soft" radius="full">
            <RiInformationLine />
          </IconButton>
        </Tooltip>
      </Flex>
    ),
    enableSorting: false,
    cell: ({ row }) => <FormCell records={row.original.records} />,
  },
  {
    accessorKey: 'gallopp',
    header: () => (
      <Flex align="center" gap="2">
        <Text size={{ initial: '2', xl: '3' }}>Gallopp</Text>
        <Tooltip content="Gallopp 5 senaste starter inom 3 månader.">
          <IconButton variant="soft" radius="full">
            <RiInformationLine />
          </IconButton>
        </Tooltip>
      </Flex>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <GalloppCell
        records={row.original.records}
        currentRace={row.original.currentRace}
        currentStart={row.original.currentStart}
      />
    ),
  },
]
