import { ChangeEvent, useEffect, useState, type JSX } from 'react'
import {
  Button,
  Card,
  Dialog,
  Flex,
  RadioGroup,
  CheckboxCards,
  RadioCards,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes'

import { useFilterStore } from '@/store/useFilter'

import type { FilterType } from '@/types/Filter'

interface FilterProps {
  isOpen: boolean
  onClose: () => void
}

const Filter = ({ isOpen, onClose }: FilterProps): JSX.Element => {
  const { filter, setFilter } = useFilterStore()
  const [filterState, setFilterState] = useState<FilterType>(filter)

  const toggleFilter = (key: keyof FilterType) => {
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      [key]: !prevFilterState[key],
    }))
  }

  const handleSpecificDistanceFromChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      specificDistance: {
        ...prevFilterState.specificDistance,
        from: value,
      },
    }))
  }

  const handleSpecificDistanceToChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      specificDistance: {
        ...prevFilterState.specificDistance,
        to: value,
      },
    }))
  }

  const handleTimespanChange = (
    value: 'latestMonths' | 'latestYear' | 'all'
  ) => {
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      timespan: value,
    }))
  }

  const discardFilter = () => {
    setFilterState(filter)
    onClose()
  }

  const applyFilter = () => {
    setFilter(filterState)
    onClose()
  }

  useEffect(() => {
    setFilterState(filter)
  }, [filter])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Filtrera</Dialog.Title>

        <Flex direction="column" gap="3">
          <CheckboxCards.Root
            size="1"
            className="select-none"
            value={Object.entries(filterState)
              .filter(([key, val]) => typeof val === 'boolean' && val)
              .map(([key]) => key)}
            onValueChange={(values: string[]) => {
              const updated = { ...filterState }

              const booleanKeys: (keyof Pick<
                FilterType,
                | 'shoes'
                | 'sulky'
                | 'distance'
                | 'money'
                | 'top'
                | 'track'
                | 'driver'
                | 'condition'
                | 'win'
                | 'stl'
              >)[] = [
                'shoes',
                'sulky',
                'distance',
                'money',
                'top',
                'track',
                'driver',
                'condition',
                'win',
                'stl',
              ]

              booleanKeys.forEach((key) => {
                updated[key] = values.includes(key)
              })

              setFilterState(updated)
            }}
            columns={{ initial: '1', sm: '2' }}
            gap="2"
          >
            <CheckboxCards.Item value="shoes">Skor</CheckboxCards.Item>
            <CheckboxCards.Item value="sulky">Sulky</CheckboxCards.Item>
            <CheckboxCards.Item value="top">Topplacering</CheckboxCards.Item>
            <CheckboxCards.Item value="win">Vinst</CheckboxCards.Item>
            <CheckboxCards.Item value="track">Aktuell bana</CheckboxCards.Item>
            <CheckboxCards.Item value="condition">
              Banförhållande
            </CheckboxCards.Item>
            <CheckboxCards.Item value="money">Pengar</CheckboxCards.Item>
            <CheckboxCards.Item value="stl">STL</CheckboxCards.Item>
            <CheckboxCards.Item value="driver">Kusk</CheckboxCards.Item>
            <CheckboxCards.Item value="distance">Distans</CheckboxCards.Item>
          </CheckboxCards.Root>

          <Card variant="ghost" size="1" className="col-span-1">
            <Text>Välj distans</Text>
            <Flex
              direction="row"
              justify="between"
              align="center"
              gap="3"
              mt="2"
            >
              <TextField.Root
                type="number"
                placeholder="Från (meter)"
                disabled={!filterState.distance}
                value={
                  filterState.specificDistance?.from != null
                    ? filterState.specificDistance.from
                    : ''
                }
                onChange={handleSpecificDistanceFromChange}
                min={0}
                className="w-full"
              />
              <TextField.Root
                type="number"
                placeholder="Till (meter)"
                disabled={!filterState.distance}
                value={
                  filterState.specificDistance?.to != null
                    ? filterState.specificDistance.to
                    : ''
                }
                onChange={handleSpecificDistanceToChange}
                min={0}
                className="w-full"
              />
            </Flex>
          </Card>

          <Card variant="ghost" size="1">
            <Flex direction="column" gap="3">
              <Text>Tidsspann</Text>
              <RadioCards.Root
                name="timespan"
                value={filterState.timespan}
                onValueChange={handleTimespanChange}
                columns="1"
                size="1"
              >
                <RadioCards.Item value="all" className="w-full">
                  Alla
                </RadioCards.Item>
                <RadioCards.Item value="latestYear" className="w-full">
                  Senaste året
                </RadioCards.Item>
                <RadioCards.Item value="latestMonths" className="w-full">
                  Senaste månaderna
                </RadioCards.Item>
              </RadioCards.Root>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="3" mt="9" justify="end">
          <Button
            color="gray"
            onClick={discardFilter}
            className="cursor-pointer"
          >
            Avbryt
          </Button>
          <Button
            color="green"
            onClick={applyFilter}
            className="cursor-pointer"
          >
            Filtrera
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Filter
