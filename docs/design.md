---
name: Closure Terminal UI
description: Dark glassmorphic retro-futuristic terminal UI with CRT accents, chamfered corners, and pixel-tech details.
colors:
  primary: "#38bdf8"
  primary-hover: "#7dd3fc"
  secondary: "#8b5cf6"
  accent-cyan: "#22d3ee"
  accent-magenta: "#d946ef"
  surface-dark: "#0d1021"
  surface-scrim-dark: "rgba(18, 22, 46, 0.62)"
  surface-scrim-light: "rgba(255, 255, 255, 0.68)"
  text-dark: "#e2e8f0"
  text-muted-dark: "#94a3b8"
  text-light: "#18181b"
  border-subtle: "rgba(148, 163, 184, 0.22)"
typography:
  display:
    fontFamily: "Orbitron, 'JetBrains Mono', monospace"
    fontWeight: 700
    letterSpacing: "0.08em"
  body:
    fontFamily: "'JetBrains Mono', 'Cascadia Mono', 'PingFang SC', monospace"
    fontSize: "13px"
    lineHeight: 1.55
  pixel:
    fontFamily: "'Fusion Pixel 12px', 'Ark Pixel 12px', monospace"
    fontSize: "12px"
    lineHeight: 1.4
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "6px"
motion:
  fast: "120ms"
  normal: "180ms"
components:
  surface-panel:
    backgroundColor: "{colors.surface-scrim-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.lg}"
  action-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-dark}"
    rounded: "{rounded.sm}"
---

# DESIGN.md — 终端机能风与玻璃拟态规范

## Overview

这套界面走的是**克制的复古未来主义机能路线**，把早期终端/CRT 扫描线的锐利感、暗色半透明玻璃层，以及像素图标与角色点缀揉在一起。整体氛围偏冷静、高信息密度，但通过清晰的分区、克制的高亮色和硬朗的边角保持秩序，不靠花哨的大面积发光或重阴影抢戏。

仿写这类页面时，核心抓手只有三点：**深色薄纱底 + 细弱描边分层**、**小尺寸切角（bevel）替代大圆角**，以及**只在重点位置亮起的高对比状态色**。

## Colors

页面采用**双主题适配**，但视觉重心落在暗色终端模式；浅色模式保持清爽通透的浅色薄纱与深色文字，确保高可读性：

* **主强调色（`#38bdf8` / `#22d3ee`）**：用于当前选中项、激活标签、关键状态指示与主操作按钮，作为视线锚点。
* **次级/机能点缀色（`#8b5cf6` / `#d946ef`）**：用于开关激活态、局部高亮或辅助标签，与主青蓝形成冷暖/明暗层次。
* **面板与遮罩层（暗色半透深蓝紫 `rgba(18, 22, 46, 0.62)` / 亮色半透白 `rgba(255, 255, 255, 0.68)`）**：让底层场景若隐若现，避免纯黑死板或完全透明导致文字糊成一团。
* **边框线（低透明度发丝线）**：用极细、低对比度的边框区分区域与卡片，而不是靠粗黑线或厚重阴影硬切。

## Typography

* **标题与字标（`Orbitron` / 宽体等宽字）**：适合顶部栏、品牌/模块标题，带微弱字距拉开辨识度，突出终端与机能感。
* **正文与代码/参数（`JetBrains Mono` / `Cascadia Mono` + 中文字体）**：信息面板、列表项、日志与数值统一用等宽或对齐友好的字体，数字与路径对齐更整齐，阅读密度高也不易串行。
* **像素字（`Fusion Pixel 12px` / `Ark Pixel 12px`）**：仅用于像素风控件、局部标签或小型徽章，不宜大段长文通篇使用，以免降低长时间阅读舒适度。

## Layout & Spacing

* **多栏工作台结构**：左侧导航/树形列表负责定位与切换，主内容区承载正文、配置或数据面板，右侧或边角可放置轻量状态卡或装饰角色，各区边界清晰、互不挤压。
* **紧凑但不拥挤的节奏**：列表项与卡片内部留出适度内边距，标题与段落之间用间距和分组标题拉开层级，长内容按模块分节，避免整页全是同等字号和同等权重的文字块。
* **视口内克制留白**：内容区宽度与行长控制在易读范围内，表格或代码块超出时局部滚动，不破坏整体框架。

## Elevation & Depth

* **层级靠“半透明底色 + 细边框”建立，而非重阴影**：背景、卡片、浮层之间通过明度微差和半透明叠加拉开层次。
* **扫描线与微光效点到为止**：CRT 横向扫描线适合用在顶栏、选中态或局部氛围层，控制在不透明度低、纹理细的范围内，绝不能盖住正文导致发花。

## Shapes

* **小圆角 + 切角（`bevel`）**：按钮、输入框、标签、卡片与选中框统一使用小半径（`2px–6px`）或直角/斜切角（`corner-shape: bevel`），体现硬朗的设备与终端质感。
* **拒绝大圆角胶囊堆砌**：除明确需要的圆形头像/指示灯外，常规容器与按钮尽量避免 `16px+` 或 `9999px` 全圆角，保持统一几何语言。

## Components

* **导航与选中态**：未选中项保持低调克制；选中项通过高亮底色、细边框或左侧/顶部指示条明确标出，一眼能看清当前所在位置。
* **按钮**：主按钮突出且克制，每屏只保留少量核心主操作；次级按钮和幽灵按钮保持低干扰，悬停时给微弱高亮反馈。
* **开关与滑块**：方正或微切角轨道搭配清晰滑块，开/关状态通过颜色变化与滑块位移给出明确即时反馈。
* **卡片与面板**：背景半透明、边框克制，内部信息按“标题/状态 → 核心内容 → 辅助说明”排列，避免卡片里面再套多层重边框。

## Do's and Don'ts

* **Do**：保持全站色彩克制，主强调色只用在真正需要突出或交互的位置。
* **Do**：保证正文与背景之间有足够对比度，半透明背景必须兼顾可读性。
* **Do**：同类控件保持一致的圆角/切角与边框风格。
* **Don't**：不要把扫描线、发光特效或像素字体铺满所有区域，视觉重点会瞬间丢失。
* **Don't**：不要随意叠加多层投影和嵌套重边框，会让页面显得脏、乱、挤。
* **Don't**：不要在同一个界面里混用互不搭调的圆角风格与高饱和彩虹色。