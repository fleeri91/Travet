'use client'

import { Fragment, useMemo, useState, type JSX } from 'react'
import clsx from 'clsx'
import { Table, Flex } from '@radix-ui/themes'
import { RiSortAsc } from '@remixicon/react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import HandicapRow from './HandicapRow'
import H2H from '@/components/H2H'

import { useRaceTableColumns } from './useRaceTableColumns'

import { useFilterStore } from '@/store/useFilter'

import { _recordFilter } from '@/utils/filter'

import type { Game, Race, Start } from '@/types/Game'
import type { RecordResult } from '@/types/ATG/Record'

export interface TableData {
  start: Start
  currentStart: Start
  currentRace: Race
  filteredRecords: RecordResult[]
  records: RecordResult[]
  handicap: number
  startIndex: number
}

interface RaceFilterTableProps {
  game: Game
  race: Race | null
  raceIndex: number
}

const RaceFilterTable = ({
  game,
  race,
  raceIndex,
}: RaceFilterTableProps): JSX.Element | null => {
  const { filter } = useFilterStore()

  const [selectedHorseId, setSelectedHorseId] = useState<
    string | number | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleRowClick = (horseId: string | number) => {
    setSelectedHorseId(horseId)
    setIsModalOpen(true)
  }

  const data = useMemo<TableData[]>(() => {
    if (!race?.starts || !game.races[raceIndex]) return []

    return race.starts
      .map((start: Start, startIndex: number) => {
        const currentRace = game.races[raceIndex]
        const currentStart = currentRace.starts[startIndex]

        if (!currentStart) return null

        const records = start.records
        const filteredRecords = _recordFilter(
          records,
          currentRace.track,
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

  const columns = useRaceTableColumns()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const isSorted = table.getState().sorting.length > 0
  const renderedHandicaps: { [key: number]: boolean } = {}

  return (
    <>
      <Table.Root size="1">
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
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  }}
                  className="w-full"
                >
                  <Flex align="center" gap="2" height="100%">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.id === 'tid' &&
                      header.column.getIsSorted() === 'asc' && <RiSortAsc />}
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
                return (
                  <HandicapRow
                    key={`handicap-${handicap}`}
                    handicap={handicap}
                  />
                )
              }
              return null
            }

            return (
              <Fragment key={startIndex}>
                {renderHandicapRow()}
                <Table.Row
                  className={clsx(
                    'select-none',
                    start.scratched && 'opacity-60',
                    'cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-800'
                  )}
                  onClick={() =>
                    handleRowClick(row.original.currentStart.horse.id)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Fragment>
            )
          })}
        </Table.Body>
      </Table.Root>

      {selectedHorseId && isModalOpen && (
        <H2H
          horseId={selectedHorseId}
          onClose={() => setIsModalOpen(false)}
          game={game}
        />
      )}
    </>
  )
}

export default RaceFilterTable
