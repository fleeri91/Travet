'use client'

import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import sv from 'dayjs/locale/sv'
import {
  Box,
  Container,
  Grid,
  Text,
  Card,
  Flex,
  IconButton,
  Skeleton,
  Button,
} from '@radix-ui/themes'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'

import { CalendarDayRoot } from '@/types/ATG/CalendarDay'
import { useCalendarStore } from '@/store/useCalendar'
import { GameStatus } from '@/constants/GameStatus'

const Home = () => {
  const router = useRouter()
  const { selectedDate, today, setPreviousDate, setNextDate } = useCalendarStore()

  const FIVE_DAYS = dayjs(today).add(4, 'day')

  const delayedFetcher = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  }

  const { data, isLoading, error, mutate } = useSWR<CalendarDayRoot>(
    selectedDate ? `/day?date=${selectedDate}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  )

  if (isLoading) {
    return (
      <Box className="my-16">
        <Container size="3">
          <Box className="p-4">
            <Flex justify="center" align="center" gap="4">
              <Box className="h-8 w-8">
                <Skeleton loading className="h-full w-full" />
              </Box>
              <Box className="flex h-8 w-24">
                <Skeleton loading className="h-full w-full" />
              </Box>
              <Box className="h-8 w-8">
                <Skeleton loading className="h-full w-full" />
              </Box>
            </Flex>
          </Box>
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="h-32 p-0">
                <Skeleton loading className="h-full w-full" />
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Text as="div" size="4">
          Hoppsan! Något gick fel..
        </Text>
        <Button onClick={() => mutate()} className="cursor-pointer">
          Försök igen
        </Button>
      </Box>
    )
  }

  return (
    <Box className="my-16">
      <Container size="3">
        <Box className="p-4">
          <Flex justify="center" align="center" gap="4">
            <IconButton
              variant="soft"
              onClick={() => setPreviousDate(selectedDate)}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              <RiArrowLeftSLine />
            </IconButton>
            <Text as="div" size="5" className="flex min-w-24 justify-center capitalize">
              {selectedDate == today ? 'Idag' : dayjs(selectedDate).locale(sv).format('DD/MM dd')}
            </Text>
            <IconButton
              variant="soft"
              onClick={() => setNextDate(selectedDate)}
              disabled={dayjs(selectedDate).isAfter(FIVE_DAYS, 'day')}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              <RiArrowRightSLine />
            </IconButton>
          </Flex>
        </Box>
        {data?.games && (
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" width="auto">
            {Object.keys(data.games).flatMap((gameType) =>
              data.games[gameType].map((game) => {
                const trackNames =
                  data.tracks
                    .filter((track) => game.tracks?.includes(track.id))
                    .map((track) => track.name)
                    .join(', ') || ''

                return (
                  <Card
                    key={game.id}
                    onClick={() => router.push(`/game/${game.id}`)}
                    className="h-32 cursor-pointer"
                  >
                    <Flex direction="column" justify="center" align="center" className="h-full">
                      <Text size="6" weight="bold" className="uppercase">
                        {gameType}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {trackNames}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {game.status == GameStatus.bettable &&
                          dayjs(game.startTime).format('HH:mm')}
                        {game.status == GameStatus.ongoing && 'Pågående'}
                        {game.status == GameStatus.results && 'Avslutad'}
                      </Text>
                    </Flex>
                  </Card>
                )
              })
            )}
            {Object.keys(data.games).length === 0 && (
              <Box>
                <Text>No games available for this date</Text>
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default Home
