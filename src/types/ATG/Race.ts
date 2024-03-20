export interface RaceRoot {
  id: string
  name: string
  date: string
  number: number
  distance: number
  startMethod: string
  startTime: string
  scheduledStartTime: string
  prize: string
  sport: string
  track: Track
  status: string
  starts: Start[]
}

interface Track {
  id: number
  name: string
  condition: string
  countryCode: string
}

interface Result {
  victoryMargin: string
}

interface Start {
  number: number
  postPosition: number
  distance: number
  horse: Horse
  driver: Driver
  result: Result
  out?: boolean
}

interface Horse {
  id: number
  name: string
  age: number
  sex: string
  record: Record
  trainer: Trainer
  shoes: Shoes
  sulky: Sulky
  money: number
  color: string
  homeTrack: HomeTrack
  nationality?: string
}

interface Record {
  code: string
  startMethod: string
  distance: string
  time: Time
}

interface Time {
  minutes: number
  seconds: number
  tenths: number
}

interface Trainer {
  id: number
  firstName: string
  lastName: string
  shortName: string
  location: string
  birth: number
  homeTrack: HomeTrack
  license: string
  silks?: string
}

interface HomeTrack {
  id: number
  name: string
}

interface Shoes {
  reported: boolean
  front: Front
  back: Back
}

interface Front {
  hasShoe: boolean
  changed: boolean
}

interface Back {
  hasShoe: boolean
  changed: boolean
}

interface Sulky {
  reported: boolean
  type: Type
}

interface Type {
  code: string
  text: string
  engText: string
  changed: boolean
}

interface Driver {
  id: number
  firstName: string
  lastName: string
  shortName: string
  location: string
  birth: number
  homeTrack: HomeTrack
  license: string
  silks: string
}

interface KmTime {
  minutes?: number
  seconds?: number
  tenths?: number
  code?: string
}
