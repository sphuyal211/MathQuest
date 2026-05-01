import { motion } from 'framer-motion'
import { CHAPTERS } from '../data/curriculum'
import { useGame } from '../store/game'

export function StickerBook() {
  const { heroName, stickers, completedQuests, unlockedCompanions, goTo } = useGame()

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-magic-400 via-berry-300 to-sun-200 p-6 no-select">
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo({ name: 'map' })}
          className="bg-white/90 rounded-chunky px-4 py-2 font-display font-semibold text-meadow-800 shadow-soft active:scale-95"
        >
          ← Map
        </button>
        <div className="bg-white/90 rounded-chunky px-4 py-2 shadow-soft flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-2xl font-display font-bold text-sun-500">{stickers}</span>
        </div>
      </header>

      <div className="bg-white/95 rounded-chunky shadow-soft p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-meadow-900 mb-1 text-center">
          {heroName}'s Sticker Book
        </h1>
        <p className="text-meadow-700 text-center mb-6">
          {stickers} sticker{stickers === 1 ? '' : 's'} earned · {unlockedCompanions.length} of 8 companions
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CHAPTERS.map((c, i) => {
            const found = unlockedCompanions.includes(c.id)
            return (
              <motion.div
                key={c.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-gradient-to-br ${c.bgClass} rounded-chunky p-4 text-center shadow-soft ${
                  found ? '' : 'grayscale opacity-30'
                }`}
              >
                <div className="text-5xl mb-2">{found ? c.companionEmoji : '❓'}</div>
                <p className="font-display font-bold text-meadow-900 text-sm">{c.companion}</p>
                <p className="text-xs text-meadow-800/80">{c.title}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 38 }).map((_, i) => {
            const filled = i < completedQuests.length
            return (
              <div
                key={i}
                className={`aspect-square rounded-2xl flex items-center justify-center text-2xl ${
                  filled ? 'bg-sun-300 shadow-soft' : 'bg-meadow-100 border-2 border-dashed border-meadow-300'
                }`}
              >
                {filled ? '⭐' : ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
