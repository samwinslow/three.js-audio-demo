import { Key } from '@tonaljs/tonal'

export const majorScales = Object.fromEntries([
  'C'
].map(str => {
  const { scale } = Key.majorKey(str)
  return [str, scale]
}))
