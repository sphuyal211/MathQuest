import type { Quest, Problem } from '../../types/problem'
import { optionsAround, nextId, rand } from '../generators'

const tensAndOnes = (tens: number, ones: number): Problem => {
  const value = tens * 10 + ones
  return {
    kind: 'math-mc',
    id: nextId('pv'),
    prompt: `${tens} ten${tens === 1 ? '' : 's'} and ${ones} one${ones === 1 ? '' : 's'} makes how many?`,
    correct: value,
    options: optionsAround(value, 3, 1, 120),
    hint: `${tens}0 + ${ones}`,
  }
}

const oneMore = (n: number): Problem => ({
  kind: 'math-mc',
  id: nextId('om'),
  prompt: `What is one more than ${n}?`,
  correct: n + 1,
  options: optionsAround(n + 1, 3, 1, 120),
})

const tenMore = (n: number): Problem => ({
  kind: 'math-mc',
  id: nextId('tm'),
  prompt: `What is ten more than ${n}?`,
  correct: n + 10,
  options: optionsAround(n + 10, 3, 1, 120),
})

export const buildCrystalCavesQuests = (): Quest[] => [
  {
    id: 'cave-q1',
    index: 1,
    title: 'Firefly\'s Bundles',
    story: 'The Fireflies cluster in groups of ten and a few extras. Count the bundles!',
    problems: Array.from({ length: 5 }, () => tensAndOnes(rand(1, 9), rand(0, 9))),
  },
  {
    id: 'cave-q2',
    index: 2,
    title: 'One More',
    story: 'Each new firefly adds one. What number comes next?',
    problems: Array.from({ length: 5 }, () => oneMore(rand(9, 99))),
  },
  {
    id: 'cave-q3',
    index: 3,
    title: 'Ten More',
    story: 'A whole new bundle of ten! How many now?',
    problems: Array.from({ length: 5 }, () => tenMore(rand(5, 99))),
  },
  {
    id: 'cave-q4',
    index: 4,
    title: 'Big Numbers',
    story: 'The cave glitters with bigger numbers — past one hundred!',
    problems: Array.from({ length: 5 }, () => {
      const t = rand(1, 11)
      const o = rand(0, 9)
      return tensAndOnes(t, o)
    }),
  },
  {
    id: 'cave-q5',
    index: 5,
    title: 'Firefly\'s Test',
    story: 'Mixed place value! Show how strong your tens and ones are.',
    problems: [
      ...Array.from({ length: 3 }, () => tensAndOnes(rand(1, 11), rand(0, 9))),
      ...Array.from({ length: 2 }, () => oneMore(rand(9, 119))),
      ...Array.from({ length: 3 }, () => tenMore(rand(5, 109))),
    ],
  },
]
