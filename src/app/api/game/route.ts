import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

import { GameRoot, Start } from '@/types/ATG/Game'
import { RecordRoot } from '@/types/ATG/Record'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let id = params.get('id')

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`)

    if (!response) {
      throw new Error('Failed to fetch game data')
    }

    let data: GameRoot | null = null

    if (response.data) {
      const gameData: GameRoot = response.data as GameRoot
      const raceData = await Promise.all(
        gameData.races.map(async (race) => {
          const startRequests = race.starts.map(async (start) => {
            const startResponse = await axios.get<RecordRoot>(
              `${process.env.NEXT_PUBLIC_API_URL}/races/${race.id}/start/${start.number}`
            )
            const startWithData: Start = {
              ...start,
              records: startResponse.data.horse.results.records,
            }
            return startWithData
          })

          const starts = await Promise.all(startRequests)

          return { ...race, starts }
        })
      )

      data = { ...gameData, races: raceData }
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
