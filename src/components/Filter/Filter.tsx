import { ChangeEvent, useEffect, useState } from 'react'

import { Button, Flex, Icon, NumberInput } from '@tremor/react'

import Modal from '@/components/ui/Modal'
import Switch from '@/components/ui/Switch'

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

  const handleSpecificDistanceFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      specificDistance: {
        ...prevFilterState.specificDistance,
        from: value,
      },
    }))
  }

  const handleSpecificDistanceToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterState((prevFilterState: FilterType) => ({
      ...prevFilterState,
      specificDistance: {
        ...prevFilterState.specificDistance,
        to: value,
      },
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
    <Modal isOpen={isOpen} onClose={discardFilter}>
      <Flex className="space-y-4 pb-4" flexDirection="col">
        <Switch
          onChange={() => toggleFilter('shoes')}
          value={filter.shoes}
          label="Skor"
          tooltip="Filtrera hästens resultat på aktuella skor"
        />
        <Switch
          onChange={() => toggleFilter('sulky')}
          value={filter.sulky}
          label="Sulky"
          tooltip="Filtrera hästens resultat på loppets aktuella sulky"
        />
        <Switch
          onChange={() => toggleFilter('distance')}
          value={filter.distance}
          label="Distans"
          tooltip="Filtrera hästens resultat på loppets aktuella distans"
        />
        <Flex className="space-x-2">
          <NumberInput
            placeholder="Från"
            disabled={!filterState.distance}
            value={
              filterState.specificDistance?.from != null ? filterState.specificDistance.from : ''
            }
            onChange={handleSpecificDistanceFromChange}
            min={0}
          />
          <NumberInput
            placeholder="Till"
            disabled={!filterState.distance}
            value={filterState.specificDistance?.to != null ? filterState.specificDistance.to : ''}
            onChange={handleSpecificDistanceToChange}
            min={0}
          />
        </Flex>
        <Switch
          onChange={() => toggleFilter('money')}
          value={filter.money}
          label="Pengar"
          tooltip="Filtrera hästens resultat på loppets aktuella vinstpengar"
        />
        <Switch
          onChange={() => toggleFilter('top')}
          value={filter.top}
          label="Topplacering"
          tooltip="Filtrera hästens resultat på topp 3 placering"
        />
        <Switch
          onChange={() => toggleFilter('win')}
          value={filter.win}
          label="Vinst"
          tooltip="Filtrera hästens resultat på vinst"
        />
        <Switch
          onChange={() => toggleFilter('track')}
          value={filter.track}
          label="Aktuell bana"
          tooltip="Filtrera hästens resultat på loppets aktuella bana"
        />
        <Switch
          onChange={() => toggleFilter('driver')}
          value={filter.driver}
          label="Kusk"
          tooltip="Filtrera hästens resultat på kusk"
        />
        <Switch
          onChange={() => toggleFilter('condition')}
          value={filter.condition}
          label="Banförhållande"
          tooltip="Filtrera hästens resultat på banförhållande"
        />
        <Switch
          onChange={() => toggleFilter('stl')}
          value={filter.stl}
          label="STL Lopp"
          tooltip="Filtrera hästens resultat på STL lopp"
        />
      </Flex>
      <Flex justifyContent="end" className="mt-4 space-x-4">
        <Button color="stone" onClick={discardFilter}>
          Avbryt
        </Button>
        <Button color="green" onClick={applyFilter}>
          Filtrera
        </Button>
      </Flex>
    </Modal>
  )
}

export default Filter
