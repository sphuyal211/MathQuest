export type Shape = 'circle' | 'square' | 'triangle' | 'rectangle' | 'hexagon' | 'oval' | 'star' | 'heart'

export type TapCountProblem = {
  kind: 'tap-count'
  id: string
  prompt: string
  emoji: string
  count: number
  options: number[]
}

export type MathMCProblem = {
  kind: 'math-mc'
  id: string
  prompt: string
  visual?: { left: number; right: number; emoji: string; op: '+' | '-' }
  correct: number
  options: number[]
  hint?: string
}

export type NumberLineProblem = {
  kind: 'number-line'
  id: string
  prompt: string
  start: number
  jump: number
  op: '+' | '-'
  max: number
  correct: number
  options: number[]
}

export type CompareLengthProblem = {
  kind: 'compare-length'
  id: string
  prompt: string
  task: 'longest' | 'shortest'
  ribbons: { id: string; length: number; color: string }[]
  correctId: string
}

export type ShapePickerProblem = {
  kind: 'shape-picker'
  id: string
  prompt: string
  mode: 'identify' | 'fraction'
  target: Shape | string
  options: (Shape | string)[]
  fraction?: { parts: 2 | 4; shaded: number }
}

export type Problem =
  | TapCountProblem
  | MathMCProblem
  | NumberLineProblem
  | CompareLengthProblem
  | ShapePickerProblem

export type Quest = {
  id: string
  index: number
  title: string
  story: string
  problems: Problem[]
}
