// 设置页视觉预览：构造一个贴近宿主结构的设置弹窗，注入 lib/client.js 里的 CSS 截图。
// 用法：node tools/preview-settings.mjs [outPrefix] [--verify] [--dump]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire('E:/project/tools/spinecheck/')
const { chromium } = require('playwright-core')

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CLIENT = path.join(ROOT, 'lib/client.js')
const OUT = path.join(ROOT, 'preview')
const prefix = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'settings'

const src = fs.readFileSync(CLIENT, 'utf8')
const start = src.indexOf('const CSS = `') + 'const CSS = `'.length
const end = src.indexOf('`\n\n    function BrandMark')
let css = src.slice(start, end)
const consts = {}
for (const m of src.matchAll(/^ {4}const ([A-Z_]+) = '((?:[^'\\]|\\.)*)'/gm)) consts[m[1]] = m[2].replace(/\\'/g, "'")
css = css.replace(/\$\{([A-Z_]+)\}/g, (w, n) => consts[n] ?? '')

// —— 宿主默认组件外观的近似（DSH 原生设置页：圆角卡片、原生按钮/输入/下拉/开关）——
const HOST = `
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#05060f;font-family:'Segoe UI','Microsoft YaHei',sans-serif}
body{display:grid;place-items:center;padding:24px}
:root{
  --dsw-static-neutral-bluish-00:#fff;--dsw-static-neutral-bluish-50:#f9fafb;--dsw-static-neutral-bluish-300:#cfd3d6;--dsw-static-neutral-bluish-400:#adb2b8;--dsw-static-neutral-bluish-600:#81858c;--dsw-static-neutral-bluish-700:#61666b;--dsw-static-neutral-bluish-1000:#0f1115;
  --dsw-alias-label-primary:var(--dsw-static-neutral-bluish-1000);--dsw-alias-label-secondary:var(--dsw-static-neutral-bluish-700);--dsw-alias-label-tertiary:var(--dsw-static-neutral-bluish-600);--dsw-alias-label-caption:var(--dsw-static-neutral-bluish-400);
  --dsw-alias-border-l1:rgba(0,0,0,.1);--dsw-alias-border-l2:rgba(0,0,0,.16);--dsw-alias-border-l3:rgba(0,0,0,.24);
  --dsw-alias-bg-layer-1:#ffffff;--dsw-alias-bg-layer-2:#f4f4fa;--dsw-alias-brand-primary:#7e0ee4;
  --dsw-radius-xl:14px;
}
body[data-ds-dark-theme]{
  --dsw-alias-label-primary:var(--dsw-static-neutral-bluish-50);--dsw-alias-label-secondary:var(--dsw-static-neutral-bluish-300);--dsw-alias-label-tertiary:var(--dsw-static-neutral-bluish-400);--dsw-alias-label-caption:var(--dsw-static-neutral-bluish-600);
  --dsw-alias-border-l1:rgba(255,255,255,.1);--dsw-alias-border-l2:rgba(255,255,255,.16);--dsw-alias-border-l3:rgba(255,255,255,.24);
  --dsw-alias-bg-layer-1:#171827;--dsw-alias-bg-layer-2:#1f2033;--dsw-alias-brand-primary:#b06cff;
}
[data-shortcut-modal='settings']{
  width:880px;height:720px;display:grid;grid-template-columns:206px minmax(0,1fr);grid-template-rows:40px minmax(0,1fr);
  grid-template-areas:'head head' 'nav opt';font-size:13px;color:var(--dsw-alias-label-primary);
}
[data-shortcut-modal='settings']>._header_x{grid-area:head;display:flex;align-items:center;justify-content:space-between;padding:0 10px 0 16px}
[data-shortcut-modal='settings']>nav{grid-area:nav;overflow:auto}
[data-shortcut-modal='settings']>._options_x{grid-area:opt;overflow:auto;padding:18px 22px 28px}
._navTitle_x{font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary)}
._actions_x{display:flex;gap:8px;align-items:center}
._navCell_x{padding:7px 10px;margin:2px 6px;font-size:12.5px;cursor:pointer;border-radius:var(--dsw-radius-md,12px);color:var(--dsw-alias-label-secondary)}
._navCell_x._active_x{font-weight:600;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
h1{font-size:18px;margin:0 0 6px;color:var(--dsw-alias-label-primary)}
h2{font-size:13px;margin:22px 0 10px;color:var(--dsw-alias-label-primary)}
h3{font-size:13px;margin:14px 0 6px;color:var(--dsw-alias-label-primary)}
p,._hint_x{margin:0 0 12px;font-size:12px;line-height:1.7;color:var(--dsw-alias-label-tertiary)}
._cards_x{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px}
._card_x{background:var(--dsw-alias-card-fill);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:14px 16px}
._cardHead_x{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
._cardTitle_x{font-weight:600;font-size:14px;color:var(--dsw-alias-label-primary)}
._tag_x,._chip_x,._badge_x{font-size:10.5px;font-family:Consolas,monospace;padding:1px 6px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}
._cardDescription_x{font-size:12px;line-height:1.7;margin:0 0 10px;color:var(--dsw-alias-label-secondary)}
._cardFoot_x{display:flex;gap:8px;align-items:center}
._button_x{padding:5px 12px;font:inherit;font-size:12px;cursor:pointer;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-primary)}
._button_x:hover{background:var(--dsw-alias-bg-layer-1)}
._iconButton_x{width:26px;height:24px;padding:0;font:inherit;cursor:pointer;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
._stats_x{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
._statCard_x ._statValue_x{font-family:Consolas,monospace;font-size:24px;font-weight:700;margin:6px 0 8px;letter-spacing:.02em;color:var(--dsw-alias-label-primary)}
._group_x{margin-bottom:14px}
._row_x{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0}
._rowText_x{display:flex;flex-direction:column;gap:3px}
._rowTitle_x{font-size:13px;color:var(--dsw-alias-label-primary)}
._rowHint_x{font-size:11.5px;color:var(--dsw-alias-label-tertiary)}
select,input[type='text'],._stepper_x{min-width:180px;padding:6px 10px;font:inherit;font-size:12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-selector);color:var(--dsw-alias-label-primary)}
._stepper_x{display:flex;align-items:center;justify-content:space-between;min-width:120px}
._stepper_x button{border:0;background:transparent;font:inherit;cursor:pointer;padding:0 6px;color:var(--dsw-alias-label-primary)}
._switch_x{width:44px;height:24px;position:relative;cursor:pointer}
._swatchRow_x{display:flex;gap:8px}
._themeCube_x{width:44px;height:44px;padding:0;cursor:pointer;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-selector)}
._themeCube_x[aria-pressed='true']{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
._search_x{display:flex;align-items:center;gap:8px;padding:8px 10px;margin-bottom:12px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-selector)}
._search_x input{flex:1;min-width:0;padding:0;border:0;background:transparent;color:var(--dsw-alias-label-primary)}
._zoneSearch_x{background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;padding:6px 8px;margin-bottom:12px}
._recentRow_x{display:flex;gap:8px;margin-bottom:12px}
._recentTile_x{background:var(--dsw-alias-settings-card-fill,var(--dsw-alias-bg-layer-1));border:.5px solid var(--dsw-alias-settings-card-stroke,var(--dsw-alias-border-l4));border-radius:var(--dsw-radius-lg,16px);padding:10px 12px;display:flex;flex-direction:column;gap:4px;flex:1}
._tabSearchRow_x{display:flex;align-items:center;gap:8px}
._tabSearch_x{flex:1;min-width:0}
._searchField_x{position:relative;min-width:0}
._searchInput_x{width:100%;padding:9px 150px 9px 34px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px}
._aiGroup_x{position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:6px;font-size:12px;color:var(--dsw-alias-label-secondary);white-space:nowrap}
._aiSwitch_x{width:26px;height:14px;padding:0;position:relative}
._linkButton_x{font-size:12px;text-decoration:none;color:var(--dsw-alias-brand-primary)}
`

