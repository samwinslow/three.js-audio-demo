import { Key } from '@tonaljs/tonal'

export const majorScales = Object.fromEntries([
  'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'
].map(str => {
  const { scale } = Key.majorKey(str)
  console.log([ str, scale ])
  return [str, scale]
}))
