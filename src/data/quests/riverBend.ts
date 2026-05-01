import type { Quest } from '../../types/problem'
import { compareLength } from '../generators'

export const buildRiverBendQuests = (): Quest[] => [
  {
    id: 'river-q1',
    index: 1,
    title: 'Otter\'s Ribbons',
    story: 'The Otter has shiny ribbons. Find the longest one!',
    problems: Array.from({ length: 5 }, () => compareLength('longest', 2)),
  },
  {
    id: 'river-q2',
    index: 2,
    title: 'Tiny Things',
    story: 'Some ribbons are very small. Find the shortest!',
    problems: Array.from({ length: 5 }, () => compareLength('shortest', 2)),
  },
  {
    id: 'river-q3',
    index: 3,
    title: 'Three Ribbons',
    story: 'Now there are three! Pick carefully.',
    problems: [
      ...Array.from({ length: 3 }, () => compareLength('longest', 3)),
      ...Array.from({ length: 3 }, () => compareLength('shortest', 3)),
    ],
  },
  {
    id: 'river-q4',
    index: 4,
    title: 'Otter\'s Test',
    story: 'Mixed comparing. Long? Short? Choose wisely!',
    problems: [
      ...Array.from({ length: 3 }, () => compareLength('longest', 3)),
      ...Array.from({ length: 3 }, () => compareLength('shortest', 3)),
      compareLength('longest', 4),
    ],
  },
]