function page(theme) {
  return `<!doctype html><html lang="zh-CN" data-dsh-closure-skin data-dsh-closure-mood="normal" data-cl-font="mono" data-cl-cjk="dengxian" data-cl-scanlines="on">
<head><meta charset="utf-8"><style id="host">${HOST}</style><style id="skin">${css}</style></head>
<body ${theme === 'dark' ? 'data-ds-dark-theme' : ''}>
<div data-shortcut-modal="settings" class="_modal_x">
  <div class="_header_x"><div class="_navTitle_x">设置</div><div class="_actions_x"><button class="_button_x">重置</button><button class="_close_x">✕</button></div></div>
  <nav><div class="_navCell_x _active_x">通用</div><div class="_navCell_x">外观</div><div class="_navCell_x">Agent</div><div class="_navCell_x">插件</div><div class="_navCell_x">自动化</div><div class="_navCell_x">更多</div></nav>
  <div class="_options_x">
    <h1>Agent 预设</h1>
    <p class="_hint_x">选择 Agent 的工具和工作方式。日常任务用「标准模式」。</p>
    <h2>内置</h2>
    <div class="_cards_x">
      ${['标准模式|新任务默认|standard|处理代码、文件和资料，适合大多数任务。','PTC 模式|内置|ptc|包含标准模式的所有能力，更适合批量调用工具。','极简模式|内置|minimal|只使用终端和图片读取工具，适合测试与对比。','创造模式|内置|cordis|用对话定制 DSH：让 Agent 编写插件、添加新功能。'].map((s) => {
        const [title, tag, chip, desc] = s.split('|')
        return `<div class="_card_x"><div class="_cardHead_x"><span class="_cardTitle_x">${title}</span><span class="_tag_x">${tag}</span><code class="_chip_x">${chip}</code></div><div class="_cardDescription_x">${desc}</div><div class="_cardFoot_x"><button class="_button_x">模式说明</button><button class="_button_x">如何使用</button><button class="_iconButton_x">▣</button></div></div>`
      }).join('')}
    </div>
    <h2>充值余额</h2>
    <div class="_card_x"><div class="_cardHead_x"><span class="_cardTitle_x">充值余额</span><span class="_statValue_x" style="margin-left:auto">¥13.52</span></div><div class="_cardDescription_x" style="border-top:1px solid var(--dsw-alias-border-l2);padding-top:10px;display:flex;align-items:center;justify-content:space-between"><span>更多</span><span style="display:flex;gap:8px"><button class="_button_x">查询用量</button><button class="_button_x _primary_x">充值</button></span></div></div>
    <h2>用量</h2>
    <div class="_stats_x">
      ${[['今日费用','¥9.3654','调用 294 次 · 输入 1.1M · 缓存 93.6M'],['本月费用','¥18.59','调用 1074 次 · 输入 2.7M · 缓存 240M'],['累计费用','¥47.8077','自账本建立以来 · 调用 3641 次']].map(([k, v, d]) => `<div class="_card_x _statCard_x"><div class="_cardHead_x">${k}</div><div class="_statValue_x">${v}</div><div class="_cardDescription_x">${d}</div></div>`).join('')}
    </div>
    <h2>通用</h2>
    <div class="_group_x">
      <div class="_row_x"><div class="_rowText_x"><div class="_rowTitle_x">字体方案</div><div class="_rowHint_x">英文 Cascadia Mono；中文默认等线。</div></div><select><option>等宽（Cascadia Mono + 中文）</option><option>像素（Fusion Pixel）</option></select></div>
      <div class="_row_x"><div class="_rowText_x"><div class="_rowTitle_x">扫描线</div><div class="_rowHint_x">CRT 扫描线与暗角。</div></div><button class="_switch_x" role="switch" aria-checked="true"><span></span></button></div>
      <div class="_row_x"><div class="_rowText_x"><div class="_rowTitle_x">并发上限</div><div class="_rowHint_x">同时运行的子任务数量。</div></div><div class="_stepper_x"><button>−</button><span>4</span><button>＋</button></div></div>
      <div class="_row_x"><div class="_rowText_x"><div class="_rowTitle_x">主题</div><div class="_rowHint_x">皮肤随宿主明暗切换。</div></div><div class="_swatchRow_x"><button class="_themeCube_x" aria-pressed="true"></button><button class="_themeCube_x"></button><button class="_themeCube_x"></button></div></div>
      <div class="_row_x"><div class="_rowText_x"><div class="_rowTitle_x">文档</div><div class="_rowHint_x">查看完整配置说明。</div></div><a class="_linkButton_x" href="#">打开文档</a></div>
    </div>
    <div class="_search_x"><span>⌕</span><input type="text" placeholder="搜索插件"></div>
    <div class="_zoneSearch_x">
    <div class="_tabSearchRow_x">
      <div class="_tabSearch_x"><div class="_searchField_x">
        <input class="_searchInput_x" type="text" placeholder="搜索插件，例如：通知、终端、记忆…">
        <span class="_aiGroup_x">? AI 搜索 <button class="_aiSwitch_x" role="switch" aria-checked="false"><span></span></button></span>
      </div></div>
      <button class="_button_x">筛选</button>
    </div>
    </div>
    <h2>可露希尔主题</h2>
    <div class="clsk-page"><div class="clsk-card">
      <div class="clsk-row"><div class="clsk-text"><div class="clsk-title">字体方案</div><div class="clsk-desc">英文 Cascadia Mono；中文默认等线。</div></div><select class="clsk-select"><option>等宽（Cascadia Mono + 中文）</option><option>像素（Fusion Pixel）</option></select></div>
      <div class="clsk-row"><div class="clsk-text"><div class="clsk-title">扫描线</div><div class="clsk-desc">CRT 扫描线与暗角。</div></div><button class="clsk-switch is-on" aria-pressed="true"><span class="clsk-knob"></span></button></div>
    </div></div>
    <div class="_recentRow_x">
      <div class="_recentTile_x"><strong>dsh-roost</strong><span>把 QQ 机器人接入 DeepSeek Harness</span></div>
      <div class="_recentTile_x"><strong>@dsh-workspace</strong><span>DeepSeek Harness Web UI 的工作台层</span></div>
    </div>
    <h2>会话插件</h2>
    <div class="_cards_x">
      ${['智能体角色设定|persona|为当前智能体提供组合中定义的角色与行为说明。','工作区指令加载|agent-instructions|读取 AGENTS.md、CLAUDE.md 等文件。','时间感知|time-context|把当前时间与时区告诉模型。','Bash 命令工具|tool-bash|让 AI 执行 Bash 命令。'].map((s) => {
        const [title, chip, desc] = s.split('|')
        return `<div class="_card_x"><div class="_cardHead_x"><span class="_cardTitle_x">${title}</span><span class="_badge_x">已停用</span></div><div class="_cardDescription_x">${desc}</div><code class="_chip_x">${chip}</code></div>`
      }).join('')}
    </div>
  </div>
</div>
</body></html>`
}

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const pageObj = await browser.newPage({ viewport: { width: 980, height: 820 }, deviceScaleFactor: 1 })
fs.mkdirSync(OUT, { recursive: true })
for (const theme of ['dark', 'light']) {
  await pageObj.setContent(page(theme), { waitUntil: 'load' })
  await pageObj.waitForTimeout(200)
  const file = path.join(OUT, `${prefix}-${theme}.png`)
  await pageObj.screenshot({ path: file })
  console.log('wrote', file)
  await pageObj.evaluate(() => { const el = document.querySelector('._options_x'); el.scrollTop = el.scrollHeight })
  await pageObj.waitForTimeout(150)
  const file2 = path.join(OUT, `${prefix}-${theme}-scrolled.png`)
  await pageObj.screenshot({ path: file2 })
  console.log('wrote', file2)
  if (theme === 'dark') {
    await pageObj.evaluate(() => { const el = document.querySelector('._options_x'); el.scrollTop = 0 })
    await pageObj.waitForTimeout(120)
    await pageObj.locator('._cards_x').first().screenshot({ path: path.join(OUT, `${prefix}-zoom-cards.png`) })
    await pageObj.evaluate(() => { const el = document.querySelector('._options_x'); el.scrollTop = el.scrollHeight })
    await pageObj.waitForTimeout(120)
    await pageObj.locator('._group_x').screenshot({ path: path.join(OUT, `${prefix}-zoom-controls.png`) })
    await pageObj.locator('._switch_x').screenshot({ path: path.join(OUT, `${prefix}-zoom-switch.png`) })
    await pageObj.locator('.clsk-card').screenshot({ path: path.join(OUT, `${prefix}-zoom-clsk.png`) })
    await pageObj.locator('._primary_x').locator('xpath=ancestor::*[contains(@class,"_card_x")]').screenshot({ path: path.join(OUT, `${prefix}-zoom-primary.png`) })
    console.log('wrote zoom shots')
    if (process.argv.includes('--verify')) {
      const dark = await pageObj.evaluate(() => {
        const cs = (el) => getComputedStyle(el)
        const pick = (sel) => { const el = document.querySelector(sel); return el ? cs(el).backgroundColor : null }
        return { primaryDark: (() => { const el = document.querySelector('._primary_x'); return el ? { bgc: cs(el).backgroundColor, bgi: cs(el).backgroundImage.slice(0, 60) } : null })(), card: pick('._card_x'), button: pick('._cardFoot_x ._button_x'), select: pick('select'), search: pick('._search_x'), tag: (() => { const el = document.querySelector('._tag_x'); return el ? cs(el).color : null })(), ink: cs(document.querySelector('._options_x')).color }
      })
      console.log('__DARK__', JSON.stringify(dark))
    }
  }
}

