import { useState } from 'react'
import { useGame } from '../store/game'

const GIFT_PRESETS = [25, 50, 75, 100, 150, 200]

export function Settings() {
  const {
    heroName, setHeroName, resetAll, goTo,
    correctAnswers, wrongAnswers, giftGoal, setGiftGoal,
  } = useGame()
  const [draft, setDraft] = useState(heroName)
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const totalAnswers = correctAnswers + wrongAnswers
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : null

  if (!unlocked) {
    return (
      <div className="min-h-full w-full bg-gradient-to-b from-meadow-200 to-meadow-400 p-6 no-select">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => goTo({ name: 'map' })}
            className="bg-white/90 rounded-chunky px-4 py-2 font-display font-semibold text-meadow-800 shadow-soft active:scale-95"
          >
            ← Map
          </button>
        </header>
        <div className="bg-white/95 rounded-chunky shadow-soft p-8 max-w-md mx-auto text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-display font-bold text-meadow-900 mb-2">Grown-up area</h1>
          <p className="text-meadow-700 mb-4">Type the year you were born to enter.</p>
          <input
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="w-full text-3xl text-center px-4 py-3 rounded-2xl border-4 border-meadow-300 focus:border-meadow-500 focus:outline-none font-display"
            autoFocus
          />
          <button
            onClick={() => {
              const n = parseInt(pin, 10)
              if (n >= 1900 && n <= 2020) setUnlocked(true)
              else setPin('')
            }}
            disabled={pin.length !== 4}
            className="mt-4 w-full bg-meadow-500 hover:bg-meadow-600 disabled:bg-meadow-200 text-white text-xl font-display font-bold py-3 rounded-chunky shadow-soft active:scale-95"
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-meadow-200 to-meadow-400 p-6 no-select overflow-auto">
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo({ name: 'map' })}
          className="bg-white/90 rounded-chunky px-4 py-2 font-display font-semibold text-meadow-800 shadow-soft active:scale-95"
        >
          ← Map
        </button>
      </header>

      <div className="max-w-md mx-auto space-y-4">

        {/* Score stats */}
        <div className="bg-white/95 rounded-chunky shadow-soft p-6">
          <h2 className="text-xl font-display font-bold text-meadow-900 mb-4">Score report</h2>
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="bg-meadow-50 rounded-2xl p-3">
              <p className="text-3xl font-display font-bold text-meadow-600">{correctAnswers}</p>
              <p className="text-xs text-meadow-500 font-display mt-1">✅ Correct</p>
            </div>
            <div className="bg-berry-50 rounded-2xl p-3">
              <p className="text-3xl font-display font-bold text-berry-500">{wrongAnswers}</p>
              <p className="text-xs text-berry-400 font-display mt-1">❌ Wrong tries</p>
            </div>
            <div className="bg-sun-50 rounded-2xl p-3">
              <p className="text-3xl font-display font-bold text-sun-500">
                {accuracy !== null ? `${accuracy}%` : '—'}
              </p>
              <p className="text-xs text-sun-400 font-display mt-1">🎯 Accuracy</p>
            </div>
          </div>
          {totalAnswers > 0 && (
            <div className="w-full bg-meadow-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-meadow-400 to-meadow-500 transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          )}
        </div>

        {/* Gift goal */}
        <div className="bg-white/95 rounded-chunky shadow-soft p-6">
          <h2 className="text-xl font-display font-bold text-meadow-900 mb-1">Gift goal</h2>
          <p className="text-sm text-meadow-600 mb-4">
            Set how many correct answers unlock the gift. Currently{' '}
            <span className="font-bold text-sun-600">{correctAnswers}/{giftGoal}</span>.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {GIFT_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setGiftGoal(preset)}
                className={`py-3 rounded-2xl font-display font-bold text-lg transition-all active:scale-95 ${
                  giftGoal === preset
                    ? 'bg-sun-400 text-white shadow-soft'
                    : 'bg-meadow-100 text-meadow-700 hover:bg-meadow-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          <p className="text-xs text-meadow-500 mt-3 text-center">
            Changing the goal resets the gift celebration so she can earn it again.
          </p>
        </div>

        {/* Hero name */}
        <div className="bg-white/95 rounded-chunky shadow-soft p-6">
          <h2 className="text-xl font-display font-bold text-meadow-900 mb-3">Hero name</h2>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={20}
            className="w-full text-xl px-4 py-3 rounded-2xl border-4 border-meadow-300 focus:border-meadow-500 focus:outline-none font-display"
          />
          <button
            onClick={() => setHeroName(draft)}
            className="mt-3 w-full bg-meadow-500 text-white font-display font-bold py-3 rounded-chunky shadow-soft active:scale-95"
          >
            Save name
          </button>
        </div>

        {/* Reset */}
        <div className="bg-white/95 rounded-chunky shadow-soft p-6">
          <h2 className="text-xl font-display font-bold text-meadow-900 mb-3">Reset progress</h2>
          {confirmReset ? (
            <>
              <p className="text-berry-500 font-display font-semibold mb-3">
                This will erase all progress and scores. Are you sure?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => resetAll()}
                  className="flex-1 bg-berry-500 text-white font-display font-bold py-3 rounded-chunky shadow-soft active:scale-95"
                >
                  Yes, reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 bg-meadow-200 text-meadow-800 font-display font-bold py-3 rounded-chunky active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full bg-berry-300/30 text-berry-500 border-2 border-berry-300 font-display font-bold py-3 rounded-chunky active:scale-95"
            >
              Reset all progress
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
