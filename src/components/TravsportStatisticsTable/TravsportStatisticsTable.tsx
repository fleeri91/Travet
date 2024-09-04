import { useEffect, useState } from 'react'
import useSWR from 'swr'
import clsx from 'clsx'

import {
  Badge,
  Flex,
  Subtitle,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'

import {
  TravsportAmount,
  TravsportBreed,
  TravsportCurrentTrack,
  TravsportGender,
  TravsportHomeTrack,
  TravsportLicenseType,
  TravsportRaceType,
  TravsportStats,
  TravsportSulkyOrMonte,
} from '@/types/Travsport/Travsport'

import { formatPrizeMoney } from '@/utils/format'
import TravsportStatisticsFilter from './TravsportStatisticsFilter'

interface TravsportStatisticsTableProps {
  licenseType?: TravsportLicenseType
  gender?: TravsportGender
  homeTrack?: TravsportHomeTrack
  currentTrack?: TravsportCurrentTrack
  raceType?: TravsportRaceType
  sulkyOrMonte?: TravsportSulkyOrMonte
  breed?: TravsportBreed
  amount?: TravsportAmount
  chartType?: 1 | 2
}

const TravsportStatisticsTable = ({
  licenseType = 'S',
  gender = 'B',
  homeTrack = 'A',
  currentTrack = 'A',
  raceType = 'B',
  sulkyOrMonte = 'S',
  breed = 'B',
  amount = 10,
  chartType = 1,
}: TravsportStatisticsTableProps) => {
  const [year, setYear] = useState<string>('2023')
  const [isSTL, setIsSTL] = useState<boolean>(false)
  const [isColdBlood, setIsColdBlood] = useState<boolean>(false)
  const [isYouth, setIsYouth] = useState<boolean>(false)

  const { data } = useSWR<TravsportStats[]>(
    `travsport/?licenseType=${licenseType}&gender=${gender}&homeTrack=${homeTrack}&raceOnTrack=${currentTrack}&typeOfRace=${isSTL ? (raceType = 'R') : (raceType = 'B')}&sulkyOrMonte=${sulkyOrMonte}&breed=${isColdBlood ? (breed = 'K') : (breed = 'V')}&returnNumberOfEntries=${amount}&onlyYouth=${isYouth}&list=S&year=${year}&chartTypeSearchParam=${chartType}&category=1`
  )

  return (
    <>
      <TravsportStatisticsFilter
        isSTL={isSTL}
        isColdBlood={isColdBlood}
        isYouth={isYouth}
        year={year}
        setIsSTL={setIsSTL}
        setIsColdBlood={setIsColdBlood}
        setIsYouth={setIsYouth}
        setYear={setYear}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <Subtitle>Namn</Subtitle>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>Starter</Subtitle>
              </Flex>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>1:a</Subtitle>
              </Flex>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>2:a</Subtitle>
              </Flex>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>3:a</Subtitle>
              </Flex>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>Segerprocent</Subtitle>
              </Flex>
            </TableHeaderCell>
            <TableHeaderCell>
              <Flex justifyContent="end">
                <Subtitle>Vinstsumma</Subtitle>
              </Flex>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow
                key={index}
                className={clsx('table-fixed !border-none even:bg-theme-50 dark:even:bg-slate-800')}
              >
                <TableCell className="space-x-2 py-2">
                  <Badge className="w-[25px]">{index + 1}</Badge>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell className="space-x-2 py-2 text-right">{item.numberOfStarts}</TableCell>
                <TableCell className="space-x-2 py-2 text-right">
                  {item.numberOfFirstPlaces}
                </TableCell>
                <TableCell className="space-x-2 py-2 text-right">
                  {item.numberOfSecondPlaces}
                </TableCell>
                <TableCell className="space-x-2 py-2 text-right">
                  {item.numberOfThirdPlaces}
                </TableCell>
                <TableCell className="space-x-2 py-2 text-right">{`${item.winningPercent} %`}</TableCell>
                <TableCell className="space-x-2 py-2 text-right">
                  {formatPrizeMoney(item.prizeMoney)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TravsportStatisticsTable
