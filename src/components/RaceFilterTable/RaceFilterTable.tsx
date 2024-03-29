'use client'

import { Fragment } from 'react'
import clsx from 'clsx'
import {
  Badge,
  Flex,
  Icon,
  Text,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import { RiInformationLine } from '@remixicon/react'

import HandicapRow from './HandicapRow'

import { useFilterStore } from '@/store/useFilter'

import { GameRoot, Race, Start } from '@/types/ATG/Game'
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
    <Table className="w-full select-none">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="w-6/12">Namn</TableHeaderCell>
          <TableHeaderCell className="w-2/12 ">
            <Flex justifyContent="start">
              <Text>Tid</Text>
              <Icon tooltip={'Filtrerat resultat'} icon={RiInformationLine} />
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className="w-2/12 ">
            <Flex justifyContent="start">
              <Text>Form</Text>
              <Icon tooltip={'Hästens form senaste 3 månaderna'} icon={RiInformationLine} />
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className="w-2/12 ">
            <Flex justifyContent="start">
              <Text>Gallopp</Text>
              <Icon tooltip={'Gallopp senaste 5 starter'} icon={RiInformationLine} />
            </Flex>
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
            <TableRow
              key={startIndex}
              className={clsx(
                currentStart && currentStart.scratched && 'text-gray-300 line-through',
                '!border-gray-100 even:bg-theme-50'
              )}
            >
              <TableCell className="space-x-2 py-2">
                <Flex justifyContent="start" className="space-x-2">
                  {currentStart.number && (
                    <Text className={clsx(start.scratched && 'text-gray-300')}>
                      {currentStart.number}
                    </Text>
                  )}
                  {currentStart.horse.name && (
                    <Text className={clsx(start.scratched && 'text-gray-300')}>
                      {currentStart.horse.name}
                    </Text>
                  )}
                  {currentStart && currentStart.horse.nationality && (
                    <Text className={clsx(start.scratched && 'text-gray-300')}>
                      {'(' + currentStart.horse.nationality + ')'}
                    </Text>
                  )}
                  {currentStart && currentStart.horse.sex && (
                    <Text
                      className={clsx(start.scratched && 'text-gray-300')}
                    >{`${_getHorseSex(currentStart.horse.sex)}${currentStart.horse.age}`}</Text>
                  )}
                </Flex>
              </TableCell>
              {records && (
                <TableCell className="py-2">{_getStartRecord(filteredRecords)}</TableCell>
              )}
              {records && (
                <TableCell className="space-x-2 py-2">
                  {_getStartForm(records).map((record: any, index: number) => (
                    <Badge
                      key={index}
                      color={
                        record.place === '0' || record.place > '5'
                          ? 'red'
                          : record.place >= '4' && record.place <= '6'
                            ? 'gray'
                            : 'green'
                      }
                    >
                      {record.place}
                    </Badge>
                  ))}
                </TableCell>
              )}
              <TableCell className="space-x-2 py-2">
                {_getGallopp(records, currentRace.startMethod).map((record: any, index: number) =>
                  record.start.postPosition === currentStart.postPosition ? (
                    <Badge key={index} color={'red'}>
                      !!
                    </Badge>
                  ) : (
                    <Badge key={index} color={'yellow'}>
                      !
                    </Badge>
                  )
                )}
              </TableCell>
            </TableRow>
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
      </TableBody>
    </Table>
  )
}

export default RaceFilterTable
