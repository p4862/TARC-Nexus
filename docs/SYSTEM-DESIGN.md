<!-- @format -->

# System Design

## Online Exhibition System

### Collaborative Development – Visit Malaysia 2026 (VM2026)

Source: `VM2026_Guidelines.pdf` — _Visit Malaysia Truly Asia 2026 Brand Guidelines_ (31 pages)
Version: 2.0

---

# 0. How To Read This Document

This document has two kinds of rules. **Do not confuse them.**

| Marker         | Meaning                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ |
| 🔒 **BRAND**   | Taken directly from the official VM2026 Brand Guidelines. **Not negotiable.** Do not "improve" it. |
| 🛠 **DERIVED** | Our engineering decision for the web build. The PDF is silent here. Change only with team approval. |

The brand guidelines are a **print and advertising** document. They define the logo, the colour
palette, and the typefaces — and nothing else. They say nothing about spacing scales, border radii,
dark mode, component states, focus rings, or breakpoints. Everything in those areas is 🛠 DERIVED and
is our responsibility to keep consistent.

Related documents:

- `docs/SYSTEM-ARCHITECTURE.md` — layers, project structure, request lifecycle
- `docs/SYSTEM-MODULES.md` — functional requirements and modules
- `docs/SYSTEM-DATABASE.md` — schema

---

# 0.1 Amendment — Generated-Design Palette Precedence (2026-08-02) 🛠 DERIVED (owner-approved override)

> **Active override for the current build.** The project owner approved matching
> the generated Figma design's visual identity (master-plan Revised Fidelity
> Directive; handoff decision **D-011**). For the TARC Nexus VM2026 Online
> Exhibition build, the **generated palette and typography take precedence over
> the 🔒 BRAND colour ramp and typeface rules in Sections 1–3**:
>
> - Primary/chrome colour is the generated red `#e60023` (not `vm-blue-500`).
> - Body type is **Inter**; display type is **Fraunces** (not Nunito Sans /
>   Oswald).
> - Surfaces are the generated warm-cream set; radii follow the 16px/32px/pill
>   system.
> - Authoritative token values live in `resources/css/app.css`; the mapping and
>   rationale are in `docs/FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md`.
>
> This is a deliberate, documented deviation from the official VM2026 Brand
> Guidelines, accepted by the owner. The 🔒 BRAND sections below are retained as
> the official reference and as the fallback if this decision is reversed; they
> are not deleted. The structural 🛠 DERIVED rules (spacing, states, focus,
> breakpoints, accessibility) remain in force unchanged.

---

# 1. Brand Foundation

## 1.1 Logo Rationale 🔒 BRAND

The VM2026 logo is built from four deliberate ideas. Our UI should echo these ideas, not decorate
over them.

| Element                | Meaning                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Pattern of Harmony** | Batik-inspired design and colour scheme symbolising the unity and traditions of Malaysia's five key ethnic groups: Malays, Chinese, Indians, Sabahans, and Sarawakians. |
| **Bunga Raya Icon**    | The hibiscus, Malaysia's national flower — beauty, unity, and pride; the nation's spirit.                            |
| **"Truly Asia"**       | The iconic *Malaysia Truly Asia* tagline is retained, with improved letter spacing for balance and visual appeal.    |
| **Font**               | Draws inspiration from Malaysia's traditional wood carving craftsmanship.                                           |

**Design implication for the exhibition site:** the multi-colour palette *is* the Pattern of Harmony.
Diversity of colour is the point — but it belongs in **content and category signalling**, not in
chrome. Navigation, forms, and dashboards stay quiet; the projects bring the colour.

## 1.2 Campaign Voice 🔒 BRAND

- Campaign tagline example from the guidelines: _"Discover Asia's Best in One Extraordinary Destination."_
- Official campaign site: `www.malaysia.travel`

## 1.3 Design Principles 🛠 DERIVED

**Celebrate Malaysia, subtly.** Use the brand palette and imagery as accents. Avoid heavy-handed
patriotic ornament — the logo already carries the symbolism.

**Content first.** Student projects are the product. The interface must never out-shout a project
thumbnail. Use whitespace generously.

**One dominant colour per screen.** With eight brand colours available, restraint is the whole
discipline. Pick one lead colour per page; the rest are accents.

**Consistency.** Spacing, radii, typography, and motion are shared tokens. A page that invents its
own values is a bug.

**Accessibility is mandatory.** See §9. Several brand colours fail contrast for text — this is a
measured fact, not an opinion, and the palette must be used accordingly.

**Responsive first.** Design mobile up. The exhibition will be browsed on phones.

---

# 2. Colour

## 2.1 Official Primary Palette 🔒 BRAND

The guidelines define **8 core colours**: _"They are central to the brand's identity and should be
prominently used across all platforms."_

Values exactly as printed in the guidelines:

| #   | HEX       | CMYK              | RGB (as printed) | Our token name |
| --- | --------- | ----------------- | ---------------- | -------------- |
| 1   | `#2054A3` | 94 / 75 / 1 / 0   | 28 / 85 / 165    | `vm-blue`      |
| 2   | `#EB2226` | 1 / 99 / 98 / 0   | 236 / 32 / 39    | `vm-red`       |
| 3   | `#03B1A8` | 76 / 4 / 0 / 0    | 13 / 179 / 169   | `vm-teal`      |
| 4   | `#FBBE14` | 1 / 26 / 99 / 0   | 253 / 191 / 19   | `vm-yellow`    |
| 5   | `#66308D` | 75 / 98 / 3 / 0   | 102 / 49 / 143   | `vm-purple`    |
| 6   | `#213E7C` | 100 / 88 / 4 / 7  | 32 / 64 / 154    | `vm-navy`      |
| 7   | `#8EC440` | 50 / 1 / 98 / 0   | 142 / 198 / 65   | `vm-green`     |
| 8   | `#CA2029` | 14 / 100 / 96 / 4 | 205 / 33 / 43    | `vm-crimson`   |

