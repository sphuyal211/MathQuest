import { motion } from 'framer-motion'

type Props<T> = {
  options: T[]
  picked: T | null
  state: 'idle' | 'right' | 'wrong'
  onPick: (v: T) => void
  render?: (v: T) => string
  size?: 'md' | 'sm'
}

export function AnswerButtons<T extends string | number>({
  options,
  picked,
  state,
  onPick,
  render,
  size = 'md',
}: Props<T>) {
  const cls = size === 'sm' ? 'w-20 h-20 text-3xl' : 'w-24 h-24 text-4xl'
  return (
    <div className="flex gap-4 w-full justify-center flex-wrap">
      {options.map((n, i) => {
        const isPicked = picked === n
        const isRight = state === 'right' && isPicked
        const isWrong = state === 'wrong' && isPicked
        return (
          <motion.button
            key={`${i}-${String(n)}`}
            onClick={() => onPick(n)}
            whileTap={{ scale: 0.9 }}
            animate={isWrong ? { x: [-8, 8, -6, 6, 0] } : {}}
            disabled={state === 'right'}
            className={`${cls} font-display font-bold rounded-chunky shadow-soft transition-colors ${
              isRight
                ? 'bg-meadow-400 text-white'
                : isWrong
                  ? 'bg-berry-300 text-white'
                  : 'bg-white text-meadow-900 hover:bg-sun-100 active:bg-sun-200'
            }`}
          >
            {render ? render(n) : n}
          </motion.button>
        )
      })}
    </div>
  )
}
