'use client'

import { Fragment, useMemo } from 'react'
import clsx from 'clsx'
import { Badge, Flex, IconButton, Table, Text, Tooltip } from '@radix-ui/themes'
import { RiInformationLine, RiSortAsc, RiSortDesc } from '@remixicon/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import HandicapRow from './HandicapRow'
import { useFilterStore } from '@/store/useFilter'
import { GameRoot, Race, Start } from '@/types/ATG/Game'
import { FormType } from '@/types/Filter'
import { _getHorseSex } from '@/utils/atg'
import { _getGallopp, _getStartForm, _getStartRecord, _recordFilter } from '@/utils/filter'

interface RaceFilterTableProps {
  game: GameRoot
  race: Race | null
  raceIndex: number
}

interface TableData {
  start: Start
  currentStart: Start
  currentRace: Race
  filteredRecords: any
  records: any
  handicap: number
  startIndex: number
}

const RaceFilterTable = ({ game, race, raceIndex }: RaceFilterTableProps): JSX.Element | null => {
  const { filter } = useFilterStore()

  const data = useMemo(() => {
    if (!race?.starts || !game.races[raceIndex]) return []

    return race.starts
      .map((start: Start, startIndex: number) => {
        if (!game.races[raceIndex] || !game.races[raceIndex].starts[startIndex]) {
          return null
        }

        const currentRace = game.races[raceIndex]
        const currentStart = game.races[raceIndex].starts[startIndex]
        const records = start.records
        const filteredRecords = _recordFilter(
          records,
          game.races[raceIndex].track,
          currentRace,
          currentStart,
          filter
        )
        const handicap = currentStart.distance - currentRace.distance

        return {
          start,
          currentStart,
          currentRace,
          filteredRecords,
          records,
          handicap,
          startIndex,
        }
      })
      .filter((item): item is TableData => item !== null)
  }, [race, game, raceIndex, filter])

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <Text size="3">Namn</Text>,
        enableSorting: false,
        cell: ({ row }) => {
          const { start, currentStart } = row.original
          return (
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
                  size="3"
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
                <Text size="2" className={clsx(start.scratched && 'text-gray-300 line-through')}>
                  {currentStart.driver.firstName && currentStart.driver.lastName && (
                    <span>{`${currentStart.driver.firstName} ${currentStart.driver.lastName}`}</span>
                  )}
                </Text>
              </Flex>
            </Flex>
          )
        },
      },
      {
        accessorKey: 'tid',
        header: () => (
          <Flex align="center" gap="2">
            <Text size="3">Tid</Text>
            <Tooltip content="Rekordtid utifrån filter">
              <IconButton variant="soft" radius="full">
                <RiInformationLine />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
        enableSorting: true,
        cell: ({ row }) => {
          const { records, filteredRecords } = row.original
          if (!records || !filteredRecords) return null

          const startRecord = _getStartRecord(records, filteredRecords)
          if (!startRecord.time && !startRecord.distance?.type) return null

          return (
            <Flex justify="start" align="center" className="h-full min-w-[120px] space-x-2">
              {startRecord.time && <Text size="3">{startRecord.time}</Text>}
              <Badge size="2" className="flex min-w-12 justify-center">
                <Text size="2">{startRecord.distance.type}</Text>
              </Badge>
              {startRecord.recent && (
                <Badge size="2" className="flex w-6 justify-center">
                  <Text size="2">🔥</Text>
                </Badge>
              )}
            </Flex>
          )
        },
        sortingFn: (rowA, rowB) => {
          const recordA = _getStartRecord(rowA.original.records, rowA.original.filteredRecords)
          const recordB = _getStartRecord(rowB.original.records, rowB.original.filteredRecords)
          const timeA = recordA.time ? parseFloat(recordA.time) : Infinity
          const timeB = recordB.time ? parseFloat(recordB.time) : Infinity
          return timeA - timeB
        },
      },
      {
        accessorKey: 'form',
        header: () => (
          <Flex align="center" gap="2">
            <Text size="3">Form</Text>
            <Tooltip content="Form 5 senaste starter inom 3 månader">
              <IconButton variant="soft" radius="full">
                <RiInformationLine />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { records } = row.original
          if (!records) return null

          return (
            <Flex justify="start" align="center" className="h-full space-x-2">
              {_getStartForm(records).map((record: FormType, index: number) => (
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
        },
      },
      {
        accessorKey: 'gallopp',
        header: () => (
          <Flex align="center" gap="2">
            <Text size="3">Gallopp</Text>
            <Tooltip content="Gallopp 5 senaste starter inom 3 månader.">
              <IconButton variant="soft" radius="full">
                <RiInformationLine />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { records, currentRace, currentStart } = row.original
          return (
            <Flex justify="start" align="center" className="h-full space-x-2">
              {_getGallopp(records, currentRace.startMethod).map((record: any, index: number) => (
                <Badge
                  key={index}
                  size="2"
                  className="flex w-7 justify-center"
                  color={record.start.postPosition === currentStart.postPosition ? 'red' : 'yellow'}
                >
                  <Text size="2">{record.disqualified ? 'D' : record.galloped ? 'G' : ''}</Text>
                </Badge>
              ))}
            </Flex>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const isSorted = table.getState().sorting.length > 0
  const renderedHandicaps: { [key: number]: boolean } = {}

  return (
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeaderCell
                key={header.id}
                onClick={() => {
                  if (header.column.id === 'tid') {
                    if (header.column.getIsSorted() === 'asc') {
                      header.column.clearSorting()
                    } else {
                      header.column.toggleSorting(false)
                    }
                  }
                }}
                style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                className="w-full"
              >
                <Flex align="center" gap="2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.id === 'tid' && header.column.getIsSorted() === 'asc' && (
                    <RiSortAsc />
                  )}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => {
          const { start, handicap, startIndex } = row.original

          const renderHandicapRow = () => {
            if (isSorted) return null
            if (handicap > 0 && !renderedHandicaps[handicap]) {
              renderedHandicaps[handicap] = true
              return <HandicapRow handicap={handicap} />
            }
            return null
          }

          return (
            <Fragment key={startIndex}>
              {renderHandicapRow()}
              <Table.Row className={clsx('select-none', start.scratched && 'opacity-60')}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            </Fragment>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

export default RaceFilterTable
