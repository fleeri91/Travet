import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

import { ATGGameRoot } from '@/types/ATG/Game'
import { ATGStartRoot } from '@/types/ATG/Start'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let id = params.get('id')

  try {
    const response = await axios.get(`${process.env.API_URL}/games/${id}`)

    if (!response) {
      throw new Error('Failed to fetch game data')
    }

    let data: ATGGameRoot | null = null

    if (response.data) {
      const gameData: ATGGameRoot = response.data as ATGGameRoot

      const raceData = await Promise.all(
        gameData.races.map(async (race) => {
          const raceStartResponse = await axios.get<ATGStartRoot[]>(
            `${process.env.API_URL}/races/${race.id}/start/`
          )

          const fetchedStartsById = Object.fromEntries(
            raceStartResponse.data.map((s) => [s.startNumber, s])
          )

          const updatedStarts = race.starts.map((start) => {
            const fetched = fetchedStartsById[start.number]
            const records = fetched?.horse?.results?.records ?? []
            return { ...start, records }
          })

          return { ...race, starts: updatedStarts }
        })
      )

      data = { ...gameData, races: raceData }
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
