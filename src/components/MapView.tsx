import { motion } from 'framer-motion'
import { CHAPTERS } from '../data/curriculum'
import { questIdsForChapter } from '../data/quests'
import { useGame } from '../store/game'
import { sounds } from '../hooks/useSound'

export function MapView() {
  const {
    heroName, stickers, completedQuests, goTo,
    isChapterUnlocked, isChapterComplete, nextQuestFor,
    correctAnswers, wrongAnswers, giftGoal, giftSeen,
  } = useGame()

  const onTapChapter = (id: typeof CHAPTERS[number]['id']) => {
    if (!isChapterUnlocked(id)) {
      sounds.wrong()
      return
    }
    sounds.whoosh()
    const next = nextQuestFor(id)
    if (next) goTo({ name: 'quest', chapter: id, questId: next })
    else goTo({ name: 'map' })
  }

  const totalAnswers = correctAnswers + wrongAnswers
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : null
  const giftReached = giftSeen && correctAnswers >= giftGoal
  const pct = Math.min(100, (correctAnswers / giftGoal) * 100)

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-sky_-200 via-meadow-100 to-meadow-300 relative overflow-hidden no-select">
      <header className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <div className="bg-white/80 backdrop-blur rounded-chunky px-4 py-2 shadow-soft">
          <p className="text-sm text-meadow-700">Math Mage</p>
          <p className="text-xl font-display font-bold text-meadow-900">{heroName}</p>
        </div>
        <div className="flex gap-2">
          {accuracy !== null && (
            <div className="bg-white/80 backdrop-blur rounded-chunky px-3 py-2 shadow-soft flex items-center gap-1">
              <span className="text-lg">🎯</span>
              <span className="text-lg font-display font-bold text-meadow-800">{accuracy}%</span>
            </div>
          )}
          <button
            onClick={() => goTo({ name: 'stickers' })}
            className="bg-white/80 backdrop-blur rounded-chunky px-4 py-2 shadow-soft flex items-center gap-2 active:scale-95"
          >
            <span className="text-2xl">⭐</span>
            <span className="text-2xl font-display font-bold text-sun-500">{stickers}</span>
          </button>
          <button
            onClick={() => goTo({ name: 'settings' })}
            className="bg-white/80 backdrop-blur rounded-chunky w-12 h-12 shadow-soft flex items-center justify-center text-2xl active:scale-95"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Gift progress bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 z-10">
        <div className="bg-white/85 backdrop-blur rounded-chunky px-4 py-3 shadow-soft">
          {giftReached ? (
            <p className="text-center font-display font-bold text-sun-500">
              🎁 Gift earned! Ask your parent for a new goal!
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-display font-bold text-meadow-800">
                  🎁 Gift goal
                </span>
                <span className="text-sm font-bold text-sun-600">
                  {correctAnswers} / {giftGoal} correct
                </span>
              </div>
              <div className="w-full bg-meadow-100 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-4 rounded-full bg-gradient-to-r from-sun-400 to-sun-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-meadow-600 mt-1 text-center font-display">
                {giftGoal - correctAnswers} more correct answers to unlock your gift!
              </p>
            </>
          )}
        </div>
      </div>

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
          const unlocked = isChapterUnlocked(c.id)
          const completed = isChapterComplete(c.id)
          return (
            <motion.button
              key={c.id}
              onClick={() => onTapChapter(c.id)}
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
              {(() => {
                if (!unlocked || completed) return null
                const ids = questIdsForChapter(c.id)
                const doneCount = ids.filter((id) => completedQuests.includes(id)).length
                if (doneCount === 0) return null
                return (
                  <div className="mt-1 flex gap-1 justify-center">
                    {ids.map((id, i) => (
                      <span
                        key={id}
                        className={`w-2 h-2 rounded-full ${i < doneCount ? 'bg-sun-400' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )
              })()}
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
