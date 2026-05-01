import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChapterId } from '../data/curriculum'

export type Scene =
  | { name: 'welcome' }
  | { name: 'map' }
  | { name: 'quest'; chapter: ChapterId; questId: string }
  | { name: 'reward'; chapter: ChapterId; questId: string }

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
  completeQuest: (questId: string, chapter: ChapterId) => void
  resetAll: () => void
}

const DEFAULT_HERO = 'Ayaana'

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      heroName: DEFAULT_HERO,
      hasOnboarded: false,
      scene: { name: 'welcome' },
      completedQuests: [],
      unlockedCompanions: [],
      stickers: 0,

      setHeroName: (name) => set({ heroName: name.trim() || DEFAULT_HERO }),
      finishOnboarding: () => set({ hasOnboarded: true, scene: { name: 'map' } }),
      goTo: (scene) => set({ scene }),
      completeQuest: (questId, chapter) =>
        set((s) => ({
          completedQuests: s.completedQuests.includes(questId)
            ? s.completedQuests
            : [...s.completedQuests, questId],
          unlockedCompanions: s.unlockedCompanions.includes(chapter)
            ? s.unlockedCompanions
            : [...s.unlockedCompanions, chapter],
          stickers: s.stickers + 1,
        })),
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
