let cachedVoice: SpeechSynthesisVoice | null | undefined = undefined

const resolveVoice = (): SpeechSynthesisVoice | null => {
  if (!('speechSynthesis' in window)) return null
  const voices = speechSynthesis.getVoices()
  return (
    voices.find((v) => v.name === 'Samantha') ||
    voices.find((v) => v.name === 'Google US English') ||
    voices.find((v) => v.lang === 'en-US' && v.localService) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  )
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynthesis.addEventListener('voiceschanged', () => {
    cachedVoice = undefined
  })
}

export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.88
  utt.pitch = 1.1
  utt.lang = 'en-US'
  if (cachedVoice === undefined) cachedVoice = resolveVoice()
  if (cachedVoice) utt.voice = cachedVoice
  speechSynthesis.speak(utt)
}

export const cancelSpeech = () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}
