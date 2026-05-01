import { useState } from 'react'
import type { MathMCProblem } from '../../types/problem'
import { sounds } from '../../hooks/useSound'
import { AnswerButtons } from './AnswerButtons'
import { Feedback } from './Feedback'

type Props = {
  problem: MathMCProblem
  heroName: string
  onCorrect: () => void
}

export function MathMC({ problem, heroName, onCorrect }: Props) {
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [picked, setPicked] = useState<number | null>(null)

  const tapAnswer = (n: number) => {
    if (state === 'right') return
    setPicked(n)
    if (n === problem.correct) {
      sounds.correct()
      setState('right')
      setTimeout(onCorrect, 1100)
    } else {
      sounds.wrong()
      setState('wrong')
      setTimeout(() => {
        setState('idle')
        setPicked(null)
      }, 1400)
    }
  }

  const v = problem.visual
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-4 flex flex-col items-center">
      <div className="bg-white/95 rounded-chunky px-6 py-4 shadow-soft mb-4 max-w-xl">
        <p className="text-2xl font-display font-bold text-meadow-900 text-center leading-snug">
          {problem.prompt}
        </p>
      </div>

      {v && v.left + v.right > 0 && (
        <div className="bg-gradient-to-b from-sun-100 to-meadow-100 rounded-chunky shadow-soft p-6 w-full mb-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex flex-wrap gap-2 justify-center max-w-[40%]">
              {Array.from({ length: v.left }).map((_, i) => (
                <span key={`l${i}`} className="text-4xl">{v.emoji}</span>
              ))}
            </div>
            <span className="text-5xl font-display font-bold text-magic-500">{v.op === '+' ? '+' : '−'}</span>
            <div className="flex flex-wrap gap-2 justify-center max-w-[40%]">
              {Array.from({ length: v.right }).map((_, i) => (
                <span key={`r${i}`} className={`text-4xl ${v.op === '-' ? 'opacity-30 line-through' : ''}`}>
                  {v.emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-meadow-700 font-display mb-3">Tap the answer:</p>
      <AnswerButtons options={problem.options} picked={picked} state={state} onPick={tapAnswer} />
      <Feedback state={state} heroName={heroName} hint={problem.hint} />
    </div>
  )
}
