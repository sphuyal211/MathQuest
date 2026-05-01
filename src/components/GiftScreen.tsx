import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../store/game'
import { sounds } from '../hooks/useSound'

export function GiftScreen() {
  const { heroName, correctAnswers, wrongAnswers, markGiftSeen, goTo } = useGame()

  useEffect(() => {
    sounds.complete()
  }, [])

  const totalAnswers = correctAnswers + wrongAnswers
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

  const onClaim = () => {
    markGiftSeen()
    goTo({ name: 'map' })
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-sun-200 via-berry-200 to-magic-300 flex items-center justify-center p-6 relative overflow-hidden no-select">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.3, 0.7],
            x: (Math.random() - 0.5) * 700,
            y: (Math.random() - 0.5) * 600,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.8, delay: i * 0.07, repeat: Infinity, repeatDelay: 0.6 }}
          style={{ left: '50%', top: '50%' }}
        >
          {['🎁', '⭐', '✨', '🎉', '🌟', '🎊'][i % 6]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="bg-white/95 rounded-chunky p-8 shadow-soft max-w-md w-full text-center relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          🎁
        </motion.div>

        <p className="text-sm uppercase tracking-wider text-magic-500 font-bold mb-2">
          Goal reached!
        </p>
        <h2 className="text-3xl font-display font-bold text-meadow-900 mb-2">
          {heroName}, you earned your gift!
        </h2>
        <p className="text-lg text-meadow-700 font-display mb-6">
          You got {correctAnswers} correct answers. Go find a parent — your gift is waiting!
        </p>

        {/* Score card */}
        <div className="bg-meadow-50 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-3xl font-display font-bold text-meadow-600">{correctAnswers}</p>
            <p className="text-xs text-meadow-500 font-display">✅ Correct</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-berry-500">{wrongAnswers}</p>
            <p className="text-xs text-berry-400 font-display">❌ Tries</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-sun-500">{accuracy}%</p>
            <p className="text-xs text-sun-400 font-display">🎯 Accuracy</p>
          </div>
        </div>

        <button
          onClick={onClaim}
          className="w-full bg-sun-400 hover:bg-sun-500 text-white text-2xl font-display font-bold py-4 rounded-chunky shadow-soft active:scale-95 transition-transform"
        >
          Claim my gift! 🎁
        </button>
      </motion.div>
    </div>
  )
}
