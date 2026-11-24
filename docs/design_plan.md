# 可露希尔皮肤设置页设计规范
> 作用范围：DeepSeek Harness 设置弹窗（`[data-shortcut-modal='settings']`）。
> 非本规范范围：应用全局背景、场景层、侧边栏、主顶栏及对话消息区。

## 1. 核心取舍

**设置页内部复用宿主原生控件结构，不再整套重绘。** 皮肤在该区域仅介入四项视觉层：

1. **色彩映射**：通过 `body` 级 `--dsw-*` 与 `--cl-*` 变量驱动明/暗两套主题配色
2. **背景层次**：保留内容区 CRT 渐变底与全局扫描线、暗角叠加层
3. **字体方案**：继承全局字体配置（等宽 / 像素 / 系统默认）
4. **自定义开关/滑块**：作为唯一保留的独立自定义控件实现

窗口边框、像素风格标题栏、左侧导航栏与关闭按钮属于全局/顶栏视觉体系，保持原有样式。

**放弃 v2 整页重绘的原因**：早期尝试全面接管并重画设置页控件，但大量控件仍保留宿主 DOM 结构，导致视觉割裂（“半套皮肤”），且每增加一类控件覆盖都会放大后续跟随宿主升级的维护成本。复用成熟原生结构、仅做必要视觉桥接，维护性与一致性更可控。

## 2. 保留与继承范围

| 模块 / 视觉元素 | 作用域 | 处理策略 |
|---|---|---|
| 场景背景、扫描线与暗角 | 全局 | 保持不变 |
| 侧边栏、顶栏、窗口按钮与标题字标 | 全局 | 保持不变 |
| 设置窗口外框、像素标题栏与关闭按钮 | `[data-shortcut-modal='settings']` | 保持不变 |
| 左侧导航栏（含选中状态） | 设置窗口 `nav` | 保持不变，导航选中圆角交由 `--cl-sel-radius` 控制 |
| 内容区 CRT 渐变背景 | 设置页 `[class*='options']` | 唯一保留的内容区背景层 |
| 字体方案 | 全局 | 保持不变 |
| 开关 / 滑块 | 设置页内及 `.clsk-switch` | 见第 3 节规范 |

### 2.1 设计令牌批量映射

宿主部分原生组件直接读取 `--dsw-specific-selector`、`--dsw-alias-card-fill`、`--dsw-alias-button-*` 及 `--dsw-static-neutral-*` 等变量，而非仅依赖 `bg-base` / `layer-1` / `layer-2`。若未同步覆盖这些变量，对应控件会回退至宿主默认灰或偏绿/橄榄色调。

当前在 `body` 作用域下按明、暗两套主题批量映射以下变量族：

* **卡片与容器**：`--dsw-alias-card-fill`、`--dsw-alias-card-fill-hover`、`--dsw-alias-card-tile-fill`
* **选择器与浮层**：`--dsw-specific-selector`、`--dsw-specific-menu`、`--dsw-specific-tip`、`--dsw-alias-menu-group-header-fill`、`--dsw-alias-hovercard-bg`、`--dsw-alias-tooltip-bg`、`--dsw-alias-toast-bg`
* **按钮与交互状态**：`--dsw-alias-button-elevated-fill`、`--dsw-alias-button-floating-fill`、`--dsw-alias-button-floating-hover`、`--dsw-alias-button-ghost-active-fill`、`--dsw-alias-button-ghost-hover-fill`、`--dsw-alias-button-ghost-hover-border`、`--dsw-alias-button-tool-bar-fill`、`--dsw-alias-button-tool-bar-hover`、`--dsw-alias-interactive-bg-hover`、`--dsw-alias-interactive-bg-active`、`--dsw-alias-interactive-bg-hover-accent`、`--dsw-alias-interactive-bg-hover-solid`
* **层级与边框**：`--dsw-alias-bg-layer-3`、`--dsw-alias-bg-module-platform`、`--dsw-alias-bg-multi-select`、`--dsw-alias-border-l2`、`--dsw-alias-border-l3`、`--dsw-alias-switch-thumb`
* **静态中性色阶**：将 `--dsw-static-neutral-00` 至 `--dsw-static-neutral-1000`（及关联的 `--dsw-static-neutral-bluish-*` 引用）统一收敛为蓝紫灰阶，避免绕过别名变量的节点露出默认中性灰/偏绿底色。

## 3. 控件视觉规范

### 3.1 开关与滑块

* **轨道**：尺寸 `44×24`，边框 `1px`（暗色主题 `rgba(200,120,190,.34)`，浅色主题 `rgba(176,24,106,.24)`），零圆角，未激活态底色为深紫渐变与 `2px` 硬投影。
* **滑块**：尺寸 `18×18` 方块，零圆角，叠加像素高光内阴影（`1px` 浅色高光与 `1px` 暗紫阴影）。
* **激活态与过渡**：激活后轨道切换为渐变（`#b83a8f → #6a3fd6`）与粉色描边，滑块切换为粉白渐变并横向位移 `20px`，过渡动画为 `transform 120ms ease-out`。
* **适配路径**：兼容宿主带子节点（`[role='switch'] > *:last-child:empty`）与无子节点（`:not(:has(> *))::after`）两种开关渲染结构，以及插件自有 `.clsk-switch` / `.clsk-knob` 控件，保持一致视觉。

### 3.2 小半径与硬倒角（`corner-shape: bevel`）

