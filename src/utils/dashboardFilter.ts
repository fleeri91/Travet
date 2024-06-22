import { RecordResult } from '@/types/ATG/Record'
import { TremorData } from '@/types/Tremor'

export const getPositionResults = (
  records: RecordResult[],
  position: number,
  method: string
): TremorData[] => {
  const placeCount: { [key: string]: number } = {
    '1': 0,
    '2': 0,
    '3': 0,
  }

  const filteredRecords = records.filter(
    (record) => record.start.postPosition === position && record.race.startMethod === method
  )

  filteredRecords.forEach((record) => {
    if (placeCount.hasOwnProperty(record.place)) {
      placeCount[record.place]++
    }
  })

  const summary: TremorData[] = [
    { name: '1:a', value: placeCount['1'] },
    { name: '2:a', value: placeCount['2'] },
    { name: '3:a', value: placeCount['3'] },
  ]

  return summary
}

export const getGallopResults = (
  records: RecordResult[],
  position: number | null,
  method?: string | null
): number => {
  const gallopCount = records.filter(
    (record) =>
      record.start.postPosition === position &&
      record.race.startMethod === method &&
      record.galloped
  ).length

  console.log('gallopCount', gallopCount)

  const totalPostPositionCount = records.filter(
    (record) => record.start.postPosition === position && record.race.startMethod === method
  ).length

  console.log('Percentage', gallopCount / totalPostPositionCount)

  return (gallopCount / totalPostPositionCount) * 100
}

export const getTotalPositionCount = (
  records: RecordResult[],
  position: number,
  method: string
): number => {
  const totalPostPositionCount = records.filter(
    (record) => record.start.postPosition === position && record.race.startMethod === method
  ).length
  return totalPostPositionCount
}
