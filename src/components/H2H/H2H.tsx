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
import Accordion from '@/components/Accordion'
import { Game } from '@/types/Game'
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

  if (!selectedStart || !horseH2H || horseH2H.length === 0) {
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
          <Dialog.Description>
            <Text size="2" color="gray">
              Inga data tillgängliga för denna häst.
            </Text>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    )
  }

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Content size="3" className="h-144">
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
          <Accordion
            type="multiple"
            items={horseH2H.map((entry) => ({
              value: `entry-${entry.opponentHorseId}`,
              trigger: (
                <div className="relative flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
                  <Flex align="center" gap="2">
                    {/* Wins badge for mobile */}
                    {/*
                    <div className="block sm:hidden">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.wins}
                      </Badge>
                    </div>
                    */}
                    {/* Start number for selected horse desktop */}
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

                  {/* Wins : Losses in center on desktop */}
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
                        color={entry.losses > entry.wins ? 'green' : 'red'}
                      >
                        {entry.losses}
                      </Badge>
                    </Flex>
                  </div>

                  <Flex
                    align="center"
                    gap="2"
                    direction={{ initial: 'row-reverse', sm: 'row' }}
                  >
                    <Text
                      weight="medium"
                      color={entry.losses > entry.wins ? 'green' : 'red'}
                      size={{ initial: '1', sm: '2' }}
                    >
                      {entry.opponentName}
                    </Text>

                    {/* Losses badge for mobile */}
                    {/*
                    <div className="block sm:hidden">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.losses}
                      </Badge>
                    </div>
                    */}

                    {/* Opponent start number desktop */}
                    <div className="hidden sm:block">
                      <Badge size={{ initial: '1', sm: '2' }} color="gray">
                        {entry.entries.length > 0
                          ? entry.entries[0].opponentStartNumber
                          : ''}
                      </Badge>
                    </div>
                  </Flex>
                </div>
              ),
              content: (
                <Flex gap="2" direction="column">
                  {entry.entries.map((e, i) => (
                    <Card
                      variant="surface"
                      size="2"
                      key={`card-${entry.id}-${i}`}
                    >
                      <Flex
                        key={`entry-${i}`}
                        justify="between"
                        className="text-gray-700"
                        direction={{ initial: 'column', sm: 'row' }}
                        mt={i > 0 ? '2' : '0'}
                        gap="4"
                      >
                        <Flex direction="column" mt="2" minWidth="100px">
                          {e.distance !== null && (
                            <Text size="2" weight="bold">
                              Distans: {e.distance}m
                            </Text>
                          )}
                          {e.position !== null && (
                            <Text size="2" weight="bold">
                              Position: {e.position}
                            </Text>
                          )}
                          {e.startPlace && (
                            <Text size="2" weight="bold">
                              Placering: {e.startPlace}
                            </Text>
                          )}
                          {e.galopped !== null && (
                            <Text size="2" weight="bold">
                              Galopp: {e.galopped ? 'Ja' : 'Nej'}
                            </Text>
                          )}
                        </Flex>
                        <Flex
                          mt="2"
                          className="text-right"
                          direction="column"
                          minWidth="100px"
                        >
                          {e.opponentPlace && (
                            <Text size="2" weight="bold">
                              Motståndares placering: {e.opponentPlace}
                            </Text>
                          )}
                          {e.opponentGalopped !== null && (
                            <Text size="2" weight="bold">
                              Galopp: {e.opponentGalopped ? 'Ja' : 'Nej'}
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              ),
            }))}
          />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default H2H
