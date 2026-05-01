import { useGame } from './store/game'
import { WelcomeScreen } from './components/WelcomeScreen'
import { MapView } from './components/MapView'
import { QuestView } from './components/QuestView'
import { RewardScreen } from './components/RewardScreen'

export default function App() {
  const scene = useGame((s) => s.scene)
  const hasOnboarded = useGame((s) => s.hasOnboarded)

  if (!hasOnboarded || scene.name === 'welcome') return <WelcomeScreen />
  if (scene.name === 'quest') return <QuestView />
  if (scene.name === 'reward') return <RewardScreen />
  return <MapView />
}
