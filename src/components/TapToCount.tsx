import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CountingProblem } from '../data/sunnyMeadowQuests'

type Props = {
  problem: CountingProblem
  heroName: string
  onCorrect: () => void
}

export function TapToCount({ problem, heroName, onCorrect }: Props) {
  const [tappedIdx, setTappedIdx] = useState<Set<number>>(new Set())
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'right'>('idle')
  const [pickedAnswer, setPickedAnswer] = useState<number | null>(null)

  const tapItem = (i: number) => {
    setTappedIdx((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const tapAnswer = (n: number) => {
    if (feedback === 'right') return
    setPickedAnswer(n)
    if (n === problem.count) {
      setFeedback('right')
      setTimeout(onCorrect, 1100)
    } else {
      setFeedback('wrong')
      setTimeout(() => {
        setFeedback('idle')
        setPickedAnswer(null)
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
              animate={tappedIdx.has(i) ? { scale: [1, 1.15, 1] } : {}}
              className="text-6xl relative"
              aria-label={`item ${i + 1}`}
            >
              {problem.emoji}
              {tappedIdx.has(i) && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sun-400 text-white text-sm font-display font-bold flex items-center justify-center shadow">
                  {Array.from(tappedIdx).indexOf(i) + 1}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="text-meadow-700 font-display mb-3">Tap the answer:</p>
      <div className="flex gap-4 w-full justify-center">
        {problem.options.map((n) => {
          const isPicked = pickedAnswer === n
          const isCorrect = feedback === 'right' && isPicked
          const isWrong = feedback === 'wrong' && isPicked
          return (
            <motion.button
              key={n}
              onClick={() => tapAnswer(n)}
              whileTap={{ scale: 0.9 }}
              animate={isWrong ? { x: [-8, 8, -6, 6, 0] } : {}}
              className={`text-4xl font-display font-bold w-24 h-24 rounded-chunky shadow-soft transition-colors ${
                isCorrect
                  ? 'bg-meadow-400 text-white'
                  : isWrong
                    ? 'bg-berry-300 text-white'
                    : 'bg-white text-meadow-900 hover:bg-sun-100 active:bg-sun-200'
              }`}
            >
              {n}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {feedback === 'right' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-2xl font-display font-bold text-meadow-700"
          >
            ✨ Yes! Great counting, {heroName}!
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-xl font-display text-berry-500"
          >
            Hmm, let's try again. Tap each one as you count.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
