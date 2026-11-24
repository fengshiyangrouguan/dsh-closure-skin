"""把 filter 的发光/压暗烘焙进 PNG，生成 src/icons/*-glow.png / *-light.png。

mask 模式：输出黑色 RGB + 加宽的 alpha（mask 只用 alpha，颜色仍由 CSS 的
           background-color 决定，所以深浅主题都能自动换色）。
paint 模式：发光画在图标下面，可选压暗/降饱和/第二层暗影。
"""
from PIL import Image, ImageFilter, ImageChops

SRC = "src/icons"
OUT = "src/icons"

# (源文件, 输出, 模式, core 渲染尺寸, 发光渲染半径, 颜色, 强度, 压暗, 饱和, 暗影)
CONFIG = [
    ("src/logo-88.png",            "logo-glow.png",              "paint", 24, 5.0, (126, 14, 228), 0.45, 1.0, 1.0, None),
    ("src/icons/plugin-cat.png",   "plugin-glow.png",            "mask",  20, 4.0, None, 0.60, 1.0, 1.0, None),
    ("src/icons/bot.png",          "bot-glow.png",               "mask",  20, 4.0, None, 0.60, 1.0, 1.0, None),
    ("src/icons/more.png",         "more-glow.png",              "mask",  16, 4.0, None, 0.60, 1.0, 1.0, None),
    ("src/icons/pin-arrow.png",    "pin-glow.png",               "mask",  16, 4.0, None, 0.60, 1.0, 1.0, None),
    ("src/icons/archive.png",      "archive-glow.png",           "mask",  16, 4.0, None, 0.60, 1.0, 1.0, None),
    ("src/icons/refresh-replay.png", "refresh-glow.png",         "paint", 16, 3.0, (225, 241, 255), 0.40, 1.0, 1.0, None),
    ("src/icons/refresh-replay.png", "refresh-light-glow.png",   "paint", 16, 3.0, (126, 14, 228), 0.30, 0.62, 1.0, None),
    ("src/icons/folder-closed.png", "folder-closed-glow.png",     "paint", 16, 1.5, None, 0.0, 1.0, 1.0, None),
    ("src/icons/folder-closed.png", "folder-closed-light-glow.png", "paint", 16, 1.5, (43, 48, 184), 0.85, 0.86, 1.0, ((0, 1), (20, 20, 40), 0.35, 1.0)),
    ("src/icons/folder-open.png",  "folder-open-glow.png",       "paint", 16, 1.5, None, 0.0, 1.0, 1.0, None),
    ("src/icons/folder-open.png",  "folder-open-light-glow.png", "paint", 16, 1.5, (43, 48, 184), 0.85, 1.0, 1.0, ((0, 1), (20, 20, 40), 0.35, 0.8)),
    ("src/icons/perm-lock.png",    "perm-lock-light.png",        "paint", 18, 0.0, None, 0.0, 0.5, 1.1, None),
    ("src/icons/perm-unlock.png",  "perm-unlock-light.png",      "paint", 18, 0.0, None, 0.0, 0.5, 1.1, None),
    ("src/icons/perm-full.png",    "perm-full-light.png",        "paint", 18, 0.0, None, 0.0, 0.5, 1.1, None),
]


def load(path):
    return Image.open(path).convert("RGBA")


def adjust(base, darken, sat):
    if darken == 1.0 and sat == 1.0:
        return base
    px = base.load()
    out = base.copy()
    o = out.load()
    for y in range(base.height):
        for x in range(base.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            r, g, b = r * darken, g * darken, b * darken
            if sat != 1.0:
                gray = 0.299 * r + 0.587 * g + 0.114 * b
                r = gray + (r - gray) * sat
                g = gray + (g - gray) * sat
                b = gray + (b - gray) * sat
            o[x, y] = (int(max(0, min(255, r))), int(max(0, min(255, g))), int(max(0, min(255, b))), a)
    return out


def halo_mask(base_alpha, blur, strength):
    m = base_alpha.filter(ImageFilter.GaussianBlur(blur))
    if strength != 1.0:
        m = m.point(lambda v: int(v * strength))
    return m


def bake(src, dst, mode, core, glow, color, strength, darken, sat, extra):
    base = adjust(load(src), darken, sat)
    w, h = base.size
    ref = h if 'logo-88' in src else max(w, h)
    pad = 0 if glow <= 0 else max(1, round(glow * ref / core))
    W, H = w + 2 * pad, h + 2 * pad
    base_alpha = base.split()[3]

    def placed(mask_img):
        canvas = Image.new("L", (W, H), 0)
        canvas.paste(mask_img, (pad, pad))
        return canvas

    alpha_full = placed(base_alpha)

    if mode == "mask":
        if glow <= 0:
            out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            out.putalpha(alpha_full)
        else:
            halo = halo_mask(alpha_full, pad * 0.55, strength)
            combined = ImageChops.lighter(alpha_full, halo)
            out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            out.putalpha(combined)
    else:
        out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        if glow > 0 and color is not None:
            halo = halo_mask(alpha_full, pad * 0.55, strength)
            hcol = Image.new("RGBA", (W, H), color + (0,))
            hcol.putalpha(halo)
            out = Image.alpha_composite(out, hcol)
        if extra is not None:
            (ox, oy), ecolor, estrength, eblur = extra
            ealpha = Image.new("L", (W, H), 0)
            ealpha.paste(base_alpha, (pad + round(ox * pad / max(1, glow)), pad + round(oy * pad / max(1, glow))))
            ealpha = halo_mask(ealpha, max(1.0, pad * 0.35 * eblur), estrength)
            ecol = Image.new("RGBA", (W, H), ecolor + (0,))
            ecol.putalpha(ealpha)
            out = Image.alpha_composite(out, ecol)
        body = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        body.paste(base, (pad, pad))
        out = Image.alpha_composite(out, body)

    glow_render = 0 if glow <= 0 else pad * core / (h if 'logo-88' in src else max(w, h))
    box = core + 2 * glow_render
    target = max(32, round(box * 2))
    if max(W, H) > target:
        ratio = target / max(W, H)
        out = out.resize((max(1, round(W * ratio)), max(1, round(H * ratio))), Image.LANCZOS)
    out.save(dst, optimize=True)
    return dst, (w, h), out.size, pad


for cfg in CONFIG:
    src, name, mode, core, glow, color, strength, darken, sat, extra = cfg
    dst = f"{OUT}/{name}"
    path, size, out_size, pad = bake(src, dst, mode, core, glow, color, strength, darken, sat, extra)
    print(f"{name:34s} {size[0]}x{size[1]} -> {out_size[0]}x{out_size[1]}  pad={pad}px")
