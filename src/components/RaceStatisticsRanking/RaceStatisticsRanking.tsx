import { Box, Card, Grid, Skeleton, Text } from '@radix-ui/themes'

import BarList from '@/components/BarList'

import { RaceStatistics } from '@/types/RaceStatistics'

interface RaceStatisticsProps {}

const RaceStatisticsRanking = ({}: RaceStatisticsProps): JSX.Element | null => {
  return (
    <Box className="mt-4">
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
        <Card></Card>
      </Grid>
    </Box>
  )
}

export default RaceStatisticsRanking
