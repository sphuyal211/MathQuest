export type CountingProblem = {
  id: string
  prompt: string
  emoji: string
  count: number
  options: number[]
}

export type Quest = {
  id: string
  title: string
  story: string
  problems: CountingProblem[]
}

const optionsAround = (correct: number): number[] => {
  const set = new Set<number>([correct])
  while (set.size < 3) {
    const delta = [-2, -1, 1, 2][Math.floor(Math.random() * 4)]
    const candidate = correct + delta
    if (candidate >= 1 && candidate <= 20) set.add(candidate)
  }
  return Array.from(set).sort(() => Math.random() - 0.5)
}

const buildProblem = (id: string, prompt: string, emoji: string, count: number): CountingProblem => ({
  id,
  prompt,
  emoji,
  count,
  options: optionsAround(count),
})

export const SUNNY_MEADOW_QUESTS: Quest[] = [
  {
    id: 'meadow-q1',
    title: 'Wake the Bunny',
    story: 'A sleepy bunny is hiding behind the flowers. Count carefully to wake them up!',
    problems: [
      buildProblem('q1-p1', 'How many flowers do you see?', '🌼', 4),
      buildProblem('q1-p2', 'Count the mushrooms!', '🍄', 6),
      buildProblem('q1-p3', 'How many butterflies?', '🦋', 3),
      buildProblem('q1-p4', 'Count the carrots for the bunny!', '🥕', 7),
      buildProblem('q1-p5', 'How many bunnies are awake now?', '🐰', 5),
    ],
  },
]
