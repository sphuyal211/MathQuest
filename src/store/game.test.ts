import { describe, it, expect, beforeEach } from 'vitest'
import { useGame } from './game'

describe('game store', () => {
  beforeEach(() => {
    useGame.getState().resetAll()
  })

  it('starts in welcome scene with default hero name', () => {
    const s = useGame.getState()
    expect(s.scene.name).toBe('welcome')
    expect(s.heroName).toBe('Ayaana')
    expect(s.hasOnboarded).toBe(false)
  })

  it('setHeroName trims and falls back to default when empty', () => {
    useGame.getState().setHeroName('  Maya  ')
    expect(useGame.getState().heroName).toBe('Maya')
    useGame.getState().setHeroName('   ')
    expect(useGame.getState().heroName).toBe('Ayaana')
  })

  it('finishOnboarding flips hasOnboarded and routes to map', () => {
    useGame.getState().finishOnboarding()
    const s = useGame.getState()
    expect(s.hasOnboarded).toBe(true)
    expect(s.scene.name).toBe('map')
  })

  it('completeQuest tracks quest, unlocks companion, and adds sticker', () => {
    useGame.getState().completeQuest('meadow-q1', 'sunny-meadow')
    const s = useGame.getState()
    expect(s.completedQuests).toContain('meadow-q1')
    expect(s.unlockedCompanions).toContain('sunny-meadow')
    expect(s.stickers).toBe(1)
  })

  it('completeQuest is idempotent for the same quest id', () => {
    useGame.getState().completeQuest('meadow-q1', 'sunny-meadow')
    useGame.getState().completeQuest('meadow-q1', 'sunny-meadow')
    const s = useGame.getState()
    expect(s.completedQuests.filter((q) => q === 'meadow-q1')).toHaveLength(1)
    expect(s.unlockedCompanions.filter((c) => c === 'sunny-meadow')).toHaveLength(1)
    expect(s.stickers).toBe(2)
  })
})
