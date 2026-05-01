import type { ChapterId } from '../curriculum'
import type { Quest } from '../../types/problem'
import { buildSunnyMeadowQuests } from './sunnyMeadow'
import { buildBerryGroveQuests } from './berryGrove'
import { buildMushroomGlenQuests } from './mushroomGlen'
import { buildWhisperingWoodsQuests } from './whisperingWoods'
import { buildCrystalCavesQuests } from './crystalCaves'
import { buildRiverBendQuests } from './riverBend'
import { buildStoneCircleQuests } from './stoneCircle'
import { buildFairyGlenQuests } from './fairyGlen'

export const buildQuests = (chapter: ChapterId, heroName: string): Quest[] => {
  switch (chapter) {
    case 'sunny-meadow':
      return buildSunnyMeadowQuests()
    case 'berry-grove':
      return buildBerryGroveQuests()
    case 'mushroom-glen':
      return buildMushroomGlenQuests()
    case 'whispering-woods':
      return buildWhisperingWoodsQuests()
    case 'crystal-caves':
      return buildCrystalCavesQuests()
    case 'river-bend':
      return buildRiverBendQuests()
    case 'stone-circle':
      return buildStoneCircleQuests()
    case 'fairy-glen':
      return buildFairyGlenQuests(heroName)
  }
}

export const QUEST_COUNTS: Record<ChapterId, number> = {
  'sunny-meadow': 5,
  'berry-grove': 5,
  'mushroom-glen': 5,
  'whispering-woods': 5,
  'crystal-caves': 5,
  'river-bend': 4,
  'stone-circle': 5,
  'fairy-glen': 4,
}

export const questIdsForChapter = (chapter: ChapterId): string[] => {
  const count = QUEST_COUNTS[chapter]
  const prefix: Record<ChapterId, string> = {
    'sunny-meadow': 'meadow',
    'berry-grove': 'berry',
    'mushroom-glen': 'mushroom',
    'whispering-woods': 'woods',
    'crystal-caves': 'cave',
    'river-bend': 'river',
    'stone-circle': 'stone',
    'fairy-glen': 'fairy',
  }
  return Array.from({ length: count }, (_, i) => `${prefix[chapter]}-q${i + 1}`)
}
