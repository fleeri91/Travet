import { useMemo } from 'react'
import { Start } from '@/types/Game'
import { RecordResult } from '@/types/ATG/Record'

interface H2H {
  name: string
  id: number
  opponentName: string
  opponentHorseId: number
  commonRaces: number
  wins: number
  losses: number
  entries: H2HEntry[]
}

interface H2HEntry {
  distance: number | null
  startnNumber: number
  startPlace: string | null
  galopped: boolean | null
  position: number | null
  opponentStartNumber: number
  opponentPlace: string | null
  opponentGalopped: boolean | null
  opponentPosition: number | null
}

type H2HResult = Record<number, H2H[]>

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

        const aRecords = horseRecords[aId] || []
        const bRecords = horseRecords[bId] || []

        // Map b's races by race.id for quick lookup
        const bRecordMap = new Map<string, RecordResult>()
        for (const bRec of bRecords) {
          if (bRec.race?.id && !bRec.scratched) {
            bRecordMap.set(bRec.race.id, bRec)
          }
        }

        let wins = 0
        let losses = 0
        let commonRaces = 0
        const entries: H2HEntry[] = []

        for (const aRec of aRecords) {
          if (!aRec.race?.id || aRec.scratched) continue

          const bRec = bRecordMap.get(aRec.race.id)
          if (!bRec) continue

          const normalizePlace = (place: string | undefined): number => {
            if (!place || place === '0' || place.toLowerCase() === 'd')
              return 999
            const parsed = parseInt(place, 10)
            return isNaN(parsed) ? 999 : parsed
          }

          const aPlaceNum = normalizePlace(aRec.place)
          const bPlaceNum = normalizePlace(bRec.place)

          if (aPlaceNum !== 999 || bPlaceNum !== 999) {
            commonRaces++
            if (aPlaceNum < bPlaceNum) wins++
            else if (aPlaceNum > bPlaceNum) losses++
          }

          const entry: H2HEntry = {
            distance: aRec.start.distance ?? null,
            startnNumber: aRec.start.postPosition,
            startPlace: aRec.place ?? null,
            galopped: hasGalloped(aRec.kmTime?.code) ?? null,
            position: aRec.start.postPosition ?? null,
            opponentStartNumber: bRec.start.postPosition,
            opponentPlace: bRec.place ?? null,
            opponentGalopped: hasGalloped(bRec.kmTime?.code) ?? null,
            opponentPosition: bRec.start.postPosition ?? null,
          }
          entries.push(entry)
        }

        if (commonRaces > 0) {
          h2h[aId].push({
            name: a.horse.name,
            id: aId,
            opponentName: b.horse.name,
            opponentHorseId: bId,
            commonRaces,
            wins,
            losses,
            entries,
          })
        }
      }
    }

    return h2h
  }, [starts])
}

// Helper function to check if a horse galloped in a specific race
const hasGalloped = (kmTimeCode: string | undefined): boolean => {
  return kmTimeCode?.includes('u') ?? false
}