if (process.argv.includes('--verify')) {
  const report = await pageObj.evaluate(() => {
    const cs = (el) => getComputedStyle(el)
    const borderW = (el) => Math.max(parseFloat(cs(el).borderTopWidth), parseFloat(cs(el).borderLeftWidth), parseFloat(cs(el).borderBottomWidth), parseFloat(cs(el).borderRightWidth))
    const all = [...document.querySelectorAll('*')]
    const borderedCards = all.filter((el) => /card/i.test(String(el.className)) && borderW(el) > 0)
    const nested = borderedCards.filter((el) => { let p = el.parentElement; while (p) { if (/card/i.test(String(p.className)) && borderW(p) > 0) return true; p = p.parentElement } return false })
    return {
      framedCards: borderedCards.length,
      nestedFrames: nested.map((el) => el.className),
      switchTrack: (() => { const el = document.querySelector('[role=switch]'); return el ? { border: borderW(el), shadow: cs(el).boxShadow, size: cs(el).width + 'x' + cs(el).height } : null })(),
      clskSwitch: (() => { const el = document.querySelector('.clsk-switch'); return el ? { border: borderW(el), shadow: cs(el).boxShadow } : null })(),
      cardRadius: (() => { const el = document.querySelector('._card_x'); return el ? cs(el).borderRadius : null })(),
      cornerShape: (() => { const el = document.querySelector('._card_x'); return el ? (cs(el).cornerShape || cs(el).getPropertyValue('corner-shape')) : null })(),
      buttonCorner: (() => { const el = document.querySelector('._cardFoot_x ._button_x'); return el ? (cs(el).borderRadius + ' / ' + (cs(el).cornerShape || 'n/a')) : null })(),
      buttonRadius: (() => { const el = document.querySelector('._button_x'); return el ? cs(el).borderRadius : null })(),
      tagRadius: (() => { const el = document.querySelector('._tag_x'); return el ? cs(el).borderRadius : null })(),
      marketSearch: (() => { const el = document.querySelector('._searchInput_x'); return el && cs(el).backgroundColor })(),
      zoneSearch: (() => { const el = document.querySelector('._zoneSearch_x'); return el && cs(el).backgroundColor })(),
      recentTile: (() => { const el = document.querySelector('._recentTile_x'); return el ? { radius: cs(el).borderRadius, shape: cs(el).cornerShape || 'n/a' } : null })(),
      primaryDiag: (() => {
        const el = document.querySelector('._primary_x'); if (!el) return null
        const sel = "html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] :is(button, a):is([class*='primary' i], [class*='recharge' i], [class*='danger' i])"
        return { cls: el.className, matched: el.matches(sel), bgc: getComputedStyle(el).backgroundColor, locked: getComputedStyle(el).backgroundImage.slice(0, 40) }
      })(),
      primaryBtn: (() => { const el = document.querySelector('._primary_x'); return el ? { bg: cs(el).backgroundImage.slice(0,90), color: cs(el).color, border: cs(el).borderTopColor } : null })(),
      navCellVerify: (() => { const el = document.querySelector('._navCell_x._active_x'); return el ? { radius: cs(el).borderRadius, shape: cs(el).cornerShape || 'n/a' } : null })(),
      colors: {
        card: (() => { const el = document.querySelector('._card_x'); return el && cs(el).backgroundColor })(),
        button: (() => { const el = document.querySelector('._optionBtn_x') || document.querySelector('._cardFoot_x ._button_x'); return el && cs(el).backgroundColor })(),
        select: (() => { const el = document.querySelector('select'); return el && cs(el).backgroundColor })(),
        search: (() => { const el = document.querySelector('._search_x'); return el && cs(el).backgroundColor })(),
      },
    }
  })
  console.log('__VERIFY__', JSON.stringify(report, null, 2))
}
await browser.close()
