import dayjs from 'dayjs'

import { FORBIDDEN_TRACKS } from '@/constants/Tracks'
import { FilterType, FormType } from '@/types/Filter'
import { Race, Start, Track } from '@/types/ATG/Game'
import { RecordResult } from '@/types/ATG/Record'

/**
 *
 * @param records
 * @returns { FormType[] }
 */
export const _getStartForm = (records: RecordResult[]): FormType[] => {
  let lastFive: FormType[] = []
  const currentDate = dayjs()
  const currentDateThreeMonthsAgo = currentDate.subtract(3, 'months')

  const filteredRecords = records.filter((record) =>
    dayjs(record.date).isAfter(currentDateThreeMonthsAgo)
  )

  for (let i = 0; i < filteredRecords.length; i++) {
    if (records[i].place !== undefined) {
      lastFive.push({ place: records[i].place, galloped: records[i].galloped })
    }
  }

  lastFive = lastFive.slice(0, 5)

  return lastFive
}

export const _getGallopp = (records: RecordResult[], method: string): RecordResult[] => {
  const startMethodRecords = records.filter((record) => record.race.startMethod === method)
  return startMethodRecords.slice(0, 5).filter((record) => record.galloped)
}

/**
 *
 * @param records
 * @param length
 * @returns { string }
 */
export const _getStartRecord = (
  records: RecordResult[],
  length: number = records.length
): string => {
  let lowestKmTime = null
  for (let i = 0; i < length; i++) {
    if (records[i] === undefined || records[i].kmTime === undefined) {
      return ''
    }

    const kmTime = records[i].kmTime
    if (
      kmTime &&
      (!lowestKmTime ||
        kmTime.minutes < lowestKmTime.minutes ||
        (kmTime.minutes === lowestKmTime.minutes && kmTime.seconds < lowestKmTime.seconds) ||
        (kmTime.minutes === lowestKmTime.minutes &&
          kmTime.seconds === lowestKmTime.seconds &&
          kmTime.tenths < lowestKmTime.tenths))
    ) {
      lowestKmTime = kmTime
    }
  }
  return lowestKmTime?.minutes === undefined
    ? ''
    : lowestKmTime?.seconds + '.' + lowestKmTime?.tenths
}

/**
 *
 * @param records
 * @param race
 * @param start
 * @returns { RecordResult[] }
 */
export const _recordFilter = (
  records: RecordResult[],
  currentTrack: Track,
  race: Race,
  start: Start,
  filter: FilterType
): RecordResult[] => {
  const currentDate = dayjs()
  const currentDateOneYearAgo = currentDate.subtract(2, 'year')
  const data = records.filter((record) => {
    const basicConditions =
      !record.disqualified &&
      !record.scratched &&
      record.kmTime &&
      !record.kmTime.code &&
      record.race.sport === race.sport &&
      record.place !== '0' &&
      (race.distance > 1940 ? record.start.distance > 1940 : true) &&
      !FORBIDDEN_TRACKS.includes(record.track.id) &&
      dayjs(record.date).isAfter(currentDateOneYearAgo)

    const { shoes, sulky, distance, money, top, track, driver, condition, win, stl } = filter

    let filterConditions: boolean = true

    if (shoes) {
      filterConditions =
        filterConditions &&
        record.start.horse.shoes?.back === start.horse?.shoes.back?.hasShoe &&
        record.start.horse.shoes?.front === start.horse?.shoes.front?.hasShoe
    }
    if (sulky) {
      filterConditions =
        filterConditions && record.start.horse.sulky?.type?.text === start.horse?.sulky?.type?.text
    }
    if (distance) {
      filterConditions =
        filterConditions && (record.start.distance ?? 0) >= (race.distance ?? 0) - 200
    }
    if (money) {
      if (race.prize !== null) {
        filterConditions =
          filterConditions && record.race.firstPrize / 100000 >= getRacePrize(race.prize)
      }
    }
    if (top) {
      filterConditions = filterConditions && record.place <= '3'
    }
    if (win) {
      filterConditions = filterConditions && record.place == '1'
    }
    if (track) {
      filterConditions = filterConditions && record.track.id === race.track.id
    }
    if (driver) {
      filterConditions = filterConditions && record.start.driver.id === start.driver.id
    }
    if (condition) {
      filterConditions = filterConditions && record.track.condition === currentTrack.condition
    }
    if (stl) {
      if (race.prize !== null) {
        filterConditions = filterConditions && record.race.firstPrize >= 10000000
      }
    }

    return basicConditions && filterConditions
  })

  return data
}

const getRacePrize = (prize: string): number => {
  // Extract the numbers from the string using regular expression
  const numbers = prize.match(/(\d+(?:\.\d+)?)/)

  if (!numbers || numbers.length === 0) {
    // No numbers found in the string
    return 0
  }

  // Extract and return the first number from the string
  const firstNumber = parseFloat(numbers[1].replace(',', '.'))
  return firstNumber
}