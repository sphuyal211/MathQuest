import type { Problem } from '../types/problem'

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5)

export const optionsAround = (correct: number, count = 3, min = 0, max = 100): number[] => {
  const set = new Set<number>([correct])
  let safety = 50
  while (set.size < count && safety-- > 0) {
    const delta = pick([-3, -2, -1, 1, 2, 3])
    const v = correct + delta
    if (v >= min && v <= max) set.add(v)
  }
  while (set.size < count) {
    const v = rand(min, max)
    if (v !== correct) set.add(v)
  }
  return shuffle(Array.from(set))
}

let problemCounter = 0
export const nextId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${problemCounter++}`

export const tapCount = (emoji: string, count: number, prompt?: string): Problem => ({
  kind: 'tap-count',
  id: nextId('tc'),
  prompt: prompt ?? `How many ${emoji} do you see?`,
  emoji,
  count,
  options: optionsAround(count, 3, 1, 20),
})

export const addMC = (a: number, b: number, emoji = '🍓'): Problem => ({
  kind: 'math-mc',
  id: nextId('add'),
  prompt: `${a} + ${b} = ?`,
  visual: { left: a, right: b, emoji, op: '+' },
  correct: a + b,
  options: optionsAround(a + b, 3, 0, Math.max(a + b + 5, 20)),
})

export const subMC = (a: number, b: number, emoji = '🍄'): Problem => ({
  kind: 'math-mc',
  id: nextId('sub'),
  prompt: `${a} − ${b} = ?`,
  visual: { left: a, right: b, emoji, op: '-' },
  correct: a - b,
  options: optionsAround(a - b, 3, 0, a + 3),
})

export const numberLine = (start: number, jump: number, op: '+' | '-', max = 20): Problem => {
  const correct = op === '+' ? start + jump : start - jump
  return {
    kind: 'number-line',
    id: nextId('nl'),
    prompt: op === '+' ? `Start at ${start}. Hop forward ${jump}. Where do you land?` : `Start at ${start}. Hop back ${jump}. Where do you land?`,
    start,
    jump,
    op,
    max,
    correct,
    options: optionsAround(correct, 3, 0, max),
  }
}

const RIBBON_COLORS = ['#ff5a8b', '#3eb3ff', '#ffc11f', '#7cc83f', '#b977ff', '#ff8a3c']

export const compareLength = (task: 'longest' | 'shortest', ribbonCount = 3): Problem => {
  const lengths = new Set<number>()
  while (lengths.size < ribbonCount) lengths.add(rand(2, 9))
  const arr = shuffle(Array.from(lengths))
  const ribbons = arr.map((length, i) => ({
    id: `r${i}`,
    length,
    color: RIBBON_COLORS[i % RIBBON_COLORS.length],
  }))
  const target = task === 'longest' ? Math.max(...arr) : Math.min(...arr)
  const correctRibbon = ribbons.find((r) => r.length === target)!
  return {
    kind: 'compare-length',
    id: nextId('cl'),
    prompt: task === 'longest' ? 'Tap the longest ribbon!' : 'Tap the shortest ribbon!',
    task,
    ribbons,
    correctId: correctRibbon.id,
  }
}

const SHAPE_LABELS: Record<string, string> = {
  circle: 'Circle',
  square: 'Square',
  triangle: 'Triangle',
  rectangle: 'Rectangle',
  hexagon: 'Hexagon',
  oval: 'Oval',
  star: 'Star',
  heart: 'Heart',
}

export const shapeIdentify = (target: keyof typeof SHAPE_LABELS): Problem => {
  const allShapes = Object.keys(SHAPE_LABELS)
  const distractors = shuffle(allShapes.filter((s) => s !== target)).slice(0, 2)
  const options = shuffle([target, ...distractors])
  return {
    kind: 'shape-picker',
    id: nextId('sh'),
    prompt: `Tap the ${SHAPE_LABELS[target].toLowerCase()}.`,
    mode: 'identify',
    target,
    options,
  }
}

export const fractionPick = (parts: 2 | 4, shaded: number): Problem => {
  const fractionLabel = parts === 2
    ? shaded === 1 ? 'one half (1/2)' : 'two halves (2/2)'
    : shaded === 1 ? 'one quarter (1/4)' : shaded === 2 ? 'two quarters (2/4)' : shaded === 3 ? 'three quarters (3/4)' : 'four quarters (4/4)'
  const target = `${parts}-${shaded}`
  const all: string[] = parts === 2 ? ['2-1', '2-2', '4-1', '4-3'] : ['4-1', '4-2', '4-3', '2-1']
  const options = shuffle(Array.from(new Set([target, ...all])).slice(0, 3))
  return {
    kind: 'shape-picker',
    id: nextId('fr'),
    prompt: `Which picture shows ${fractionLabel}?`,
    mode: 'fraction',
    target,
    options,
    fraction: { parts, shaded },
  }
}

export const wordProblem = (story: string, emoji: string, correct: number): Problem => ({
  kind: 'math-mc',
  id: nextId('wp'),
  prompt: story,
  visual: { left: 0, right: 0, emoji, op: '+' },
  correct,
  options: optionsAround(correct, 3, 0, 25),
})
