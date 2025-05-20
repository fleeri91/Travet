import { Box, Card, Grid, Skeleton, Text } from '@radix-ui/themes'

import BarList from '@/components/BarList'

import { RaceStatistics } from '@/types/RaceStatistics'

interface RaceStatisticsProps {
  raceStatistics: RaceStatistics
}

const RaceStatisticsRanking = ({ raceStatistics }: RaceStatisticsProps): JSX.Element | null => {
  if (!raceStatistics) {
    return null
  }

  return (
    <Box className="mt-4">
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
        <Card>
          <BarList data={raceStatistics.HorseMoneyPerStart} />
        </Card>
      </Grid>
    </Box>
  )
}

export default RaceStatisticsRanking
