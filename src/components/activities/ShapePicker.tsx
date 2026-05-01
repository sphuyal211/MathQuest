import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ShapePickerProblem } from '../../types/problem'
import { sounds } from '../../hooks/useSound'
import { Feedback } from './Feedback'

type Props = {
  problem: ShapePickerProblem
  heroName: string
  onCorrect: () => void
}

const ShapeSvg = ({ shape, size = 96 }: { shape: string; size?: number }) => {
  const fill = '#ffc11f'
  const stroke = '#7b2eff'
  switch (shape) {
    case 'circle':
      return <svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill={fill} stroke={stroke} strokeWidth="6" /></svg>
    case 'square':
      return <svg width={size} height={size} viewBox="0 0 100 100"><rect x="14" y="14" width="72" height="72" rx="8" fill={fill} stroke={stroke} strokeWidth="6" /></svg>
    case 'triangle':
      return <svg width={size} height={size} viewBox="0 0 100 100"><polygon points="50,12 90,86 10,86" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" /></svg>
    case 'rectangle':
      return <svg width={size} height={size} viewBox="0 0 100 100"><rect x="8" y="28" width="84" height="44" rx="6" fill={fill} stroke={stroke} strokeWidth="6" /></svg>
    case 'hexagon':
      return <svg width={size} height={size} viewBox="0 0 100 100"><polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" /></svg>
    case 'oval':
      return <svg width={size} height={size} viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="42" ry="28" fill={fill} stroke={stroke} strokeWidth="6" /></svg>
    case 'star':
      return <svg width={size} height={size} viewBox="0 0 100 100"><polygon points="50,8 61,38 93,38 67,57 77,88 50,69 23,88 33,57 7,38 39,38" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" /></svg>
    case 'heart':
      return <svg width={size} height={size} viewBox="0 0 100 100"><path d="M50 86 C 24 64, 8 48, 8 32 C 8 18, 22 10, 32 18 C 40 24, 50 36, 50 36 C 50 36, 60 24, 68 18 C 78 10, 92 18, 92 32 C 92 48, 76 64, 50 86 Z" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" /></svg>
    default:
      return null
  }
}

const FractionSvg = ({ value, size = 96 }: { value: string; size?: number }) => {
  const [partsStr, shadedStr] = value.split('-')
  const parts = parseInt(partsStr, 10)
  const shaded = parseInt(shadedStr, 10)
  const filledColor = '#ff5a8b'
  const emptyColor = '#ffe98a'
  const stroke = '#7b2eff'
  const r = 42
  if (parts === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill={emptyColor} stroke={stroke} strokeWidth="4" />
        {shaded >= 1 && <path d={`M50 50 L 50 ${50 - r} A ${r} ${r} 0 0 1 50 ${50 + r} Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
        {shaded >= 2 && <path d={`M50 50 L 50 ${50 + r} A ${r} ${r} 0 0 1 50 ${50 - r} Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
        <line x1="50" y1={50 - r} x2="50" y2={50 + r} stroke={stroke} strokeWidth="4" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill={emptyColor} stroke={stroke} strokeWidth="4" />
      {shaded >= 1 && <path d={`M50 50 L 50 ${50 - r} A ${r} ${r} 0 0 1 ${50 + r} 50 Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
      {shaded >= 2 && <path d={`M50 50 L ${50 + r} 50 A ${r} ${r} 0 0 1 50 ${50 + r} Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
      {shaded >= 3 && <path d={`M50 50 L 50 ${50 + r} A ${r} ${r} 0 0 1 ${50 - r} 50 Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
      {shaded >= 4 && <path d={`M50 50 L ${50 - r} 50 A ${r} ${r} 0 0 1 50 ${50 - r} Z`} fill={filledColor} stroke={stroke} strokeWidth="4" />}
      <line x1={50 - r} y1="50" x2={50 + r} y2="50" stroke={stroke} strokeWidth="4" />
      <line x1="50" y1={50 - r} x2="50" y2={50 + r} stroke={stroke} strokeWidth="4" />
    </svg>
  )
}

export function ShapePicker({ problem, heroName, onCorrect }: Props) {
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [pickedIdx, setPickedIdx] = useState<number | null>(null)

  const tap = (idx: number, value: string) => {
    if (state === 'right') return
    setPickedIdx(idx)
    if (value === problem.target) {
      sounds.correct()
      setState('right')
      setTimeout(onCorrect, 1100)
    } else {
      sounds.wrong()
      setState('wrong')
      setTimeout(() => {
        setState('idle')
        setPickedIdx(null)
      }, 1400)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 flex flex-col items-center">
      <div className="bg-white/95 rounded-chunky px-6 py-4 shadow-soft mb-4">
        <p className="text-2xl font-display font-bold text-meadow-900 text-center">{problem.prompt}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {problem.options.map((value, idx) => {
          const isPicked = pickedIdx === idx
          const isRight = state === 'right' && isPicked
          const isWrong = state === 'wrong' && isPicked
          return (
            <motion.button
              key={`${idx}-${value}`}
              onClick={() => tap(idx, value as string)}
              whileTap={{ scale: 0.92 }}
              animate={isWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
              className={`bg-white rounded-chunky shadow-soft p-3 aspect-square flex items-center justify-center transition-all ${
                isRight ? 'ring-4 ring-meadow-400' : isWrong ? 'ring-4 ring-berry-400' : ''
              }`}
            >
              {problem.mode === 'identify' ? (
                <ShapeSvg shape={value as string} />
              ) : (
                <FractionSvg value={value as string} />
              )}
            </motion.button>
          )
        })}
      </div>

      <Feedback state={state} heroName={heroName} />
    </div>
  )
}
