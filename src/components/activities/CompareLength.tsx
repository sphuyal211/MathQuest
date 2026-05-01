import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CompareLengthProblem } from '../../types/problem'
import { sounds } from '../../hooks/useSound'
import { Feedback } from './Feedback'

type Props = {
  problem: CompareLengthProblem
  heroName: string
  onCorrect: () => void
  onWrong?: () => void
}

export function CompareLength({ problem, heroName, onCorrect, onWrong }: Props) {
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [pickedId, setPickedId] = useState<string | null>(null)

  const tap = (id: string) => {
    if (state === 'right') return
    setPickedId(id)
    if (id === problem.correctId) {
      sounds.correct()
      setState('right')
      setTimeout(onCorrect, 1100)
    } else {
      sounds.wrong()
      setState('wrong')
      onWrong?.()
      setTimeout(() => {
        setState('idle')
        setPickedId(null)
      }, 1400)
    }
  }

  const maxLen = Math.max(...problem.ribbons.map((r) => r.length))

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 flex flex-col items-center">
      <div className="bg-white/95 rounded-chunky px-6 py-4 shadow-soft mb-4">
        <p className="text-2xl font-display font-bold text-meadow-900 text-center">{problem.prompt}</p>
      </div>

      <div className="bg-gradient-to-b from-sky_-200 to-meadow-100 rounded-chunky shadow-soft p-6 w-full mb-6">
        <div className="flex flex-col gap-4">
          {problem.ribbons.map((r) => {
            const widthPct = (r.length / maxLen) * 100
            const isPicked = pickedId === r.id
            const isRight = state === 'right' && isPicked
            const isWrong = state === 'wrong' && isPicked
            return (
              <motion.button
                key={r.id}
                onClick={() => tap(r.id)}
                whileTap={{ scale: 0.96 }}
                animate={isWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
                className={`relative h-14 rounded-full shadow-soft text-left pr-4 transition-all ${
                  isRight ? 'ring-4 ring-sun-400' : ''
                } ${isWrong ? 'opacity-70' : ''}`}
                style={{ width: `${widthPct}%`, backgroundColor: r.color, minWidth: '20%' }}
              >
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">🎀</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Feedback state={state} heroName={heroName} hint={problem.task === 'longest' ? 'Look for the BIGGEST ribbon.' : 'Look for the SMALLEST ribbon.'} />
    </div>
  )
}
