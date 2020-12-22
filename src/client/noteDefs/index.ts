import { Key, Note } from '@tonaljs/tonal'

export const majorKeys = [
  'C'
].map(str => Key.majorKey(str))
.map(({ scale }) => ({
  scale
}))