> **Token names are ours, not official.** The guidelines do not name the individual colours. The
> names above exist so developers can talk about them; they carry no brand authority.

### ⚠️ Data discrepancy in the source document

Two colours have a printed RGB triplet that does not match their own printed HEX:

| HEX       | HEX decodes to  | Printed RGB   | Delta         |
| --------- | --------------- | ------------- | ------------- |
| `#213E7C` | (33, 62, **124**) | (32, 64, **154**) | **B +30** |
| `#03B1A8` | (**3**, 177, 168) | (**13**, 179, 169) | R −10   |

The remaining six agree within ±4 per channel (normal CMYK→RGB rounding).

**Rule: for anything digital, the HEX value is authoritative.** It is the value that will actually be
rendered, and `#213E7C` is the darker, more usable navy. Do not "fix" these to the printed RGB. If
the team obtains official digital brand assets, re-verify this table against them.

## 2.2 Extended Ramps 🛠 DERIVED

The brand gives one flat value per colour. A web UI needs hover states, borders, tinted backgrounds,
and dark-mode variants. These ramps are generated from the official value (fixed at step `500`) by
mixing toward white and near-black, and every step below has been **measured**, not estimated.

`C/W` = contrast ratio against white. `C/D` = contrast against `#111827`.

### vm-blue — base `#2054A3`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#F4F6FA` | 1.08  | 16.40 |
| 100  | `#E4EAF4` | 1.21  | 14.68 |
| 200  | `#C5D3E7` | 1.52  | 11.70 |
| 300  | `#9DB4D7` | 2.11  | 8.40  |
| 400  | `#6387BF` | 3.65  | 4.86  |
| 500  | `#2054A3` | 7.35  | 2.41  |
| 600  | `#1D498C` | 8.81  | 2.01  |
| 700  | `#193D72` | 10.76 | 1.65  |
| 800  | `#16315A` | 12.95 | 1.37  |
| 900  | `#132745` | 14.96 | 1.19  |
| 950  | `#101D31` | 16.91 | 1.05  |

### vm-navy — base `#213E7C`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#F4F5F8` | 1.09  | 16.27 |
| 100  | `#E4E8EF` | 1.23  | 14.43 |
| 200  | `#C5CDDD` | 1.60  | 11.11 |
| 300  | `#9DAAC5` | 2.34  | 7.59  |
| 400  | `#6478A3` | 4.41  | 4.02  |
| 500  | `#213E7C` | 10.27 | 1.73  |
| 600  | `#1E366B` | 11.70 | 1.52  |
| 700  | `#1A2E58` | 13.33 | 1.33  |
| 800  | `#162646` | 15.00 | 1.18  |
| 900  | `#131E36` | 16.58 | 1.07  |
| 950  | `#101827` | 17.77 | 1.00  |

### vm-teal — base `#03B1A8`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#F2FBFB` | 1.05  | 16.87 |
| 100  | `#E1F6F5` | 1.12  | 15.80 |
| 200  | `#BDEBE8` | 1.30  | 13.70 |
| 300  | `#90DDD9` | 1.55  | 11.43 |
| 400  | `#4FC8C2` | 2.02  | 8.76  |
| 500  | `#03B1A8` | 2.67  | 6.64  |
| 600  | `#049890` | 3.56  | 4.98  |
| 700  | `#067C76` | 5.06  | 3.51  |
| 800  | `#07615D` | 7.30  | 2.43  |
| 900  | `#084A47` | 10.09 | 1.76  |
| 950  | `#093432` | 13.56 | 1.31  |

### vm-yellow — base `#FBBE14`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#FFFCF3` | 1.03  | 17.29 |
| 100  | `#FFF7E3` | 1.07  | 16.61 |
| 200  | `#FEEEC2` | 1.15  | 15.39 |
| 300  | `#FDE298` | 1.27  | 13.95 |
| 400  | `#FCD25A` | 1.45  | 12.25 |
| 500  | `#FBBE14` | 1.68  | 10.54 |
| 600  | `#D7A313` | 2.30  | 7.72  |
| 700  | `#AE8511` | 3.41  | 5.21  |
| 800  | `#886810` | 5.21  | 3.41  |
| 900  | `#664F0E` | 7.81  | 2.27  |
| 950  | `#47380D` | 11.42 | 1.55  |

### vm-green — base `#8EC440`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#F9FCF5` | 1.04  | 17.12 |
| 100  | `#F1F8E8` | 1.09  | 16.33 |
| 200  | `#E2F0CD` | 1.19  | 14.85 |
| 300  | `#CDE5AB` | 1.36  | 13.00 |
| 400  | `#B0D679` | 1.65  | 10.76 |
| 500  | `#8EC440` | 2.08  | 8.55  |
| 600  | `#7AA838` | 2.81  | 6.32  |
| 700  | `#64892F` | 4.07  | 4.36  |
| 800  | `#4F6B27` | 6.06  | 2.93  |
| 900  | `#3D511F` | 8.77  | 2.02  |
| 950  | `#2C3918` | 12.31 | 1.44  |

### vm-purple — base `#66308D`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#F7F5F9` | 1.08  | 16.37 |
| 100  | `#EDE6F1` | 1.22  | 14.52 |
| 200  | `#D7C9E1` | 1.58  | 11.26 |
| 300  | `#BCA4CD` | 2.25  | 7.88  |
| 400  | `#946EAF` | 4.11  | 4.32  |
| 500  | `#66308D` | 8.85  | 2.00  |
| 600  | `#582A7A` | 10.36 | 1.71  |
| 700  | `#492463` | 12.24 | 1.45  |
| 800  | `#3A1E4F` | 14.20 | 1.25  |
| 900  | `#2E193C` | 15.90 | 1.12  |
| 950  | `#22142C` | 17.44 | 1.02  |

