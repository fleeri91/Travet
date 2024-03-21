import { GameRoot } from '@/types/ATG/Game'
import { RecordRoot } from '@/types/ATG/Record'
import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let date = params.get('date')

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/games/${date}`)

    if (!response) {
      throw new Error('Failed to fetch game data')
    }

    let data: RecordRoot[][] = []

    if (response.data) {
      const gameData: GameRoot = response.data as GameRoot
      const raceData = await Promise.all(
        gameData.races.map(async (race) => {
          const startRequests = race.starts.map((start) => {
            return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/races/${race.id}/start/${start.number}`)
          })

          const startResponses = await Promise.all(startRequests)

          return startResponses.map((response) => response.data)
        })
      )

      data = raceData
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
  }
}
export const revalidate = 0
