export type ChapterId =
  | 'sunny-meadow'
  | 'berry-grove'
  | 'mushroom-glen'
  | 'whispering-woods'
  | 'crystal-caves'
  | 'river-bend'
  | 'stone-circle'
  | 'fairy-glen'

export type Chapter = {
  id: ChapterId
  index: number
  title: string
  skill: string
  companion: string
  companionEmoji: string
  bgClass: string
  available: boolean
  mapPos: { x: number; y: number }
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'sunny-meadow',
    index: 1,
    title: 'Sunny Meadow',
    skill: 'Counting & numbers to 20',
    companion: 'Bunny',
    companionEmoji: '🐰',
    bgClass: 'from-meadow-200 to-sun-200',
    available: true,
    mapPos: { x: 14, y: 72 },
  },
  {
    id: 'berry-grove',
    index: 2,
    title: 'Berry Grove',
    skill: 'Addition within 10',
    companion: 'Fox',
    companionEmoji: '🦊',
    bgClass: 'from-berry-300 to-sun-200',
    available: false,
    mapPos: { x: 30, y: 56 },
  },
  {
    id: 'mushroom-glen',
    index: 3,
    title: 'Mushroom Glen',
    skill: 'Subtraction within 10',
    companion: 'Hedgehog',
    companionEmoji: '🦔',
    bgClass: 'from-meadow-300 to-meadow-500',
    available: false,
    mapPos: { x: 48, y: 70 },
  },
  {
    id: 'whispering-woods',
    index: 4,
    title: 'Whispering Woods',
    skill: 'Add & subtract within 20',
    companion: 'Owl',
    companionEmoji: '🦉',
    bgClass: 'from-meadow-500 to-meadow-700',
    available: false,
    mapPos: { x: 62, y: 50 },
  },
  {
    id: 'crystal-caves',
    index: 5,
    title: 'Crystal Caves',
    skill: 'Place value (tens & ones)',
    companion: 'Firefly',
    companionEmoji: '✨',
    bgClass: 'from-magic-400 to-magic-600',
    available: false,
    mapPos: { x: 76, y: 64 },
  },
  {
    id: 'river-bend',
    index: 6,
    title: 'River Bend',
    skill: 'Measuring & comparing length',
    companion: 'Otter',
    companionEmoji: '🦦',
    bgClass: 'from-sky_-300 to-sky_-400',
    available: false,
    mapPos: { x: 86, y: 42 },
  },
  {
    id: 'stone-circle',
    index: 7,
    title: 'Stone Circle',
    skill: 'Shapes, halves & quarters',
    companion: 'Deer',
    companionEmoji: '🦌',
    bgClass: 'from-meadow-400 to-sun-300',
    available: false,
    mapPos: { x: 70, y: 26 },
  },
  {
    id: 'fairy-glen',
    index: 8,
    title: 'Fairy Glen',
    skill: 'Word problems & mastery',
    companion: 'Fairy',
    companionEmoji: '🧚',
    bgClass: 'from-berry-300 to-magic-400',
    available: false,
    mapPos: { x: 50, y: 14 },
  },
]