### vm-red — base `#EB2226`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#FEF4F4` | 1.08  | 16.44 |
| 100  | `#FDE4E5` | 1.21  | 14.70 |
| 200  | `#FAC6C7` | 1.50  | 11.80 |
| 300  | `#F69EA0` | 2.04  | 8.72  |
| 400  | `#F16467` | 3.11  | 5.71  |
| 500  | `#EB2226` | 4.38  | 4.05  |
| 600  | `#C91F22` | 5.67  | 3.13  |
| 700  | `#A31B1D` | 7.69  | 2.31  |
| 800  | `#7F1719` | 10.30 | 1.72  |
| 900  | `#601415` | 13.06 | 1.36  |
| 950  | `#431112` | 15.82 | 1.12  |

### vm-crimson — base `#CA2029`

| Step | Hex       | C/W   | C/D   |
| ---- | --------- | ----- | ----- |
| 50   | `#FCF4F4` | 1.08  | 16.38 |
| 100  | `#F9E4E5` | 1.22  | 14.58 |
| 200  | `#F1C5C7` | 1.55  | 11.45 |
| 300  | `#E89DA1` | 2.15  | 8.25  |
| 400  | `#DA6369` | 3.52  | 5.04  |
| 500  | `#CA2029` | 5.60  | 3.17  |
| 600  | `#AD1D24` | 7.05  | 2.52  |
| 700  | `#8D191F` | 9.16  | 1.94  |
| 800  | `#6E161B` | 11.71 | 1.52  |
| 900  | `#541316` | 14.17 | 1.25  |
| 950  | `#3B1012` | 16.55 | 1.07  |

## 2.3 Contrast Reality Check 🛠 DERIVED

At their **official base values**, on white:

| Colour       | C/W   | Safe for body text on white? | Safe as fill with **white** text? |
| ------------ | ----- | ---------------------------- | --------------------------------- |
| `vm-navy`    | 10.27 | ✅ Yes                        | ✅ Yes                             |
| `vm-purple`  | 8.85  | ✅ Yes                        | ✅ Yes                             |
| `vm-blue`    | 7.35  | ✅ Yes                        | ✅ Yes                             |
| `vm-crimson` | 5.60  | ✅ Yes                        | ✅ Yes                             |
| `vm-red`     | 4.38  | ⚠️ Large text / UI only (≥3.0) | ⚠️ Large text only                |
| `vm-teal`    | 2.67  | ❌ No                         | ❌ No — use **dark** text on it    |
| `vm-green`   | 2.08  | ❌ No                         | ❌ No — use **dark** text on it    |
| `vm-yellow`  | 1.68  | ❌ No                         | ❌ No — use **dark** text on it    |

**Consequences you must design around:**

- `vm-yellow`, `vm-green`, and `vm-teal` are **fill and accent colours only**. Never white text on them.
  Pair them with `vm-navy-900` or near-black text.
- `vm-red` `#EB2226` at 4.38 sits just under the 4.5 AA body-text threshold. For error *text*, use
  `vm-red-600` `#C91F22` (5.67) or `vm-crimson` `#CA2029` (5.60).
- The brand's most legible colours are the blues and the purple. That is why the UI chrome leans on them.

## 2.4 Semantic Roles 🛠 DERIVED

Mapped onto the brand palette wherever the brand supports it, with contrast-safe substitutes where it
does not.

| Role                | Token                     | Value     | Notes                                                                |
| ------------------- | ------------------------- | --------- | -------------------------------------------------------------------- |
| Primary action      | `vm-blue-500`             | `#2054A3` | Buttons, links, active nav. 7.35 with white text.                     |
| Primary hover       | `vm-blue-600`             | `#1D498C` |                                                                       |
| Headings / deep UI  | `vm-navy-500`             | `#213E7C` | Page titles, footer, dark surfaces.                                   |
| Accent              | `vm-teal-500`             | `#03B1A8` | Decorative fills, chart series, highlights. Dark text only.           |
| Accent (text-safe)  | `vm-teal-700`             | `#067C76` | When the accent must carry text (5.06).                               |
| Highlight           | `vm-yellow-500`           | `#FBBE14` | Featured/award ribbons, star ratings. Dark text only.                 |
| Secondary emphasis  | `vm-purple-500`           | `#66308D` | Category variety, secondary charts.                                   |
| Success             | `vm-green-700`            | `#64892F` | Text/icon (4.07 — AA for large & UI). Fill: `vm-green-500`.           |
| Success (body text) | `vm-green-800`            | `#4F6B27` | 6.06 — use when success text is small.                                |
| Warning             | `vm-yellow-800`           | `#886810` | Text (5.21). Fill: `vm-yellow-500` with dark text.                    |
| Error / destructive | `vm-crimson-500`          | `#CA2029` | 5.60. Aligns with brand red family.                                   |
| Info                | `vm-blue-500`             | `#2054A3` | Same as primary.                                                      |

> **Note:** `vm-green-700` and friends are **derived**, not official brand colours. Official base
> values are step `500` only. Semantic states are UI plumbing, not brand expression.

## 2.5 Neutrals & Surfaces 🛠 DERIVED

The brand defines no neutrals. We use a slightly blue-leaning neutral so greys sit naturally beside
`vm-navy`.