设置页内控件不再沿用宿主较大的圆角设定，而是收敛圆角令牌并启用 `corner-shape: bevel` 实现 45° 硬切角效果，仅调整轮廓形状，不额外叠加边框、底色或阴影：

| 控件类别 | 圆角令牌与规格 |
|---|---|
| 按钮、下拉框、输入框、标签、Chip、步进器、主题块 | `var(--dsw-radius-sm)`（`3px`）+ `bevel` |
| 卡片、Tile、搜索框（含 `[class*='tile' i]`） | `var(--dsw-radius-lg)`（`6px`）+ `bevel` |
| 卡片内部按钮、输入框与开关轨道 | `var(--dsw-radius-xs)`（`2px`）+ `bevel` |
| 左侧导航项（含选中态） | `var(--dsw-radius-md)`（`4px`）+ `bevel`（选中态由 `--cl-sel-radius` 承接） |
| 顶部操作按钮 | `var(--dsw-radius-sm)`（`3px`）+ `bevel` |

设置弹窗作用域（`[settings]`）内收敛圆角变量规模：

```css
[settings] {
  --dsw-radius-xs: 2px;
  --dsw-radius-sm: 3px;
  --dsw-radius-md: 4px;
  --dsw-radius-lg: 6px;
  --dsw-radius-xl: 8px;
  --dsw-radius-panel: 10px;
}
```

导航选中态移除历史写死的 `border-radius: 0 !important`，改为通过 `--cl-sel-radius` 联动，并在设置页作用域下指向 `var(--dsw-radius-md)`，同时以更高选择器优先级覆盖宿主全局 `corner-shape` 设定。

### 3.3 包裹层低对比兜底

针对弹窗内由宿主自动生成的容器包裹层（如搜索行外层与部分 `.5px` 描边容器），避免将 `--dsw-alias-bg-base` 设为近黑实色导致生硬块面，改为低对比度半透明层与柔和描边：

```css
[settings] {
  --dsw-alias-bg-base: rgba(22, 24, 52, 0.42);
  --dsw-alias-border-l2: rgba(190, 150, 255, 0.16);
  --dsw-alias-border-l3: rgba(190, 150, 255, 0.22);
}

body:not([data-ds-dark-theme]) [settings] {
  --dsw-alias-bg-base: rgba(255, 255, 255, 0.5);
  --dsw-alias-border-l2: rgba(120, 40, 110, 0.14);
  --dsw-alias-border-l3: rgba(120, 40, 110, 0.2);
}

[settings] [class*='options'] *:has(> [class*='tabSearchRow']) {
  border-radius: 6px !important;
  corner-shape: bevel;
}
```

### 3.4 主操作按钮复用选中态样式

设置页中的主操作按钮（匹配 `primary` 或 `recharge` 类名）直接复用 `--cl-sel-*` 选中态变量，与导航选中态保持一致的视觉语言；`danger` 类危险操作按钮不纳入该规则，避免误导性高亮：

```css
[settings] [class*='options'] :is(button, a):is([class*='primary' i], [class*='recharge' i]) {
  border: 1px solid var(--cl-sel-edge) !important;
  background-color: var(--cl-sel-solid) !important;
  background-image: var(--cl-sel-surface) !important;
  color: var(--cl-sel-ink) !important;
  box-shadow: var(--cl-sel-shadow) !important;
}
```

其中 `--cl-sel-solid`（暗色 `#2b30b8`，亮色 `#c3dbff`）用于为半透明渐变提供实底衬垫，防止叠在浅色卡片上时发灰。

## 4. 插件自有设置卡片

`.clsk-card` 不再独立绘制复杂装饰框，直接跟随宿主卡片令牌与边框变量：

```css
.clsk-card {
  background: var(--dsw-alias-card-fill, var(--dsw-alias-bg-layer-1));
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-xl, 12px);
}
```

## 5. 移除项

本次迭代清理了以下冗余或过度干预的样式与补丁：

* **重复卡片装饰**：移除此前叠加的卡片边框、顶条、投影及 `:has(> cardHead)` 匹配规则，避免与宿主原生卡片形成“框套框”。
* **整类控件重绘**：移除按钮、输入框、下拉框、步进器、标签、Chip、徽章与主题块的独立重绘规则，回归宿主默认表现。
* **标题强行改造**：移除 `h1` 渐变文字与 `h2` 大写发丝线等脱离原生层级的设计。
* **废弃变量与补丁**：清理 `--cl-ctl-*`、 `--cl-sx-*` 及两代设置页样式表，同时移除 16 条重复属性选择器与 63 处哨兵规则。

## 6. 实测对比

| 指标 | 原始 | v2（重绘） | v3（当前方案） |
|---|---|---|---|
| CSS 规则数 | 328 | 264 | **258** |
| `[class*=]` 选择器 | 498 | 261 | **222** |
| 大小写不敏感属性选择器 | 100 | 46 | **15** |
| `!important` 声明数 | 689 | 515 | **428** |
| `:has()` 选择器 | 48 | 32 | **28** |
| 注入 CSS 体积 | 103.8 KB | 77.5 KB | **77.3 KB** |
| 模板总行数 | 3127 | 2675 | **2624** |

## 7. 后续局部兜底原则

若升级或切换主题后，个别控件出现对比度不足（如深色背景下浅色输入框），**仅针对该具体控件补充 1–2 条颜色声明做局部兜底**，不扩大为整类控件重绘。兜底规则统一放入 `src/client.template.js` 的“设置内容”区块，保持精简并写明原因。