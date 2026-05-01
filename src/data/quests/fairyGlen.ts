import type { Quest, Problem } from '../../types/problem'
import { wordProblem, rand, pick } from '../generators'

type WPTemplate = (a: number, b: number, hero: string) => { s: string; e: string; n: number }

const ADD_TEMPLATES: WPTemplate[] = [
  (a, b, hero) => ({ s: `${hero} found ${a} acorns. The Fox brings ${b} more. How many now?`, e: '🌰', n: a + b }),
  (a, b, hero) => ({ s: `The Bunny gives ${hero} ${a} carrots. The Hedgehog gives ${b} more. How many in all?`, e: '🥕', n: a + b }),
  (a, b, _hero) => ({ s: `${a} fireflies are on the path. ${b} more arrive. How many fireflies?`, e: '✨', n: a + b }),
  (a, b, hero) => ({ s: `${hero} picks ${a} berries. Then picks ${b} more. How many berries?`, e: '🍓', n: a + b }),
]

const SUB_TEMPLATES: WPTemplate[] = [
  (a, b, hero) => ({ s: `${hero} had ${a} cookies. The Owl ate ${b}. How many are left?`, e: '🍪', n: a - b }),
  (a, b, hero) => ({ s: `${a} flowers grow in the meadow. ${hero} picks ${b}. How many remain?`, e: '🌼', n: a - b }),
  (a, b, _hero) => ({ s: `${a} mushrooms stand tall. ${b} get knocked over. How many still standing?`, e: '🍄', n: a - b }),
  (a, b, hero) => ({ s: `${hero} has ${a} stickers. Gives ${b} to the Bunny. How many left?`, e: '⭐', n: a - b }),
]

const buildAdd = (heroName: string): Problem => {
  const a = rand(2, 12)
  const b = rand(1, 20 - a)
  const t = pick(ADD_TEMPLATES)(a, b, heroName)
  return wordProblem(t.s, t.e, t.n)
}

const buildSub = (heroName: string): Problem => {
  const a = rand(5, 20)
  const b = rand(1, a - 1)
  const t = pick(SUB_TEMPLATES)(a, b, heroName)
  return wordProblem(t.s, t.e, t.n)
}

export const buildFairyGlenQuests = (heroName: string): Quest[] => [
  {
    id: 'fairy-q1',
    index: 1,
    title: 'Fairy\'s Stories',
    story: 'The Fairy tells little stories. Listen and find the answer!',
    problems: Array.from({ length: 5 }, () => buildAdd(heroName)),
  },
  {
    id: 'fairy-q2',
    index: 2,
    title: 'Take-Away Tales',
    story: 'Stories where things are taken away. Read and solve!',
    problems: Array.from({ length: 5 }, () => buildSub(heroName)),
  },
  {
    id: 'fairy-q3',
    index: 3,
    title: 'Mixed Mysteries',
    story: 'Some add, some take away. Read carefully!',
    problems: [
      buildAdd(heroName),
      buildSub(heroName),
      buildAdd(heroName),
      buildSub(heroName),
      buildAdd(heroName),
      buildSub(heroName),
    ],
  },
  {
    id: 'fairy-q4',
    index: 4,
    title: 'The Final Test',
    story: `${heroName}, you are nearly a true Math Mage! One last set of stories.`,
    problems: [
      buildAdd(heroName),
      buildSub(heroName),
      buildAdd(heroName),
      buildSub(heroName),
      buildAdd(heroName),
      buildSub(heroName),
      buildAdd(heroName),
      buildSub(heroName),
    ],
  },
]
