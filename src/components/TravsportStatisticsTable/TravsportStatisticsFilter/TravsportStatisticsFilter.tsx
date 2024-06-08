import { Flex, Subtitle, Switch, Text } from '@tremor/react'

interface TravsportStatisticsFilterProps {
  isSTL: boolean
  isYouth: boolean
  setIsSTL: (val: boolean) => void
  setIsYouth: (val: boolean) => void
}

const TravsportStatisticsFilter = ({
  isSTL,
  isYouth,
  setIsSTL,
  setIsYouth,
}: TravsportStatisticsFilterProps) => {
  return (
    <Flex justifyContent="start" className="space-x-4 p-4">
      <div className="flex items-center space-x-3">
        <label htmlFor="switch">
          <Subtitle>STL</Subtitle>
        </label>
        <Switch id="switch" name="switch" checked={isSTL} onChange={setIsSTL} />
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="switch">
          <Subtitle>Under 25</Subtitle>
        </label>
        <Switch id="switch" name="switch" checked={isYouth} onChange={setIsYouth} />
      </div>
    </Flex>
  )
}

export default TravsportStatisticsFilter
