let ctx: AudioContext | null = null

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Klass = (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
    if (!Klass) return null
    ctx = new Klass()
  }
  return ctx
}

const tone = (freq: number, durationMs: number, volume = 0.15, type: OscillatorType = 'sine', startDelayMs = 0) => {
  const audio = getCtx()
  if (!audio) return
  const start = audio.currentTime + startDelayMs / 1000
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000)
  osc.connect(gain).connect(audio.destination)
  osc.start(start)
  osc.stop(start + durationMs / 1000)
}

export const sounds = {
  correct: () => {
    tone(523, 110, 0.15, 'sine')
    tone(784, 220, 0.18, 'sine', 110)
  },
  wrong: () => {
    tone(220, 180, 0.12, 'sine')
  },
  complete: () => {
    tone(523, 120, 0.15, 'sine')
    tone(659, 120, 0.15, 'sine', 120)
    tone(784, 200, 0.18, 'sine', 240)
    tone(1047, 320, 0.2, 'sine', 440)
  },
  tap: () => {
    tone(880, 50, 0.08, 'triangle')
  },
  whoosh: () => {
    tone(330, 90, 0.1, 'sine')
    tone(660, 90, 0.1, 'sine', 90)
  },
}
