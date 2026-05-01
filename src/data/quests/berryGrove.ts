import type { Quest } from '../../types/problem'
import { addMC, numberLine, rand, buildUnique } from '../generators'

const addPair = (max: number): [number, number] => {
  const a = rand(1, max - 1)
  const b = rand(1, max - a)
  return [a, b]
}

export const buildBerryGroveQuests = (): Quest[] => [
  {
    id: 'berry-q1',
    index: 1,
    title: "Fox's First Sums",
    story: 'The Fox is gathering berries! Help by adding the baskets.',
    problems: buildUnique(5, () => {
      const [a, b] = addPair(5)
      return addMC(a, b, '🍓')
    }),
  },
  {
    id: 'berry-q2',
    index: 2,
    title: 'Hop Along',
    story: 'Use the magic number line! Start, then hop forward.',
    problems: buildUnique(5, () => {
      const start = rand(0, 6)
      const jump = rand(1, 10 - start)
      return numberLine(start, jump, '+', 10)
    }),
  },
  {
    id: 'berry-q3',
    index: 3,
    title: 'Sums to Ten',
    story: 'Can you make ten? Add the berries to fill the basket.',
    problems: buildUnique(5, () => {
      const a = rand(1, 9)
      const b = 10 - a
      return addMC(a, b, '🫐')
    }),
  },
  {
    id: 'berry-q4',
    index: 4,
    title: 'Mixed Bunch',
    story: 'Berries of all colors! Add them all up.',
    problems: buildUnique(6, () => {
      const [a, b] = addPair(10)
      return addMC(a, b, '🍇')
    }),
  },
  {
    id: 'berry-q5',
    index: 5,
    title: "Fox's Test",
    story: 'The Fox wants you to be quick! Mixed addition within ten.',
    problems: buildUnique(7, () => {
      const [a, b] = addPair(10)
      return addMC(a, b, '🍓')
    }),
  },
]
