import { ChangeEvent, useEffect, useState, type JSX } from 'react'
import {
  Button,
  Dialog,
  Flex,
  RadioGroup,
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
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Skor</Text>
            <Switch
              checked={filterState.shoes}
              onCheckedChange={() => toggleFilter('shoes')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Sulky</Text>
            <Switch
              checked={filterState.sulky}
              onCheckedChange={() => toggleFilter('sulky')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Distans</Text>
            <Switch
              checked={filterState.distance}
              onCheckedChange={() => toggleFilter('distance')}
            />
          </Flex>

          <Flex direction="row" justify="between" align="center" gap="3">
            <TextField.Root
              type="number"
              placeholder="Från"
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
              placeholder="Till"
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

          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Pengar</Text>
            <Switch
              checked={filterState.money}
              onCheckedChange={() => toggleFilter('money')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Topplacering</Text>
            <Switch
              checked={filterState.top}
              onCheckedChange={() => toggleFilter('top')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Vinst</Text>
            <Switch
              checked={filterState.win}
              onCheckedChange={() => toggleFilter('win')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Aktuell bana</Text>
            <Switch
              checked={filterState.track}
              onCheckedChange={() => toggleFilter('track')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Kusk</Text>
            <Switch
              checked={filterState.driver}
              onCheckedChange={() => toggleFilter('driver')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>Banförhållande</Text>
            <Switch
              checked={filterState.condition}
              onCheckedChange={() => toggleFilter('condition')}
            />
          </Flex>
          <Flex direction="row" justify="between" align="center" gap="3">
            <Text>STL</Text>
            <Switch
              checked={filterState.stl}
              onCheckedChange={() => toggleFilter('stl')}
            />
          </Flex>
          <Flex direction="column" gap="3">
            <Text>Tidsspann</Text>
            <RadioGroup.Root
              name="timespan"
              value={filterState.timespan}
              onValueChange={handleTimespanChange}
            >
              <RadioGroup.Item value="latestMonths">
                Senaste månaderna
              </RadioGroup.Item>
              <RadioGroup.Item value="latestYear">Senaste året</RadioGroup.Item>
              <RadioGroup.Item value="all">Alla</RadioGroup.Item>
            </RadioGroup.Root>
          </Flex>
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
