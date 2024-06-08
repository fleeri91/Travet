export interface TravsportStats {
  name: string
  id: TravsportId
  typeOfLicense: string
  numberOfStarts: number
  winningPercent: number
  prizeMoney: number
  numberOfFirstPlaces: number
  numberOfSecondPlaces: number
  numberOfThirdPlaces: number
  numberOfFourthPlaces: number
  numberOfFifthPlaces: number
  homeTrackCode: string
}

export interface TravsportId {
  id: number
  sourceOfData: string
  organisation: string
}

/**
 * Licenstyp
 *
 * S = Alla
 * A = A-licens
 * B = B-licens
 * K = K-licens
 */
export type TravsportLicenseType = 'S' | 'A' | 'B' | 'K'

/**
 * Kön
 *
 * B = Båda
 * M = Män
 * K = Kvinnor
 */
export type TravsportGender = 'B' | 'M' | 'K'

/**
 * Hemmabana
 *
 * A = Alla banor
 * S = Alla svenska banor
 * number = Travbana id
 */
export type TravsportHomeTrack = 'A' | 'S' | number

/**
 * Nuvarande bana
 *
 * A = Alla banor
 * S = Alla svenska banor
 * number = Travbana id
 */
export type TravsportCurrentTrack = 'A' | 'S' | number

/**
 * Lopptyp
 *
 * B = Alla
 * R = STL
 */
export type TravsportRaceType = 'B' | 'R'

/**
 * Sulky / Monté
 *
 * B = Båda
 * S = Sulky
 * M = Monté
 */
export type TravsportSulkyOrMonte = 'B' | 'S' | 'M'

/**
 * Hästras
 *
 * B = Båda
 * V = Varmblod
 * K = Kallblod
 */
export type TravsportBreed = 'B' | 'V' | 'K'

/**
 * Antal resultat
 */
export type TravsportAmount = 10 | 30 | 50 | 100 | 200
