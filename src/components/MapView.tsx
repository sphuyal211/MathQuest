import { motion } from 'framer-motion'
import { CHAPTERS, type Chapter } from '../data/curriculum'
import { useGame } from '../store/game'
import { SUNNY_MEADOW_QUESTS } from '../data/sunnyMeadowQuests'

export function MapView() {
  const { heroName, completedQuests, stickers, goTo } = useGame()

  const isUnlocked = (c: Chapter) => c.available
  const isCompleted = (c: Chapter) => {
    if (c.id === 'sunny-meadow') {
      return SUNNY_MEADOW_QUESTS.every((q) => completedQuests.includes(q.id))
    }
    return false
  }

  const onTapChapter = (c: Chapter) => {
    if (!isUnlocked(c)) return
    if (c.id === 'sunny-meadow') {
      const next = SUNNY_MEADOW_QUESTS.find((q) => !completedQuests.includes(q.id))
      if (next) goTo({ name: 'quest', chapter: c.id, questId: next.id })
    }
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-sky_-200 via-meadow-100 to-meadow-300 relative overflow-hidden no-select">
      <header className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <div className="bg-white/80 backdrop-blur rounded-chunky px-4 py-2 shadow-soft">
          <p className="text-sm text-meadow-700">Math Mage</p>
          <p className="text-xl font-display font-bold text-meadow-900">{heroName}</p>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-chunky px-4 py-2 shadow-soft flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-2xl font-display font-bold text-sun-500">{stickers}</span>
        </div>
      </header>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {CHAPTERS.slice(0, -1).map((c, i) => {
          const next = CHAPTERS[i + 1]
          return (
            <line
              key={`path-${c.id}`}
              x1={c.mapPos.x}
              y1={c.mapPos.y}
              x2={next.mapPos.x}
              y2={next.mapPos.y}
              stroke="#9bd967"
              strokeWidth="0.6"
              strokeDasharray="1.4 1.4"
              strokeLinecap="round"
              opacity="0.7"
            />
          )
        })}
      </svg>

      <div className="absolute inset-0">
        {CHAPTERS.map((c) => {
          const unlocked = isUnlocked(c)
          const completed = isCompleted(c)
          return (
            <motion.button
              key={c.id}
              onClick={() => onTapChapter(c)}
              disabled={!unlocked}
              whileTap={unlocked ? { scale: 0.92 } : undefined}
              animate={unlocked && !completed ? { y: [0, -6, 0] } : undefined}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${c.mapPos.x}%`, top: `${c.mapPos.y}%` }}
            >
              <div
                className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${c.bgClass} shadow-soft flex items-center justify-center text-5xl ${
                  unlocked ? '' : 'grayscale opacity-40'
                } ${completed ? 'ring-4 ring-sun-400 shadow-glow' : ''}`}
              >
                {unlocked ? c.companionEmoji : '🔒'}
                <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white text-meadow-800 font-display font-bold flex items-center justify-center shadow text-sm">
                  {c.index}
                </span>
                {completed && (
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sun-400 text-white flex items-center justify-center text-base">
                    ★
                  </span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`font-display font-bold text-sm ${unlocked ? 'text-meadow-900' : 'text-meadow-600/60'}`}>
                  {c.title}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
