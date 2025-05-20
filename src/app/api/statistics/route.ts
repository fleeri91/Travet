import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

import { ATGRaceRoot } from '@/types/ATG/Race'
import { BarlistData } from '@/types/BarlistData'
import { RaceStatistics } from '@/types/RaceStatistics'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const id = params.get('id')

  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'Invalid or missing id parameter' },
      { status: 400 }
    )
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/races/${id}`
    )

    if (!response.data) {
      return NextResponse.json(
        { error: 'No data found for the provided race ID' },
        { status: 404 }
      )
    }

    const raceData: ATGRaceRoot = response.data

    const HorseMoneyPerStart: BarlistData[] = raceData.starts.map((start) => {
      const roundedValue = Math.round(
        start.horse.money / start.horse.statistics.life.starts
      )
      return {
        name: start.horse.name,
        value: roundedValue,
      }
    })

    const HorseWinPercentage: BarlistData[] = raceData.starts.map((start) => {
      return {
        name: start.horse.name,
        value: start.horse.statistics.life.winPercentage,
      }
    })

    const HorsePlacePercentage: BarlistData[] = raceData.starts.map(
      (start) => ({
        name: start.horse.name,
        value: start.horse.statistics.life.placePercentage || 0,
      })
    )

    const HorsePointPerStart: BarlistData[] = raceData.starts.map((start) => {
      const value = Math.round(
        start.horse.statistics.life.startPoints /
          start.horse.statistics.life.starts
      )
      return {
        name: start.horse.name,
        value,
      }
    })

    const raceStatistics: RaceStatistics = {
      HorseMoneyPerStart,
      HorseWinPercentage,
      HorsePlacePercentage,
      HorsePointPerStart,
    }

    return NextResponse.json(raceStatistics, { status: 200 })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message || 'Failed to fetch race data' },
        { status: error.response?.status || 500 }
      )
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
