import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  state: 'idle' | 'right' | 'wrong'
  heroName: string
  hint?: string
}

export function Feedback({ state, heroName, hint }: Props) {
  return (
    <AnimatePresence>
      {state === 'right' && (
        <motion.div
          key="right"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 text-2xl font-display font-bold text-meadow-700 text-center"
        >
          ✨ Yes! Great job, {heroName}!
        </motion.div>
      )}
      {state === 'wrong' && (
        <motion.div
          key="wrong"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 text-xl font-display text-berry-500 text-center"
        >
          Hmm, let's try again. {hint ?? 'Look closely!'}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
