import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../store/game'

const SCENES = [
  {
    speaker: 'Forest Spirit',
    text: 'The Enchanted Forest is fading… The animals have fallen asleep, and the colors are slipping away.',
  },
  {
    speaker: 'Forest Spirit',
    text: 'But I can feel a special gift in you — the gift of numbers. Will you be our Math Mage?',
  },
]

export function WelcomeScreen() {
  const { heroName, setHeroName, finishOnboarding } = useGame()
  const [step, setStep] = useState<'name' | 'story' | 'ready'>('name')
  const [draftName, setDraftName] = useState(heroName)
  const [sceneIdx, setSceneIdx] = useState(0)

  const submitName = () => {
    setHeroName(draftName)
    setStep('story')
  }

  const nextScene = () => {
    if (sceneIdx < SCENES.length - 1) {
      setSceneIdx(sceneIdx + 1)
    } else {
      setStep('ready')
    }
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-sun-200 via-meadow-200 to-meadow-400 flex items-center justify-center p-6 no-select">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 rounded-chunky p-8 shadow-soft text-center"
            >
              <div className="text-7xl mb-4 animate-bounce-slow">🌳✨</div>
              <h1 className="text-4xl font-display font-bold text-meadow-800 mb-2">MathQuest</h1>
              <p className="text-lg text-meadow-700 mb-6">A magical adventure in the Enchanted Forest</p>
              <label className="block text-left text-meadow-800 font-semibold mb-2">What's your name, brave one?</label>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                maxLength={20}
                className="w-full text-2xl px-4 py-3 rounded-2xl border-4 border-meadow-300 focus:border-meadow-500 focus:outline-none text-center font-display text-meadow-900"
                autoFocus
              />
              <button
                onClick={submitName}
                disabled={!draftName.trim()}
                className="mt-6 w-full bg-meadow-500 hover:bg-meadow-600 disabled:bg-meadow-200 text-white text-2xl font-display font-bold py-4 rounded-chunky shadow-soft active:scale-95 transition-transform"
              >
                Begin the adventure →
              </button>
            </motion.div>
          )}

          {step === 'story' && (
            <motion.div
              key={`story-${sceneIdx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={nextScene}
              className="bg-white/95 rounded-chunky p-8 shadow-soft cursor-pointer"
            >
              <div className="text-6xl text-center mb-4 animate-wiggle">🧝‍♀️</div>
              <p className="text-sm uppercase tracking-wider text-magic-500 font-bold text-center mb-3">
                {SCENES[sceneIdx].speaker}
              </p>
              <p className="text-2xl text-meadow-900 leading-snug font-display text-center">
                {SCENES[sceneIdx].text.replace('you', heroName)}
              </p>
              <p className="mt-6 text-center text-meadow-600 text-sm">Tap to continue →</p>
            </motion.div>
          )}

          {step === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 rounded-chunky p-8 shadow-soft text-center"
            >
              <div className="text-7xl mb-4">🌟</div>
              <p className="text-2xl font-display text-meadow-900 mb-6 leading-snug">
                Yes, {heroName}!<br />Together we will save the forest.
              </p>
              <button
                onClick={finishOnboarding}
                className="w-full bg-magic-500 hover:bg-magic-600 text-white text-2xl font-display font-bold py-4 rounded-chunky shadow-soft active:scale-95 transition-transform"
              >
                Open the map ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
