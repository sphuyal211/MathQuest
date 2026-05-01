import { describe, it, expect } from 'vitest'
import { SUNNY_MEADOW_QUESTS } from './sunnyMeadowQuests'

describe('Sunny Meadow quests', () => {
  it('has at least one quest with at least 5 problems', () => {
    expect(SUNNY_MEADOW_QUESTS.length).toBeGreaterThanOrEqual(1)
    expect(SUNNY_MEADOW_QUESTS[0].problems.length).toBeGreaterThanOrEqual(5)
  })

  it('every problem has the correct answer in its options', () => {
    for (const quest of SUNNY_MEADOW_QUESTS) {
      for (const p of quest.problems) {
        expect(p.options).toContain(p.count)
        expect(p.options).toHaveLength(3)
        expect(p.count).toBeGreaterThan(0)
        expect(p.count).toBeLessThanOrEqual(20)
      }
    }
  })

  it('options never repeat within a problem', () => {
    for (const quest of SUNNY_MEADOW_QUESTS) {
      for (const p of quest.problems) {
        expect(new Set(p.options).size).toBe(p.options.length)
      }
    }
  })
})
