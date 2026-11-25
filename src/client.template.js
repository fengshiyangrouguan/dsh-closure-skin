// dsh-closure-skin — 浏览器半边（模板：由 tools/build-client.mjs 注入素材 data URI 后生成 lib/client.js）
//
// 风格参照：
//   · 窗框 = window_main_frame：单一蓝紫窗框 + 实心蓝色标题栏 + 淡色内容区
//   · 深色底 = upgrade_bottom_glow：白 → 蓝紫的柔和竖向渐变
//   · 浅色底 = window_main_bg：浅灰 → 品红的透视地面
// 纪律：只做表现层；规则挂 html[data-dsh-closure-skin]；主题直接用宿主 body[data-ds-dark-theme]；
//      背景画在 body 级 .cl-scene 上（z 0），#root 提到 z 1；装饰不拦点击。
window.__ModuleLoader__.load({
  id: 'dsh-closure-skin',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const LOGO = '__ASSET_LOGO__'
    // 顶边居中的是菜单名；左侧品牌位才是正式名字
    const CAPTION_BRAND = 'CLSR-TOKEN-BURNER'
    const BRAND_NAME = 'CLOSURE HARNESS'
    // 像素图标：build-client.mjs 会把占位符替换成 data URI，CSS 里再插值
    const ICON_PLUGIN = '__ICON_PLUGIN__'
    const ICON_BOT = '__ICON_BOT__'
    const ICON_MORE = '__ICON_MORE__'
    const ICON_SPINNER = '__ICON_SPINNER__'
    const ICON_FOLDER_CLOSED = '__ICON_FOLDER_CLOSED__'
    const ICON_FOLDER_OPEN = '__ICON_FOLDER_OPEN__'
    const ICON_PIN = '__ICON_PIN__'
    const ICON_ARCHIVE = '__ICON_ARCHIVE__'
    const ICON_RUNNING_TAIL = '__ICON_RUNNING_TAIL__'
    const ICON_WIRELINE = '__ICON_WIRELINE__'
    const ICON_PLUS = '__ICON_PLUS__'
    const ICON_RANK_A = '__ICON_RANK_A__'
    const ICON_RANK_S = '__ICON_RANK_S__'
    const ICON_RANK_SS = '__ICON_RANK_SS__'
    const ICON_RANK_SSS = '__ICON_RANK_SSS__'
    const ICON_PERM_LOCK = '__ICON_PERM_LOCK__'
    const ICON_PERM_UNLOCK = '__ICON_PERM_UNLOCK__'
    const ICON_PERM_FULL = '__ICON_PERM_FULL__'
    const ICON_REFRESH_REPLAY = '__ICON_REFRESH_REPLAY__'
    const ICON_GUIDE_HERO = '__ICON_GUIDE_HERO__'
    const ICON_PLUGIN_GLOW = '__ICON_PLUGIN_GLOW__'
    const ICON_BOT_GLOW = '__ICON_BOT_GLOW__'
    const ICON_MORE_GLOW = '__ICON_MORE_GLOW__'
    const ICON_PIN_GLOW = '__ICON_PIN_GLOW__'
    const ICON_ARCHIVE_GLOW = '__ICON_ARCHIVE_GLOW__'
    const ICON_REFRESH_GLOW = '__ICON_REFRESH_GLOW__'
    const ICON_REFRESH_LIGHT_GLOW = '__ICON_REFRESH_LIGHT_GLOW__'
    const ICON_FOLDER_CLOSED_GLOW = '__ICON_FOLDER_CLOSED_GLOW__'
    const ICON_FOLDER_CLOSED_LIGHT_GLOW = '__ICON_FOLDER_CLOSED_LIGHT_GLOW__'
    const ICON_FOLDER_OPEN_GLOW = '__ICON_FOLDER_OPEN_GLOW__'
    const ICON_FOLDER_OPEN_LIGHT_GLOW = '__ICON_FOLDER_OPEN_LIGHT_GLOW__'
    const ICON_PERM_LOCK_LIGHT = '__ICON_PERM_LOCK_LIGHT__'
    const ICON_PERM_UNLOCK_LIGHT = '__ICON_PERM_UNLOCK_LIGHT__'
    const ICON_PERM_FULL_LIGHT = '__ICON_PERM_FULL_LIGHT__'

    const CSS = `
/* Fusion Pixel 12px（缝合像素字体）由宿主侧 /dsh-closure-skin/fonts 路由提供。
   比例版给 UI，等宽版给代码/终端；字体缺失时回退到原等宽栈。 */
@font-face {
  font-family: 'CLSR Pixel';
  src: url('/dsh-closure-skin/fonts/proportional.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'CLSR Pixel Mono';
  src: url('/dsh-closure-skin/fonts/monospaced.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* Orbitron Black：只给顶栏 caption 字标，正文不参与 */
@font-face {
  font-family: 'CLSR Display';
  src: url('/dsh-closure-skin/fonts/orbitron-900.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

html[data-dsh-closure-skin] {
  --cl-blue: #2b30b8;
  --cl-blue-deep: #1d2180;
  --cl-violet: #7e0ee4;
  --cl-mist: #5b6fbf;
  --cl-magenta: #c14169;
  --cl-pink: #ff3ea5;
  --cl-red: #ff2e63;
  --cl-gold: #ffba00;
  --cl-cyan: #35e0d0;
  --cl-ink: #07070d;
  --cl-accent: var(--cl-violet);
  --cl-font: 'Cascadia Mono', 'DengXian', '等线', 'Microsoft YaHei UI', 'Microsoft YaHei', ui-monospace, monospace;
  --cl-font-mono: 'Cascadia Mono', 'Consolas', 'DengXian', '等线', 'Microsoft YaHei UI', 'Microsoft YaHei', ui-monospace, monospace;
  --cl-icon: #7e0ee4;
  --cl-icon-glow: rgba(126, 14, 228, 0.55);
  --cl-spin: #ffce2c;
  --cl-spin-glow: rgba(255, 206, 44, 0.5);
  --cl-px-line: rgba(136, 112, 176, 0.55);
  --cl-px-outer: #06070f;
  --cl-px-fill: rgba(18, 20, 42, 0.92);
  --cl-px-fill-2: rgba(11, 13, 28, 0.96);
  --cl-px-shadow: rgba(0, 0, 0, 0.38);
  --cl-composer-fill: #1b1c2a;
  --cl-composer-fill-2: #14151f;
  --cl-composer-add-glow: rgba(126, 14, 228, 0.5);
  --cl-tool-line: rgba(214, 178, 64, 0.5);
  --cl-tool-glow: rgba(214, 178, 64, 0.12);
  --cl-run-line: rgba(120, 196, 210, 0.45);
  --cl-run-glow: rgba(120, 196, 210, 0.12);
  --cl-retro-window-border: rgba(126, 14, 228, 0.72);
  --cl-retro-window-surface: linear-gradient(180deg, rgba(20, 22, 48, 0.98), rgba(9, 10, 22, 0.99));
  --cl-retro-titlebar:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 8px),
    linear-gradient(180deg, #3a3fd8 0%, #2b30b8 55%, #1d2180 100%);
  --cl-retro-nav-surface:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #1c0d2e 0%, #241137 45%, #10102a 100%);
  --cl-retro-content-surface:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #1b0b2c 0%, #2a1038 32%, #15183f 68%, #080a18 100%);
  --cl-retro-card-border: rgba(190, 80, 140, 0.32);
  --cl-retro-card-top: #9c3b74;
  --cl-retro-card-surface:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, rgba(190, 80, 140, 0.14), rgba(60, 54, 140, 0.12));
  --cl-retro-card-shadow:
    inset 0 0 0 1px rgba(53, 224, 208, 0.12),
    3px 3px 0 rgba(0, 0, 0, 0.38);
  /* 选中语言：列表选中行 / 导航单元格 / 页签 / 浮层高亮项共用一套色 */
  --cl-sel-edge: rgba(53, 224, 208, 0.7);
  --cl-sel-surface:
    repeating-linear-gradient(180deg, rgba(53, 224, 208, 0.08) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, rgba(58, 63, 216, 0.55), rgba(29, 33, 128, 0.5));
  --cl-sel-ink: #e6fdff;
  --cl-sel-ink-soft: #8fe9f0;
  --cl-sel-sheen: rgba(126, 14, 228, 0.18);
  --cl-sel-shadow:
    0 0 0 1px #05060f,
    0 0 14px rgba(53, 224, 208, 0.28),
    inset 0 0 14px rgba(53, 224, 208, 0.1);
  /* 轮次导航条刻度：深色用青，浅色用紫 */
  --cl-turn-ink: #35e0d0;
  --cl-turn-ink-glow: rgba(53, 224, 208, 0.45);
  /* 输入框光标：深色比刻度再暗一档，浅色保持紫 */
  --cl-caret-ink: #23b3a6;
}

/* 字体方案由设置页切换：data-cl-cjk / data-cl-font */
html[data-dsh-closure-skin][data-cl-cjk='yahei'] {
  --cl-font: 'Cascadia Mono', 'Microsoft YaHei UI', 'Microsoft YaHei', ui-monospace, monospace;
  --cl-font-mono: 'Cascadia Mono', 'Consolas', 'Microsoft YaHei UI', 'Microsoft YaHei', ui-monospace, monospace;
}
html[data-dsh-closure-skin][data-cl-font='system'] {
  --cl-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei UI', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --cl-font-mono: 'SF Mono', 'Cascadia Mono', 'Consolas', 'Microsoft YaHei UI', 'Microsoft YaHei', monospace;
}
html[data-dsh-closure-skin][data-cl-font='pixel'] {
  --cl-font: 'CLSR Pixel', 'Cascadia Mono', 'JetBrains Mono', Consolas, 'Microsoft YaHei', ui-monospace, monospace;
  --cl-font-mono: 'CLSR Pixel Mono', 'Cascadia Mono', 'JetBrains Mono', Consolas, ui-monospace, monospace;
}

/* ———— 底色/表面：交给 .cl-scene 画，这里只把宿主表面调成半透明 ———— */
/* 深色：单一蓝紫，底是 upgrade_bottom_glow 那种柔和渐变 */
html[data-dsh-closure-skin] body[data-ds-dark-theme] {
  --dsw-alias-bg-base: transparent;
  --dsw-alias-bg-layer-1: rgba(16, 18, 39, 0.78);
  --dsw-alias-bg-layer-2: rgba(21, 24, 56, 0.84);
  --dsw-alias-bg-overlay: rgba(14, 16, 32, 0.94);
  --dsw-specific-sidebar-fill: rgba(12, 14, 30, 0.86);
  --dsw-specific-input-major: rgba(18, 20, 42, 0.92);
  --dsw-alias-border-l1: rgba(126, 14, 228, 0.24);
  /* —— 控件表面：替换宿主默认的灰/橄榄灰 —— */
  --dsw-alias-bg-layer-3: rgba(26, 29, 64, 0.88);
  --dsw-alias-bg-module-platform: rgba(20, 22, 48, 0.9);
  --dsw-alias-bg-multi-select: rgba(24, 26, 56, 0.9);
  --dsw-alias-card-fill: rgba(22, 24, 52, 0.9);
  --dsw-alias-card-fill-hover: rgba(30, 32, 68, 0.92);
  --dsw-alias-card-tile-fill: rgba(255, 255, 255, 0.04);
  --dsw-specific-selector: rgba(30, 32, 70, 0.92);
  --dsw-specific-menu: rgba(18, 20, 44, 0.96);
  --dsw-specific-tip: rgba(20, 22, 48, 0.96);
  --dsw-alias-menu-group-header-fill: rgba(24, 26, 56, 0.95);
  --dsw-alias-button-elevated-fill: rgba(34, 36, 78, 0.92);
  --dsw-alias-button-floating-fill: rgba(28, 30, 64, 0.94);
  --dsw-alias-button-floating-hover: rgba(40, 42, 90, 0.96);
  --dsw-alias-button-ghost-active-fill: rgba(126, 14, 228, 0.2);
  --dsw-alias-button-ghost-active-hover: rgba(126, 14, 228, 0.3);
  --dsw-alias-button-ghost-active-border: rgba(126, 14, 228, 0.42);
  --dsw-alias-button-tool-bar-fill: rgba(30, 32, 70, 0.6);
  --dsw-alias-button-tool-bar-hover: rgba(42, 44, 90, 0.72);
  --dsw-alias-interactive-bg-hover: rgba(126, 14, 228, 0.12);
  --dsw-alias-interactive-bg-active: rgba(126, 14, 228, 0.2);
  --dsw-alias-interactive-bg-hover-accent: rgba(126, 14, 228, 0.2);
  --dsw-alias-interactive-bg-hover-solid: rgba(36, 38, 82, 0.9);
  --dsw-alias-border-l2: rgba(126, 14, 228, 0.32);
  --dsw-alias-border-l3: rgba(126, 14, 228, 0.42);
  --dsw-alias-switch-thumb: #f4f0ff;
  --dsw-alias-hovercard-bg: rgba(16, 18, 40, 0.96);
  --dsw-alias-tooltip-bg: rgba(20, 22, 48, 0.97);
  --dsw-alias-toast-bg: rgba(24, 26, 56, 0.97);
  --cl-surface-strong: #0d0f20;
  --cl-icon: #ffffff;
  --cl-icon-glow: rgba(255, 255, 255, 0.75);
}

/* 浅色：window_main_bg 的浅灰 → 品红地面 */
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) {
  --dsw-alias-bg-base: transparent;
  --dsw-alias-bg-layer-1: rgba(245, 242, 252, 0.86);
  --dsw-alias-bg-layer-2: rgba(236, 231, 248, 0.9);
  --dsw-alias-bg-overlay: rgba(255, 255, 255, 0.96);
  --dsw-specific-sidebar-fill: rgba(232, 232, 239, 0.9);
  --dsw-specific-input-major: rgba(255, 255, 255, 0.88);
  --dsw-alias-border-l1: rgba(43, 48, 184, 0.2);
  /* —— 控件表面：替换宿主默认的灰/橄榄灰 —— */
  --dsw-alias-bg-layer-3: rgba(238, 233, 250, 0.92);
  --dsw-alias-bg-module-platform: rgba(246, 242, 252, 0.92);
  --dsw-alias-bg-multi-select: rgba(244, 240, 252, 0.92);
  --dsw-alias-card-fill: rgba(255, 255, 255, 0.88);
  --dsw-alias-card-fill-hover: rgba(255, 255, 255, 0.96);
  --dsw-alias-card-tile-fill: rgba(255, 255, 255, 0.5);
  --dsw-specific-selector: rgba(255, 255, 255, 0.9);
  --dsw-specific-menu: rgba(253, 251, 255, 0.96);
  --dsw-specific-tip: rgba(255, 255, 255, 0.96);
  --dsw-alias-menu-group-header-fill: rgba(250, 247, 255, 0.95);
  --dsw-alias-button-elevated-fill: rgba(255, 255, 255, 0.9);
  --dsw-alias-button-floating-fill: rgba(255, 255, 255, 0.94);
  --dsw-alias-button-floating-hover: rgba(250, 246, 255, 0.97);
  --dsw-alias-button-ghost-active-fill: rgba(126, 14, 228, 0.1);
  --dsw-alias-button-ghost-active-hover: rgba(126, 14, 228, 0.16);
  --dsw-alias-button-ghost-active-border: rgba(126, 14, 228, 0.24);
  --dsw-alias-button-tool-bar-fill: rgba(255, 255, 255, 0.55);
  --dsw-alias-button-tool-bar-hover: rgba(250, 246, 255, 0.75);
  --dsw-alias-interactive-bg-hover: rgba(126, 14, 228, 0.07);
  --dsw-alias-interactive-bg-active: rgba(126, 14, 228, 0.12);
  --dsw-alias-interactive-bg-hover-accent: rgba(126, 14, 228, 0.12);
  --dsw-alias-interactive-bg-hover-solid: rgba(244, 240, 252, 0.9);
  --dsw-alias-border-l2: rgba(43, 48, 184, 0.24);
  --dsw-alias-border-l3: rgba(43, 48, 184, 0.32);
  --dsw-alias-switch-thumb: #ffffff;
  --dsw-alias-hovercard-bg: rgba(255, 255, 255, 0.97);
  --dsw-alias-tooltip-bg: rgba(255, 255, 255, 0.98);
  --dsw-alias-toast-bg: rgba(250, 247, 255, 0.98);
  --cl-surface-strong: #f2f2f6;
  /* 浅色图标用淡紫，避免深紫发黑 */
  --cl-icon: #a678f0;
  --cl-icon-glow: rgba(166, 120, 240, 0.42);
  /* 浅色底上成功色（已登录文字/绿点）要压深，否则 #35e0d0 太亮 */
  --cl-cyan: #0f7d72;
  /* 浅色底上黄色要压深一点才显眼 */
  --cl-spin: #c98a00;
  --cl-spin-glow: rgba(150, 90, 0, 0.5);
  --cl-px-line: rgba(114, 94, 146, 0.42);
  --cl-px-outer: rgba(43, 48, 184, 0.18);
  --cl-px-fill: rgba(255, 255, 255, 0.9);
  --cl-px-fill-2: rgba(246, 243, 253, 0.95);
  --cl-px-shadow: rgba(43, 48, 184, 0.14);
  --cl-composer-fill: #ffffff;
  --cl-composer-fill-2: #f5f1fb;
  --cl-composer-add-glow: rgba(126, 14, 228, 0.4);
  --cl-tool-line: rgba(160, 120, 20, 0.42);
  --cl-tool-glow: rgba(160, 120, 20, 0.1);
  --cl-run-line: rgba(70, 130, 145, 0.42);
  --cl-run-glow: rgba(70, 130, 145, 0.1);
  --cl-retro-window-border: rgba(126, 14, 228, 0.45);
  --cl-retro-window-surface: linear-gradient(180deg, rgba(251, 247, 255, 0.99), rgba(241, 236, 250, 0.99));
  --cl-retro-nav-surface:
    repeating-linear-gradient(180deg, rgba(120, 20, 90, 0.03) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #f5e9fb, #eadcf7);
  --cl-retro-content-surface:
    repeating-linear-gradient(180deg, rgba(120, 20, 90, 0.035) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #ffe6f3 0%, #eadcff 45%, #d9e6ff 100%);
  --cl-retro-card-border: rgba(176, 24, 106, 0.28);
  --cl-retro-card-top: #d62c84;
  --cl-retro-card-surface:
    repeating-linear-gradient(180deg, rgba(120, 20, 90, 0.03) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(246, 236, 255, 0.72));
  --cl-retro-card-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    3px 3px 0 rgba(80, 20, 60, 0.12);
  --cl-sel-edge: rgba(53, 160, 208, 0.5);
  --cl-sel-surface:
    repeating-linear-gradient(180deg, rgba(53, 160, 208, 0.06) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #d7e8ff 0%, #c3dbff 55%, #aecdf7 100%);
  --cl-sel-ink: #12305f;
  --cl-sel-ink-soft: #2f5a8f;
  --cl-sel-sheen: rgba(176, 24, 106, 0.12);
  --cl-sel-shadow:
    0 0 0 1px rgba(43, 48, 184, 0.12),
    0 0 12px rgba(53, 160, 208, 0.18),
    inset 0 0 12px rgba(53, 160, 208, 0.06);
  --cl-turn-ink: #7e0ee4;
  --cl-turn-ink-glow: rgba(126, 14, 228, 0.35);
  --cl-caret-ink: #7e0ee4;
}

/* 对话框/设置页的底不能被 base: transparent 穿透 */
html[data-dsh-closure-skin] :is(dialog, [role='dialog'], [role='alertdialog']) {
  --dsw-alias-bg-base: var(--cl-surface-strong);
}

/* 宿主部分抽屉/浮层在深色主题下仍是浅底，文字却继承成浅色 → 对比不足。
   统一复用语言下拉那套深色浮层：
   1) 原生 <select> 用 color-scheme: dark 让系统弹出列表也变深，option 颜色对齐；
   2) listbox / menu / tooltip 这类自定义浮层直接用皮肤的浮层底与主文字色。 */
html[data-dsh-closure-skin] body[data-ds-dark-theme] select {
  color-scheme: dark;
}
html[data-dsh-closure-skin] body[data-ds-dark-theme] option,
html[data-dsh-closure-skin] body[data-ds-dark-theme] optgroup {
  background-color: var(--dsw-alias-bg-overlay) !important;
  color: var(--dsw-alias-label-primary) !important;
}
html[data-dsh-closure-skin] body[data-ds-dark-theme] :is([role='listbox'], [role='menu'], [role='tooltip']) {
  background-color: var(--dsw-alias-bg-overlay) !important;
  color: var(--dsw-alias-label-primary) !important;
}
html[data-dsh-closure-skin] body[data-ds-dark-theme] :is([role='option'], [role='menuitem']) {
  color: var(--dsw-alias-label-primary) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) select {
  color-scheme: light;
}

html[data-dsh-closure-skin] body {

  /* —— 静态中性色阶：宿主默认是灰/橄榄灰，整族换成蓝紫灰 ——
     宿主组件大量直接引用 --dsw-static-neutral-*，不换会露出原生绿灰。 */
  --dsw-static-neutral-00: #f7f5ff;
  --dsw-static-neutral-50: #f2eefb;
  --dsw-static-neutral-60: #efebf9;
  --dsw-static-neutral-75: #e9e3f5;
  --dsw-static-neutral-100: #e0d8ef;
  --dsw-static-neutral-150: #d5cbe7;
  --dsw-static-neutral-200: #c6b9dc;
  --dsw-static-neutral-250: #b8a9cd;
  --dsw-static-neutral-300: #a898be;
  --dsw-static-neutral-400: #8e7ea8;
  --dsw-static-neutral-500: #756791;
  --dsw-static-neutral-550: #6a5c84;
  --dsw-static-neutral-600: #5f5176;
  --dsw-static-neutral-700: #4d4161;
  --dsw-static-neutral-750: #443956;
  --dsw-static-neutral-800: #3b314c;
  --dsw-static-neutral-850: #332a43;
  --dsw-static-neutral-875: #2f263e;
  --dsw-static-neutral-900: #2a2238;
  --dsw-static-neutral-950: #1e1929;
  --dsw-static-neutral-1000: #120e1b;
  --dsw-static-neutral-bluish-00: var(--dsw-static-neutral-00);
  --dsw-static-neutral-bluish-50: var(--dsw-static-neutral-50);
  --dsw-static-neutral-bluish-55: var(--dsw-static-neutral-50);
  --dsw-static-neutral-bluish-60: var(--dsw-static-neutral-60);
  --dsw-static-neutral-bluish-75: var(--dsw-static-neutral-75);
  --dsw-static-neutral-bluish-90: var(--dsw-static-neutral-75);
  --dsw-static-neutral-bluish-100: var(--dsw-static-neutral-100);
  --dsw-static-neutral-bluish-150: var(--dsw-static-neutral-150);
  --dsw-static-neutral-bluish-200: var(--dsw-static-neutral-200);
  --dsw-static-neutral-bluish-300: var(--dsw-static-neutral-300);
  --dsw-static-neutral-bluish-310: var(--dsw-static-neutral-300);
  --dsw-static-neutral-bluish-400: var(--dsw-static-neutral-400);
  --dsw-static-neutral-bluish-500: var(--dsw-static-neutral-500);
  --dsw-static-neutral-bluish-600: var(--dsw-static-neutral-600);
  --dsw-static-neutral-bluish-700: var(--dsw-static-neutral-700);
  --dsw-static-neutral-bluish-750: var(--dsw-static-neutral-750);
  --dsw-static-neutral-bluish-800: var(--dsw-static-neutral-800);
  --dsw-static-neutral-bluish-850: var(--dsw-static-neutral-850);
  --dsw-static-neutral-bluish-875: var(--dsw-static-neutral-875);
  --dsw-static-neutral-bluish-900: var(--dsw-static-neutral-900);
  --dsw-static-neutral-bluish-950: var(--dsw-static-neutral-950);
  --dsw-static-neutral-bluish-1000: var(--dsw-static-neutral-1000);
  --dsw-alias-brand-primary: var(--cl-accent);
  --dsw-alias-state-business-primary: var(--cl-accent);
  --dsw-alias-border-l2: var(--cl-blue);
  --dsw-alias-state-error-primary: var(--cl-red);
  --dsw-alias-state-warn-primary: var(--cl-gold);
  --dsw-alias-state-success-primary: var(--cl-cyan);
  /* 宿主的字体入口全部改到像素字体；品牌的 Montserrat 也一并覆盖。 */
  --dsw-font-family: var(--cl-font) !important;
  --dsh-font-family-text: var(--cl-font) !important;
  --dsh-font-family-text-default: var(--cl-font) !important;
  --dsw-font-family-brand: var(--cl-font) !important;
  --dsw-font: var(--cl-font) !important;
  --dsw-font-mono: var(--cl-font-mono) !important;
  --dsh-font-mono: var(--cl-font-mono) !important;
  --ds-font-family-code: var(--cl-font-mono) !important;
  --dsh-font-family-code: var(--cl-font-mono) !important;
  --dsw-font-markdown-code-block: var(--cl-font-mono) !important;
  font-family: var(--cl-font) !important;
  letter-spacing: 0.012em;
}

/* 主色（紫底）按钮：文字与图标统一白色 —— 插件页的「添加插件」等都走这一条 */
html[data-dsh-closure-skin] :is(button, a)[class*='_primary'] {
  color: #ffffff !important;
}
html[data-dsh-closure-skin] :is(button, a)[class*='_primary'] :is(svg, span, path) {
  color: #ffffff !important;
  fill: currentColor;
}

/* 字体兜底：宿主大部分组件读 --dsw-font-family / --ds-font-family-code，
   已经在 body 上改掉；剩下的表单控件和代码类组件再显式接管。
   不要用 body * 的 !important 通配，否则会把宿主用代码变量声明的块也改成比例字体。 */
html[data-dsh-closure-skin] :is(button, input, textarea, select, option) {
  font-family: var(--cl-font) !important;
}
html[data-dsh-closure-skin] :is(code, pre, kbd, samp),
html[data-dsh-closure-skin] :is(code, pre, kbd, samp) :where(*),
html[data-dsh-closure-skin] :is([data-terminal], .xterm, .monaco-editor),
html[data-dsh-closure-skin] :is([data-terminal], .xterm, .monaco-editor) :where(*),
html[data-dsh-closure-skin] :is([class*='codeBlock'], [class*='CodeBlock'], [class*='inlineCode'], [class*='mono'], [class*='Mono'], [class*='json'], [class*='Json']) {
  font-family: var(--cl-font-mono) !important;
}

/* ———— 背景场景层：body 级 fixed、z 0，位于 #root 之下 ———— */
html[data-dsh-closure-skin] .cl-scene {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: #0a0b16;
  background-image:
    radial-gradient(140% 90% at 50% 112%, rgba(66, 58, 216, 0.2) 0%, rgba(66, 58, 216, 0) 68%),
    radial-gradient(90% 65% at 82% 8%, rgba(126, 14, 228, 0.09) 0%, rgba(126, 14, 228, 0) 70%),
    linear-gradient(180deg, rgba(22, 24, 52, 0.28) 0%, rgba(10, 11, 22, 0) 52%, rgba(8, 8, 16, 0.22) 100%);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .cl-scene {
  background-color: #f2f2f7;
  background-image:
    radial-gradient(140% 90% at 50% 112%, rgba(214, 71, 189, 0.13) 0%, rgba(214, 71, 189, 0) 68%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(242, 242, 247, 0) 55%, rgba(228, 228, 238, 0.55) 100%);
}

/* ———— 让 #root 和宿主各列透出场景 ———— */
html[data-dsh-closure-skin] [id='root'] {
  position: relative;
  z-index: 1 !important;
  background: transparent !important;
}
/* Windows：frame 与 centerCol 会被宿主各刷一层底色，显式还原成分层 */
html[data-windows-titlebar][data-dsh-closure-skin] [class*='frame']:has(> [class*='centerCol']) {
  background: transparent;
}
html[data-windows-titlebar][data-dsh-closure-skin] [class*='centerCol'] {
  background: transparent;
}

/* ———— 极轻的扫描线 + 暗角（不拦点击，低于宿主菜单 100） ———— */
/* 扫描线 + 暗角合并成一层，少一个全屏合成层；扫描线颜色已按原 opacity .4 折算 */
html[data-dsh-closure-skin]::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(130% 110% at 50% 0%, transparent 62%, rgba(8, 8, 16, 0.26) 100%),
    repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.011) 0 1px, rgba(0, 0, 0, 0.009) 1px 3px);
}
html[data-dsh-closure-skin]:has(body:not([data-ds-dark-theme]))::after {
  background:
    radial-gradient(130% 110% at 50% 0%, transparent 68%, rgba(43, 48, 184, 0.1) 100%),
    repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.011) 0 1px, rgba(0, 0, 0, 0.009) 1px 3px);
}
html[data-dsh-closure-skin][data-cl-scanlines='off']::after {
  display: none;
}

/* ———— 开机入场：一次性 1.15s，独立覆盖层 ————
   约束：绝不给 html / body / #root 加 transform / filter / perspective / will-change，
   否则 fixed 定位的浮层（idle-crt 屏保板、桌宠）会被包含块接管而错位。
   这里只动覆盖层自己的 opacity 与 clip-path。 */
.cl-boot {
  position: fixed;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  animation: cl-boot-fade 1.15s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@property --cl-boot-iris {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
.cl-boot::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 43%, rgba(12, 10, 28, 0) calc(var(--cl-boot-iris) - 7%), rgba(9, 8, 20, 0.97) var(--cl-boot-iris));
  animation: cl-boot-iris 1.15s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}
.cl-boot::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(to bottom, rgba(186, 168, 255, 0.1) 0 2px, transparent 2px 6px),
    linear-gradient(to bottom, transparent 0%, rgba(160, 140, 255, 0.16) 48%, transparent 52%);
  clip-path: inset(0 0 100% 0);
  animation: cl-boot-sweep 0.62s cubic-bezier(0.22, 0.61, 0.36, 1) 0.06s forwards;
}
.cl-boot-mark {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  image-rendering: pixelated;
  opacity: 0;
  filter: drop-shadow(0 0 18px rgba(160, 140, 255, 0.55));
  animation: cl-boot-mark 0.86s ease-out 0.12s forwards;
}
@keyframes cl-boot-fade {
  0%, 72% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes cl-boot-iris {
  0%, 38% { --cl-boot-iris: 0%; }
  100% { --cl-boot-iris: 148%; }
}
@keyframes cl-boot-sweep {
  0% { clip-path: inset(0 0 100% 0); }
  62% { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(100% 0 0 0); }
}
@keyframes cl-boot-mark {
  0% { opacity: 0; filter: brightness(2.4) drop-shadow(0 0 18px rgba(160, 140, 255, 0.55)); }
  45% { opacity: 1; }
  100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .cl-boot { display: none !important; }
}

/* ———— 情绪通道：只调整蓝紫色相与顶层光晕，不做多色霓虹 ———— */
html[data-dsh-closure-skin][data-dsh-closure-mood='sad'] { --cl-accent: #ff9a3c; }
html[data-dsh-closure-skin][data-dsh-closure-mood='peak'] { --cl-accent: var(--cl-red); }

/* ———— 宿主原生窗口按钮：只重新着色，几何/悬停/点击保持原生 ———— */
/* 三个按钮是 Electron 原生 titleBarOverlay，DOM 里没有；preload 用一个隐藏探针
   采样颜色（背景 = --dsw-specific-sidebar-fill，符号 = --dsw-alias-label-primary）。
   直接给探针着色，再在 apply 里 dispatch 一次 head load 触发重采样。 */
html[data-windows-titlebar][data-dsh-closure-skin] body > span[style*='--dsw-specific-sidebar-fill'] {
  background-color: #2b30b8 !important;
  color: #eef0ff !important;
}
html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) > span[style*='--dsw-specific-sidebar-fill'] {
  background-color: #f4f5fb !important;
  color: #101020 !important;
}
/* 左上角「应用 / 编辑」在 body > [data-windows-menu] 的 open shadow root 里；
   外部只能通过继承 token 影响它。 */
html[data-windows-titlebar][data-dsh-closure-skin] body > [data-windows-menu] {
  --dsw-alias-label-primary: #eef0ff !important;
  --dsw-alias-label-secondary: #c9d1e6 !important;
  --dsw-alias-interactive-bg-hover: color-mix(in srgb, var(--cl-violet) 24%, transparent) !important;
  --dsw-alias-state-business-primary: var(--cl-violet) !important;
  font-weight: 700 !important;
}
html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) > [data-windows-menu] {
  --dsw-alias-label-primary: #101020 !important;
  --dsw-alias-label-secondary: #3a3f5c !important;
  --dsw-alias-interactive-bg-hover: color-mix(in srgb, var(--cl-violet) 12%, transparent) !important;
}

/* ———— 顶部花纹：直接画宿主自己的 40px caption 拖拽条（frame::before），
   不再新加覆盖层，原生按钮 / 侧栏 toggle / 应用-编辑菜单都在它之上 ———— */
html[data-windows-titlebar][data-dsh-closure-skin] [class*='frame']:has(> [class*='centerCol'])::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--dsh-windows-titlebar-height, 40px);
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 2px, transparent 2px 8px),
    linear-gradient(to bottom, #3a3fd8 0%, var(--cl-blue) 45%, var(--cl-blue-deep) 100%);
  border-bottom: 2px solid rgba(126, 14, 228, 0.85);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
  /* 不给 z-index：这条带子必须留在「侧栏折叠按钮 / 头部的展开按钮 / 应用·编辑菜单」之下，
     一旦抬层，按钮会被带子整个盖住——既看不见也点不到（折叠后就展不开了）。 */
}

html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='frame']:has(> [class*='centerCol'])::before {
  background:
    repeating-linear-gradient(90deg, rgba(43, 48, 184, 0.05) 0 2px, transparent 2px 8px),
    linear-gradient(to bottom, #ffffff 0%, #f4f5fb 100%);
  border-bottom: 2px solid rgba(126, 14, 228, 0.5);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* 右侧三个系统窗口按钮：只在左侧放一条淡淡的像素虚线，不做淡化/包裹 */
html[data-windows-titlebar][data-dsh-closure-skin] .cl-caption-controls {
  position: fixed;
  top: 0;
  right: 138px;
  width: 2px;
  height: var(--dsh-windows-titlebar-height, 40px);
  pointer-events: none;
  z-index: 41;
  background: repeating-linear-gradient(
    to bottom,
    rgba(238, 240, 255, 0.38) 0 2px,
    rgba(238, 240, 255, 0.08) 2px 4px
  );
  image-rendering: pixelated;
}
html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) .cl-caption-controls {
  background: repeating-linear-gradient(
    to bottom,
    rgba(43, 48, 184, 0.28) 0 2px,
    rgba(43, 48, 184, 0.06) 2px 4px
  );
}

/* caption 居中的菜单名：只是标题栏标签，正式名字在左侧品牌位 */
html[data-windows-titlebar][data-dsh-closure-skin] [class*='frame']:has(> [class*='centerCol'])::after {
  content: '${CAPTION_BRAND}';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--dsh-windows-titlebar-height, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
  font-family: 'CLSR Display', var(--cl-font);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.2em;
  transform: scale(1.06, 0.72);
  transform-origin: center center;
  text-transform: uppercase;
  white-space: nowrap;
  color: #eef0ff;
  text-shadow: 0 0 8px rgba(126, 14, 228, 0.85), 0 1px 0 rgba(0, 0, 0, 0.35);
}
html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='frame']:has(> [class*='centerCol'])::after {
  color: #2b30b8;
  text-shadow: none;
}
/* 窄窗口时菜单名会和左侧「应用/编辑」抢位置，直接收起 */
@media (max-width: 760px) {
  html[data-windows-titlebar][data-dsh-closure-skin] [class*='frame']:has(> [class*='centerCol'])::after {
    display: none;
  }
}

/* 左上角侧栏 toggle：宿主 fixed 在 caption 行里，只重新着色 */
html[data-windows-titlebar][data-dsh-closure-skin] [data-slot='sidebar'] button:is([data-sidebar-toggle], [class*='toggle']) {
  color: #ffffff;
  border-radius: 2px;
}
html[data-windows-titlebar][data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-slot='sidebar'] button:is([data-sidebar-toggle], [class*='toggle']) {
  color: var(--cl-blue);
}

/* ———— 品牌位 / 字标 ———— */
html[data-dsh-closure-skin] .cl-brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
html[data-dsh-closure-skin] .cl-brand img { display: block; height: 34px; width: auto; margin: -5px 0; image-rendering: pixelated; }
html[data-dsh-closure-skin] .cl-name {
  font-family: var(--cl-font);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cl-violet) !important;
  white-space: nowrap;
}
html[data-dsh-closure-skin] .cl-hero-logo {
  display: block;
  height: 74px;
  margin: -11px 0;
  width: auto;
  image-rendering: pixelated;
  opacity: 0.95;
}

/* ———— 像素图标：保留宿主 SVG 的尺寸/交互，只替换绘制 ———— */
/* 侧栏面板图标：插件 = 电视，自动化任务 = 图2，更多 = 三菱形。
   用 mask 取形状，深色白、浅色紫，带自发光。 */
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-plugin-pinwheel']),
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-clock']),
html[data-dsh-closure-skin] [data-slot='sidebar'] button[aria-haspopup='menu'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-apps-add']) {
  width: 28px !important;
  height: 28px !important;
  margin: -4px;
  background-color: var(--cl-icon);
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-plugin-pinwheel']) {
  -webkit-mask-image: url('${ICON_PLUGIN_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_PLUGIN_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-clock']) {
  -webkit-mask-image: url('${ICON_BOT_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_BOT_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
html[data-dsh-closure-skin] [data-slot='sidebar'] button[aria-haspopup='menu'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-apps-add']) {
  -webkit-mask-image: url('${ICON_MORE_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_MORE_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-plugin-pinwheel']) svg,
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-clock']) svg,
html[data-dsh-closure-skin] [data-slot='sidebar'] button[aria-haspopup='menu'] [class*='panelGlyph']:has(svg[data-icon^='dsw-icon-apps-add']) svg {
  opacity: 0 !important;
}

/* 所有「更多 / ...」：三菱形 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-ellipsis'] {
  width: 24px !important;
  height: 24px !important;
  margin: -4px;
  color: transparent !important;
  background-color: var(--cl-icon);
  -webkit-mask-image: url('${ICON_MORE_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_MORE_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-ellipsis'] > * {
  opacity: 0 !important;
}

/* 刷新：回放箭头图标（用户提供的素材），不旋转 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-refresh'] {
  width: 22px !important;
  height: 22px !important;
  margin: -3px;
  color: transparent !important;
  background: url('${ICON_REFRESH_GLOW}') center / contain no-repeat;
  image-rendering: pixelated;
  animation: none !important;
  transform: none !important;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-refresh'] > * {
  opacity: 0 !important;
}
@keyframes cl-icon-spin {
  to { transform: rotate(360deg); }
}

/* 加载中：同一个像素圆点环，黄色，转得更快 */
html[data-dsh-closure-skin] svg[data-state='ongoing'],
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-loading'] {
  color: transparent !important;
  background-color: var(--cl-spin);
  -webkit-mask-image: url('${ICON_SPINNER}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_SPINNER}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  image-rendering: pixelated;
  animation: cl-icon-spin 0.9s steps(8) infinite !important;
  transform-origin: 50% 50%;
}
/* 浅色底上淡蓝图标会糊掉，压暗一档 */
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) svg[data-icon^='dsw-icon-refresh'] {
  background: url('${ICON_REFRESH_LIGHT_GLOW}') center / contain no-repeat;
}
/* 刷新按钮处于 ongoing 时也保持同一个静止图标：加载环只留给真正的加载图标 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-refresh'] {
  animation: none !important;
  transform: none !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
  background-color: transparent !important;
  background: url('${ICON_REFRESH_GLOW}') center / contain no-repeat !important;
}html[data-dsh-closure-skin] svg[data-state='ongoing'] > *,
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-loading'] > * {
  opacity: 0 !important;
}

/* 文件夹：关闭 = 图6，打开 = 图7 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-folder-close'] {
  width: 19px !important;
  height: 19px !important;
  margin: -1.5px;
  background: url('${ICON_FOLDER_CLOSED_GLOW}') center / contain no-repeat;
  image-rendering: pixelated;
}
/* 浅色底上白色文件夹会糊进背景：压暗 + 紫色描边 */
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) svg[data-icon^='dsw-icon-folder-close'] {
  background: url('${ICON_FOLDER_CLOSED_LIGHT_GLOW}') center / contain no-repeat;
}
/* 黄色文件夹同样加描边，但不压暗 */
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) svg[data-icon^='dsw-icon-folder-open'] {
  background: url('${ICON_FOLDER_OPEN_LIGHT_GLOW}') center / contain no-repeat;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-folder-open'] {
  width: 19px !important;
  height: 19px !important;
  margin: -1.5px;
  background: url('${ICON_FOLDER_OPEN_GLOW}') center / contain no-repeat;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-folder-close'] > *,
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-folder-open'] > * {
  opacity: 0 !important;
}

/* 置顶：用户提供的像素箭头 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-pin'] {
  width: 24px !important;
  height: 24px !important;
  margin: -4px;
  color: transparent !important;
  background-color: var(--cl-icon);
  -webkit-mask-image: url('${ICON_PIN_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_PIN_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-pin'] > * {
  opacity: 0 !important;
}

/* ———— 权限预设图标：锁 / 解锁 / 蝙蝠 ————
   跟之前「完全权限」那版一样：换的是图标容器（triggerIcon / itemIcon）的背景，
   原 svg 直接隐藏，不再用轮询给 svg 打标记，所以不会闪。
   外面（触发按钮）额外按 aria-label / title 文案兜底，纯 CSS 就能对上。 */
html[data-dsh-closure-skin] :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm] {
  width: 18px;
  height: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm] > * {
  display: none !important;
}
html[data-dsh-closure-skin] :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='read-only'],
html[data-dsh-closure-skin] button[aria-label*='仅可查看'] [class*='triggerIcon'],
html[data-dsh-closure-skin] button[title*='仅可查看'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_LOCK}');
}
html[data-dsh-closure-skin] :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='workspace-write'],
html[data-dsh-closure-skin] button[aria-label*='工作区内修改'] [class*='triggerIcon'],
html[data-dsh-closure-skin] button[title*='工作区内修改'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_UNLOCK}');
}
html[data-dsh-closure-skin] :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='full-access'],
html[data-dsh-closure-skin] button[aria-label*='完全权限'] [class*='triggerIcon'],
html[data-dsh-closure-skin] button[title*='完全权限'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_FULL}');
}
/* 浅色底上白/淡色图标会糊掉，压暗一档 */
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='read-only'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[aria-label*='仅可查看'] [class*='triggerIcon'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[title*='仅可查看'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_LOCK_LIGHT}');
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='workspace-write'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[aria-label*='工作区内修改'] [class*='triggerIcon'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[title*='工作区内修改'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_UNLOCK_LIGHT}');
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) :is([class*='triggerIcon'], [class*='itemIcon'])[data-cl-perm='full-access'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[aria-label*='完全权限'] [class*='triggerIcon'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[title*='完全权限'] [class*='triggerIcon'] {
  background-image: url('${ICON_PERM_FULL_LIGHT}');
}

/* 归档 / 取消归档：同风格像素盒 */
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-archive'],
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-unarchive'] {
  width: 24px !important;
  height: 24px !important;
  margin: -4px;
  color: transparent !important;
  background-color: var(--cl-icon);
  -webkit-mask-image: url('${ICON_ARCHIVE_GLOW}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: 120%;
  mask-image: url('${ICON_ARCHIVE_GLOW}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 120%;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-archive'] > *,
html[data-dsh-closure-skin] svg[data-icon^='dsw-icon-unarchive'] > * {
  opacity: 0 !important;
}

/* ———— 像素弹窗：输入框 / 发送 / 标签 / 新建会话 / 卡片 ———— */
/* 状态行底衬：抄 dsh-deep-whale 的做法——在 composer dock 上铺一层独立的
   ::before 背板（渐变两端淡出、胶囊圆角），不碰卡片本身，也不加全屏层。
   颜色取 .cl-scene 底部合成色：深色 #11102d，浅色 #e9e2ef。 */
html[data-dsh-closure-skin] [data-composer-card] + div[class*='dock'] {
  position: relative;
  isolation: isolate;
}
html[data-dsh-closure-skin] [data-composer-card] + div[class*='dock']::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--cl-dock-bleed-l, 48px));
  right: calc(-1 * var(--cl-dock-bleed-r, 48px));
  top: 0;
  bottom: -2px;
  z-index: -1;
  pointer-events: none;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(17, 16, 45, 0.96) 10%,
    rgba(17, 16, 45, 0.96) 90%,
    transparent
  );
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme])
  [data-composer-card] + div[class*='dock']::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(233, 226, 239, 0.96) 10%,
    rgba(233, 226, 239, 0.96) 90%,
    transparent
  );
}

html[data-dsh-closure-skin] [data-composer-card] {
  position: relative !important;
  border: 2px solid var(--cl-px-line) !important;
  border-radius: 9px !important;
  corner-shape: bevel;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.018) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #1d1e2d 0 22%, #1a1b29 22% 45%, #171825 45% 70%, #14151f 70%) !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    4px 4px 0 var(--cl-px-shadow),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06) !important;
  overflow: visible !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-composer-card] {
  background:
    repeating-linear-gradient(180deg, rgba(126, 14, 228, 0.025) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #ffffff 0 22%, #fcfaff 22% 45%, #f9f6fe 45% 70%, #f5f1fb 70%) !important;
}
html[data-dsh-closure-skin] [data-composer-card]::before,
html[data-dsh-closure-skin] [data-composer-card]::after {
  content: '';
  position: absolute;
  z-index: 2;
  pointer-events: none;
}
html[data-dsh-closure-skin] [data-composer-card]::before {
  right: -16px;
  left: auto;
  bottom: 16px;
  width: 16px;
  height: 24px;
  background: var(--cl-px-line);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
html[data-dsh-closure-skin] [data-composer-card]::after {
  right: -11px;
  left: auto;
  bottom: 20px;
  width: 11px;
  height: 16px;
  background: var(--cl-composer-fill-2);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_primary'] {
  border: 2px solid rgba(255, 255, 255, 0.38) !important;
  border-radius: 4px !important;
  corner-shape: bevel;
  background: linear-gradient(180deg, #ff5fb0 0 34%, #e83a86 34% 68%, #b01d5c 68%) !important;
  color: #ffffff !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    3px 3px 0 var(--cl-px-shadow),
    0 0 12px rgba(255, 62, 165, 0.35) !important;
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_primary'] svg {
  color: #ffffff !important;
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_add'] {
  box-sizing: border-box;
  display: grid !important;
  place-items: center !important;
  padding: 0 !important;
  line-height: 0 !important;
  border: 2px solid rgba(190, 160, 255, 0.8) !important;
  border-radius: 50% !important;
  corner-shape: round;
  background: #4b3a8f !important;
  color: #ffffff !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    0 0 10px var(--cl-composer-add-glow) !important;
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_add']:hover:not(:disabled) {
  background: #5a47a6 !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    0 0 14px var(--cl-composer-add-glow) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-composer-card] [class*='_add'] {
  border-color: rgba(126, 14, 228, 0.45) !important;
  background: #e9ddff !important;
  color: #4b2f9e !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-composer-card] [class*='_add']:hover:not(:disabled) {
  background: #f1e8ff !important;
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_add'] svg {
  display: block !important;
  margin: 0 !important;
  /* 宿主那颗加号换成像素加号：保留 SVG 尺寸与交互，只替换绘制 */
  color: transparent !important;
  background-color: #ffffff;
  -webkit-mask-image: url('${ICON_PLUS}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url('${ICON_PLUS}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] [data-composer-card] [class*='_add'] svg > * {
  opacity: 0 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-composer-card] [class*='_add'] svg {
  background-color: #4b2f9e;
}
html[data-dsh-closure-skin] [data-conversation-tabs] button[class*='_tab'] {
  padding: 4px 8px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: #a99cc0 !important;
  line-height: 18px !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] [data-conversation-tabs] button[class*='_tab']:hover {
  background: transparent !important;
  color: #e6d8f2 !important;
}
html[data-dsh-closure-skin] [data-conversation-tabs] button[class*='_tabActive'] {
  color: #ffe0f0 !important;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  text-shadow: 0 0 6px rgba(255, 120, 190, 0.25);
}
html[data-dsh-closure-skin] [data-conversation-tabs] button[class*='_tabActive']::after {
  display: none !important;
}
html[data-dsh-closure-skin] [data-conversation-tabs] button [class*='_tabLabel'] {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-conversation-tabs] button[class*='_tab'] {
  border: 0 !important;
  background: transparent !important;
  color: #5a4778 !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-conversation-tabs] button[class*='_tabActive'] {
  color: #7a1d5a !important;
  text-shadow: none;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] [class*='newSessionRow'] button[class*='newSession'],
html[data-dsh-closure-skin] [data-slot='sidebar'] button[class*='newSession'],
html[data-dsh-closure-skin] button[class*='newSession'] {
  border: 2px solid var(--cl-px-line) !important;
  border-radius: 12px !important;
  corner-shape: bevel;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #3b2f7a 0 25%, #2f2566 25% 50%, #241c52 50% 75%, #1a1440 75%) !important;
  color: #f6f0ff !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    3px 3px 0 var(--cl-px-shadow),
    0 0 12px rgba(126, 14, 228, 0.2) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) button[class*='newSession'] {
  background:
    repeating-linear-gradient(180deg, rgba(126, 14, 228, 0.03) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #f8f3ff 0 25%, #f1eaff 25% 50%, #e8ddff 50% 75%, #ded0ff 75%) !important;
  color: #3a1a6e !important;
}
html[data-dsh-closure-skin] [data-action-card],
html[data-dsh-closure-skin] [data-tool] [class*='_card']:not([class*='cardBody']):not([class*='cardHeader']):not([class*='cardFooter']) {
  border: 2px solid var(--cl-tool-line) !important;
  border-radius: 6px !important;
  corner-shape: bevel;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    3px 3px 0 var(--cl-px-shadow),
    0 0 12px var(--cl-tool-glow) !important;
}
html[data-dsh-closure-skin] [data-changed-files],
html[data-dsh-closure-skin] [data-presented-file] {
  border: 2px solid var(--cl-tool-line) !important;
  border-radius: 6px !important;
  corner-shape: bevel;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    3px 3px 0 var(--cl-px-shadow),
    0 0 12px var(--cl-tool-glow) !important;
}
html[data-dsh-closure-skin] [data-tool] [class*='cr4P6W_card'],
html[data-dsh-closure-skin] [class*='cr4P6W_card'] {
  border: 2px solid var(--cl-run-line) !important;
  border-radius: 6px !important;
  corner-shape: bevel;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    3px 3px 0 var(--cl-px-shadow),
    0 0 12px var(--cl-run-glow) !important;
}

/* ———— 选中会话 / 会话信息浮窗 ———— */
html[data-dsh-closure-skin] [data-slot='sidebar'] [class*='sessionRow'][class*='selected'],
html[data-dsh-closure-skin] [data-slot='sidebar'] [data-row-key][aria-selected='true'] {
  --dsw-alias-label-primary: #e6fdff;
  --dsw-alias-label-secondary: #8fe9f0;
  --dsw-alias-label-tertiary: #6fd4df;
  --dsw-alias-label-caption: #6fd4df;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(53, 224, 208, 0.7) !important;
  border-radius: 999px !important;
  background:
    repeating-linear-gradient(180deg, rgba(53, 224, 208, 0.09) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #3b70d0 0%, #2b56a8 55%, #1d3f82 100%) !important;
  box-shadow:
    0 0 0 1px #05060f,
    0 0 16px rgba(53, 224, 208, 0.35),
    inset 0 0 16px rgba(53, 224, 208, 0.12) !important;
  color: #e6fdff !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-slot='sidebar'] [class*='sessionRow'][class*='selected'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-slot='sidebar'] [data-row-key][aria-selected='true'] {
  --dsw-alias-label-primary: #12305f;
  --dsw-alias-label-secondary: #2f5a8f;
  --dsw-alias-label-tertiary: #4a6f9a;
  --dsw-alias-label-caption: #4a6f9a;
  border-color: rgba(53, 160, 208, 0.5) !important;
  background:
    repeating-linear-gradient(180deg, rgba(53, 160, 208, 0.06) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #d7e8ff 0%, #c3dbff 55%, #aecdf7 100%) !important;
  box-shadow:
    0 0 0 1px rgba(43, 48, 184, 0.12),
    0 0 12px rgba(53, 160, 208, 0.18),
    inset 0 0 12px rgba(53, 160, 208, 0.06) !important;
  color: #12305f !important;
}
html[data-dsh-closure-skin] div:has(> [class*='hoverContent']),
html[data-dsh-closure-skin] div:has(> div > [class*='hoverContent']) {
  background-color: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: visible !important;
}
html[data-dsh-closure-skin] [class*='hoverContent'] {
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(136, 112, 176, 0.6) !important;
  border-radius: 6px !important;
  corner-shape: bevel;
  padding: 8px 10px !important;
  background:
    linear-gradient(rgba(126, 14, 228, 0.08) 1px, transparent 1px) 0 0 / 100% 6px,
    linear-gradient(90deg, rgba(126, 14, 228, 0.08) 1px, transparent 1px) 0 0 / 6px 100%,
    linear-gradient(180deg, rgba(20, 18, 42, 0.98), rgba(9, 10, 22, 0.98)) !important;
  box-shadow:
    0 0 0 1px #05060f,
    4px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 18px rgba(126, 14, 228, 0.22) !important;
  color: #e8e8f0;
}
html[data-dsh-closure-skin] [class*='hoverContent']::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 3px);
  opacity: 0.4;
}
html[data-dsh-closure-skin] [class*='hoverTitle'] {
  color: #f4edff !important;
}
html[data-dsh-closure-skin] [class*='hoverPath'] {
  color: #b08cff !important;
  font-family: var(--cl-font-mono);
}
html[data-dsh-closure-skin] [class*='hoverTime'],
html[data-dsh-closure-skin] [class*='hoverStatus'] {
  color: #35e0d0 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='hoverContent'] {
  border-color: rgba(114, 94, 146, 0.42) !important;
  background:
    linear-gradient(rgba(126, 14, 228, 0.06) 1px, transparent 1px) 0 0 / 100% 6px,
    linear-gradient(90deg, rgba(126, 14, 228, 0.06) 1px, transparent 1px) 0 0 / 6px 100%,
    linear-gradient(180deg, #ffffff, #f5f1fb) !important;
  color: #1a1d2e;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='hoverTitle'] {
  color: #2a1550 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='hoverPath'] {
  color: #6b3bbd !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='hoverTime'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='hoverStatus'] {
  color: #0f7f8a !important;
}

/* ———— 用户消息：无边框、外发光、低饱和紫、像素切角 ———— */
html[data-dsh-closure-skin] [data-message-bubble] {
  border: 0 !important;
  border-radius: 10px !important;
  corner-shape: bevel;
  background: #363144 !important;
  color: #ece7f7 !important;
  /* 原来的 drop-shadow 外发光换成 box-shadow 的第一层：
     气泡是带圆角/切角的实心矩形，box-shadow 与 drop-shadow 的轮廓一致，
     但不会生成额外的滤镜效果节点（每条消息少一个离屏渲染面）。 */
  box-shadow:
    0 0 8px rgba(136, 112, 176, 0.2),
    0 0 14px rgba(136, 112, 176, 0.24),
    0 0 28px rgba(136, 112, 176, 0.12) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-message-bubble] {
  background: #e9e3f4 !important;
  color: #1d1830 !important;
  box-shadow:
    0 0 8px rgba(78, 62, 102, 0.22),
    0 0 14px rgba(78, 62, 102, 0.3),
    0 0 28px rgba(78, 62, 102, 0.14) !important;
}

/* 代码块沿用设置窗口结构：窄标题栏负责命令按钮，正文保持深色 CRT 终端。 */
html[data-dsh-closure-skin] [class*='codeBlock']:not(pre) {
  overflow: hidden;
  border: 1px solid var(--cl-retro-window-border) !important;
  border-radius: 0 !important;
  background: var(--cl-retro-window-surface) !important;
  box-shadow:
    inset 0 0 0 1px rgba(53, 224, 208, 0.12),
    3px 3px 0 rgba(0, 0, 0, 0.34) !important;
}
html[data-dsh-closure-skin] [class*='codeBlock']:not(pre) > :is([class*='header'], [class*='toolbar']) {
  min-height: 34px;
  border-bottom: 1px solid var(--cl-retro-window-border) !important;
  border-radius: 0 !important;
  background: var(--cl-retro-titlebar) !important;
  color: #ffffff !important;
}
html[data-dsh-closure-skin] [class*='codeBlock']:not(pre) > :is([class*='header'], [class*='toolbar']) button {
  border: 1px solid rgba(53, 224, 208, 0.4) !important;
  border-radius: 0 !important;
  background: rgba(8, 6, 24, 0.72) !important;
  color: #ffffff !important;
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.44) !important;
}
html[data-dsh-closure-skin] [class*='codeBlock'] pre,
html[data-dsh-closure-skin] pre:not([class*='codeBlock']) {
  border: 0 !important;
  border-radius: 0 !important;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, rgba(5, 6, 18, 0.98), rgba(8, 10, 28, 0.98)) !important;
  color: #d9fdf7 !important;
  box-shadow:
    inset 4px 0 0 #7e0ee4,
    inset 0 1px 0 rgba(53, 224, 208, 0.18) !important;
}
html[data-dsh-closure-skin] pre:not([class*='codeBlock']) {
  border: 1px solid rgba(126, 14, 228, 0.42) !important;
}

/* ———— 代码块：跟提交栏同一套倒角/描边，颜色压饱和、不抢眼 ————
   .md-code-block 是宿主代码块容器上的稳定类名；标题条有两个变体：
   卡片变体的 [class*='header'] 与流式变体的 [data-code-block-banner]。 */
html[data-dsh-closure-skin] .md-code-block {
  position: relative;
  border: 2px solid var(--cl-px-line) !important;
  border-radius: 9px !important;
  corner-shape: bevel;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.018) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #1d1e2d 0 22%, #1a1b29 22% 45%, #171825 45% 70%, #14151f 70%) !important;
  box-shadow:
    0 0 0 1px var(--cl-px-outer),
    4px 4px 0 var(--cl-px-shadow),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}
html[data-dsh-closure-skin] .md-code-block :is([class*='header'], [data-code-block-banner]) {
  min-height: 30px;
  padding: 6px 12px !important;
  border-bottom: 1px solid rgba(136, 112, 176, 0.3) !important;
  border-radius: 9px 9px 0 0 !important;
  corner-shape: bevel;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012)) !important;
  color: #a9a3bd !important;
}
html[data-dsh-closure-skin] .md-code-block :is([class*='language'], [class*='infostring']) {
  display: inline-flex !important;
  align-items: center;
  gap: 6px;
  color: #9a94ab !important;
  font-size: 10.5px !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
html[data-dsh-closure-skin] .md-code-block :is([class*='language'], [class*='infostring'])::before {
  content: '';
  width: 4px;
  height: 4px;
  flex: none;
  background: rgba(136, 112, 176, 0.5);
}
html[data-dsh-closure-skin] .md-code-block :is([class*='header'], [data-code-block-banner]) button {
  border: 1px solid rgba(136, 112, 176, 0.35) !important;
  border-radius: 3px !important;
  background: transparent !important;
  color: #a9a3bd !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] .md-code-block :is([class*='header'], [data-code-block-banner]) button:hover {
  border-color: rgba(136, 112, 176, 0.6) !important;
  background: rgba(255, 255, 255, 0.06) !important;
  color: #d9d3ea !important;
}
html[data-dsh-closure-skin] .md-code-block pre {
  border: 0 !important;
  /* 只圆底角：正文与卡片同宽时，方角会盖住卡片底部的倒角描边 */
  border-radius: 0 0 9px 9px !important;
  corner-shape: bevel;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, #12131f, #0e0f19) !important;
  color: #d9d5e6 !important;
  box-shadow: none !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block {
  background:
    repeating-linear-gradient(180deg, rgba(126, 14, 228, 0.02) 0 2px, transparent 2px 4px),
    linear-gradient(180deg, #ffffff 0 22%, #fcfaff 22% 45%, #f9f6fe 45% 70%, #f5f1fb 70%) !important;
  box-shadow:
    0 0 0 1px rgba(43, 48, 184, 0.12),
    4px 4px 0 rgba(80, 20, 60, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.7) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block :is([class*='header'], [data-code-block-banner]) {
  border-bottom-color: rgba(136, 112, 176, 0.26) !important;
  background: linear-gradient(180deg, rgba(126, 14, 228, 0.03), rgba(126, 14, 228, 0.008)) !important;
  color: #5a5374 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block :is([class*='language'], [class*='infostring']) {
  color: #6b6488 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block :is([class*='language'], [class*='infostring'])::before {
  background: rgba(136, 112, 176, 0.45);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block :is([class*='header'], [data-code-block-banner]) button {
  border-color: rgba(136, 112, 176, 0.3) !important;
  color: #6b6488 !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block :is([class*='header'], [data-code-block-banner]) button:hover {
  border-color: rgba(136, 112, 176, 0.5) !important;
  background: rgba(126, 14, 228, 0.06) !important;
  color: #3a3350 !important;
}
/* 代码块：长行在卡片内横向滚动，不折行（宿主默认 pre-wrap） */
html[data-dsh-closure-skin] .md-code-block {
  --dsl-code-block-line-white-space: pre;
}
html[data-dsh-closure-skin] .md-code-block :where(pre) {
  overflow-x: auto !important;
  overflow-y: hidden !important;
}
html[data-dsh-closure-skin] .md-code-block :where(pre, code),
html[data-dsh-closure-skin] .md-code-block :where(pre) code > .line {
  white-space: pre !important;
  overflow-wrap: normal !important;
  word-break: normal !important;
}
/* 行号槽：字体必须等宽、去掉字距，否则 4 位以上行号会超出 ch 宽度而换行 */
html[data-dsh-closure-skin] .md-code-block,
html[data-dsh-closure-skin] .md-code-block :where(pre, code) {
  letter-spacing: 0 !important;
  font-family: var(--cl-font-mono) !important;
  font-variant-numeric: tabular-nums;
}
html[data-dsh-closure-skin] .md-code-block :where(pre) code > .line::before {
  font-family: var(--cl-font-mono) !important;
  letter-spacing: 0 !important;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) .md-code-block pre {
  background:
    repeating-linear-gradient(180deg, rgba(126, 14, 228, 0.018) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, #faf8ff, #f3effa) !important;
  color: #3a3350 !important;
  box-shadow: none !important;
}

/* ———— 像素分割线：完成状态行 / markdown hr ———— */
html[data-dsh-closure-skin] [class*='hE4tRW_root'] {
  position: relative !important;
  border-bottom: 0 !important;
}
html[data-dsh-closure-skin] [class*='hE4tRW_root']::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  pointer-events: none;
  background: repeating-linear-gradient(90deg, var(--cl-px-line) 0 9px, transparent 9px 10px);
  opacity: 0.9;
}
html[data-dsh-closure-skin] [data-slot='conversation'] hr,
html[data-dsh-closure-skin] hr {
  height: 2px !important;
  border: 0 !important;
  background: repeating-linear-gradient(90deg, var(--cl-px-line) 0 6px, transparent 6px 7px) !important;
  opacity: 0.9;
}

/* ———— 新会话首屏标题：先隐藏宿主文本，再用伪元素显示随机句 ———— */
html[data-dsh-closure-skin] [class*='titleGroup'] > span:first-child {
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  font-size: 0 !important;
  max-width: min(760px, 82vw) !important;
  line-height: 1.3 !important;
  white-space: normal !important;
}
html[data-dsh-closure-skin] [class*='titleGroup'] > span:first-child::before {
  content: var(--cl-hero-label, '');
  display: inline-block;
  font-size: clamp(20px, 2.2vw, 26px);
  line-height: 1.3;
  color: var(--dsw-alias-label-primary);
  -webkit-text-fill-color: currentColor;
  text-align: center;
}
html[data-dsh-closure-skin] [class*='titleGroup'] > span:first-child::after {
  content: '▍';
  font-size: clamp(20px, 2.2vw, 26px);
  line-height: 1.3;
  color: var(--dsw-alias-label-primary);
  -webkit-text-fill-color: currentColor;
  opacity: 0;
}
html[data-dsh-closure-skin] [class*='titleGroup'] > span:first-child[data-cl-hero-typing]::after {
  opacity: 1;
  animation: cl-hero-caret 0.8s steps(2) infinite;
}
@keyframes cl-hero-caret {
  50% { opacity: 0; }
}

/* ———— 深度求索中：绝对定位覆盖，保持单行并沿用宿主蓝色 ———— */
html[data-dsh-closure-skin] [class*='runningText'] {
  position: relative;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  background: none !important;
}
html[data-dsh-closure-skin] [class*='runningText'] * {
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
  background: none !important;
}
html[data-dsh-closure-skin] [class*='runningText']::before {
  content: var(--cl-running-label, '深度求索中') var(--cl-running-suffix, '');
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--dsh-content-font-size-secondary, 13px);
  line-height: 1.4;
  color: var(--dsw-alias-label-deep-diving, var(--cl-blue));
  -webkit-text-fill-color: currentColor;
  white-space: nowrap;
  pointer-events: none;
}
html[data-dsh-closure-skin] [class*='runningIcon'] {
  width: 26px !important;
  height: 26px !important;
  background: url('${ICON_RUNNING_TAIL}') center / contain no-repeat;
}
html[data-dsh-closure-skin] [class*='runningIcon'] > * {
  opacity: 0 !important;
}

/* ———— 顶面板暗纹：线缆图 alpha 遮罩，低透明度覆盖 ———— */
html[data-dsh-closure-skin] [class*='an3WzG_header']:not([class*='headerBlank']) {
  position: relative;
}
html[data-dsh-closure-skin] [class*='an3WzG_header']:not([class*='headerBlank'])::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(175, 160, 215, 0.24), rgba(175, 160, 215, 0.08));
  -webkit-mask-image: url('${ICON_WIRELINE}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: right -18px center;
  -webkit-mask-size: 220px auto;
  mask-image: url('${ICON_WIRELINE}');
  mask-repeat: no-repeat;
  mask-position: right -18px center;
  mask-size: 220px auto;
  opacity: 0.38;
}
html[data-dsh-closure-skin] [class*='an3WzG_header']:not([class*='headerBlank']) > * {
  position: relative;
  z-index: 1;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='an3WzG_header']:not([class*='headerBlank'])::before {
  background: linear-gradient(180deg, rgba(70, 55, 95, 0.18), rgba(70, 55, 95, 0.06));
  opacity: 0.4;
}

/* ———— 设置面板：蓝色像素标题栏 + 紫边青线外框 ———— */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] {
  box-sizing: border-box !important;
  position: relative !important;
  overflow: hidden !important;
  border: 1px solid var(--cl-retro-window-border) !important;
  border-radius: 0 !important;
  background: var(--cl-retro-window-surface) !important;
  box-shadow:
    inset 0 0 0 1px rgba(53, 224, 208, 0.4),
    0 0 0 1px rgba(5, 6, 15, 0.9),
    0 0 16px rgba(126, 14, 228, 0.2) !important;
  --dsw-alias-bg-layer-1: rgba(18, 20, 42, 0.72);
  --dsw-alias-bg-layer-2: rgba(12, 14, 30, 0.92);
  --dsw-alias-border-l1: rgba(126, 14, 228, 0.25);
  --dsw-alias-border-l2: rgba(126, 14, 228, 0.36);
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings']::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 54px;
  z-index: 0;
  pointer-events: none;
  background: var(--cl-retro-titlebar);
  border-bottom: 1px solid var(--cl-retro-window-border);
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] > * {
  position: relative;
  z-index: 1;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navTitle'] {
  color: #ffffff !important;
  font-weight: 600;
  letter-spacing: 0.06em;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='close'] {
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  padding: 0 !important;
  border: 2px solid #35e0d0 !important;
  border-radius: 0 !important;
  background: #ff2e63 !important;
  color: #35e0d0 !important;
  box-shadow:
    2px 2px 0 #05060f,
    inset 0 0 0 1px rgba(255, 255, 255, 0.18) !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='close']:hover {
  background: #ff4a78 !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='close'] svg {
  width: 12px;
  height: 12px;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='actions'] button {
  border: 1px solid rgba(255, 255, 255, 0.28) !important;
  border-radius: 0 !important;
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] nav {
  background: var(--cl-retro-nav-surface);
  border-right: 1px solid rgba(200, 80, 150, 0.28);
  padding: 10px 8px 16px;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navCell'] {
  color: #cfc2e0 !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navCell']:hover {
  background: rgba(200, 80, 150, 0.08) !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navCell'][class*='active'] {
  color: #f0dff8 !important;
  background: linear-gradient(180deg, rgba(126, 14, 228, 0.28), rgba(30, 14, 45, 0.95)) !important;
  border: 1px solid rgba(210, 90, 170, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(53, 224, 208, 0.1),
    2px 2px 0 #05060f !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] {
  background: transparent;
  padding-top: 18px !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] {
  border-color: var(--cl-retro-window-border) !important;
  background: var(--cl-retro-window-surface) !important;
  box-shadow:
    inset 0 0 0 1px rgba(53, 160, 208, 0.35),
    0 0 0 1px rgba(43, 48, 184, 0.15),
    0 0 26px rgba(126, 14, 228, 0.18) !important;
  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.82);
  --dsw-alias-bg-layer-2: rgba(246, 242, 252, 0.96);
  --dsw-alias-border-l1: rgba(126, 14, 228, 0.16);
  --dsw-alias-border-l2: rgba(126, 14, 228, 0.24);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] nav {
  background: var(--cl-retro-nav-surface);
  border-right-color: rgba(176, 24, 106, 0.2);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] [class*='navCell'] {
  color: #3a205a !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] [class*='navCell']:hover {
  background: rgba(176, 24, 106, 0.06) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] [class*='navCell'][class*='active'] {
  color: #5a1f63 !important;
  background: linear-gradient(180deg, #f3dcf0, #e3d2fa) !important;
  border-color: rgba(176, 24, 106, 0.3) !important;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    2px 2px 0 rgba(80, 20, 60, 0.12) !important;
}

/* 右栏里每个标签页的承载格（dockkit pane）也补一层不透明底：
   文件预览 / 代码查看器这类 body 自己没底色，靠它兜住，避免透出下面的页面 */
html[data-dsh-closure-skin] [data-dockkit-pane] {
  background: #0d0f1e !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-dockkit-pane] {
  background: #f2f2f7 !important;
}
/* 右栏整列的不透明底：不管是「开始页」、图片预览、浏览器还是终端，
   所有标签页都落在这层上，不会再透出下面的对话 */
html[data-dsh-closure-skin] [data-sidebar-right-open] {
  background: linear-gradient(180deg, #171830 0%, #101226 38%, #0a0b16 100%) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-open] {
  background: linear-gradient(180deg, #faf8ff 0%, #f2f2f7 45%, #eceaf2 100%) !important;
}
/* 右栏全屏时，对话头部那一排按钮本来就被盖在下面了：
   这里把「更多操作」这类头部动作直接藏掉，避免它浮在右栏之上。 */
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='更多操作'],
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='More actions'],
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='その他の操作'],
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='Más acciones'],
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='Autres actions'],
html[data-dsh-closure-skin]:has([data-sidebar-right-panel='fullscreen']) [aria-label*='Weitere Aktionen'] {
  visibility: hidden !important;
  pointer-events: none !important;
}
/* 开始页：复用设置页的内容表面，但直接铺满整个右栏（不再是浮起来的卡片） */
html[data-dsh-closure-skin] [data-sidebar-right-guide] {
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  width: 100% !important;
  max-width: none !important;
  min-height: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 28px 24px !important;
  gap: 12px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: var(--cl-retro-content-surface) !important;
  box-shadow: none !important;
}
/* 开始页顶部的大图标：换成用户提供的立体方块图（隐藏原来的罗盘 svg） */
html[data-dsh-closure-skin] [data-sidebar-right-guide] [class*='hero'] {
  display: block !important;
  width: 72px !important;
  height: 64px !important;
  margin: 0 auto 14px !important;
  background: url('${ICON_GUIDE_HERO}') center / contain no-repeat;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] [data-sidebar-right-guide] [class*='hero'] > * {
  display: none !important;
}
/* 它外层那一格也要铺上同一张底，否则栏边会露出下面一层的画面 */
html[data-dsh-closure-skin] :has(> [data-sidebar-right-guide]) {
  padding: 0 !important;
  background: var(--cl-retro-content-surface) !important;
}
html[data-dsh-closure-skin] [data-sidebar-right-guide] > * {
  position: relative;
  z-index: 1;
}
/* 用宿主的 data-sidebar-right-guide-entry 定位入口按钮：不依赖类名与前缀层级，
   宿主换类名/包一层容器都不会失效 */
html[data-dsh-closure-skin] [data-sidebar-right-guide] [data-sidebar-right-guide-entry],
html[data-dsh-closure-skin] [data-sidebar-right-guide] button[aria-haspopup='menu']:not([data-sidebar-right-guide-entry] *) {
  min-height: 86px !important;
  border: 1px solid var(--cl-retro-card-border) !important;
  border-top: 3px solid var(--cl-retro-card-top) !important;
  border-radius: 0 !important;
  background: var(--cl-retro-card-surface) !important;
  color: #eadff5 !important;
  box-shadow: var(--cl-retro-card-shadow) !important;
  transform: none !important;
}
html[data-dsh-closure-skin] [data-sidebar-right-guide] [data-sidebar-right-guide-entry]:is(:hover, :focus-visible),
html[data-dsh-closure-skin] [data-sidebar-right-guide] button[aria-haspopup='menu']:not([data-sidebar-right-guide-entry] *):is(:hover, :focus-visible) {
  border-color: rgba(53, 224, 208, 0.42) !important;
  border-top-color: #ff8ac8 !important;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, rgba(190, 80, 140, 0.2), rgba(60, 54, 140, 0.2)) !important;
}
html[data-dsh-closure-skin] [data-sidebar-right-guide] kbd {
  border: 1px solid rgba(53, 224, 208, 0.48) !important;
  border-radius: 0 !important;
  background: rgba(5, 4, 15, 0.72) !important;
  color: #69efe1 !important;
  box-shadow: inset 0 0 0 1px rgba(126, 14, 228, 0.22) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-guide] {
  box-shadow:
    inset 0 0 0 1px rgba(53, 160, 208, 0.24),
    4px 4px 0 rgba(80, 20, 60, 0.12) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-guide] [data-sidebar-right-guide-entry],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-guide] button[aria-haspopup='menu']:not([data-sidebar-right-guide-entry] *) {
  color: #3a205a !important;
}
@media (min-width: 768px) {
  html[data-dsh-closure-skin] [data-shortcut-modal='settings'] {
    grid-template-rows: 40px minmax(0, 1fr) !important;
  }
  html[data-dsh-closure-skin] [data-shortcut-modal='settings']::before {
    height: 40px;
  }
  html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navTitle'] {
    padding: 10px 12px 6px 20px !important;
    font-size: 15px !important;
    line-height: 22px !important;
  }
  html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='header'] {
    height: 40px !important;
    padding: 8px 12px 6px 10px !important;
    align-items: center !important;
  }
}

/* ———— 设置内容：回归宿主默认组件 ————
   皮肤只负责：内容区背景、配色（由 body 级 --dsw-* token 继承）、字体，
   以及开关/滑块的像素样式；卡片 / 按钮 / 输入框 / 下拉 / 标签一律跟随宿主原生。 */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] {
  background: var(--cl-retro-content-surface) !important;
}

/* —— 开关（滑块）：保留像素轨道 + 方块钮 —— */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] {
  --cl-sw-line: rgba(200, 120, 190, 0.34);
  --cl-sw-line-hover: rgba(255, 120, 190, 0.55);
  --cl-sw-bg: linear-gradient(180deg, #2a1238, #120a20);
  --cl-sw-bg-on: linear-gradient(180deg, #b83a8f, #6a3fd6);
  --cl-sw-knob: linear-gradient(135deg, #ffffff 0%, #e6dcff 45%, #b9a5e0 100%);
  --cl-sw-knob-on: linear-gradient(180deg, #ffd0ea 0%, #ff3ea5 100%);
  --cl-sw-shadow: rgba(0, 0, 0, 0.34);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] {
  --cl-sw-line: rgba(176, 24, 106, 0.24);
  --cl-sw-line-hover: rgba(176, 24, 106, 0.42);
  --cl-sw-bg: linear-gradient(180deg, #ffffff, #f1e7ff);
  --cl-sw-bg-on: linear-gradient(180deg, #ffb3d8, #c3a4ff);
  --cl-sw-knob: linear-gradient(135deg, #ffffff, #f3ecff 45%, #cbb8ef);
  --cl-sw-knob-on: linear-gradient(180deg, #ffffff, #ff8ac8);
  --cl-sw-shadow: rgba(80, 20, 60, 0.12);
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch'] {
  position: relative !important;
  width: 44px !important;
  height: 24px !important;
  padding: 0 !important;
  border: 1px solid var(--cl-sw-line) !important;
  border-radius: 0 !important;
  background: var(--cl-sw-bg) !important;
  box-shadow: 2px 2px 0 var(--cl-sw-shadow) !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch'] > *:last-child:empty,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch']:not(:has(> *))::after {
  content: '' !important;
  position: absolute !important;
  top: 2px !important;
  left: 2px !important;
  width: 18px !important;
  height: 18px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: var(--cl-sw-knob) !important;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.7), inset -1px -1px 0 rgba(80, 50, 120, 0.45) !important;
  transition: transform 120ms ease-out;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch']:is([aria-checked='true'], [aria-pressed='true']) {
  background: var(--cl-sw-bg-on) !important;
  border-color: #ff3ea5 !important;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch']:is([aria-checked='true'], [aria-pressed='true']) > *:last-child:empty {
  background: var(--cl-sw-knob-on) !important;
  transform: translateX(20px);
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch']:not(:has(> *)):is([aria-checked='true'], [aria-pressed='true'])::after {
  background: var(--cl-sw-knob-on) !important;
  transform: translateX(20px);
}

/* 本插件自己的设置卡片：按宿主原生设置卡片的样子画，只保留开关滑块的像素样式 */
.clsk-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 0 24px;
  box-sizing: border-box;
}
.clsk-head { display: flex; flex-direction: column; gap: 4px; }
.clsk-heading {
  font-size: 16px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary, inherit);
}
.clsk-sub {
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary, inherit);
}
.clsk-card {
  background: var(--dsw-alias-card-fill, var(--dsw-alias-bg-layer-1));
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-xl, 12px);
  overflow: hidden;
}
.clsk-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.08));
}
.clsk-row:last-child { border-bottom: 0; }
.clsk-text { display: flex; flex-direction: column; gap: 2px; }
.clsk-title {
  font-size: 13px;
  color: var(--dsw-alias-label-primary, inherit);
}
.clsk-desc {
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary, inherit);
}
.clsk-select {
  flex: 0 0 auto;
  min-width: 160px;
  padding: 6px 10px;
  font: inherit;
  font-size: 13px;
  color: var(--dsw-alias-label-primary, inherit);
  background: var(--dsw-specific-selector, var(--dsw-alias-bg-layer-2));
  border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.12));
  border-radius: 8px;
  outline: none;
}
.clsk-select:focus-visible {
  border-color: var(--dsw-alias-border-selected, var(--dsw-alias-brand-primary, #7e0ee4));
}
.clsk-select:disabled { opacity: 0.5; }
.clsk-switch {
  flex: 0 0 auto;
  position: relative;
  width: 44px;
  height: 24px;
  padding: 0;
  border: 1px solid var(--cl-sw-line, rgba(200, 120, 190, 0.34));
  border-radius: 0;
  background: var(--cl-sw-bg, #1c0d2c);
  box-shadow: 2px 2px 0 var(--cl-sw-shadow, rgba(0, 0, 0, 0.34));
  cursor: pointer;
}
.clsk-switch.is-on {
  border-color: #ff3ea5;
  background: var(--cl-sw-bg-on, #b83a8f);
}
.clsk-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 0;
  background: var(--cl-sw-knob, #e6dcff);
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.7), inset -1px -1px 0 rgba(80, 50, 120, 0.45);
  transition: transform 120ms ease-out, background-color 120ms ease-out;
}
.clsk-switch.is-on .clsk-knob {
  transform: translateX(20px);
  background: var(--cl-sw-knob-on, #ffd0ea);
}

/* ———— 设置页控件：圆角统一换成「小半径 + 直线硬倒角（bevel）」 ————
   只改形状，不新增边框/底色/阴影。用逗号列表而不是 :is()，避免不同元素互相抬特异性。 */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] button,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='button'],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] select,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] input,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] textarea,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='tag' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='chip' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='badge' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='pill' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='stepper'],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='themeCube' i] {
  border-radius: var(--dsw-radius-sm, 3px) !important;
  corner-shape: bevel;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='card' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='tile' i],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='search' i] {
  border-radius: var(--dsw-radius-lg, 6px) !important;
  corner-shape: bevel;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [role='switch'],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] button.clsk-switch {
  border-radius: var(--dsw-radius-xs, 2px) !important;
  corner-shape: bevel;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navCell'] {
  corner-shape: bevel;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='actions'] button {
  border-radius: var(--dsw-radius-sm, 3px) !important;
  corner-shape: bevel;
}
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='card' i] button,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='card' i] [role='button'],
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='card' i] select,
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] [class*='card' i] input {
  border-radius: var(--dsw-radius-xs, 2px) !important;
}

/* ———— 设置弹窗内部：给 bg-base 一个低对比兜底 ————
   弹窗自己的底由 --cl-retro-window-surface 负责；
   内部组件（如插件市场的搜索行包裹层）如果用 --dsw-alias-bg-base 铺底，
   这里给一个半透明的同色系薄纱，让它和内容区背景只差一点点，
   而不是一块近黑、直角的硬板。 */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] {
  /* 宿主圆角 token：整族收小，所有用 var(--dsw-radius-*) 的组件自动跟上 */
  --dsw-radius-xs: 2px;
  --dsw-radius-sm: 3px;
  --dsw-radius-md: 4px;
  --dsw-radius-lg: 6px;
  --dsw-radius-xl: 8px;
  --dsw-radius-panel: 10px;
  --cl-sel-solid: #2b30b8;
  /* 选中态导航项的圆角：交给同一族 token */
  --cl-sel-radius: var(--dsw-radius-md, 4px);
  --dsw-alias-bg-base: rgba(22, 24, 52, 0.6);
  --dsw-alias-border-l2: rgba(190, 150, 255, 0.16);
  --dsw-alias-border-l3: rgba(190, 150, 255, 0.22);
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-shortcut-modal='settings'] {
  --cl-sel-solid: #c3dbff;
  --dsw-alias-bg-base: rgba(255, 255, 255, 0.5);
  --dsw-alias-border-l2: rgba(120, 40, 110, 0.14);
  --dsw-alias-border-l3: rgba(120, 40, 110, 0.2);
}

/* 市场搜索行的外层包裹：跟随控件的小倒角，避免直角硬块 */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] *:has(> [class*='tabSearchRow']) {
  border-radius: var(--dsw-radius-lg, 6px) !important;
  corner-shape: bevel;
}

/* ———— 主操作按钮：复用"选中"那套填充，规则只写一条 ————
   --cl-sel-* 是皮肤里已经存在的选中语言（设置页侧边栏选中、列表选中、页签选中都用它）；
   主按钮直接引用同一组 token，颜色/描边/投影只有一处定义。 */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='options'] :is(button, a):is(
  [class*='primary' i], [class*='recharge' i]
) {
  border: 1px solid var(--cl-sel-edge) !important;
  /* 选中语言是半透明渐变，叠在卡片上会显灰；垫一层同色实底，亮度对齐侧边栏选中 */
  background-color: var(--cl-sel-solid, #2b30b8) !important;
  background-image: var(--cl-sel-surface) !important;
  color: var(--cl-sel-ink) !important;
  box-shadow: var(--cl-sel-shadow) !important;
}

/* 设置页侧边栏选中项：与主按钮完全同一套填充（实底 + 扫描渐变 + 边 + 投影） */
html[data-dsh-closure-skin] [data-shortcut-modal='settings'] [class*='navCell'][class*='active' i] {
  background-color: var(--cl-sel-solid, #2b30b8) !important;
  background-image: var(--cl-sel-surface) !important;
  border-color: var(--cl-sel-edge) !important;
  color: var(--cl-sel-ink) !important;
  box-shadow: var(--cl-sel-shadow) !important;
}

/* ———— 通用浮层 / 选中行 / 导航选中：跨页面复用的像素选中语言 ————
   只用全局 token（--cl-retro-* / --cl-sel-*），不挂在 [data-shortcut-modal] 作用域下；
   设置页自己的规则特异性更高，所以设置页视觉保持不变。 */

/* 浮层：菜单 / 信息气泡 —— 紫边、斜切角、网格底、4px 硬阴影。
   只认确定的浮层角色：role='menu'、role='tooltip'、会话信息浮窗的 hoverContent。
   不把 role='listbox' 当浮层（它也可能是面板内的静态列表），也不按 popover 类名猜。 */
html[data-dsh-closure-skin] :is([role='menu'], [role='tooltip'], [class*='hoverContent']) {
  box-sizing: border-box;
  border: 2px solid rgba(136, 112, 176, 0.6) !important;
  border-radius: 6px !important;
  corner-shape: bevel;
  background:
    linear-gradient(rgba(126, 14, 228, 0.08) 1px, transparent 1px) 0 0 / 100% 6px,
    linear-gradient(90deg, rgba(126, 14, 228, 0.08) 1px, transparent 1px) 0 0 / 6px 100%,
    var(--cl-retro-window-surface) !important;
  box-shadow:
    0 0 0 1px #05060f,
    4px 4px 0 rgba(0, 0, 0, 0.4),
    0 0 18px rgba(126, 14, 228, 0.22) !important;
  color: #e8e8f0;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) :is([role='menu'], [role='tooltip'], [class*='hoverContent']) {
  border-color: rgba(126, 14, 228, 0.42) !important;
  background:
    linear-gradient(rgba(126, 14, 228, 0.05) 1px, transparent 1px) 0 0 / 100% 6px,
    linear-gradient(90deg, rgba(126, 14, 228, 0.05) 1px, transparent 1px) 0 0 / 6px 100%,
    var(--cl-retro-window-surface) !important;
  box-shadow:
    0 0 0 1px rgba(43, 48, 184, 0.12),
    4px 4px 0 rgba(80, 20, 60, 0.12),
    0 0 18px rgba(126, 14, 228, 0.14) !important;
  color: #2a1038;
}
/* 浮层里的高亮项：左侧青条 + 品红底 */
html[data-dsh-closure-skin] :is([role='menu'], [role='listbox']) :is([role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option']):is(:hover, :focus-visible, [data-highlighted], [aria-selected='true']) {
  border-radius: 0 !important;
  background: var(--cl-sel-sheen) !important;
  box-shadow: inset 2px 0 0 var(--cl-sel-edge) !important;
  color: var(--cl-sel-ink) !important;
}

/* ———— 推理等级菜单：按等级次序挂评级徽标（A / S / SS / SSS） ————
   等级项是 [role='menu'] 下那个 groups 容器里的 button[role='menuitemradio']，
   宿主按升序给出（Off → Low → High → Max），所以按位置对应徽标。 */
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio'] [class*='optionCopy'] {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
}
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio'] [class*='optionCopy']::before {
  content: '';
  flex: none;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  image-rendering: pixelated;
}
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio']:nth-child(1) [class*='optionCopy']::before {
  background-image: url('${ICON_RANK_A}');
}
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio']:nth-child(2) [class*='optionCopy']::before {
  background-image: url('${ICON_RANK_S}');
}
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio']:nth-child(3) [class*='optionCopy']::before {
  background-image: url('${ICON_RANK_SS}');
}
html[data-dsh-closure-skin] [role='menu'] [class*='groups']:not([role]) > button[role='menuitemradio']:nth-child(4) [class*='optionCopy']::before {
  background-image: url('${ICON_RANK_SSS}');
}

/* 选中行：列表 / 树 / 表格里的选中项；侧栏会话行保留自己的胶囊样式 */
html[data-dsh-closure-skin] :is([role='option'], [role='treeitem'], [role='row'], [role='gridcell'], [role='listitem'])[aria-selected='true']:not([data-slot='sidebar'] [data-row-key]),
html[data-dsh-closure-skin] [data-row-key][aria-selected='true']:not([data-slot='sidebar'] [data-row-key]) {
  position: relative;
  border: 1px solid var(--cl-sel-edge) !important;
  border-left-width: 3px !important;
  border-radius: 0 !important;
  background: var(--cl-sel-surface) !important;
  box-shadow: var(--cl-sel-shadow) !important;
  color: var(--cl-sel-ink) !important;
}
html[data-dsh-closure-skin] :is([role='option'], [role='treeitem'], [role='row'])[aria-selected='true']:not([data-slot='sidebar'] [data-row-key]) :is([class*='subtitle' i], [class*='secondary' i], small) {
  color: var(--cl-sel-ink-soft) !important;
}

/* 导航选中：页签 / 导航区里的 aria-current 条目 / 左栏单元格。
   排除 [data-index]：那是会话轮次导航条里的虚拟化刻度，不要选中包裹。 */
html[data-dsh-closure-skin] [role='tab'][aria-selected='true'],
html[data-dsh-closure-skin] [role='tablist'] :is(button, a)[aria-current]:not([aria-current='false']):not([data-index]),
html[data-dsh-closure-skin] :is(nav, [role='navigation'], [class*='nav' i]) :is(button, a)[aria-current]:not([aria-current='false']):not([data-index]),
html[data-dsh-closure-skin] [class*='navCell'][class*='active' i] {
  border: 1px solid var(--cl-sel-edge) !important;
  border-radius: var(--cl-sel-radius, 0) !important;
  background: var(--cl-sel-surface) !important;
  box-shadow: var(--cl-sel-shadow) !important;
  color: var(--cl-sel-ink) !important;
  letter-spacing: 0.04em;
}

/* 侧栏面板导航（插件 / 自动化任务 / 更多）的选中态：复用会话行那套选中效果 */
html[data-dsh-closure-skin] [class*='panelList'] button[aria-current]:not([aria-current='false']):not([data-index]) {
  --dsw-alias-label-primary: #e6fdff;
  --dsw-alias-label-secondary: #8fe9f0;
  --dsw-alias-label-tertiary: #6fd4df;
  --dsw-alias-label-caption: #6fd4df;
  border: 2px solid rgba(53, 224, 208, 0.7) !important;
  border-radius: 999px !important;
  background:
    repeating-linear-gradient(180deg, rgba(53, 224, 208, 0.09) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #3b70d0 0%, #2b56a8 55%, #1d3f82 100%) !important;
  box-shadow:
    0 0 0 1px #05060f,
    0 0 16px rgba(53, 224, 208, 0.35),
    inset 0 0 16px rgba(53, 224, 208, 0.12) !important;
  color: #e6fdff !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [class*='panelList'] button[aria-current]:not([aria-current='false']):not([data-index]) {
  --dsw-alias-label-primary: #12305f;
  --dsw-alias-label-secondary: #2f5a8f;
  --dsw-alias-label-tertiary: #4a6f9a;
  --dsw-alias-label-caption: #4a6f9a;
  border-color: rgba(53, 160, 208, 0.5) !important;
  background:
    repeating-linear-gradient(180deg, rgba(53, 160, 208, 0.06) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, #d7e8ff 0%, #c3dbff 55%, #aecdf7 100%) !important;
  box-shadow:
    0 0 0 1px rgba(43, 48, 184, 0.12),
    0 0 12px rgba(53, 160, 208, 0.18),
    inset 0 0 12px rgba(53, 160, 208, 0.06) !important;
  color: #12305f !important;
}

/* ———— 右栏（开始页）标签条：标签改成开始页卡片同款（方角 + 3px 顶条 + 扫描底） ———— */
html[data-dsh-closure-skin] [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab]) {
  box-sizing: border-box;
  border: 1px solid var(--cl-retro-card-border) !important;
  border-top: 3px solid var(--cl-retro-card-top) !important;
  border-radius: 0 !important;
  background: var(--cl-retro-card-surface) !important;
  box-shadow: var(--cl-retro-card-shadow) !important;
  color: #cfc6e2 !important;
  letter-spacing: 0.02em;
}
html[data-dsh-closure-skin] [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab])[aria-selected='true'],
html[data-dsh-closure-skin] [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab])[data-dockkit-tab-active] {
  border-top-color: #ff8ac8 !important;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 3px),
    linear-gradient(180deg, rgba(190, 80, 140, 0.2), rgba(60, 54, 140, 0.2)) !important;
  color: #f2e9fb !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab]) {
  color: #4a3f63 !important;
  background: linear-gradient(180deg, #ffffff 0 22%, #fcfaff 22% 45%, #f9f6fe 45% 70%, #f5f1fb 70%) !important;
}
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab])[aria-selected='true'],
html[data-dsh-closure-skin] body:not([data-ds-dark-theme]) [data-sidebar-right-open] :is([role='tab'], [data-dockkit-tab])[data-dockkit-tab-active] {
  border-top-color: #d62c84 !important;
  background: linear-gradient(180deg, #fdeef7 0%, #f7e8fb 55%, #efe4fb 100%) !important;
  color: #3a205a !important;
}

/* ———— 会话轮次导航条：去掉选中包裹，只留一根更粗的刻度 ————
   结构是 nav > div > div > button[data-index]，刻度画在按钮的 ::before 上；
   浅色模式刻度用紫、深色模式用青，横向加粗后仍然右对齐。 */
html[data-dsh-closure-skin] nav button[data-index]::before {
  width: 24px !important;
  height: 3px !important;
  border-radius: 2px !important;
}
html[data-dsh-closure-skin] nav button[data-index][aria-current='true']::before,
html[data-dsh-closure-skin] nav button[data-index]:is(:hover, :focus-visible)::before {
  background: var(--cl-turn-ink) !important;
  box-shadow: 0 0 6px var(--cl-turn-ink-glow) !important;
}

/* ———— 输入框光标：深色青 / 浅色紫（原生形状，只改颜色） ———— */
html[data-dsh-closure-skin] :is(textarea, input, [contenteditable]:not([contenteditable='false'])):not([data-composer-chip-selected]) {
  caret-color: var(--cl-caret-ink) !important;
}
`

    function BrandMark() {
      return h('span', { className: 'cl-brand', 'aria-hidden': true },
        h('img', { src: LOGO, alt: '', draggable: false }))
    }

    function BrandName() {
      return h('span', { className: 'cl-name' }, BRAND_NAME)
    }

    function HeroLogo() {
      return h('img', { className: 'cl-hero-logo', src: LOGO, alt: BRAND_NAME, draggable: false })
    }

    // ———— 皮肤设置：字体方案 / 中文字体 / 扫描线 ————
    const SETTINGS_KEY = 'dshcl-closure-skin-settings'
    const DEFAULT_SETTINGS = { font: 'mono', cjk: 'dengxian', scanlines: true, boot: true }

    function readSkinSettings() {
      try {
        const raw = localStorage.getItem(SETTINGS_KEY)
        if (!raw) return { ...DEFAULT_SETTINGS }
        const value = JSON.parse(raw)
        return {
          font: value && (value.font === 'pixel' || value.font === 'system') ? value.font : 'mono',
          cjk: value && value.cjk === 'yahei' ? 'yahei' : 'dengxian',
          scanlines: !(value && value.scanlines === false),
          boot: !(value && value.boot === false),
        }
      } catch (err) {
        return { ...DEFAULT_SETTINGS }
      }
    }

    function applySkinSettings(settings, persist) {
      const root = document.documentElement
      root.dataset.clFont = settings.font
      root.dataset.clCjk = settings.cjk
      root.dataset.clScanlines = settings.scanlines ? 'on' : 'off'
      if (settings.boot === false) clearBoot(document.querySelector('[data-cl-boot]'))
      if (persist) {
        try {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
        } catch (err) {}
      }
    }

    // ———— 开机入场 ————
    // 每个会话只播一次（sessionStorage），设置里可关，reduced-motion 下直接跳过。
    const BOOT_KEY = 'dshcl-closure-boot'
    const BOOT_SPAN_MS = 1180

    function bootAllowed(settings) {
      if (settings.boot === false) return false
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      } catch (err) {}
      try {
        if (window.sessionStorage.getItem(BOOT_KEY) === '1') return false
      } catch (err) {}
      return true
    }

    function playBoot(settings) {
      if (!bootAllowed(settings)) return null
      const layer = document.createElement('div')
      layer.className = 'cl-boot'
      layer.setAttribute('data-cl-boot', '')
      layer.setAttribute('aria-hidden', 'true')
      const mark = document.createElement('img')
      mark.className = 'cl-boot-mark'
      mark.src = LOGO
      mark.alt = ''
      mark.draggable = false
      layer.appendChild(mark)
      document.body.appendChild(layer)
      try { window.sessionStorage.setItem(BOOT_KEY, '1') } catch (err) {}
      return layer
    }

    function clearBoot(layer) {
      try {
        if (layer !== null && layer !== undefined && layer.parentNode) layer.parentNode.removeChild(layer)
      } catch (err) {}
    }

    function ClosureSettingRow(title, description, control) {
      return h('div', { className: 'clsk-row' },
        h('div', { className: 'clsk-text' },
          h('div', { className: 'clsk-title' }, title),
          h('div', { className: 'clsk-desc' }, description)),
        control)
    }

    function ClosureSelect(props) {
      return h('select', {
        className: 'clsk-select',
        value: props.value,
        disabled: props.disabled === true,
        onChange: (event) => { props.onChange(event.target.value) },
      }, props.options.map(([value, label]) => h('option', { key: value, value }, label)))
    }

    function ClosureSwitch(props) {
      return h('button', {
        type: 'button',
        className: props.checked ? 'clsk-switch is-on' : 'clsk-switch',
        'aria-pressed': props.checked,
        onClick: () => { props.onChange(!props.checked) },
      }, h('span', { className: 'clsk-knob', 'aria-hidden': true }))
    }

    function ClosureSettings() {
      const [state, setState] = React.useState(readSkinSettings)
      const update = (patch) => {
        const next = { ...state, ...patch }
        setState(next)
        applySkinSettings(next, true)
      }
      return h('div', { className: 'clsk-page' },
        h('div', { className: 'clsk-head' },
          h('div', { className: 'clsk-heading' }, '可露希尔主题'),
          h('div', { className: 'clsk-sub' }, '字体与外观只作用于这套主题，设置保存在本机。')),
        h('div', { className: 'clsk-card' },
          ClosureSettingRow('字体方案', '英文 Cascadia Mono；中文默认等线。', ClosureSelect({
            value: state.font,
            onChange: (font) => { update({ font }) },
            options: [
              ['mono', '等宽（Cascadia Mono + 中文）'],
              ['pixel', '像素（Fusion Pixel）'],
              ['system', '系统默认'],
            ],
          })),
          ClosureSettingRow('中文字体', '仅等宽方案生效。', ClosureSelect({
            value: state.cjk,
            onChange: (cjk) => { update({ cjk }) },
            disabled: state.font !== 'mono',
            options: [
              ['dengxian', '等线 DengXian'],
              ['yahei', '微软雅黑'],
            ],
          })),
          ClosureSettingRow('扫描线', 'CRT 扫描线与暗角。', ClosureSwitch({
            checked: state.scanlines,
            onChange: (scanlines) => { update({ scanlines }) },
          })),
          ClosureSettingRow('开机入场', '每次会话启动播一次 1.2s 扫描入场。', ClosureSwitch({
            checked: state.boot,
            onChange: (boot) => { update({ boot }) },
          }))
        )
      )
    }

    // —— 权限预设图标 ——
    // 三个权限图标是纯 <svg>，没有 data-icon；按 path 指纹给「图标容器」打 data-cl-perm。
    // 只在 DOM 变动后的下一帧同步刷新（rAF 早于绘制），因此没有轮询带来的闪烁。
    function installPermissionGlyphs() {
      const FINGERPRINTS = [
        ['read-only', 'M5.08545'],
        ['workspace-write', 'M6.4209'],
        ['full-access', 'M6.59624'],
      ]
      const CONTAINERS = "[class*='triggerIcon'], [class*='itemIcon']"

      function refresh(element) {
        const svg = element.querySelector('svg')
        let id = null
        if (svg !== null) {
          const markup = svg.innerHTML
          for (const [key, marker] of FINGERPRINTS) {
            if (markup.includes(marker)) {
              id = key
              break
            }
          }
        }
        if (id === null) {
          if (element.hasAttribute('data-cl-perm')) element.removeAttribute('data-cl-perm')
          return
        }
        if (element.getAttribute('data-cl-perm') !== id) element.setAttribute('data-cl-perm', id)
      }

      function sweep(scope) {
        const list = scope !== undefined ? scope : document
        if (list.matches && list.matches(CONTAINERS)) refresh(list)
        for (const element of list.querySelectorAll(CONTAINERS)) refresh(element)
      }

      // 只扫本次 DOM 变动涉及的子树；流式输出时不再每帧全文档 querySelectorAll
      const pending = new Set()
      let frame = 0
      function flush() {
        frame = 0
        const nodes = Array.from(pending)
        pending.clear()
        for (const node of nodes) sweep(node)
      }
      const observer = new window.MutationObserver((records) => {
        for (const record of records) {
          if (record.type === 'childList') {
            for (const node of record.addedNodes) if (node.nodeType === 1) pending.add(node)
          } else if (record.target && record.target.nodeType === 1) {
            pending.add(record.target)
          }
        }
        if (pending.size !== 0 && frame === 0) frame = window.requestAnimationFrame(flush)
      })
      if (!document.body) return () => {}
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-label', 'title'] })
      sweep()
      // 兜底：菜单复用旧节点、只换内部结构时低频补扫（3s，成本可忽略）
      const safety = window.setInterval(() => sweep(), 3000)
      return () => {
        observer.disconnect()
        if (frame !== 0) window.cancelAnimationFrame(frame)
        window.clearInterval(safety)
      }
    }

    // —— 状态行胶囊：横向对齐输入框卡片，底部不再额外下探 ——
    function installComposerCapsule() {
      let frame = 0
      let timer = 0
      let lastL = ''
      let lastR = ''

      function apply() {
        frame = 0
        const card = document.querySelector('[data-composer-card]')
        const dock = card !== null ? card.nextElementSibling : null
        if (dock === null) return
        if (!String(dock.className || '').includes('dock')) return
        const c = card.getBoundingClientRect()
        const d = dock.getBoundingClientRect()
        if (c.width < 1 || d.width < 1) return
        const ls = Math.max(0, Math.round(d.left - c.left)) + 'px'
        const rs = Math.max(0, Math.round(c.right - d.right)) + 'px'
        if (ls !== lastL) {
          lastL = ls
          dock.style.setProperty('--cl-dock-bleed-l', ls)
        }
        if (rs !== lastR) {
          lastR = rs
          dock.style.setProperty('--cl-dock-bleed-r', rs)
        }
      }

      function schedule() {
        if (frame !== 0) return
        frame = window.requestAnimationFrame(apply)
      }

      window.addEventListener('resize', schedule)
      timer = window.setInterval(apply, 2000)
      schedule()
      window.setTimeout(schedule, 300)

      return () => {
        if (frame !== 0) window.cancelAnimationFrame(frame)
        if (timer !== 0) window.clearInterval(timer)
        window.removeEventListener('resize', schedule)
        const card = document.querySelector('[data-composer-card]')
        const dock = card !== null ? card.nextElementSibling : null
        if (dock !== null) {
          dock.style.removeProperty('--cl-dock-bleed-l')
          dock.style.removeProperty('--cl-dock-bleed-r')
        }
      }
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const root = document.documentElement
        root.setAttribute('data-dsh-closure-skin', '')
        root.setAttribute('data-dsh-closure-mood', 'normal')
        const initialSettings = readSkinSettings()
        applySkinSettings(initialSettings, false)
        let bootLayer = null
        try {
          bootLayer = playBoot(initialSettings)
          if (bootLayer !== null) {
            window.setTimeout(() => {
              clearBoot(bootLayer)
              bootLayer = null
            }, BOOT_SPAN_MS)
          }
        } catch (err) {
          bootLayer = null
        }

        const style = document.createElement('style')
        style.setAttribute('data-plugin', 'dsh-closure-skin')
        style.textContent = CSS
        document.head.appendChild(style)

        // 原生窗口按钮的 preload 探针在 head 变更 / head load 时重采样；
        // 样式挂上后主动触发一次，让 caption 立即跟上皮肤配色。
        try {
          const resampleCaption = () => {
            try { document.head.dispatchEvent(new Event('load')) } catch (err) {}
          }
          if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(resampleCaption, { timeout: 1500 })
          } else {
            window.setTimeout(resampleCaption, 0)
          }
        } catch (err) {}

        // 背景场景层：body 级 fixed，z 0；#root 在 z 1（CSS 里）
        let sceneEl = null
        try {
          sceneEl = document.createElement('div')
          sceneEl.className = 'cl-scene'
          sceneEl.setAttribute('aria-hidden', 'true')
          document.body.appendChild(sceneEl)
        } catch (err) {
          sceneEl = null
        }

        // 右侧系统按钮组的 L 形边线（仅 Windows titlebar 显示）
        let controlsEl = null
        try {
          controlsEl = document.createElement('div')
          controlsEl.className = 'cl-caption-controls'
          controlsEl.setAttribute('aria-hidden', 'true')
          document.body.appendChild(controlsEl)
        } catch (err) {
          controlsEl = null
        }

        // 权限图标：菜单行按需渲染，所以用轮询贴标记。
        let permissionGlyphsDispose = null
        try {
          permissionGlyphsDispose = installPermissionGlyphs()
        } catch (err) {
          permissionGlyphsDispose = null
        }

        // 状态行胶囊：横向按实际布局对齐到输入框卡片
        let composerCapsuleDispose = null
        try {
          composerCapsuleDispose = installComposerCapsule()
        } catch (err) {
          composerCapsuleDispose = null
        }


        let disposed = false
        let timer = 0
        let pollDelay = 5000

        // 情绪通道：只轮询桌宠状态；主题不再猜，直接用 body[data-ds-dark-theme]
        // 桌宠没装/路由没起时失败退避到 30s，别每 3s 打一次 404。
        async function poll() {
          try {
            const res = await fetch('/dsh-closure/state', { cache: 'no-store' })
            if (!res.ok) throw new Error('no state')
            const s = await res.json()
            if (disposed) return
            let mood = 'normal'
            if (s && s.balance && s.balance.low) mood = 'sad'
            else if (s && s.period === 'peak') mood = 'peak'
            if (root.getAttribute('data-dsh-closure-mood') !== mood) {
              root.setAttribute('data-dsh-closure-mood', mood)
            }
            pollDelay = 5000
          } catch (err) {
            pollDelay = Math.min(pollDelay * 2, 30000)
            if (!disposed && root.getAttribute('data-dsh-closure-mood') !== 'normal') {
              root.setAttribute('data-dsh-closure-mood', 'normal')
            }
          }
          if (!disposed) timer = window.setTimeout(poll, pollDelay)
        }
        poll()

        // 深度求索中的随机台词：按已用时分三档，每 6 秒换一句
        const RUNNING_LINES = {
          0: [
            '这就帮你算...',
            '让本天才看看这玩意儿...',
            '唉，又来活了，工程部也是要休息的好吧...',
          ],
          1: [
            '等一下，我的天才大脑正在转...',
            '别催别催，在算了在算了...',
            '可露希尔正在疯狂敲键盘...',
            '正在调用工程部算力...',
            '正在计算本次咨询的报价单...',
            '这单的运算量有点大，博士，准备好你的龙门币了吗？',
          ],
          2: [
            '龙门币燃烧中...',
            '正在绕过凯尔希的权限...',
            '博士，这步推理可是要加钱的哦...',
            '正在扣除博士的私房钱...',
            '为什么这个逻辑它偏偏能跑...',
          ],
        }
        const runningState = new WeakMap()

        function runningSeconds(text) {
          let match = text.match(/用时\s*(\d+)\s*分\s*(\d+)\s*秒/)
          if (match) return Number(match[1]) * 60 + Number(match[2])
          match = text.match(/用时\s*(\d+)\s*秒/)
          if (match) return Number(match[1])
          match = text.match(/用时\s*(\d+)\s*分/)
          if (match) return Number(match[1]) * 60
          return null
        }

        function pickRunningLine(tier, previous) {
          const lines = RUNNING_LINES[tier]
          if (lines.length === 1) return lines[0]
          let next = previous
          while (next === previous) next = lines[Math.floor(Math.random() * lines.length)]
          return next
        }

        function renderRunningLabel(el, state) {
          const text = el.textContent || ''
          const index = text.indexOf('深度求索中')
          const suffix = index >= 0 ? text.slice(index + '深度求索中'.length) : (state.suffix || '')
          state.suffix = suffix
          if (state.renderedLabel !== state.line) {
            state.renderedLabel = state.line
            el.style.setProperty('--cl-running-label', JSON.stringify(state.line))
          }
          if (state.renderedSuffix !== suffix) {
            state.renderedSuffix = suffix
            el.style.setProperty('--cl-running-suffix', JSON.stringify(suffix))
          }
        }

        // 只缓存当前运行中的元素：没有就每秒重查，有就复用；10s 或元素断开时重查一次
        let runningCache = []
        let runningCacheAt = 0

        function updateRunningStatuses() {
          const now = Date.now()
          if (runningCache.length === 0 || now - runningCacheAt > 10000 || runningCache.some((el) => !el.isConnected)) {
            runningCache = Array.from(document.querySelectorAll('[class*="runningText"]'))
            runningCacheAt = now
          }
          for (const el of runningCache) {
            const text = el.textContent || ''
            let state = runningState.get(el)
            if (!state) {
              if (!text.includes('深度求索中')) continue
              const parsed = runningSeconds(text)
              state = {
                startedAt: now - (parsed === null ? 0 : parsed * 1000),
                line: '',
                suffix: '',
                tier: -1,
                swappedAt: 0,
              }
              runningState.set(el, state)
            }
            if (!text.includes('深度求索中') && state.line === '') continue
            const parsed = runningSeconds(text)
            const elapsed = parsed === null ? Math.max(0, (now - state.startedAt) / 1000) : parsed
            const tier = elapsed < 10 ? 0 : elapsed < 45 ? 1 : 2
            if (state.tier !== tier || state.line === '' || now - state.swappedAt > 6000) {
              state.line = pickRunningLine(tier, state.line)
              state.tier = tier
              state.swappedAt = now
            }
            renderRunningLabel(el, state)
          }
        }

        updateRunningStatuses()
        const runningTimer = window.setInterval(updateRunningStatuses, 1000)

        // 新会话首屏标题：随机替换“探索未至之境”
        const HERO_LINES = [
          'Hello~博士今天有什么要帮忙的吗',
          '我的工作台里应有尽有~',
          '全自动检索上线！别客气，随便问！',
          '罗德岛超级总工程师在线值班中~',
          '只要在供货清单上，什么答案都能帮你搞定！',
          '出血大服务！今天所有问题一律打十一折！',
          '终端已就绪，博士！',
          '今天想查点什么？',
        ]
        let lastHeroLine = ''
        let heroVisible = false
        let heroTypeState = null

        function stopHeroTyping() {
          if (heroTypeState !== null && heroTypeState.timer) window.clearInterval(heroTypeState.timer)
          if (heroTypeState !== null && heroTypeState.el) heroTypeState.el.removeAttribute('data-cl-hero-typing')
          heroTypeState = null
        }

        function startHeroTyping(title, phrase) {
          stopHeroTyping()
          title.setAttribute('data-cl-hero-title', '')
          title.setAttribute('data-cl-hero-typing', '')
          title.style.setProperty('--cl-hero-label', JSON.stringify(phrase.slice(0, 1)))
          const state = { el: title, phrase, index: 1, timer: 0 }
          heroTypeState = state
          state.timer = window.setInterval(() => {
            if (!state.el.isConnected) {
              stopHeroTyping()
              return
            }
            state.index += 1
            state.el.style.setProperty('--cl-hero-label', JSON.stringify(state.phrase.slice(0, state.index)))
            if (state.index >= state.phrase.length) {
              window.clearInterval(state.timer)
              state.timer = 0
              state.el.removeAttribute('data-cl-hero-typing')
              if (heroTypeState === state) heroTypeState = null
            }
          }, 80)
        }

        function pickHeroLine() {
          if (HERO_LINES.length === 1) return HERO_LINES[0]
          let next = lastHeroLine
          while (next === lastHeroLine) next = HERO_LINES[Math.floor(Math.random() * HERO_LINES.length)]
          lastHeroLine = next
          return next
        }

        function replaceHeroTitle() {
          const root = document.querySelector('[data-phase="hero"]')
          if (!root) {
            stopHeroTyping()
            heroVisible = false
            return false
          }
          const title = root.querySelector('[class*="titleGroup"] > span:first-child')
          if (!title) return false
          if (!heroVisible) {
            heroVisible = true
            stopHeroTyping()
            title.removeAttribute('data-cl-hero-title')
            title.style.removeProperty('--cl-hero-label')
          }
          if (!title.hasAttribute('data-cl-hero-title')) {
            startHeroTyping(title, pickHeroLine())
          }
          return true
        }

        replaceHeroTitle()
        const heroTimer = window.setInterval(replaceHeroTitle, 2000)

        ctx.effect(() => () => {
          disposed = true
          stopHeroTyping()
          if (timer) window.clearTimeout(timer)
          if (runningTimer) window.clearInterval(runningTimer)
          if (heroTimer) window.clearInterval(heroTimer)
          try { style.remove() } catch (err) {}
          try { if (sceneEl && sceneEl.parentNode) sceneEl.parentNode.removeChild(sceneEl) } catch (err) {}
          try { if (controlsEl && controlsEl.parentNode) controlsEl.parentNode.removeChild(controlsEl) } catch (err) {}
          try { if (permissionGlyphsDispose !== null) permissionGlyphsDispose() } catch (err) {}
          try { if (composerCapsuleDispose !== null) composerCapsuleDispose() } catch (err) {}
          permissionGlyphsDispose = null
          clearBoot(document.querySelector('[data-cl-boot]'))
          root.removeAttribute('data-dsh-closure-skin')
          root.removeAttribute('data-dsh-closure-mood')
          root.removeAttribute('data-cl-font')
          root.removeAttribute('data-cl-cjk')
          root.removeAttribute('data-cl-scanlines')
        })

        ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.register({
          name: 'sidebar.brand.mark', id: 'closure-brand',
          // 单槽同优先级只允许一个注册，负数才能盖过官方内置（值最小者渲染）
          priority: -10,
        }, BrandMark))

        ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({
          name: 'sidebar.brand.name', id: 'closure-brand-name',
          // 同上：与官方 sidebar.brand.name 同槽，必须用负优先级
          priority: -10,
        }, BrandName))

        ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register({
          name: 'conversation.hero.brand.mark', id: 'closure-hero-logo',
          // 同上：首屏徽标槽也有官方注册
          priority: -10,
        }, HeroLogo))

        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'closure-skin',
          order: 100,
          label: () => (document.documentElement.lang || '').toLowerCase().startsWith('zh') ? '可露希尔主题' : 'Closure Theme',
        }, ClosureSettings))
      },
    }
  },
})
