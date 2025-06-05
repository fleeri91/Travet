import { useMemo } from 'react'
import { Start } from '@/types/Game'
import { RecordResult } from '@/types/ATG/Record'

interface H2HEntry {
  distance: number | null // Race distance
  startPlace: string | null // Selected horse start place
  galopped: boolean | null // Selected horse galopped
  position: number | null // Selected horse starting position
  opponentHorseId: number // Opponent horse ID
  opponentName: string // Opponent horse name
  opponentStartNumber: number // Opponent start number
  opponentPlace: string | null // Opponent place in the race
  opponentGalopped: boolean | null // Opponent galopped
  opponentPosition: number | null // Opponent starting position
  wins: number // Wins against opponent
  losses: number // Losses against opponent
  commonRaces: number // Number of common races
}

type H2HResult = Record<number, H2HEntry[]>

export function useHeadToHead(starts: Start[]): H2HResult {
  return useMemo(() => {
    const h2h: H2HResult = {}

    // Map horseId to its RecordResults
    const horseRecords = starts.reduce<Record<number, RecordResult[]>>(
      (acc, start) => {
        acc[start.horse.id] = start.records || []
        return acc
      },
      {}
    )

    for (const a of starts) {
      const aId = a.horse.id
      if (!h2h[aId]) h2h[aId] = []

      for (const b of starts) {
        const bId = b.horse.id
        if (aId === bId) continue

        let distance = null
        let wins = 0
        let losses = 0
        let commonRaces = 0
        let aPlace = null
        let bPlace = null
        let galopped = null
        let opponentGalopped = null
        let aPosition = null
        let bPosition = null

        const aRecords = horseRecords[aId]
        const bRecords = horseRecords[bId]

        const bRecordMap = new Map<string, RecordResult>()
        for (const bRec of bRecords) {
          if (bRec.race?.id && !bRec.scratched) {
            bRecordMap.set(bRec.race.id, bRec)
          }
        }

        // Loop through all selected horse (a) races
        for (const aRec of aRecords) {
          if (!aRec.race?.id || aRec.scratched) continue

          const bRec = bRecordMap.get(aRec.race.id)
          if (!bRec) continue

          aPlace = aRec.place
          bPlace = bRec.place

          aPosition = aRec.start.postPosition
          bPosition = bRec.start.postPosition

          distance = aRec.start.distance

          // Check if either horse has galloped in this race
          const aGalloped = hasGalloped(aRec.kmTime?.code)
          const bGalloped = hasGalloped(bRec.kmTime?.code)

          galopped = aGalloped // Set gallop status for selected horse
          opponentGalopped = bGalloped // Set gallop status for opponent horse

          // Set the starting position (from 'number' field) for both horses

          const normalizePlace = (place: string | undefined): number => {
            if (!place || place === '0' || place.toLowerCase() === 'd')
              return 999
            const parsed = parseInt(place, 10)
            return isNaN(parsed) ? 999 : parsed
          }

          const aRank = normalizePlace(aPlace)
          const bRank = normalizePlace(bPlace)

          // Only proceed if at least one of them has a meaningful result
          if (aRank !== 999 || bRank !== 999) {
            commonRaces++
            if (aRank < bRank) wins++
            else if (aRank > bRank) losses++
          }
        }

        // Add the new H2H entry with the necessary information
        if (commonRaces > 0) {
          h2h[aId].push({
            distance: distance, // Race distance
            startPlace: aPlace ?? null, // Selected horse's start place (finishing place)
            galopped: galopped ?? false, // Selected horse gallop status
            position: aPosition ?? null, // Selected horse's starting position
            opponentHorseId: bId, // Opponent horse ID
            opponentName: b.horse.name, // Opponent horse name
            opponentStartNumber: b.number, // Opponent's start number
            opponentPlace: bPlace ?? null, // Opponent's finishing place
            opponentGalopped: opponentGalopped ?? false, // Opponent gallop status
            opponentPosition: bPosition ?? null, // Opponent's starting position
            wins,
            losses,
            commonRaces,
          })
        }
      }
    }

    return h2h
  }, [starts])
}

// Helper function to check if a horse galloped in a specific race
const hasGalloped = (kmTimeCode: string | undefined): boolean => {
  console.log(`Checking kmTimeCode: ${kmTimeCode}`) // Log kmTimeCode
  return kmTimeCode?.includes('u') || false
}
