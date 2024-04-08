import { Game, Track } from '@/types/ATG/CalendarDay'
import { ALLOWED_COUNTRYCODES } from '@/constants/CountryCodes'
import { GameType } from '@/constants/GameType'

export const filterGamesByTrack = (games: { [key: string]: Game[] }, tracks: Track[]) => {
  return Object.entries(games)
    .filter(([gameType]) => Object.values(GameType).includes(gameType as GameType))
    .map(([gameType, gamesArray]) => {
      const filteredGamesArray = (gamesArray as Game[]).filter((game) => {
        const trackIds = game.tracks.map((trackId) => trackId)
        return (
          filterTrackBySport(tracks, trackIds).length === trackIds.length &&
          filterTrackByCountryCode(tracks, trackIds).length === trackIds.length
        )
      })
      return [gameType, filteredGamesArray] as [string, Game[]]
    })
}

const filterTrackBySport = (tracks: Track[], ids: number[]) => {
  return tracks.filter((track) => ids.includes(track.id) && track.sport !== 'gallop')
}

const filterTrackByCountryCode = (tracks: Track[], ids: number[]) => {
  return tracks.filter(
    (track) => ids.includes(track.id) && ALLOWED_COUNTRYCODES.includes(track.countryCode)
  )
}
