import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { NumberLineProblem } from '../../types/problem'
import { sounds } from '../../hooks/useSound'
import { AnswerButtons } from './AnswerButtons'
import { Feedback } from './Feedback'

type Props = {
  problem: NumberLineProblem
  heroName: string
  onCorrect: () => void
  onWrong?: () => void
}

export function NumberLine({ problem, heroName, onCorrect, onWrong }: Props) {
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [picked, setPicked] = useState<number | null>(null)
  const [frogLanded, setFrogLanded] = useState(false)

  useEffect(() => {
    setFrogLanded(false)
    setState('idle')
    setPicked(null)
  }, [problem.id])

  const frogPos = frogLanded ? problem.correct : problem.start
  const segments = problem.max + 1

  const tapAnswer = (n: number) => {
    if (state === 'right') return
    setPicked(n)
    if (n === problem.correct) {
      sounds.correct()
      setState('right')
      setFrogLanded(true)
      setTimeout(onCorrect, 1200)
    } else {
      sounds.wrong()
      setState('wrong')
      onWrong?.()
      setTimeout(() => {
        setState('idle')
        setPicked(null)
      }, 1400)
    }
  }

  const hintText = `Count ${problem.jump} hop${problem.jump > 1 ? 's' : ''} ${problem.op === '+' ? 'forward' : 'backward'}!`

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 flex flex-col items-center">
      <div className="bg-white/95 rounded-chunky px-6 py-4 shadow-soft mb-4 max-w-xl">
        <p className="text-xl font-display font-bold text-meadow-900 text-center leading-snug">
          {problem.prompt}
        </p>
      </div>

      <div className="bg-gradient-to-b from-sun-100 to-meadow-100 rounded-chunky shadow-soft p-4 w-full mb-6">
        <div className="relative w-full" style={{ paddingTop: '90px' }}>
          <div className="absolute left-0 right-0 bottom-3 h-1 bg-meadow-700 rounded-full" />
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-end">
            {Array.from({ length: segments }).map((_, i) => {
              const isStart = i === problem.start
              return (
                <div key={i} className="flex flex-col items-center" style={{ width: `${100 / segments}%` }}>
                  <div className={`w-1 rounded ${isStart ? 'h-4 bg-magic-500' : 'h-3 bg-meadow-700'}`} />
                  <span className={`text-sm sm:text-base font-display font-bold mt-1 ${isStart ? 'text-magic-600' : 'text-meadow-800'}`}>
                    {i}
                  </span>
                </div>
              )
            })}
          </div>
          <motion.div
            className="absolute bottom-6 text-3xl"
            animate={{
              left: `calc(${(frogPos / problem.max) * 100}% - 18px)`,
              y: frogLanded ? [-35, -15, 0] : [0, -6, 0],
            }}
            transition={frogLanded
              ? { duration: 0.5, ease: 'easeOut' }
              : { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
            }
          >
            🐸
          </motion.div>
        </div>
      </div>

      <p className="text-meadow-700 font-display mb-3">Where does the frog land?</p>
      <AnswerButtons options={problem.options} picked={picked} state={state} onPick={tapAnswer} />
      <Feedback state={state} heroName={heroName} hint={hintText} />
    </div>
  )
}