| Token           | Light      | Dark       | Use                        |
| --------------- | ---------- | ---------- | -------------------------- |
| `background`    | `#FFFFFF`  | `#101827`  | Page background            |
| `surface`       | `#F8FAFC`  | `#16213A`  | Cards, panels              |
| `surface-muted` | `#F1F5F9`  | `#1C2A46`  | Subtle sections, table rows |
| `border`        | `#E2E8F0`  | `#2A3B5C`  | Dividers, input borders    |
| `foreground`    | `#0F172A`  | `#F1F5F9`  | Body text                  |
| `muted-fg`      | `#64748B`  | `#94A3B8`  | Secondary text, captions   |

Dark surfaces are drawn from the `vm-navy` ramp so dark mode still reads as VM2026.

## 2.6 Category Colour Assignment 🛠 DERIVED

`SYSTEM-DATABASE.md` defines the project categories (application types). Assign brand colours by
**hashing the category slug to a fixed index** so a category keeps its colour across every page. Never
assign randomly at render time.

Rotation order (all 8, honouring the Pattern of Harmony):

```
vm-blue → vm-teal → vm-yellow → vm-purple → vm-green → vm-crimson → vm-navy → vm-red
```

Badge recipe: `{color}-100` background, `{color}-800` text, `{color}-200` border.

This pattern is contrast-safe for **all eight** colours. Measured `-800` text on `-100` background:

| Colour     | Ratio | Colour       | Ratio |
| ---------- | ----- | ------------ | ----- |
| `vm-navy`  | 12.21 | `vm-crimson` | 9.62  |
| `vm-purple`| 11.63 | `vm-red`     | 8.54  |
| `vm-blue`  | 10.72 | `vm-teal`    | 6.50  |
| `vm-green` | 5.58  | `vm-yellow`  | 4.87  |

All pass AA body text (≥4.5). `vm-yellow` is the tightest at 4.87 — if you darken the badge background
or lighten the text, re-measure that pairing first. The `-200` border is decorative (≈1.1–1.3 against
the fill) and carries no contrast requirement.

SDG badges use the official UN SDG colours, **not** the VM2026 palette — SDG 8 `#A21942`,
SDG 11 `#FD9D24`, SDG 12 `#BF8B2E`. These are a separate, externally-owned identity system; do not
recolour them to match the brand.

---

# 3. Design Tokens (Implementation)

## 3.1 Tailwind CSS v4 🛠 DERIVED

Tailwind v4 is CSS-first — there is no `tailwind.config.js` colour block. Define tokens in
`resources/css/app.css`.

```css
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

@theme {
  /* ---- VM2026 official brand colours (base = 500) ---- */
  --color-vm-blue-50: #f4f6fa;
  --color-vm-blue-100: #e4eaf4;
  --color-vm-blue-200: #c5d3e7;
  --color-vm-blue-300: #9db4d7;
  --color-vm-blue-400: #6387bf;
  --color-vm-blue-500: #2054a3; /* OFFICIAL */
  --color-vm-blue-600: #1d498c;
  --color-vm-blue-700: #193d72;
  --color-vm-blue-800: #16315a;
  --color-vm-blue-900: #132745;
  --color-vm-blue-950: #101d31;

  --color-vm-navy-50: #f4f5f8;
  --color-vm-navy-100: #e4e8ef;
  --color-vm-navy-200: #c5cddd;
  --color-vm-navy-300: #9daac5;
  --color-vm-navy-400: #6478a3;
  --color-vm-navy-500: #213e7c; /* OFFICIAL */
  --color-vm-navy-600: #1e366b;
  --color-vm-navy-700: #1a2e58;
  --color-vm-navy-800: #162646;
  --color-vm-navy-900: #131e36;
  --color-vm-navy-950: #101827;

  --color-vm-teal-50: #f2fbfb;
  --color-vm-teal-100: #e1f6f5;
  --color-vm-teal-200: #bdebe8;
  --color-vm-teal-300: #90ddd9;
  --color-vm-teal-400: #4fc8c2;
  --color-vm-teal-500: #03b1a8; /* OFFICIAL */
  --color-vm-teal-600: #049890;
  --color-vm-teal-700: #067c76;
  --color-vm-teal-800: #07615d;
  --color-vm-teal-900: #084a47;
  --color-vm-teal-950: #093432;

  --color-vm-yellow-50: #fffcf3;
  --color-vm-yellow-100: #fff7e3;
  --color-vm-yellow-200: #feeec2;
  --color-vm-yellow-300: #fde298;
  --color-vm-yellow-400: #fcd25a;
  --color-vm-yellow-500: #fbbe14; /* OFFICIAL */
  --color-vm-yellow-600: #d7a313;
  --color-vm-yellow-700: #ae8511;
  --color-vm-yellow-800: #886810;
  --color-vm-yellow-900: #664f0e;
  --color-vm-yellow-950: #47380d;

  --color-vm-purple-50: #f7f5f9;
  --color-vm-purple-100: #ede6f1;
  --color-vm-purple-200: #d7c9e1;
  --color-vm-purple-300: #bca4cd;
  --color-vm-purple-400: #946eaf;
  --color-vm-purple-500: #66308d; /* OFFICIAL */
  --color-vm-purple-600: #582a7a;
  --color-vm-purple-700: #492463;
  --color-vm-purple-800: #3a1e4f;
  --color-vm-purple-900: #2e193c;
  --color-vm-purple-950: #22142c;

  --color-vm-green-50: #f9fcf5;
  --color-vm-green-100: #f1f8e8;
  --color-vm-green-200: #e2f0cd;
  --color-vm-green-300: #cde5ab;
  --color-vm-green-400: #b0d679;
  --color-vm-green-500: #8ec440; /* OFFICIAL */
  --color-vm-green-600: #7aa838;
  --color-vm-green-700: #64892f;
  --color-vm-green-800: #4f6b27;
  --color-vm-green-900: #3d511f;
  --color-vm-green-950: #2c3918;

  --color-vm-red-50: #fef4f4;
  --color-vm-red-100: #fde4e5;
  --color-vm-red-200: #fac6c7;
  --color-vm-red-300: #f69ea0;
  --color-vm-red-400: #f16467;
  --color-vm-red-500: #eb2226; /* OFFICIAL */
  --color-vm-red-600: #c91f22;
  --color-vm-red-700: #a31b1d;
  --color-vm-red-800: #7f1719;
  --color-vm-red-900: #601415;
  --color-vm-red-950: #431112;

  --color-vm-crimson-50: #fcf4f4;
  --color-vm-crimson-100: #f9e4e5;
  --color-vm-crimson-200: #f1c5c7;
  --color-vm-crimson-300: #e89da1;
  --color-vm-crimson-400: #da6369;
  --color-vm-crimson-500: #ca2029; /* OFFICIAL */
  --color-vm-crimson-600: #ad1d24;
  --color-vm-crimson-700: #8d191f;
  --color-vm-crimson-800: #6e161b;
  --color-vm-crimson-900: #541316;
  --color-vm-crimson-950: #3b1012;

  /* ---- Typography ---- */
  --font-display: "DIN Next", "Oswald", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Filson Pro", "Nunito Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "JetBrains Mono", "Fira Code", monospace;

  /* ---- Radius ---- */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}
```

