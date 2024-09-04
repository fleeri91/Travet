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
  Subtitle,
} from '@tremor/react'
import { RiInformationLine } from '@remixicon/react'

import HandicapRow from './HandicapRow'

import { useFilterStore } from '@/store/useFilter'
import { useThemeStore } from '@/store/useTheme'

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
  const { theme } = useThemeStore()

  const renderedHandicaps: { [key: number]: boolean } = {}

  return (
    <Table className="w-full select-none">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="w-3/12">
            <Subtitle>Namn</Subtitle>
          </TableHeaderCell>
          <TableHeaderCell className="w-2/12" />
          <TableHeaderCell className="w-1/12">
            <Flex justifyContent="start">
              <Subtitle>Tid</Subtitle>
              <Icon tooltip={'Filtrerat resultat'} icon={RiInformationLine} />
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className="w-[210px]">
            <Flex justifyContent="start">
              <Subtitle>Form</Subtitle>
              <Icon tooltip={'Hästens form senaste 3 månaderna'} icon={RiInformationLine} />
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className="w-[210px]">
            <Flex justifyContent="start">
              <Subtitle>Gallopp</Subtitle>
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
                'group table-fixed !border-none odd:bg-white even:bg-theme-50 dark:even:bg-slate-800'
              )}
            >
              <TableCell className="space-x-2 py-2">
                <Flex justifyContent="start">
                  <Text
                    className={clsx(start.scratched && 'text-gray-300 line-through', 'space-x-2')}
                  >
                    <Badge color={theme} className="w-[25px]">
                      {currentStart.number && currentStart.number}
                    </Badge>
                    <span>{currentStart.horse.name && currentStart.horse.name}</span>
                    <span>
                      {currentStart &&
                        currentStart.horse.nationality &&
                        '(' + currentStart.horse.nationality + ')'}
                    </span>
                    <span>
                      {currentStart &&
                        currentStart.horse.sex &&
                        `${_getHorseSex(currentStart.horse.sex)}${currentStart.horse.age}`}
                    </span>
                  </Text>
                </Flex>
              </TableCell>
              <TableCell className="py-2">
                {start.scratched && (
                  <Badge color={'neutral'} className=" font-semibold uppercase">
                    Struken
                  </Badge>
                )}
              </TableCell>
              {records && filteredRecords && (
                <TableCell className="flex justify-end space-x-2 py-2">
                  <Text className="text-right">{_getStartRecord(filteredRecords)}</Text>
                  {/*<Badge>S</Badge>*/}
                </TableCell>
              )}
              {records && (
                <TableCell className="min-w-[210px] space-x-2 py-2">
                  {_getStartForm(records).map((record: FormType, index: number) => (
                    <Badge
                      key={index}
                      className=""
                      color={
                        record.disqualified || record.place === '0' || record.place > '5'
                          ? 'red'
                          : record.place >= '4' && record.place <= '6'
                            ? 'gray'
                            : 'green'
                      }
                    >
                      {record.disqualified ? 'D' : record.place}
                    </Badge>
                  ))}
                </TableCell>
              )}
              <TableCell className="min-w-[210px] space-x-2 py-2">
                {_getGallopp(records, currentRace.startMethod).map((record: any, index: number) => (
                  <Badge
                    key={index}
                    className=""
                    color={
                      record.start.postPosition === currentStart.postPosition ? 'red' : 'yellow'
                    }
                  >
                    {record.disqualified ? `D` : record.galloped ? `G` : ``}
                  </Badge>
                ))}
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
