import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../store/game'
import { buildQuests } from '../data/quests'
import { CHAPTERS } from '../data/curriculum'
import { ActivityDispatcher } from './activities/ActivityDispatcher'
import { speak, cancelSpeech, toSpeakable } from '../hooks/useSpeak'

type CompanionMood = 'idle' | 'cheer' | 'sad'

export function QuestView() {
  const { scene, heroName, completeQuest, goTo, recordAnswer } = useGame()

  const quests = useMemo(() => {
    if (scene.name !== 'quest') return []
    return buildQuests(scene.chapter, heroName)
  }, [scene, heroName])

  const [problemIdx, setProblemIdx] = useState(0)
  const [showStory, setShowStory] = useState(true)
  const [companionMood, setCompanionMood] = useState<CompanionMood>('idle')
  const [companionKey, setCompanionKey] = useState(0)
  const moodTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const speakTextRef = useRef('')

  useEffect(() => () => { cancelSpeech() }, [])
  // Speak problem prompt each time a new problem loads (after first speak unblocks iOS)
  useEffect(() => { if (!showStory) speak(speakTextRef.current) }, [problemIdx, showStory])

  if (scene.name !== 'quest') return null

  const quest = quests.find((q) => q.id === scene.questId)
  if (!quest) {
    goTo({ name: 'map' })
    return null
  }

  const chapter = CHAPTERS.find((c) => c.id === scene.chapter)!
  const problem = quest.problems[problemIdx]
  const isLast = problemIdx === quest.problems.length - 1

  const triggerMood = (mood: 'cheer' | 'sad') => {
    if (moodTimer.current) clearTimeout(moodTimer.current)
    setCompanionMood(mood)
    setCompanionKey((k) => k + 1)
    moodTimer.current = setTimeout(() => setCompanionMood('idle'), mood === 'cheer' ? 800 : 600)
  }

  const onCorrect = () => {
    recordAnswer(true)
    triggerMood('cheer')
    if (isLast) {
      const chapterComplete = completeQuest(quest.id, scene.chapter)
      goTo({ name: 'reward', chapter: scene.chapter, questId: quest.id, chapterComplete })
    } else {
      setProblemIdx(problemIdx + 1)
    }
  }

  const onWrong = () => {
    recordAnswer(false)
    triggerMood('sad')
  }

  // Keep ref current so the speak effect always reads the right text
  speakTextRef.current = showStory ? quest.story : toSpeakable(problem?.prompt ?? '')

  return (
    <div className={`min-h-full w-full bg-gradient-to-b ${chapter.bgClass} flex flex-col no-select relative overflow-hidden`}>
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => { cancelSpeech(); goTo({ name: 'map' }) }}
          className="bg-white/80 rounded-chunky px-5 py-3 font-display font-semibold text-meadow-800 shadow-soft active:scale-95 min-h-[48px] flex items-center"
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
              onClick={() => { speak(quest.story); setShowStory(false) }}
              className="bg-white/95 rounded-chunky p-8 shadow-soft max-w-xl text-center cursor-pointer"
            >
              <motion.div
                className="text-6xl mb-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                {chapter.companionEmoji}
              </motion.div>
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
              <ActivityDispatcher problem={problem} heroName={heroName} onCorrect={onCorrect} onWrong={onWrong} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showStory && (
        <motion.div
          key={companionKey}
          className="absolute bottom-5 right-5 text-5xl pointer-events-none select-none"
          animate={
            companionMood === 'cheer'
              ? { scale: [1, 1.55, 1.25, 1], y: [0, -30, -14, 0], rotate: [0, -18, 18, 0] }
              : companionMood === 'sad'
              ? { x: [-10, 10, -8, 8, 0], scale: [1, 0.88, 0.88, 1] }
              : { y: [0, -6, 0] }
          }
          transition={
            companionMood === 'idle'
              ? { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
              : { duration: 0.5, ease: 'easeOut' }
          }
        >
          {chapter.companionEmoji}
        </motion.div>
      )}
    </div>
  )
}
