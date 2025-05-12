export type FilterType = {
  shoes: boolean
  sulky: boolean
  distance: boolean
  specificDistance?: {
    from?: string
    to?: string
  }
  money: boolean
  top: boolean
  track: boolean
  driver: boolean
  condition: boolean
  timespan: 'latestMonths' | 'latestYear' | 'all'
  win: boolean
  stl: boolean
}

export interface FormType {
  place: string | number
  galloped: boolean
  disqualified: boolean
}
