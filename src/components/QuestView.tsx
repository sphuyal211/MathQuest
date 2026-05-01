import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../store/game'
import { SUNNY_MEADOW_QUESTS } from '../data/sunnyMeadowQuests'
import { TapToCount } from './TapToCount'

export function QuestView() {
  const { scene, heroName, completeQuest, goTo } = useGame()
  const [problemIdx, setProblemIdx] = useState(0)
  const [showStory, setShowStory] = useState(true)

  if (scene.name !== 'quest') return null

  const quest = SUNNY_MEADOW_QUESTS.find((q) => q.id === scene.questId)
  if (!quest) {
    goTo({ name: 'map' })
    return null
  }

  const problem = quest.problems[problemIdx]
  const isLast = problemIdx === quest.problems.length - 1

  const onCorrect = () => {
    if (isLast) {
      completeQuest(quest.id, scene.chapter)
      goTo({ name: 'reward', chapter: scene.chapter, questId: quest.id })
    } else {
      setProblemIdx(problemIdx + 1)
    }
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-meadow-100 to-meadow-300 flex flex-col no-select">
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => goTo({ name: 'map' })}
          className="bg-white/80 rounded-chunky px-4 py-2 font-display font-semibold text-meadow-800 shadow-soft active:scale-95"
        >
          ← Map
        </button>
        <div className="bg-white/80 rounded-chunky px-4 py-2 shadow-soft">
          <span className="font-display font-bold text-meadow-900">
            {problemIdx + 1} / {quest.problems.length}
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-2">
        <AnimatePresence mode="wait">
          {showStory ? (
            <motion.div
              key="story"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setShowStory(false)}
              className="bg-white/95 rounded-chunky p-8 shadow-soft max-w-xl text-center cursor-pointer"
            >
              <div className="text-6xl mb-3">🐰💤</div>
              <p className="text-sm uppercase tracking-wider text-magic-500 font-bold mb-2">{quest.title}</p>
              <p className="text-2xl font-display text-meadow-900 leading-snug">{quest.story}</p>
              <p className="mt-6 text-meadow-600 text-sm">Tap to start →</p>
            </motion.div>
          ) : (
            <motion.div
              key={`problem-${problem.id}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="w-full"
            >
              <TapToCount problem={problem} heroName={heroName} onCorrect={onCorrect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
