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

  const filteredRecords = records.filter(
    (record) => dayjs(record.date).isAfter(currentDateThreeMonthsAgo) && !record.oddsCode
  )

  for (let i = 0; i < filteredRecords.length; i++) {
    if (parseInt(filteredRecords[i].place) > 9) {
      filteredRecords[i].place = '0'
    }

    if (
      filteredRecords[i].place ||
      filteredRecords[i].galloped ||
      filteredRecords[i].disqualified
    ) {
      lastFive.push({
        place: filteredRecords[i].place,
        galloped: filteredRecords[i].galloped,
        disqualified: filteredRecords[i].disqualified,
      })
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
  filteredRecords: RecordResult[],
  length: number = filteredRecords.length
): { time: string; recent: boolean; distance: { number: number | null; type: string } } => {
  if (records.length === 0 || filteredRecords.length === 0) {
    return { time: '', recent: false, distance: { number: null, type: '' } }
  }

  let lowestKmTime = null
  let recordDistance = null
  let recent = false

  const currentDate = dayjs()

  const latestRecords = records
    .filter((record) => {
      const recordDate = dayjs(record.date) // Assuming `record.date` holds the timestamp
      return (
        !record.scratched && record.kmTime && recordDate.isAfter(currentDate.subtract(3, 'month'))
      )
    })
    .slice(0, 5)

  for (let i = 0; i < length; i++) {
    const currentRecord = filteredRecords[i]
    if (!currentRecord || !currentRecord.kmTime) {
      return { time: '', recent: false, distance: { number: null, type: '' } }
    }

    const kmTime = currentRecord.kmTime
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
      recordDistance = currentRecord.start.distance

      // Set 'recent' if this record is one of the last 3 records in the `records` array
      recent = latestRecords.includes(currentRecord)
    }
  }

  const distanceType =
    recordDistance === null
      ? ''
      : recordDistance <= 1800
        ? 'S'
        : recordDistance <= 2400
          ? 'M'
          : recordDistance <= 2900
            ? 'L'
            : 'L+'

  return {
    time:
      lowestKmTime?.minutes === undefined ? '' : `${lowestKmTime.seconds}.${lowestKmTime.tenths}`,
    recent,
    distance: {
      number: recordDistance,
      type: distanceType,
    },
  }
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
  const data = records.filter((record) => {
    const basicConditions =
      !record.disqualified &&
      !record.scratched &&
      record.kmTime &&
      !record.kmTime.code &&
      record.race.sport === race.sport &&
      record.place !== '0' &&
      (race.distance > 1940 ? record.start.distance > 1940 : true) &&
      // !FORBIDDEN_TRACKS.includes(record.track.id) &&
      dayjs(record.date).isAfter(currentDate.subtract(2, 'year'))

    const { shoes, sulky, distance, money, top, track, driver, condition, iceTrack, win, stl } =
      filter

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
      if (filter.specificDistance?.from && filter.specificDistance?.from !== '') {
        filterConditions =
          filterConditions && (record.start.distance ?? 0) >= parseInt(filter.specificDistance.from)
      }

      if (filter.specificDistance?.to && filter.specificDistance?.to !== '') {
        filterConditions =
          filterConditions && (record.start.distance ?? 0) <= parseInt(filter.specificDistance.to)
      }

      if (filter.specificDistance?.from === '' && filter.specificDistance?.to === '') {
        filterConditions =
          filterConditions && (record.start.distance ?? 0) >= (race.distance ?? 0) - 200
      }
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

    if (iceTrack) {
      filterConditions = filterConditions && record.track.condition === 'winter'
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
