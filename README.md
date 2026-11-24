<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e293b,50:334155,100:0f172a&height=165&section=header&text=dsh-closure-skin&fontSize=44&fontColor=f8fafc&animation=twinkling" alt="dsh-closure-skin banner" width="100%" />

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&duration=2800&pause=900&color=38BDF8&center=true&vCenter=true&width=640&lines=DeepSeek%20Harness%20%E5%8F%AF%E9%9C%B2%E5%B8%8C%E5%B0%94%E4%B8%BB%E9%A2%98%E7%9A%AE%E8%82%A4;%E6%B7%B1%2F%E6%B5%85%E8%89%B2%20CRT%20%E9%85%8D%E8%89%B2%C2%B7%E6%89%AB%E6%8F%8F%E7%BA%BF%C2%B7%E5%83%8F%E7%B4%A0%E5%9B%BE%E6%A0%87;%E5%A4%9A%E5%A5%97%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97%E4%BD%93%E6%96%B9%E6%A1%88%EF%BC%8C%E4%B8%80%E9%94%AE%E5%88%87%E6%8D%A2%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%A7%86%E8%A7%89" alt="Typing SVG" />

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Runtime: DeepSeek Harness](https://img.shields.io/badge/Host-DeepSeek%20Harness-0ea5e9?style=flat-square)](https://github.com/deepseek-ai/deepseek-harness)
[![Theme: CRT + Pixel](https://img.shields.io/badge/Style-CRT%20%2B%20Pixel%20Icons-10b981?style=flat-square)](#效果预览)
[![Fonts: Fusion Pixel + Orbitron](https://img.shields.io/badge/Fonts-Fusion%20Pixel%20%2B%20Orbitron-f59e0b?style=flat-square)](#字体方案)

</div>

适用于 DeepSeek Harness 的《明日方舟》可露希尔主题客户端皮肤——融合复古未来主义机能美学与 CRT 终端视觉，提供深/浅色暗调玻璃拟态配色、扫描线纹理与定制像素图标，并支持自由切换多套中英文字体方案。

> [!WARNING]
> 本仓库为个人二次创作主题皮肤，角色主题元素源自《明日方舟》相关设定；插件代码按 MIT 许可证提供，内置字体遵循各自开源协议（如 Fusion Pixel 12px 与 Orbitron 均为 SIL OFL 1.1），详见仓库内 `FONT-NOTICE.md` 与 `LICENSE-FONT`。

---

## 快速开始

### 1. 从仓库安装

在 **Plugins → Add plugin** 中填入仓库地址：

```text
[https://github.com/fengshiyangrouguan/dsh-closure-skin](https://github.com/fengshiyangrouguan/dsh-closure-skin)
```

或者手动编辑对应 profile 的 `package.json`，添加依赖并将插件名加入 `dsh.profile.bundles`：

```json
{
  "dependencies": {
    "dsh-closure-skin": "github:fengshiyangrouguan/dsh-closure-skin"
  },
  "dsh": {
    "profile": {
      "bundles": ["dsh-closure-skin"]
    }
  }
}
```

### 2. 本地开发安装

将依赖指向本地目录，同样需要加入 `dsh.profile.bundles`：

```json
{
  "dependencies": {
    "dsh-closure-skin": "link:<本地路径>/dsh-closure-skin"
  },
  "dsh": {
    "profile": {
      "bundles": ["dsh-closure-skin"]
    }
  }
}
```

> [!IMPORTANT]
> 首次安装或更新涉及字体路由的服务端部分后，请重启一次 DSH 以确保字体服务生效。

---

## 核心功能

### 视觉与界面表现

* **复古未来主义主题**：提供深色与浅色霓虹终端配色风格，搭配扫描线效果与暗色玻璃拟态，兼顾复古终端质感与界面可读性。
* **图标替换**：覆盖插件、自动化任务、更多、刷新、加载、文件夹、置顶、归档等高频界面图标，统一视觉语言。
* **可调主题选项**：在 **设置 → 可露希尔主题** 中可随时切换字体方案、中文字体与扫描线效果。

### 字体方案

* **默认组合**：英文使用 **Cascadia Mono**，中文使用 **DengXian（等线）**。
* **可选像素与标题字体**：支持切换至 **Fusion Pixel**（12px，作者 TakWolf，SIL OFL 1.1）或系统默认字体；顶栏标题字标采用 **Orbitron Black**（OFL）。

---

## 效果预览

- 页面效果预览
![alt text](docs/image/image.png)

- 主题配置界面
![alt text](docs/image/image-1.png)

- 另一种字体方案（**不想折磨自己的眼睛的话就不要使用！！**）
![alt text](docs/image/image-2.png)
---

## 项目结构与构建

```text
├── cordis.patch.yml            # DSH bundle 入口配置
├── docs/
│   └── design.md               # 设置页视觉规范、层级与控件约定
├── lib/
│   ├── index.js                # 宿主侧入口，提供字体路由
│   ├── client.js               # 构建生成的客户端脚本（勿手改）
│   └── fonts/                  # Fusion Pixel 12px 与 Orbitron 字体文件
├── src/
│   ├── client.template.js      # 客户端界面模板
│   └── icons/                  # 像素图标素材
└── tools/
    ├── build-client.mjs          # 构建客户端脚本工具
    └── preview-settings.mjs      # 设置页渲染预览与校验脚本
```

### 本地构建与预览

修改 `src/client.template.js` 或 `src/icons/` 后，需重新生成客户端脚本（不要直接手改 `lib/client.js`）：

```sh
node tools/build-client.mjs
```

如需快速查看设置页渲染效果或做结构校验：

```sh
node tools/preview-settings.mjs <输出前缀>
node tools/preview-settings.mjs <输出前缀> --verify
```

> 发布或复制插件目录时，请连同构建产物 `lib/`（含 `lib/fonts/`）一起保留。

---

## 仓库趋势与贡献者

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=fengshiyangrouguan/dsh-closure-skin&type=Date)](https://star-history.com/#fengshiyangrouguan/dsh-closure-skin&Date)

<br />

<a href="https://github.com/fengshiyangrouguan/dsh-closure-skin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fengshiyangrouguan/dsh-closure-skin" alt="Contributors" />
</a>

</div>

### 参与贡献（All Contributors）

欢迎通过 Issue 或 Pull Request 提出建议、补充图标/样式或完善文档，常见贡献方向包括：

| 贡献类型 | 标识 | 说明 |
|---|---|---|
| 样式与代码 | 💻 | 主题样式调整、构建脚本与设置项优化 |
| 图标与视觉 | 🎨 | 图标补充、主题细节打磨 |
| 文档与说明 | 📖 | README 与设计规范文档完善 |
| 问题反馈 | 🐛 | 复现步骤清晰的样式异常或兼容性反馈 |

---

## 许可证

代码部分采用 [MIT License](LICENSE)；内置字体及衍生视觉素材的授权说明请参见 [`FONT-NOTICE.md`](FONT-NOTICE.md) 与 [`LICENSE-FONT`](LICENSE-FONT)。