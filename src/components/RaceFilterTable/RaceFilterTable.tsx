'use client'

import { Fragment, useState } from 'react'
import clsx from 'clsx'
import {
  Badge,
  Card,
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

import { Race } from '@/types/ATG/Game'

interface RaceFilterTableProps {
  race: Race | null
}
const RaceFilterTable = ({ race }: RaceFilterTableProps): JSX.Element | null => {
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
    </Table>
  )
}

export default RaceFilterTable
