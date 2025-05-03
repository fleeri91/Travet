'use client'

import { Fragment } from 'react'
import clsx from 'clsx'
import { Badge, Flex, IconButton, Table, Text, Tooltip } from '@radix-ui/themes'
import { RiInformationLine } from '@remixicon/react'

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

const RaceFilterTable = ({ game, race, raceIndex }: RaceFilterTableProps): JSX.Element | null => {
  const { filter } = useFilterStore()

  const renderedHandicaps: { [key: number]: boolean } = {}

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Text size="3">Namn</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Flex align="center" gap="2">
              <Text size="3">Tid</Text>
              <Tooltip content="Rekordtid utifrån filter">
                <IconButton variant="soft" radius="full">
                  <RiInformationLine />
                </IconButton>
              </Tooltip>
            </Flex>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Flex align="center" gap="2">
              <Text size="3">Form</Text>
              <Tooltip content="Form 5 senaste starter inom 3 månader">
                <IconButton variant="soft" radius="full">
                  <RiInformationLine />
                </IconButton>
              </Tooltip>
            </Flex>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Flex align="center" gap="2">
              <Text size="3">Gallopp</Text>
              <Tooltip content="Gallopp 5 senaste starter inom 3 månader.">
                <IconButton variant="soft" radius="full">
                  <RiInformationLine />
                </IconButton>
              </Tooltip>
            </Flex>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {race?.starts.map((start: Start, startIndex: number) => {
          if (!game.races[raceIndex] || !game.races[raceIndex].starts[startIndex]) {
            return
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

          let handicap = currentStart.distance - currentRace.distance

          const renderDataRow = () => (
            <Table.Row
              key={startIndex}
              className={clsx('select-none', start.scratched && 'opacity-60')}
            >
              <Table.RowHeaderCell className="w-full space-x-2">
                <Flex gap="4" align="center">
                  <Badge
                    color={start.scratched ? 'gray' : 'blue'}
                    size="2"
                    className="flex w-7 justify-center"
                  >
                    <Text size="2">{currentStart.number && currentStart.number}</Text>
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
                      {currentStart && currentStart.horse.nationality && (
                        <span>{'(' + currentStart.horse.nationality + ')'}</span>
                      )}
                      {currentStart && currentStart.horse.sex && (
                        <span>
                          {`${_getHorseSex(currentStart.horse.sex)}${currentStart.horse.age}`}
                        </span>
                      )}
                    </Text>
                    <Text
                      size="2"
                      className={clsx(start.scratched && 'text-gray-300 line-through')}
                    >
                      {currentStart &&
                        currentStart.driver.firstName &&
                        currentStart.driver.lastName && (
                          <span>{`${currentStart.driver.firstName} ${currentStart.driver.lastName}`}</span>
                        )}
                    </Text>
                  </Flex>
                </Flex>
              </Table.RowHeaderCell>
              {records && filteredRecords && (
                <Table.Cell>
                  <Flex justify="start" align="center" className="h-full min-w-[120px] space-x-2">
                    {(() => {
                      const startRecord = _getStartRecord(records, filteredRecords)

                      if (!startRecord.time && !startRecord.distance?.type) {
                        return null
                      }

                      return (
                        <>
                          {startRecord.time && <Text size="3">{`${startRecord.time}`}</Text>}
                          <Badge size="2" className="flex min-w-12 justify-center">
                            <Text size="2">{startRecord.distance.type}</Text>
                          </Badge>
                          {startRecord.recent && (
                            <Badge size="2" className="flex w-6 justify-center">
                              <Text size="2">🔥</Text>
                            </Badge>
                          )}
                        </>
                      )
                    })()}
                  </Flex>
                </Table.Cell>
              )}
              {records && (
                <Table.Cell className="min-w-[210px]">
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
                </Table.Cell>
              )}
              <Table.Cell className="min-w-[210px] space-x-2">
                <Flex justify="start" align="center" className="h-full space-x-2">
                  {_getGallopp(records, currentRace.startMethod).map(
                    (record: any, index: number) => (
                      <Badge
                        key={index}
                        size="2"
                        className="flex w-7 justify-center"
                        color={
                          record.start.postPosition === currentStart.postPosition ? 'red' : 'yellow'
                        }
                      >
                        <Text size="2">
                          {record.disqualified ? `D` : record.galloped ? `G` : ``}
                        </Text>
                      </Badge>
                    )
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          )

          const renderHandicapRow = () => {
            if (handicap > 0 && !renderedHandicaps[handicap]) {
              renderedHandicaps[handicap] = true
              return <HandicapRow handicap={handicap} />
            }
            return null
          }

          return (
            <Fragment key={startIndex}>
              {renderHandicapRow()}
              {renderDataRow()}
            </Fragment>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

export default RaceFilterTable
