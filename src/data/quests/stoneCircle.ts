import type { Quest } from '../../types/problem'
import { shapeIdentify, fractionPick, pick } from '../generators'

const SHAPES: string[] = ['circle', 'square', 'triangle', 'rectangle', 'hexagon', 'oval', 'star', 'heart']

export const buildStoneCircleQuests = (): Quest[] => [
  {
    id: 'stone-q1',
    index: 1,
    title: 'Deer\'s Stones',
    story: 'The Deer keeps magic stones in many shapes. Tap the one I name!',
    problems: Array.from({ length: 5 }, () => shapeIdentify(pick(SHAPES.slice(0, 4)))),
  },
  {
    id: 'stone-q2',
    index: 2,
    title: 'More Shapes',
    story: 'Now harder shapes — hexagons, ovals, stars, and hearts!',
    problems: Array.from({ length: 5 }, () => shapeIdentify(pick(SHAPES))),
  },
  {
    id: 'stone-q3',
    index: 3,
    title: 'Halves',
    story: 'Cut the magic pies in HALF. Pick the one with one half shaded.',
    problems: [
      fractionPick(2, 1),
      fractionPick(2, 1),
      fractionPick(2, 2),
      fractionPick(2, 1),
      fractionPick(2, 2),
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
      fractionPick(4, 1),
      fractionPick(4, 2),
    ],
  },
  {
    id: 'stone-q5',
    index: 5,
    title: 'Deer\'s Test',
    story: 'Shapes and fractions all together!',
    problems: [
      shapeIdentify(pick(SHAPES)),
      shapeIdentify(pick(SHAPES)),
      fractionPick(2, 1),
      fractionPick(4, 2),
      shapeIdentify(pick(SHAPES)),
      fractionPick(4, 3),
    ],
  },
]
