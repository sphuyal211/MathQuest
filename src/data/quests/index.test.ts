import { describe, it, expect } from 'vitest'
import { CHAPTERS } from '../curriculum'
import { buildQuests, QUEST_COUNTS, questIdsForChapter } from './index'

describe('quest registry', () => {
  it('every chapter has buildable quests matching the declared count', () => {
    for (const chapter of CHAPTERS) {
      const quests = buildQuests(chapter.id, 'Ayaana')
      expect(quests.length).toBe(QUEST_COUNTS[chapter.id])
      expect(quests.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('every quest has at least 4 problems', () => {
    for (const chapter of CHAPTERS) {
      const quests = buildQuests(chapter.id, 'Ayaana')
      for (const q of quests) {
        expect(q.problems.length).toBeGreaterThanOrEqual(4)
      }
    }
  })

  it('quest ids match the declared schema (chapter-q1, chapter-q2 ...)', () => {
    for (const chapter of CHAPTERS) {
      const quests = buildQuests(chapter.id, 'Ayaana')
      const ids = questIdsForChapter(chapter.id)
      expect(ids.length).toBe(quests.length)
      const builtIds = quests.map((q) => q.id).sort()
      expect(builtIds).toEqual([...ids].sort())
    }
  })

  it('every problem has the correct answer present in its options where applicable', () => {
    for (const chapter of CHAPTERS) {
      const quests = buildQuests(chapter.id, 'Ayaana')
      for (const q of quests) {
        for (const p of q.problems) {
          if (p.kind === 'tap-count' || p.kind === 'math-mc' || p.kind === 'number-line') {
            const correct = p.kind === 'tap-count' ? p.count : p.correct
            expect(p.options).toContain(correct)
            expect(p.options.length).toBeGreaterThanOrEqual(2)
          }
          if (p.kind === 'compare-length') {
            expect(p.ribbons.some((r) => r.id === p.correctId)).toBe(true)
          }
          if (p.kind === 'shape-picker') {
            expect(p.options).toContain(p.target)
          }
        }
      }
    }
  })

  it('options are unique within a problem', () => {
    for (const chapter of CHAPTERS) {
      const quests = buildQuests(chapter.id, 'Ayaana')
      for (const q of quests) {
        for (const p of q.problems) {
          if ('options' in p) {
            const opts = p.options as readonly (number | string)[]
            expect(new Set<number | string>(opts).size).toBe(opts.length)
          }
        }
      }
    }
  })
})
