// 把 client 模板里的小素材占位符替换成 data URI，生成 lib/client.js。
// 素材来源：assets-src/raw/ac_s_closur（游戏内 UI 组件库），过大的图在 src/ 里预先裁切缩放。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 本文件位于 <repo>/plugin/dsh-closure-skin/tools/，向上三级即工作区根目录；
// 不再写死盘符，换机器/换目录都能构建。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const TEMPLATE = path.join(ROOT, 'plugin/dsh-closure-skin/src/client.template.js')
const SRC = path.join(ROOT, 'plugin/dsh-closure-skin/src')
const OUT = path.join(ROOT, 'plugin/dsh-closure-skin/lib/client.js')
const RAW = path.join(ROOT, 'assets-src/raw/ac_s_closur')

// 占位符 → 素材文件名；先在 src/ 找（预处理过的小图），再回退到 raw 素材库
const ASSETS = {
  __ASSET_LOGO__: 'logo-glow.png',
  __ICON_PLUGIN__: 'plugin-cat.png',
  __ICON_BOT__: 'bot.png',
  __ICON_MORE__: 'more.png',
  __ICON_SPINNER__: 'spinner.png',
  __ICON_FOLDER_CLOSED__: 'folder-closed.png',
  __ICON_FOLDER_OPEN__: 'folder-open.png',
  __ICON_PIN__: 'pin-arrow.png',
  __ICON_ARCHIVE__: 'archive.png',
  __ICON_RUNNING_TAIL__: 'running-tail.png',
  __ICON_WIRELINE__: 'wireline-mask.png',
  __ICON_PLUS__: 'plus-pixel.png',
  __ICON_RANK_A__: 'rank-a.png',
  __ICON_RANK_S__: 'rank-s.png',
  __ICON_RANK_SS__: 'rank-ss.png',
  __ICON_RANK_SSS__: 'rank-sss.png',
  __ICON_PERM_LOCK__: 'perm-lock.png',
  __ICON_PERM_UNLOCK__: 'perm-unlock.png',
  __ICON_PERM_FULL__: 'perm-full.png',
  __ICON_REFRESH_REPLAY__: 'refresh-replay.png',
  __ICON_GUIDE_HERO__: 'guide-hero.png',
  __ICON_PLUGIN_GLOW__: 'plugin-glow.png',
  __ICON_BOT_GLOW__: 'bot-glow.png',
  __ICON_MORE_GLOW__: 'more-glow.png',
  __ICON_PIN_GLOW__: 'pin-glow.png',
  __ICON_ARCHIVE_GLOW__: 'archive-glow.png',
  __ICON_REFRESH_GLOW__: 'refresh-glow.png',
  __ICON_REFRESH_LIGHT_GLOW__: 'refresh-light-glow.png',
  __ICON_FOLDER_CLOSED_GLOW__: 'folder-closed-glow.png',
  __ICON_FOLDER_CLOSED_LIGHT_GLOW__: 'folder-closed-light-glow.png',
  __ICON_FOLDER_OPEN_GLOW__: 'folder-open-glow.png',
  __ICON_FOLDER_OPEN_LIGHT_GLOW__: 'folder-open-light-glow.png',
  __ICON_PERM_LOCK_LIGHT__: 'perm-lock-light.png',
  __ICON_PERM_UNLOCK_LIGHT__: 'perm-unlock-light.png',
  __ICON_PERM_FULL_LIGHT__: 'perm-full-light.png',
}

function findIn(dir, name) {
  const stack = [dir]
  while (stack.length) {
    const cur = stack.pop()
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const full = path.join(cur, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else if (entry.name === name) return full
    }
  }
  return null
}

let src = fs.readFileSync(TEMPLATE, 'utf8')

// 产物里压缩 CSS 模板：去掉注释与行首尾空白/空行（模板本身保持可读）。
// 只动 CSS 字符串，不碰 JS。
{
  const marker = 'const CSS = `'
  const from = src.indexOf(marker)
  if (from >= 0) {
    const start = from + marker.length
    const end = src.indexOf('`', start)
    let css = src.slice(start, end)
    css = css.replace(/\/\*[\s\S]*?\*\//g, '')
    css = css.split('\n').map((line) => line.trim()).filter(Boolean).join('\n')
    src = src.slice(0, start) + css + src.slice(end)
  }
}

const report = []
for (const [token, file] of Object.entries(ASSETS)) {
  const full = findIn(SRC, file) || findIn(RAW, file)
  if (!full) throw new Error('asset not found: ' + file)
  const b64 = fs.readFileSync(full).toString('base64')
  const uri = `data:image/png;base64,${b64}`
  src = src.split(token).join(uri)
  report.push({ token, file, path: path.relative(ROOT, full), bytes: fs.statSync(full).size, uriBytes: uri.length })
}

// 生成物里不留任何绝对路径
if (/[A-Z]:[\\/]/.test(src)) throw new Error('generated client.js contains absolute paths')

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, src)
console.log(JSON.stringify({ out: OUT, bytes: fs.statSync(OUT).size, assets: report }, null, 2))