## 3.2 shadcn/ui Semantic Variables 🛠 DERIVED

shadcn/ui components read semantic variables, not brand tokens. Bridge them once, here — then never
hardcode a brand hex inside a component.

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;

  --primary: #2054a3; /* vm-blue-500 */
  --primary-foreground: #ffffff;

  --secondary: #f1f5f9;
  --secondary-foreground: #213e7c; /* vm-navy-500 */

  --muted: #f1f5f9;
  --muted-foreground: #64748b;

  --accent: #e1f6f5; /* vm-teal-100 */
  --accent-foreground: #07615d; /* vm-teal-800 */

  --destructive: #ca2029; /* vm-crimson-500 */
  --destructive-foreground: #ffffff;

  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #2054a3; /* vm-blue-500 */

  --radius: 0.75rem;
}

.dark {
  --background: #101827; /* vm-navy-950 */
  --foreground: #f1f5f9;
  --card: #16213a;
  --card-foreground: #f1f5f9;
  --popover: #16213a;
  --popover-foreground: #f1f5f9;

  --primary: #6387bf; /* vm-blue-400 — lifted for dark bg */
  --primary-foreground: #101827;

  --secondary: #1c2a46;
  --secondary-foreground: #f1f5f9;

  --muted: #1c2a46;
  --muted-foreground: #94a3b8;

  --accent: #07615d; /* vm-teal-800 */
  --accent-foreground: #e1f6f5;

  --destructive: #da6369; /* vm-crimson-400 — lifted for dark bg */
  --destructive-foreground: #101827;

  --border: #2a3b5c;
  --input: #2a3b5c;
  --ring: #6387bf;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

> **Dark mode is 🛠 DERIVED.** The brand guidelines do not cover it. Note that `vm-blue-500` on the
> dark background scores only ~2.4, so dark mode lifts primary to `vm-blue-400`. Never reuse the light
> primary on dark surfaces.

---

# 4. Typography

## 4.1 Official Typefaces 🔒 BRAND

| Role                       | Typeface                 | Guideline notes                                                                                                    |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Logo only**              | `against Regular`        | The logo's primary font. Sturdy, low-contrast, geometric serif; high legibility for display and text.                |
| **Campaign theme**         | `DIN Bold Italic 2014`   | Gives the brand a distinctive look. Used in Above the Line, Below the Line, and Digital Communications.              |
| **Campaign taglines (№1)** | `Filson Medium`          | Unifies all communication materials; professional and contemporary.                                                 |
| **Subheadings (№2)**       | `Filson Pro Bold Italic` | Denotes subheadings relating to **places of interest, tourism spots, locations**, etc.                              |

🔒 The guidelines state these fonts _"should not be substituted in any major communication materials
such as advertisements, corporate collateral, signage, gifts, etc."_

## 4.2 Web Font Reality ⚠️ 🛠 DERIVED

**`against`, `DIN 2014`, and `Filson Pro` are all commercially licensed typefaces.** A student
project almost certainly does not hold a webfont licence for them, and self-hosting unlicensed
webfonts is a licensing violation — not merely a style deviation.

Read the brand restriction as scoped to what it names: advertisements, corporate collateral, signage,
gifts. An internal course exhibition site is not that category, and the logo lockup — where `against`
actually lives — ships as artwork, so the logo stays correct regardless.

**Decision: use metric-sympathetic open-source substitutes for UI text, and never re-typeset the logo.**

| Brand font             | Web substitute      | Why                                                                       |
| ---------------------- | ------------------- | ------------------------------------------------------------------------- |
| `DIN Bold Italic 2014` | **Oswald** (italic) | Condensed grotesque, closest free match for DIN's display character.       |
| `Filson Medium`        | **Nunito Sans**     | Geometric humanist sans; similar warmth, round terminals, wide weight range. |
| `Filson Pro Bold Italic` | **Nunito Sans Bold Italic** | Same family, preserves the №1/№2 hierarchy distinction.           |
| `against Regular`      | *(none — never substitute)* | Logo ships as SVG/PNG artwork. Never set it in live text.           |

If the faculty or MOTAC supplies licensed webfont files, drop them into `resources/fonts/`, declare
`@font-face`, and put the real family first in `--font-display` / `--font-sans`. The substitutes are
already positioned as fallbacks, so this is a one-line change per token.

**Action item:** confirm licensing status with the course supervisor before any public deployment.

## 4.3 Type Scale 🛠 DERIVED

Base 16px, 1.25 (major third) ratio.

| Token       | Size            | Line height | Weight  | Family    | Use                                  |
| ----------- | --------------- | ----------- | ------- | --------- | ------------------------------------ |
| `display`   | 3.815rem / 61px | 1.05        | 700 ita | `display` | Hero headline (campaign theme voice) |
| `h1`        | 3.052rem / 49px | 1.1         | 700     | `display` | Page title                           |
| `h2`        | 2.441rem / 39px | 1.15        | 700     | `display` | Section heading                      |
| `h3`        | 1.953rem / 31px | 1.25        | 600     | `sans`    | Subsection                           |
| `h4`        | 1.563rem / 25px | 1.3         | 600     | `sans`    | Card title                           |
| `h5`        | 1.25rem / 20px  | 1.4         | 600     | `sans`    | Small heading                        |
| `body-lg`   | 1.125rem / 18px | 1.65        | 400     | `sans`    | Lead paragraph, abstract             |
| `body`      | 1rem / 16px     | 1.6         | 400     | `sans`    | Default body                         |
| `body-sm`   | 0.875rem / 14px | 1.55        | 400     | `sans`    | Secondary text, meta                 |
| `caption`   | 0.75rem / 12px  | 1.45        | 500     | `sans`    | Labels, timestamps, badges           |
| `place`     | 1.125rem / 18px | 1.4         | 700 ita | `sans`    | **Location / tourism-spot subheads** |

### The `place` style 🔒 BRAND-derived

The guidelines assign `Filson Pro Bold Italic` specifically to _"subheadings relating to places of
interest, tourism spots, locations."_ We honour this with a dedicated `place` style — bold italic —
used for:

- Destination and location names
- Institution names on project cards
- Tourism category subheadings

This is the one place where brand typography maps to a real, reusable UI decision. Use it.

## 4.4 Typography Rules 🛠 DERIVED

- Body text never below 14px.
- Line length capped at ~70ch for readability (`max-w-[70ch]`).
- Two families maximum: `display` for headings, `sans` for everything else.
- Italic is meaningful here (campaign voice + `place`) — do not use it decoratively elsewhere.
- Never letterspace body text. The brand's letter-spacing refinement applies to the logo lockup only.

---

# 5. Logo Usage

Every rule in this section is 🔒 **BRAND**. These are the most commonly violated rules in the whole
document — read them before building the header.

## 5.1 Approved Variants

| Variant          | When to use                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| **Full colour**  | Default. _"Whenever possible, the full-colour version should be used."_             |
| **Reverse white** | Only where technical limitations prevent full colour, or on dark backgrounds.      |
| **Black**        | Only where technical limitations prevent full colour.                              |

Available in CMYK and RGB formats. For web, always use the RGB/SVG assets.

## 5.2 Clear Space & Minimum Size

- **Clear space:** the logo requires clear space on all sides equal to the measure `a` defined in the
  guidelines. Nothing — text, buttons, imagery, background pattern — may enter this zone.
- **Minimum size (digital): `175px`.** Below this, do not render the logo at all.
- **Minimum size (print): `40mm`.**

> ⚠️ **175px is wide.** On a 360px-wide mobile viewport the logo would consume nearly half the header.
> Do not silently shrink it. Options: (a) give the mobile header a taller logo bar, or (b) use the
> **Bunga Raya brandmark alone** as the compact mobile mark, if the brand owner supplies a standalone
> icon asset. **Do not crop the full lockup to fake an icon** — see §5.4.
> Resolve this with the course supervisor before finalising the mobile header.

## 5.3 Grid & Placement

Position the logo **either top-left or top-right** of the page.

Logo width should cover:

- **1/4 of the width** for vertical (portrait) pages
- **1/6 of the width** for horizontal (landscape) pages

For the web build: the site header is a landscape format, so target **~1/6 of the container width**,
respecting the 175px floor. Printed/PDF exports (certificates, posters) follow the portrait rule.

## 5.4 Prohibited — Never Do These

From the guidelines' "Incorrect Logo Usage" and "DO NOT" pages:

- ❌ Do not skew or distort the logo.
- ❌ Do not add drop shadow or apply any special effects.
- ❌ Do not alter the logo lockup proportion in any way.
- ❌ Do not crop the logo.
- ❌ Do not change the logo colour. _"The colour of the logo is firmly defined and cannot be changed."_
- ❌ Do not apply the white logo on any other colour background.
- ❌ Do not leave any element out.
- ❌ Do not lower the logo's opacity — _"transparency should always be 100%."_
- ❌ Do not place the colour brandmark on a clashing background or image.

When used on dark backgrounds, ensure the wordmark remains visible.

## 5.5 Component Contract 🛠 DERIVED

Encode the rules so they cannot be violated by accident.

```jsx
// resources/js/components/brand/VMLogo.jsx
//
// Renders the official VM2026 logo under brand-guideline constraints.
// Rules enforced here are from VM2026_Guidelines.pdf §Logo — do not relax them.

const MIN_DIGITAL_WIDTH = 175; // px — brand minimum for digital

export default function VMLogo({ variant = "full", width = 220, className }) {
  if (width < MIN_DIGITAL_WIDTH) {
    throw new Error(
      `VMLogo: width ${width}px is below the brand minimum of ${MIN_DIGITAL_WIDTH}px.`
    );
  }
  // ...renders the correct SVG asset, wrapped in clear-space padding.
}
```

Rules the component must guarantee:

1. `width` never below 175px.
2. Aspect ratio locked — width only; height is always derived.
3. No `opacity`, `filter`, `drop-shadow`, `transform: skew()`, or `scale()` on the logo element, ever.
4. Clear-space padding baked into the wrapper so siblings physically cannot encroach.
5. `variant="white"` permitted only on dark or image backgrounds; never on another brand colour.

Asset location: `resources/js/assets/brand/` — `vm2026-full.svg`, `vm2026-white.svg`, `vm2026-black.svg`.

---

# 6. Layout 🛠 DERIVED

## 6.1 Containers

| Token          | Width    | Use                                     |
| -------------- | -------- | --------------------------------------- |
| `container-xs` | 640px    | Auth forms, dialogs                     |
| `container-sm` | 768px    | Article/abstract reading width          |
| `container-md` | 1024px   | Standard content                        |
| `container-lg` | 1280px   | Gallery grids, dashboards               |
| `container-xl` | 1440px   | Maximum page width                      |

Horizontal padding: `1rem` mobile, `1.5rem` tablet, `2rem` desktop.

## 6.2 Breakpoints

Tailwind defaults, used as-is: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

## 6.3 Grid

12-column grid, `1.5rem` gutter.

| Context                    | Mobile | Tablet | Desktop |
| -------------------------- | ------ | ------ | ------- |
| Project gallery cards      | 1      | 2      | 3–4     |
| Featured projects          | 1      | 2      | 3       |
| Statistics cards           | 2      | 4      | 4       |
| Media/screenshot gallery   | 2      | 3      | 4       |
| Team member cards          | 1      | 2      | 3       |

## 6.4 Spacing Scale

4px base: `0.5 / 1 / 2 / 3 / 4 / 6 / 8 / 12 / 16 / 20 / 24` → `2px … 96px`.

Section rhythm: `py-16` mobile, `py-24` desktop. Card padding: `p-6`. Form field gap: `gap-4`.

## 6.5 Radius

| Token | Value    | Use                            |
| ----- | -------- | ------------------------------ |
| `sm`  | 0.25rem  | Badges, chips, tags            |
| `md`  | 0.5rem   | Inputs, small buttons          |
| `lg`  | 0.75rem  | Buttons, cards **(default)**   |
| `xl`  | 1rem     | Feature cards, media panels    |
| `2xl` | 1.5rem   | Hero panels, modals            |
| `full`| 9999px   | Avatars, pills, icon buttons   |

Pick one radius per component and stay with it. Mixed radii in a single card is the most visible
inconsistency in a design system.

## 6.6 Elevation

Soft, low-spread shadows only. The brand forbids shadows **on the logo** (§5.4); elsewhere shadows are
permitted but should stay restrained.

| Token | Value                                        | Use                    |
| ----- | -------------------------------------------- | ---------------------- |
| `xs`  | `0 1px 2px rgb(16 24 39 / 0.05)`             | Subtle separation      |
| `sm`  | `0 1px 3px rgb(16 24 39 / 0.08)`             | Cards at rest          |
| `md`  | `0 4px 12px rgb(16 24 39 / 0.08)`            | Card hover             |
| `lg`  | `0 12px 24px rgb(16 24 39 / 0.10)`           | Dropdowns, popovers    |
| `xl`  | `0 24px 48px rgb(16 24 39 / 0.14)`           | Modals, dialogs        |

Shadow tint uses `vm-navy-950` rather than pure black, so elevation stays in the brand's colour world.

---

# 7. Motion 🛠 DERIVED

| Token     | Duration | Use                              |
| --------- | -------- | -------------------------------- |
| `instant` | 75ms     | Colour/background change         |
| `fast`    | 150ms    | Hover, focus                     |
| `normal`  | 250ms    | Dropdowns, tooltips, accordions  |
| `slow`    | 400ms    | Modals, drawers, page transitions |
| `slower`  | 600ms    | Hero and scroll-reveal           |

Easing: `standard cubic-bezier(0.4, 0, 0.2, 1)` · `enter cubic-bezier(0, 0, 0.2, 1)` ·
`exit cubic-bezier(0.4, 0, 1, 1)`.

Hover conventions: cards lift `-2px` with shadow `sm → md`; buttons shift one ramp step darker;
images scale to `1.03` inside `overflow-hidden`; links underline.

**Reduced motion is mandatory:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Never animate the logo. Never flash or strobe.

---

# 8. Components

## 8.1 Library 🛠 DERIVED

**shadcn/ui** is the primary component library. Do not recreate a component that exists there; install
only what is used.

**Base:** Navigation Menu · Breadcrumb · Menubar · Sidebar · Dropdown Menu · Button · Input · Textarea ·
Select · Checkbox · Radio Group · Switch · Label · Form · Calendar · Date Picker · Card · Badge ·
Avatar · Separator · Table · Tabs · Accordion · Carousel · Alert · Alert Dialog · Toast · Progress ·
Skeleton · Tooltip · Dialog · Drawer · Sheet · Popover · Pagination · Command · Combobox · Scroll Area ·
Resizable · Hover Card

**Icons:** Lucide only. Never mix icon libraries.

## 8.2 Button Variants

| Variant       | Background       | Text      | Use                          |
| ------------- | ---------------- | --------- | ---------------------------- |
| `default`     | `vm-blue-500`    | white     | Primary action               |
| `secondary`   | `slate-100`      | `vm-navy-500` | Secondary action         |
| `outline`     | transparent      | `vm-navy-500` | Tertiary; `border` token |
| `ghost`       | transparent      | `vm-navy-500` | Toolbar, icon buttons    |
| `link`        | none             | `vm-blue-500` | Inline navigation        |
| `destructive` | `vm-crimson-500` | white     | Delete, reject               |
| `highlight`   | `vm-yellow-500`  | `vm-navy-900` | Vote / award CTA — **dark text, mandatory** |

Focus ring on every interactive element: `ring-2 ring-vm-blue-500 ring-offset-2`.

## 8.3 Custom Exhibition Components 🛠 DERIVED

Built for this project, on top of shadcn primitives:

`VMLogo` · `HeroBanner` · `ProjectCard` · `FeaturedProjectCard` · `SDGBadge` · `TechnologyChip` ·
`CategoryBadge` · `GalleryGrid` · `ImageViewer` · `TeamMemberCard` · `StatisticsCard` ·
`TourismDestinationBanner` · `AnnouncementCard` · `CommentCard` · `VoteButton` · `FavouriteButton` ·
`ShareButton` · `ExhibitionTimeline` · `SearchBar` · `ProjectFilter` · `MediaUploader`

### Brand-sensitive components

**`HeroBanner`** — the only place the campaign display voice appears at full strength. Logo top-left or
top-right (§5.3). Headline in `display` italic. Overlay scrim `vm-navy-950 / 60%` behind text over
photography — never place text directly on a busy image.

**`CategoryBadge`** — `{color}-100` bg, `{color}-800` text, `{color}-200` border, from the fixed
category→colour map (§2.6).

**`SDGBadge`** — official UN SDG colours, not brand colours (§2.6).

**`VoteButton`** — `highlight` variant, `vm-yellow-500` with `vm-navy-900` text. Never white text.

**`StatisticsCard`** — rotate through brand colours across the row to express the Pattern of Harmony;
numerals in `display` weight, labels in `caption`.

---

# 9. Accessibility

Target: **WCAG 2.1 Level AA.** 🛠 DERIVED — the brand guidelines do not address accessibility, so this
is entirely our obligation.

| Requirement            | Rule                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| Body text contrast     | ≥ 4.5:1                                                                |
| Large text (≥18.66px bold / ≥24px) | ≥ 3:1                                                      |
| UI components & focus  | ≥ 3:1                                                                  |
| Focus indicator        | Visible on every interactive element; never `outline: none` without a replacement |
| Touch targets          | ≥ 44×44px                                                              |
| Images                 | Meaningful `alt`; decorative images `alt=""`                            |
| Forms                  | Every input has an associated `<label>`; errors announced, not colour-only |
| Keyboard               | Full operation without a mouse; logical tab order; skip-to-content link |
| Motion                 | Honour `prefers-reduced-motion`                                        |
| Colour independence    | Never encode meaning in colour alone — pair with icon or text          |

**Palette-specific rules** (from the measured data in §2.3):

- Never white text on `vm-yellow`, `vm-green`, or `vm-teal` at base value.
- Never `vm-yellow-500` as a text colour on white (1.68).
- For status text, use the `700`–`800` steps, not the base.
- Verify every new colour pairing rather than assuming — this palette is unusually varied in luminance.

---

# 10. Do's and Don'ts

## Do

Use generous whitespace · Use authentic Malaysian photography · Keep spacing and radii consistent ·
Use subtle motion · Maintain high contrast · Use one dominant colour per page · Follow the type
hierarchy · Reuse existing components · Use Lucide icons exclusively · Keep the full-colour logo as
default · Respect logo clear space · Use `place` style for locations and institutions

## Don't

Don't use more than three accent colours on one screen · Don't use heavy gradients or skeuomorphism ·
Don't use heavy shadows · Don't mix icon libraries · Don't stretch or distort images · Don't mix
border radii within a component · Don't mix more than two font families · Don't use flashing
animation · Don't place text directly on busy imagery · Don't overuse patriotic symbolism · Don't use
low-resolution tourism images · **Don't modify the logo in any way** · **Don't put white text on the
yellow, green, or teal brand colours** · Don't hardcode brand hex values inside components — use tokens

---

# 11. Naming Conventions 🛠 DERIVED

| Item              | Convention                | Example                             |
| ----------------- | ------------------------- | ----------------------------------- |
| React components  | PascalCase                | `ProjectCard.jsx`, `SDGBadge.jsx`   |
| Pages             | PascalCase + `Page`       | `HomePage.jsx`, `GalleryPage.jsx`   |
| Hooks             | camelCase, `use` prefix   | `useProjects()`, `useVotes()`       |
| API services      | camelCase + `Api`         | `projectApi.js`, `voteApi.js`       |
| Context providers | PascalCase + `Context`    | `AuthContext.jsx`, `ThemeContext.jsx` |
| Utilities         | camelCase                 | `formatDate.js`                     |
| Constants         | UPPER_SNAKE_CASE          | `MAX_UPLOAD_SIZE`                   |
| Assets            | kebab-case                | `vm2026-full.svg`                   |
| Design tokens     | kebab-case, `vm-` prefix for brand | `--color-vm-teal-500`      |

---

# 12. Pre-Implementation Checklist

Before building any screen:

1. Does it follow `SYSTEM-ARCHITECTURE.md`?
2. Are all colours from the §3 tokens — no hardcoded hex?
3. Has every text/background pairing been contrast-checked against §2.3?
4. Is the logo full-colour, ≥175px, unmodified, with clear space, top-left or top-right?
5. Is typography from the §4.3 scale, with `place` used for locations?
6. Could an existing shadcn or custom component do this instead?
7. Is spacing on the 4px scale and radius consistent within each component?
8. Is it keyboard-operable with a visible focus ring?
9. Does it work at 360px, 768px, and 1440px?
10. Does it respect `prefers-reduced-motion`?
11. Is content the loudest thing on the page?

---

# 13. Open Questions

Resolve these with the course supervisor before public deployment:

1. **Font licensing** (§4.2) — do we have rights to `DIN 2014` / `Filson Pro` webfonts, or do we ship
   the open-source substitutes?
2. **Mobile logo** (§5.2) — is a standalone Bunga Raya brandmark available for compact headers, given
   the 175px minimum?
3. **Official digital assets** — obtain the vector logo pack and verify §2.1 against it, especially the
   `#213E7C` / `#03B1A8` discrepancies flagged in §2.1.
4. **Clear space `a`** — the exact value is defined diagrammatically in the guidelines; confirm the
   ratio so `VMLogo` can encode it numerically.
