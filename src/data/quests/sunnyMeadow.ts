import type { Quest } from '../../types/problem'
import { tapCount, rand, pick, buildUnique } from '../generators'

const MEADOW_EMOJIS = ['🌼', '🍄', '🦋', '🐝', '🌻', '🌸', '🐞', '🐛']

export const buildSunnyMeadowQuests = (): Quest[] => [
  {
    id: 'meadow-q1',
    index: 1,
    title: 'Wake the Bunny',
    story: 'A sleepy bunny is hiding behind the flowers. Count carefully to wake them up!',
    problems: [
      tapCount('🌼', 4),
      tapCount('🍄', 6),
      tapCount('🦋', 3),
      tapCount('🥕', 7),
      tapCount('🐰', 5),
    ],
  },
  {
    id: 'meadow-q2',
    index: 2,
    title: 'Bee Garden',
    story: 'The bees are buzzing! Help count them and the flowers they love.',
    problems: buildUnique(5, () => tapCount(pick(MEADOW_EMOJIS), rand(3, 9))),
  },
  {
    id: 'meadow-q3',
    index: 3,
    title: 'Bigger Numbers',
    story: 'The meadow is full of life. Can you count even more?',
    problems: buildUnique(5, () => tapCount(pick(MEADOW_EMOJIS), rand(8, 14))),
  },
  {
    id: 'meadow-q4',
    index: 4,
    title: 'Up to Twenty',
    story: 'Some flowers grow in big bunches. Count up to twenty!',
    problems: buildUnique(5, () => tapCount(pick(MEADOW_EMOJIS), rand(13, 20))),
  },
  {
    id: 'meadow-q5',
    index: 5,
    title: "Bunny's Test",
    story: 'The Bunny wants to see what you have learned. Mixed counting!',
    problems: buildUnique(6, () => tapCount(pick(MEADOW_EMOJIS), rand(2, 20))),
  },
]
