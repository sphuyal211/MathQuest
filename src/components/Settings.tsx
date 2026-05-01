import { useState } from 'react'
import { useGame } from '../store/game'

export function Settings() {
  const { heroName, setHeroName, resetAll, goTo } = useGame()
  const [draft, setDraft] = useState(heroName)
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

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
    <div className="min-h-full w-full bg-gradient-to-b from-meadow-200 to-meadow-400 p-6 no-select">
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo({ name: 'map' })}
          className="bg-white/90 rounded-chunky px-4 py-2 font-display font-semibold text-meadow-800 shadow-soft active:scale-95"
        >
          ← Map
        </button>
      </header>
      <div className="bg-white/95 rounded-chunky shadow-soft p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-display font-bold text-meadow-900 mb-6">Settings</h1>

        <label className="block text-meadow-800 font-semibold mb-2">Hero name</label>
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

        <div className="mt-8 pt-6 border-t border-meadow-200">
          {confirmReset ? (
            <>
              <p className="text-berry-500 font-display font-semibold mb-3">
                This will erase all progress. Are you sure?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    resetAll()
                  }}
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
