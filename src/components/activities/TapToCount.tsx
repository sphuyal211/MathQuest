import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TapCountProblem } from '../../types/problem'
import { sounds } from '../../hooks/useSound'
import { AnswerButtons } from './AnswerButtons'
import { Feedback } from './Feedback'

type Props = {
  problem: TapCountProblem
  heroName: string
  onCorrect: () => void
}

export function TapToCount({ problem, heroName, onCorrect }: Props) {
  const [tapped, setTapped] = useState<Set<number>>(new Set())
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [picked, setPicked] = useState<number | null>(null)

  const tapItem = (i: number) => {
    sounds.tap()
    setTapped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const tapAnswer = (n: number) => {
    if (state === 'right') return
    setPicked(n)
    if (n === problem.count) {
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

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-4 flex flex-col items-center">
      <div className="bg-white/95 rounded-chunky px-6 py-4 shadow-soft mb-4">
        <p className="text-2xl font-display font-bold text-meadow-900 text-center">{problem.prompt}</p>
      </div>

      <div className="bg-gradient-to-b from-sun-100 to-meadow-100 rounded-chunky shadow-soft p-6 w-full mb-6">
        <div className="flex flex-wrap justify-center gap-3 min-h-[160px] items-center">
          {Array.from({ length: problem.count }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => tapItem(i)}
              whileTap={{ scale: 0.85 }}
              animate={tapped.has(i) ? { scale: [1, 1.15, 1] } : {}}
              className="text-6xl relative"
              aria-label={`item ${i + 1}`}
            >
              {problem.emoji}
              {tapped.has(i) && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sun-400 text-white text-sm font-display font-bold flex items-center justify-center shadow">
                  {Array.from(tapped).indexOf(i) + 1}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="text-meadow-700 font-display mb-3">Tap the answer:</p>
      <AnswerButtons options={problem.options} picked={picked} state={state} onPick={tapAnswer} />
      <Feedback state={state} heroName={heroName} hint="Tap each one as you count." />
    </div>
  )
}
