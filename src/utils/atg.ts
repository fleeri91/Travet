export const _getHorseSex = (sex: string): string => {
  switch (sex) {
    case 'mare':
      return 's'
    case 'gelding':
      return 'v'
    case 'stallion':
      return 'h'
    default:
      return ''
  }
}

export const _getGameStatus = (status: string): string => {
  switch (status) {
    case 'bettable':
      return 'Spelbar'
    case 'results':
      return 'Avslutad'
    default:
      return ''
  }
}

export const _getTrackCondition = (condition: string) => {
  switch (condition) {
    case 'light':
      return 'Lätt'
    case 'dead':
      return 'Tung'
    case 'winter':
      return 'Vinter'
    default:
      return ''
  }
}

export const _getRaceStartMethod = (method: string) => {
  switch (method) {
    case 'auto':
      return 'Auto'
    case 'volte':
      return 'Volt'
    default:
      break
  }
}
