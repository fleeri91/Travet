import { useState } from 'react'

import { Button, Flex, Icon } from '@tremor/react'

import { RiFilter3Line } from '@remixicon/react'

import Modal from '@/components/Modal'
import Switch from '@/components/Switch'

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

  const discardFilter = () => {
    setFilter(filter)
    onClose()
  }

  const applyFilter = () => {
    setFilter(filterState)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter">
      <Flex className="space-y-4 py-4" flexDirection="col">
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