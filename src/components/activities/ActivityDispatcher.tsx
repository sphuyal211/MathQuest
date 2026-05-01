import type { Problem } from '../../types/problem'
import { TapToCount } from './TapToCount'
import { MathMC } from './MathMC'
import { NumberLine } from './NumberLine'
import { CompareLength } from './CompareLength'
import { ShapePicker } from './ShapePicker'

type Props = {
  problem: Problem
  heroName: string
  onCorrect: () => void
  onWrong: () => void
}

export function ActivityDispatcher({ problem, heroName, onCorrect, onWrong }: Props) {
  switch (problem.kind) {
    case 'tap-count':
      return <TapToCount problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
    case 'math-mc':
      return <MathMC problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
    case 'number-line':
      return <NumberLine problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
    case 'compare-length':
      return <CompareLength problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
    case 'shape-picker':
      return <ShapePicker problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
  }
}
