import type { Quest } from '../../types/problem'
import { shapeIdentify, fractionPick, shuffle } from '../generators'

const BASIC_SHAPES = ['circle', 'square', 'triangle', 'rectangle']
const ALL_SHAPES = ['circle', 'square', 'triangle', 'rectangle', 'hexagon', 'oval', 'star', 'heart']

export const buildStoneCircleQuests = (): Quest[] => [
  {
    id: 'stone-q1',
    index: 1,
    title: "Deer's Stones",
    story: 'The Deer keeps magic stones in many shapes. Tap the one I name!',
    // All 4 basic shapes, each shown exactly once
    problems: shuffle(BASIC_SHAPES).map((s) => shapeIdentify(s)),
  },
  {
    id: 'stone-q2',
    index: 2,
    title: 'More Shapes',
    story: 'Now harder shapes — hexagons, ovals, stars, and hearts!',
    // Pick 5 unique shapes from all 8
    problems: shuffle(ALL_SHAPES).slice(0, 5).map((s) => shapeIdentify(s)),
  },
  {
    id: 'stone-q3',
    index: 3,
    title: 'Halves',
    story: 'Cut the magic pies in HALF. Pick the one with one half shaded.',
    problems: [
      fractionPick(2, 1),
      fractionPick(2, 2),
      fractionPick(4, 2),
      fractionPick(2, 1),
    ],
  },
  {
    id: 'stone-q4',
    index: 4,
    title: 'Quarters',
    story: 'Now into FOUR equal parts. Find the picture that matches!',
    problems: [
      fractionPick(4, 1),
      fractionPick(4, 2),
      fractionPick(4, 3),
      fractionPick(2, 1),
      fractionPick(2, 2),
    ],
  },
  {
    id: 'stone-q5',
    index: 5,
    title: "Deer's Test",
    story: 'Shapes and fractions all together!',
    problems: (() => {
      const shapes = shuffle(ALL_SHAPES)
      return [
        shapeIdentify(shapes[0]),
        fractionPick(2, 1),
        shapeIdentify(shapes[1]),
        fractionPick(4, 2),
        shapeIdentify(shapes[2]),
        fractionPick(4, 3),
      ]
    })(),
  },
]
