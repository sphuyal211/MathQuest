const pickVoice = (): SpeechSynthesisVoice | null => {
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null
  return (
    voices.find((v) => v.name === 'Google US English') ||      // Chrome desktop — neural quality
    voices.find((v) => v.name === 'Samantha') ||               // macOS / iOS — Apple quality
    voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-US' && !v.localService) || // prefer cloud/neural over built-in
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  )
}

export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 1.0
  utt.pitch = 1.0
  utt.lang = 'en-US'
  const voice = pickVoice()
  if (voice) utt.voice = voice
  speechSynthesis.speak(utt)
}

export const cancelSpeech = () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}
