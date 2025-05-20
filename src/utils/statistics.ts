import { Start } from '@/types/Game'
import { RaceStatistics } from '@/types/RaceStatistics'

export const computeRaceStatistics = (starts: Start[]): RaceStatistics => {
  return {
    HorseMoneyPerStart: starts.map((start) => ({
      name: start.horse.name,
      value: start.horse.statistics.life.starts
        ? Math.round(start.horse.money / start.horse.statistics.life.starts)
        : 0,
    })),
    HorseWinPercentage: starts.map((start) => ({
      name: start.horse.name,
      value: start.horse.statistics.life.winPercentage,
    })),
    HorsePlacePercentage: starts.map((start) => ({
      name: start.horse.name,
      value: start.horse.statistics.life.placePercentage || 0,
    })),
    HorsePointPerStart: starts.map((start) => ({
      name: start.horse.name,
      value: start.horse.statistics.life.starts
        ? Math.round(start.horse.statistics.life.startPoints / start.horse.statistics.life.starts)
        : 0,
    })),
  }
}
