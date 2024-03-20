export interface CalendarDayRoot {
  date: string
  tracks: Track[]
  games: Games
}

interface Track {
  id: number
  name: string
  startTime: string
  races: Race[]
  biggestGameType: string
  sport: string
  countryCode: string
  trackChanged: boolean
}

interface Race {
  id: string
  number: number
  status: string
  startTime: string
}

interface Games {
  [key: string]: Game[]
}

/*
export type GameTypes =
  | 'V75'
  | 'GS75'
  | 'V86'
  | 'V64'
  | 'V65'
  | 'V5'
  | 'V4'
  | 'V3'
  | 'dd';
*/

interface Game {
  id: string
  status: string
  startTime: string
  scheduledStartTime: string
  tracks: number[]
  races: string[]
  jackpotAmount: number
  estimatedJackpot: number
}
