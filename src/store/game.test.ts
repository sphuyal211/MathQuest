import { describe, it, expect, beforeEach } from 'vitest'
import { useGame } from './game'
import { CHAPTERS } from '../data/curriculum'
import { questIdsForChapter } from '../data/quests'

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

  it('only Sunny Meadow is unlocked at start', () => {
    const g = useGame.getState()
    expect(g.isChapterUnlocked('sunny-meadow')).toBe(true)
    for (const c of CHAPTERS.slice(1)) {
      expect(g.isChapterUnlocked(c.id)).toBe(false)
    }
  })

  it('completing all Sunny Meadow quests unlocks Berry Grove', () => {
    const g = useGame.getState()
    for (const id of questIdsForChapter('sunny-meadow')) {
      g.completeQuest(id, 'sunny-meadow')
    }
    expect(useGame.getState().isChapterComplete('sunny-meadow')).toBe(true)
    expect(useGame.getState().isChapterUnlocked('berry-grove')).toBe(true)
  })

  it('completeQuest returns true on the quest that finishes a chapter, false otherwise', () => {
    const g = useGame.getState()
    const ids = questIdsForChapter('sunny-meadow')
    for (let i = 0; i < ids.length - 1; i++) {
      expect(g.completeQuest(ids[i], 'sunny-meadow')).toBe(false)
    }
    expect(g.completeQuest(ids[ids.length - 1], 'sunny-meadow')).toBe(true)
  })

  it('completeQuest is idempotent for the same quest id', () => {
    const g = useGame.getState()
    g.completeQuest('meadow-q1', 'sunny-meadow')
    g.completeQuest('meadow-q1', 'sunny-meadow')
    const s = useGame.getState()
    expect(s.completedQuests.filter((q) => q === 'meadow-q1')).toHaveLength(1)
    expect(s.unlockedCompanions.filter((c) => c === 'sunny-meadow')).toHaveLength(1)
    expect(s.stickers).toBe(2)
  })

  it('nextQuestFor returns the first incomplete quest, or null when complete', () => {
    const g = useGame.getState()
    const ids = questIdsForChapter('sunny-meadow')
    expect(g.nextQuestFor('sunny-meadow')).toBe(ids[0])
    g.completeQuest(ids[0], 'sunny-meadow')
    expect(useGame.getState().nextQuestFor('sunny-meadow')).toBe(ids[1])
    for (const id of ids) g.completeQuest(id, 'sunny-meadow')
    expect(useGame.getState().nextQuestFor('sunny-meadow')).toBeNull()
  })
})
