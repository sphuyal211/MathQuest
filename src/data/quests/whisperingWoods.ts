import type { Quest } from '../../types/problem'
import { addMC, subMC, numberLine, rand } from '../generators'

export const buildWhisperingWoodsQuests = (): Quest[] => [
  {
    id: 'woods-q1',
    index: 1,
    title: 'Owl\'s Big Adds',
    story: 'The wise Owl asks: can you add bigger numbers? Up to twenty!',
    problems: Array.from({ length: 5 }, () => {
      const a = rand(5, 12)
      const b = rand(2, 20 - a)
      return addMC(a, b, '🌰')
    }),
  },
  {
    id: 'woods-q2',
    index: 2,
    title: 'Making Ten',
    story: 'A clever trick: when adding, first make ten, then add the rest!',
    problems: Array.from({ length: 5 }, () => {
      const a = rand(6, 9)
      const b = rand(11 - a, 9)
      return addMC(a, b, '🍯')
    }),
  },
  {
    id: 'woods-q3',
    index: 3,
    title: 'Subtract from Twenty',
    story: 'Take some away from a bigger pile.',
    problems: Array.from({ length: 5 }, () => {
      const a = rand(11, 20)
      const b = rand(2, 9)
      return subMC(a, b, '🪶')
    }),
  },
  {
    id: 'woods-q4',
    index: 4,
    title: 'Long Hops',
    story: 'Hop along the number line — forward and back.',
    problems: Array.from({ length: 6 }, () => {
      const op: '+' | '-' = rand(0, 1) === 0 ? '+' : '-'
      const start = op === '+' ? rand(0, 14) : rand(8, 20)
      const jump = op === '+' ? rand(1, 20 - start) : rand(1, start)
      return numberLine(start, jump, op, 20)
    }),
  },
  {
    id: 'woods-q5',
    index: 5,
    title: 'Owl\'s Riddle',
    story: 'Mixed adds and subtracts within twenty. Show your wisdom!',
    problems: Array.from({ length: 8 }, () => {
      if (rand(0, 1) === 0) {
        const a = rand(3, 14)
        const b = rand(2, 20 - a)
        return addMC(a, b, '🦉')
      }
      const a = rand(8, 20)
      const b = rand(2, a)
      return subMC(a, b, '🦉')
    }),
  },
]
