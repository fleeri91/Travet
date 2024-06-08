import { Flex, Subtitle, Switch, Text } from '@tremor/react'

interface TravsportStatisticsFilterProps {
  isSTL: boolean
  isYouth: boolean
  isColdBlood: boolean
  setIsSTL: (val: boolean) => void
  setIsYouth: (val: boolean) => void
  setIsColdBlood: (val: boolean) => void
}

const TravsportStatisticsFilter = ({
  isSTL,
  isYouth,
  isColdBlood,
  setIsSTL,
  setIsYouth,
  setIsColdBlood,
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
    </Flex>
  )
}

export default TravsportStatisticsFilter
