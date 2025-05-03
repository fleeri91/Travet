import { Box, Card, Grid, Text } from '@radix-ui/themes'
import BarList from '@/components/BarList'

const data = [
  { name: 'Home', value: 843 },
  { name: 'Imprint', value: 46 },
  { name: 'Cancellation', value: 3 },
  { name: 'Blocks', value: 108 },
  { name: 'Documentation', value: 384 },
]

const RaceStatistics = (): JSX.Element | null => {
  return (
    <Box className="mt-4">
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
        <Card>
          <Text>Häst vinstprocent</Text>
          <BarList data={data} className="mt-4" />
        </Card>
      </Grid>
    </Box>
  )
}

export default RaceStatistics
