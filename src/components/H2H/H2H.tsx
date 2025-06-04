'use client'

import {
  Dialog,
  Flex,
  Text,
  Box,
  Card,
  Badge,
  IconButton,
  Heading,
  VisuallyHidden,
} from '@radix-ui/themes'
import { Game, Start } from '@/types/Game'
import { type JSX } from 'react'
import { RiCloseLine } from '@remixicon/react'

import { useHeadToHead } from '@/hooks/useH2H'

interface H2HProps {
  horseId: number | string
  onClose: () => void
  game: Game
}

const H2H = ({ horseId, onClose, game }: H2HProps): JSX.Element | null => {
  const raceWithHorse = game.races.find((race) =>
    race.starts.some((start) => start.horse.id === Number(horseId))
  )

  if (!raceWithHorse) return null

  const raceStarts = raceWithHorse.starts
  const h2hData = useHeadToHead(raceStarts)
  const selectedStart = raceStarts.find((s) => s.horse.id === Number(horseId))
  const horseH2H = h2hData[Number(horseId)]

  if (!selectedStart || !horseH2H || horseH2H.length === 0) return null

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Content size="3">
        <VisuallyHidden>
          <Dialog.Title>Head 2 Head</Dialog.Title>
        </VisuallyHidden>
        <div className="flex justify-between">
          <Heading size={{ initial: '4', sm: '5' }} align="left">
            Head 2 Head
          </Heading>
          <Box>
            <IconButton variant="ghost" color="gray" onClick={onClose}>
              <RiCloseLine />
            </IconButton>
          </Box>
        </div>
        <Box mt="4">
          <Flex direction="column" gap="3">
            {horseH2H.map((entry) => (
              <Card key={entry.opponentHorseId} variant="surface" size="2">
                <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  {/* Left: Selected Horse */}
                  <Flex align="center" gap="2">
                    {/* Mobile: Wins badge */}
                    <div className="block sm:hidden">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.wins}
                      </Badge>
                    </div>

                    {/* Desktop: Start number badge */}
                    <div className="hidden sm:block">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {selectedStart.number}
                      </Badge>
                    </div>

                    <Text
                      weight="medium"
                      color={entry.wins >= entry.losses ? 'green' : 'red'}
                      size={{ initial: '1', sm: '2' }}
                    >
                      {selectedStart.horse.name}
                    </Text>
                  </Flex>

                  {/* Center: Score */}
                  <div className="absolute left-1/2 hidden -translate-x-1/2 sm:flex">
                    <Flex
                      align="center"
                      minWidth="60px"
                      justify="center"
                      gap="4"
                    >
                      <Badge
                        size={{ initial: '1', sm: '2' }}
                        color={entry.wins >= entry.losses ? 'green' : 'red'}
                      >
                        {entry.wins}
                      </Badge>
                      <Text size={{ initial: '1', sm: '2' }}>:</Text>
                      <Badge
                        size={{ initial: '1', sm: '2' }}
                        color={entry.losses >= entry.wins ? 'green' : 'red'}
                      >
                        {entry.losses}
                      </Badge>
                    </Flex>
                  </div>

                  {/* Right: Opponent */}
                  <Flex
                    align="center"
                    gap="2"
                    direction={{ initial: 'row-reverse', sm: 'row' }}
                  >
                    <Text
                      weight="medium"
                      color={entry.losses >= entry.wins ? 'green' : 'red'}
                      size={{ initial: '1', sm: '2' }}
                    >
                      {entry.opponentName}
                    </Text>

                    <div className="block sm:hidden">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.losses}
                      </Badge>
                    </div>

                    <div className="hidden sm:block">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.opponentStartNumber}
                      </Badge>
                    </div>
                  </Flex>
                </div>
              </Card>
            ))}
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default H2H
