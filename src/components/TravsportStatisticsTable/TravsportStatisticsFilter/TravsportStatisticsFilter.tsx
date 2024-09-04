import { Flex, Subtitle, Switch, Text } from '@tremor/react'
import { Description, Field, Label, Select } from '@headlessui/react'
import { RiArrowDownSLine } from '@remixicon/react'
import clsx from 'clsx'

interface TravsportStatisticsFilterProps {
  isSTL: boolean
  isYouth: boolean
  isColdBlood: boolean
  year: string
  setIsSTL: (val: boolean) => void
  setIsYouth: (val: boolean) => void
  setIsColdBlood: (val: boolean) => void
  setYear: (val: string) => void
}

const TravsportStatisticsFilter = ({
  isSTL,
  isYouth,
  isColdBlood,
  year,
  setIsSTL,
  setIsYouth,
  setIsColdBlood,
  setYear,
}: TravsportStatisticsFilterProps) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value)
  }

  return (
    <Flex justifyContent="between" className="p-4">
      <div className="flex justify-start space-x-4">
        <div className="flex items-center space-x-3">
          <label htmlFor="switch">
            <Subtitle>STL</Subtitle>
          </label>
          <Switch id="switch" name="switch" checked={isSTL} onChange={setIsSTL} />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="switch">
            <Subtitle>Kallblod</Subtitle>
          </label>
          <Switch id="switch" name="switch" checked={isColdBlood} onChange={setIsColdBlood} />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="switch">
            <Subtitle>Under 25</Subtitle>
          </label>
          <Switch id="switch" name="switch" checked={isYouth} onChange={setIsYouth} />
        </div>
      </div>
      <div className="relative">
        <Select
          value={year}
          onChange={handleYearChange}
          className={clsx(
            'w-full rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300'
          )}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </Select>
      </div>
    </Flex>
  )
}

export default TravsportStatisticsFilter
