import { motion } from 'framer-motion'
import { useGame } from '../store/game'
import { CHAPTERS } from '../data/curriculum'

export function RewardScreen() {
  const { scene, heroName, goTo } = useGame()
  if (scene.name !== 'reward') return null
  const chapter = CHAPTERS.find((c) => c.id === scene.chapter)
  if (!chapter) {
    goTo({ name: 'map' })
    return null
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-sun-200 via-meadow-200 to-meadow-400 flex items-center justify-center p-6 relative overflow-hidden no-select">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl pointer-events-none"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0.6],
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 500,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.6, delay: i * 0.06, repeat: Infinity, repeatDelay: 0.8 }}
          style={{ left: '50%', top: '50%' }}
        >
          ✨
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="bg-white/95 rounded-chunky p-8 shadow-soft max-w-md w-full text-center relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          {chapter.companionEmoji}
        </motion.div>
        <p className="text-sm uppercase tracking-wider text-magic-500 font-bold mb-2">Companion unlocked!</p>
        <h2 className="text-3xl font-display font-bold text-meadow-900 mb-2">The {chapter.companion} is awake!</h2>
        <p className="text-lg text-meadow-700 font-display mb-6">
          Wonderful counting, {heroName}. {chapter.title} is glowing again.
        </p>
        <div className="bg-sun-100 rounded-2xl py-3 px-4 mb-6 inline-flex items-center gap-2">
          <span className="text-3xl">⭐</span>
          <span className="font-display font-bold text-sun-500 text-xl">+1 sticker</span>
        </div>
        <button
          onClick={() => goTo({ name: 'map' })}
          className="w-full bg-meadow-500 hover:bg-meadow-600 text-white text-2xl font-display font-bold py-4 rounded-chunky shadow-soft active:scale-95 transition-transform"
        >
          Back to the map →
        </button>
      </motion.div>
    </div>
  )
}
