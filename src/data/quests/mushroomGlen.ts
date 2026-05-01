import type { Quest } from '../../types/problem'
import { subMC, numberLine, rand, buildUnique } from '../generators'

const subPair = (maxA: number): [number, number] => {
  const a = rand(2, maxA)
  const b = rand(1, a)
  return [a, b]
}

export const buildMushroomGlenQuests = (): Quest[] => [
  {
    id: 'mushroom-q1',
    index: 1,
    title: "Hedgehog's Picnic",
    story: 'The Hedgehog had a picnic. Some food got eaten! How much is left?',
    problems: buildUnique(5, () => {
      const [a, b] = subPair(5)
      return subMC(a, b, '🍎')
    }),
  },
  {
    id: 'mushroom-q2',
    index: 2,
    title: 'Hop Back',
    story: 'Use the number line. This time, hop backwards.',
    problems: buildUnique(5, () => {
      const start = rand(3, 10)
      const jump = rand(1, start)
      return numberLine(start, jump, '-', 10)
    }),
  },
  {
    id: 'mushroom-q3',
    index: 3,
    title: 'Take Away',
    story: 'Some mushrooms have been picked. How many are still standing?',
    problems: buildUnique(5, () => {
      const [a, b] = subPair(10)
      return subMC(a, b, '🍄')
    }),
  },
  {
    id: 'mushroom-q4',
    index: 4,
    title: 'Empty Baskets',
    story: 'When everything is gone, what is left?',
    problems: [
      ...buildUnique(5, () => {
        const a = rand(2, 10)
        return subMC(a, a, '🌰')
      }),
      ...buildUnique(2, () => {
        const [a, b] = subPair(10)
        return subMC(a, b, '🌰')
      }),
    ],
  },
  {
    id: 'mushroom-q5',
    index: 5,
    title: "Hedgehog's Test",
    story: 'Mixed subtraction! Show what you have learned.',
    problems: buildUnique(7, () => {
      const [a, b] = subPair(10)
      return subMC(a, b, '🍄')
    }),
  },
]
