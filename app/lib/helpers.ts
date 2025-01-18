export const getColor = (slot: string) => {
  switch (slot) {
    case 'A':
      return '#FFCDD2'
    case 'B':
      return '#F8BBD0'
    case 'C':
      return '#E1BEE7'
    case 'D':
      return '#D1C4E9'
    case 'E':
      return '#C5CAE9'
    case 'F':
      return '#BBDEFB'
    case 'G':
      return '#B3E5FC'
    case 'H':
      return '#B2EBF2'
    case 'L1':
      return '#B2DFDB'
    case 'L2':
      return '#C8E6C9'
    case 'L3':
      return '#DCEDC8'
    case 'L4':
      return '#F0F4C3'
    case 'L5':
      return '#FFF9C4'
    case 'FS':
      return '#FFECB3'
    default:
      return '#FFFFFF'
  }
}
