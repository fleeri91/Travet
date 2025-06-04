import { useMemo } from 'react'
import { Start } from '@/types/Game'
import { RecordResult } from '@/types/ATG/Record'

interface H2HEntry {
  opponentHorseId: number
  opponentName: string
  wins: number
  losses: number
  draws: number
  commonRaces: number
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

        let wins = 0
        let losses = 0
        let draws = 0
        let commonRaces = 0

        const aRecords = horseRecords[aId]
        const bRecords = horseRecords[bId]

        const bRecordMap = new Map<string, RecordResult>()
        for (const bRec of bRecords) {
          if (bRec.race?.id && !bRec.scratched) {
            bRecordMap.set(bRec.race.id, bRec)
          }
        }

        for (const aRec of aRecords) {
          if (!aRec.race?.id || aRec.scratched) continue

          const bRec = bRecordMap.get(aRec.race.id)
          if (!bRec) continue

          const aPlace = aRec.place
          const bPlace = bRec.place

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
            else draws++
          }
        }

        if (commonRaces > 0) {
          h2h[aId].push({
            opponentHorseId: bId,
            opponentName: b.horse.name,
            wins,
            losses,
            draws,
            commonRaces,
          })
        }
      }
    }

    return h2h
  }, [starts])
}
