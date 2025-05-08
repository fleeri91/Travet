import { Box, Card, Grid, Skeleton, Text } from '@radix-ui/themes'
import BarList from '@/components/BarList'
import { BarlistData } from '@/types/BarlistData'
import useSWR from 'swr'
import { RaceStatistics } from '@/types/RaceStatistics'

interface RaceStatisticsProps {
  raceId: string
}

const RaceStatisticsView = ({ raceId }: RaceStatisticsProps): JSX.Element | null => {
  const { data, isLoading, error, mutate } = useSWR<RaceStatistics>(
    raceId ? `/statistics?id=${raceId}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  )

  if (isLoading) {
    return (
      <Box className="mt-4">
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-72 p-0">
              <Skeleton loading className="h-full w-full" />
            </Card>
          ))}
        </Grid>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Text as="div" size="4">
          Hoppsan! Något gick fel..
        </Text>
      </Box>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Box className="mt-4">
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
        <Card>
          <Text>Häst pengar per start</Text>
          <BarList data={data.HorseMoneyPerStart} className="mt-4" />
        </Card>
        <Card>
          <Text>Häst vinstprocent</Text>
          <BarList data={data.HorseWinPercentage} className="mt-4" />
        </Card>
        <Card>
          <Text>Häst platsprocent</Text>
          <BarList data={data.HorsePlacePercentage} className="mt-4" />
        </Card>
        <Card>
          <Text>Häst poäng per start</Text>
          <BarList data={data.HorsePlacePercentage} className="mt-4" />
        </Card>
      </Grid>
    </Box>
  )
}

export default RaceStatisticsView
