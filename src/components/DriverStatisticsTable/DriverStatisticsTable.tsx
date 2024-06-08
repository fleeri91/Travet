import { useEffect } from 'react'
import useSWR from 'swr'
import clsx from 'clsx'

import {
  Badge,
  Flex,
  Subtitle,
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

interface DriverStatisticsTableProps {
  year?: number
  licenseType?: TravsportLicenseType
  gender?: TravsportGender
  homeTrack?: TravsportHomeTrack
  currentTrack?: TravsportCurrentTrack
  raceType?: TravsportRaceType
  sulkyOrMonte?: TravsportSulkyOrMonte
  breed?: TravsportBreed
  amount?: TravsportAmount
}

const DriverStatisticsTable = ({
  year = 2023,
  licenseType = 'S',
  gender = 'B',
  homeTrack = 'A',
  currentTrack = 'A',
  raceType = 'B',
  sulkyOrMonte = 'S',
  breed = 'B',
  amount = 10,
}: DriverStatisticsTableProps) => {
  const { data } = useSWR<TravsportStats[]>(
    `travsport/?licenseType=${licenseType}&gender=${gender}&homeTrack=${homeTrack}&raceOnTrack=${currentTrack}&typeOfRace=${raceType}&sulkyOrMonte=${sulkyOrMonte}&breed=${breed}&returnNumberOfEntries=${amount}&onlyYouth=false&list=S&year=${year}&chartTypeSearchParam=1&category=1`
  )

  return (
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
  )
}

export default DriverStatisticsTable
