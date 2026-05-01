import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

const baseSvg = (size, withPadding) => {
  const pad = withPadding ? size * 0.18 : 0
  const inner = size - pad * 2
  const fontSize = inner * 0.42
  const emojiY = pad + inner * 0.66
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#9bd967"/>
      <stop offset="1" stop-color="#488a18"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#fff5cc" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#fff5cc" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${withPadding ? 0 : size * 0.18}" fill="url(#bg)"/>
  <circle cx="${size / 2}" cy="${size * 0.42}" r="${size * 0.32}" fill="url(#glow)"/>
  <text x="50%" y="${emojiY / size * 100}%" text-anchor="middle"
    font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif"
    font-size="${fontSize}" font-weight="700">🌳</text>
  <text x="50%" y="${(emojiY + fontSize * 0.55) / size * 100}%" text-anchor="middle"
    font-family="system-ui,sans-serif" font-size="${fontSize * 0.34}" font-weight="800" fill="#fff" letter-spacing="-1">MQ</text>
</svg>`
}

const renderPng = async (size, outName, padded = false) => {
  const svg = baseSvg(size, padded)
  const buf = await sharp(Buffer.from(svg)).png().toBuffer()
  await writeFile(join(PUBLIC, outName), buf)
  console.log(`✓ ${outName} (${size}x${size})`)
}

await renderPng(192, 'icon-192.png')
await renderPng(512, 'icon-512.png')
await renderPng(512, 'icon-512-maskable.png', true)
await renderPng(180, 'apple-touch-icon.png')
console.log('All icons generated.')
