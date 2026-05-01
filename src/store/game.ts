import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChapterId } from '../data/curriculum'
import { CHAPTERS } from '../data/curriculum'
import { questIdsForChapter } from '../data/quests'

export type Scene =
  | { name: 'welcome' }
  | { name: 'map' }
  | { name: 'quest'; chapter: ChapterId; questId: string }
  | { name: 'reward'; chapter: ChapterId; questId: string; chapterComplete: boolean }
  | { name: 'stickers' }
  | { name: 'settings' }

type GameState = {
  heroName: string
  hasOnboarded: boolean
  scene: Scene
  completedQuests: string[]
  unlockedCompanions: ChapterId[]
  stickers: number

  setHeroName: (name: string) => void
  finishOnboarding: () => void
  goTo: (scene: Scene) => void
  completeQuest: (questId: string, chapter: ChapterId) => boolean
  isChapterUnlocked: (chapter: ChapterId) => boolean
  isChapterComplete: (chapter: ChapterId) => boolean
  nextQuestFor: (chapter: ChapterId) => string | null
  resetAll: () => void
}

const DEFAULT_HERO = 'Ayaana'

const chapterIndex = (id: ChapterId): number => CHAPTERS.findIndex((c) => c.id === id)

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      heroName: DEFAULT_HERO,
      hasOnboarded: false,
      scene: { name: 'welcome' },
      completedQuests: [],
      unlockedCompanions: [],
      stickers: 0,

      setHeroName: (name) => set({ heroName: name.trim() || DEFAULT_HERO }),
      finishOnboarding: () => set({ hasOnboarded: true, scene: { name: 'map' } }),
      goTo: (scene) => set({ scene }),

      isChapterUnlocked: (chapter) => {
        const idx = chapterIndex(chapter)
        if (idx <= 0) return true
        const prev = CHAPTERS[idx - 1].id
        return get().isChapterComplete(prev)
      },

      isChapterComplete: (chapter) => {
        const ids = questIdsForChapter(chapter)
        const done = get().completedQuests
        return ids.every((q) => done.includes(q))
      },

      nextQuestFor: (chapter) => {
        const ids = questIdsForChapter(chapter)
        const done = get().completedQuests
        return ids.find((q) => !done.includes(q)) ?? null
      },

      completeQuest: (questId, chapter) => {
        const before = get().isChapterComplete(chapter)
        set((s) => ({
          completedQuests: s.completedQuests.includes(questId)
            ? s.completedQuests
            : [...s.completedQuests, questId],
          unlockedCompanions: s.unlockedCompanions.includes(chapter)
            ? s.unlockedCompanions
            : [...s.unlockedCompanions, chapter],
          stickers: s.stickers + 1,
        }))
        const after = get().isChapterComplete(chapter)
        return !before && after
      },

      resetAll: () =>
        set({
          heroName: DEFAULT_HERO,
          hasOnboarded: false,
          scene: { name: 'welcome' },
          completedQuests: [],
          unlockedCompanions: [],
          stickers: 0,
        }),
    }),
    {
      name: 'mathquest-progress-v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
