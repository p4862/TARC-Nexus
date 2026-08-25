<!-- @format -->

# Figma Make Design Reference

## Status

**Unit 00 is complete.** The immutable archive was verified, extracted,
installed, built, served, audited from source, and captured in Chrome on
2 August 2026. The reference set contains 102 PNGs: 34 reachable states at
1440px, 768px, and 360px.

This document is the durable route, state, measurement, and filename index for
later fidelity work. Rows marked `Not supplied` remain explicit prototype gaps;
no baseline was invented for them.

## Provenance

| Item | Evidence |
| --- | --- |
| Archive | `docs/TarcNexusFrontendDesign.zip` |
| SHA-256 | `2CA5BBC334403D388468B73F26353320963EE18EA17B5D58D3A3D835809AD1FB` (reconfirmed 2 August 2026) |
| Isolated extraction | `C:\Users\User\AppData\Local\Temp\tarc-nexus-unit00-reference-20260802` |
| Package manager | pnpm `10.34.3`, invoked with the archive's `pnpm-lock.yaml` and `--frozen-lockfile` |
| Runtime | Node `26.5.1`; prototype requests Node `22` in `.mise.toml` |
| Build | `npx --yes pnpm@10.34.3 run build` passed with Vite `8.0.3` |
| Local preview | `http://127.0.0.1:4174/` returned HTTP 200 while the isolated audit was running |
| Browser evidence | Chrome extension-connected capture session on 2 August 2026; 102 non-empty PNGs visually reviewed |
| Screenshot directory | `docs/figma-make-reference/screenshots/` |

The extraction directory contains generated `node_modules`, `dist`, and local
runtime logs. They are outside the repository and are not production assets.
The archive was not modified or extracted over `resources/js`.

## Capture Contract

Captures are stored under:

```text
docs/figma-make-reference/screenshots/
```

Each filename is `<stem>--<viewport>.png`, where `<viewport>` is `360`, `768`,
or `1440`. The CSS viewport dimensions are 360×800, 768×1024, and 1440×900.
`home--logged-out--1440.png` is a full-page desktop overview; the remaining
files are viewport captures. Chrome's extension-backed CDP session timed out
after five seconds on tall responsive full-page screenshots, so the state
index and source-backed measurements remain the reference for below-fold
composition. The unchanged prototype source was used throughout capture.

The prototype has no URL router. Reloading always resets it to the logged-out
Home state. Navigation paths below refer to visible controls in the in-memory
page state machine.

## Screen and State Index

Every row expands to three named files using the capture contract. `Not
supplied` means the prototype does not expose the requested screen/state and no
baseline should be invented.

| Filename stem | Prototype page/state | Navigation path from a fresh reload | Capture status |
| --- | --- | --- | --- |
| `home--logged-out` | Home, default category, logged-out navigation | Initial render | Captured 2 Aug 2026 |
| `home--category-active` | Home with one discovery category selected | Initial render → category chip | Captured 2 Aug 2026 |
| `home--logged-in` | Home with avatar navigation | Sign up → valid login submit → sidebar logo | Captured 2 Aug 2026 |
| `exhibitions--populated` | Exhibition Listing, default filters, page 1 | Header Explore or Home “View all” | Captured 2 Aug 2026 |
| `exhibitions--page-2` | Exhibition Listing, populated pagination | Explore → page 2 | Captured 2 Aug 2026 |
| `exhibitions--empty` | Exhibition Listing empty result | Explore → enter a non-matching query | Captured 2 Aug 2026 |
| `exhibition-detail--populated` | Exhibition Detail, default track, populated project masonry | Home exhibition card or Listing card | Captured 2 Aug 2026 |
| `exhibition-detail--filtered-empty` | Exhibition Detail with no matching projects | Detail → enter a non-matching project query | Captured 2 Aug 2026 |
| `project-detail--default` | Project Detail, first gallery image, unsaved | Home project pin, detail project pin, or search project result | Captured 2 Aug 2026 |
| `project-detail--gallery-selected` | Project Detail with a non-primary gallery image active | Project Detail → select thumbnail or gallery image | Captured 2 Aug 2026 |
| `project-detail--saved` | Project Detail with Save control active | Project Detail → Save | Captured 2 Aug 2026 |
| `search--populated` | Search Results for default `sustainable` query | Desktop/tablet header search → submit a non-empty query | Captured 2 Aug 2026 |
| `search--filtered` | Search Results with type/category filter active | Search → Projects/Exhibitions and a category chip | Captured 2 Aug 2026 |
| `search--empty` | Search Results empty state | Search → enter a non-matching query | Captured 2 Aug 2026 |
| `auth--login` | Login mode | Header Log in or Sign up | Captured 2 Aug 2026 |
| `auth--login-native-validation` | Login after empty submit | Login → submit empty form | Captured 2 Aug 2026 |
| `auth--login-loading` | Login asynchronous loading label/spinner | Login → valid email/password → submit, capture within 1.2 seconds | Captured 2 Aug 2026 |
| `auth--register` | Registration mode, empty | Login → Register tab | Captured 2 Aug 2026 |
| `auth--register-password-strength` | Registration with password strength meter | Register → type a password | Captured 2 Aug 2026 |
| `auth--register-disabled` | Registration with terms unchecked | Register → fill fields, leave terms unchecked | Captured 2 Aug 2026 |
| `dashboard--overview` | Exhibitor Dashboard | Login → valid submit and wait 1.2 seconds | Captured 2 Aug 2026 |
| `submit--basic-info` | Submit Project step 1 | Dashboard → Submit Project | Captured 2 Aug 2026 |
| `submit--description` | Submit Project step 2 | Fill required step 1 fields → Continue | Captured 2 Aug 2026 |
| `submit--team` | Submit Project step 3 | Fill required steps 1–2 → Continue | Captured 2 Aug 2026 |
| `submit--media` | Submit Project step 4 | Fill required team lead/supervisor names → Continue | Captured 2 Aug 2026 |
| `submit--review` | Submit Project step 5 | Media → Continue | Captured 2 Aug 2026 |
| `submit--success` | Submission success | Review → Submit Project | Captured 2 Aug 2026 |
| `my-projects--grid` | My Projects, All filter, grid view | Dashboard/sidebar → My Projects | Captured 2 Aug 2026 |
| `my-projects--list` | My Projects, All filter, list view | My Projects → List | Captured 2 Aug 2026 |
| `my-projects--empty-filter` | My Projects empty state | My Projects → Rejected filter | Captured 2 Aug 2026; prototype-only unsupported status |
| `my-projects--delete-confirmation` | Destructive confirmation modal | My Projects → delete any card/row | Captured 2 Aug 2026 |
| `my-projects--empty-all` | My Projects with all mock projects deleted | Confirm deletion for all three projects | Captured 2 Aug 2026 |
| `profile--default` | Profile form | Login → sidebar Profile | Captured 2 Aug 2026 |
| `notifications--default` | Notifications list with unread items | Login → sidebar Notifications | Captured 2 Aug 2026; unsupported production entity |
| `not-found--default` | 404 component | No unchanged UI path exists | Not supplied as a reachable state |
| `edit-project--default` | Distinct edit workflow | My Projects → Edit opens the same blank Submit page | Not supplied |
| `global--error` | API/network/server error state | Prototype is mock-state only and has no error branch | Not supplied |

### Reachability notes

- The `not-found` page exists in `src/pages/NotFoundPage.tsx`, but no visible
  control navigates to it and there is no URL router. It cannot be reached in an
  unchanged browser run.
- Login and registration share one page. Submitting either valid form always
  succeeds after a 1.2-second simulated wait and opens Dashboard.
- My Projects “Edit” opens the same empty Submit Project wizard. No populated
  edit state is implemented.
- Exhibition Listing and Search empty states are reachable by typing a
  non-matching query. Exhibition Detail also filters its project list locally.
- My Projects exposes `Pending Review` and `Rejected`, which conflict with the
  production status contract. They are visual-reference labels only.
- Notifications is reachable in the prototype but deliberately omitted from
  production because the real system has no notification entity.

## Visual System Measurements

These values are taken from the prototype source and its bundled design
analysis. They are not inferred from screenshots.

### Global chrome and tokens

| Property | Prototype value |
| --- | --- |
| Primary / pressed | `#e60023` / `#cc001f` |
| Page / muted / card surfaces | `#fbfbf9` / `#f6f6f3` / `#ffffff` |
| Dark surface | `#262622` |
| Body / muted / placeholder text | `#33332e` / `#62625b` / `#91918c` |
| Borders | `#dadad3`, with `#c8c8c1` hover and `#e5e5e0` secondary fill |
| Body family | Inter 400/500/600/700 via remote Google Fonts import |
| Display family | Fraunces 400/600/700 via remote Google Fonts import |
| Main radius | 16px (`rounded-2xl`) |
| Large radius | 32px (`rounded-[32px]`) |
| Circular radius | pill/full |
| Spacing rhythm | 8px base; 64px section spacing; 24px content gutter; 32px large-card/modal padding |
| Main content cap | 1,280px |
| Public header | fixed, 64px high; 1px bottom border |
| Desktop search | up to 480px × 48px in the public header |
| Masonry | 4 columns/8px gaps by default; 3 columns at ≤1024px; 2 columns at ≤640px |
| Elevation | mostly flat/hairline; soft shadow only on modal-like layers and small active toggles |

The bundled design analysis describes 70/44/28/22/18/16/14/12px type roles.
The generated React uses Fraunces hero clamps from 44–70px and many additional
10–13px labels. The latter are prototype defects under the production 14px
minimum-body accessibility floor.

### Page geometry

| Screen | Major measurements and responsive composition |
| --- | --- |
| Public shell | 1,280px cap with 24px horizontal padding. Search, Explore, About, and Log in hide below 768px; logo text hides below 640px. Sign up remains. No mobile menu/search replacement exists. |
| Home | Hero minimum height 600px; text max 600px; 44–70px display; CTAs 48px high. Sections use 64px vertical padding. Stats are 2 columns then 4 at 768px, 32px gaps. Exhibition cards are 1 then 3 columns at 768px, 16px gaps, 200px images. Project pins use global 8px masonry. Feature rows stack until 768px, then alternate two-up with 40px gap; image max 480px at 6:5. Footer is 2 then 4 columns. |
| Exhibition Listing | 1,280px cap; 40px hero padding; 32–48px title; 400px × 48px search from 768px; sticky filter bar below the 64px header; grid 1/2/3 columns at 0/768/1024 with 20px gaps and 200px images; 40px pagination controls. |
| Exhibition Detail | 440px fixed hero; title max 700px at 28–48px; body is one column then `1fr 320px` at 1024px with 40px gap; sidebar cards use 32px radius and 24px padding; project grid uses global masonry and per-project source aspect ratios. |
| Project Detail | 500px fixed hero with 48px thumbnails; title max 760px at 24–40px. Content becomes `1fr 320px` at 1024px with 40px gap. Gallery is two columns/12px gap with a 16:7 lead image and 4:3 secondary images. Related projects remain three columns with 4:5 images. Sidebar cards use 32px radius and 24px padding. |
| Search Results | 1,280px cap; search max 640px × 52px; sticky filters; category chips are hidden below 768px without a replacement. Grid is 1/2/3/4 columns at 0/768/1024/1280 with 16px gaps and fixed 168px images. |
| Authentication | Full-height split layout at 1024px. Image panel hides below 1024px. Form panel max 520px, inner form max 400px, padding 32px mobile and 56px from 768px. Inputs and buttons use 16px radius; form controls are roughly 44–50px high. |
| Portal shell | Fixed 240px sidebar at every width and main content always offset by 240px. There is no responsive drawer or breakpoint. This leaves only 120px of main viewport at 360px before padding and is a known broken mobile state. |
| Dashboard | 32px page padding. Statistics grid is 2 columns, then 4 only at 1280px. Main analytics row changes from one column to `1fr 320px` at 1280px, with 24px gap. Cards use 16px radius and 20–24px padding. |
| My Projects | 32px page padding. Grid is 1/2/3 columns at 0/768/1280 with 16px gaps and 180px images. List mode uses fixed `auto 1fr auto auto auto` columns. Delete modal max 420px, 32px radius/padding, 50% black scrim. |
| Submit Project | Main width max 800px with 32px padding. Five-step horizontal stepper uses 32px circles and 32–48px connectors. Form card has 32px radius/padding. Team fields change from one to three columns at 640px. Upload target minimum height is 160px. |
| Profile | Width max 720px with 32px padding. Two 32px-radius cards with 32px padding. Name/institution stay two columns at every width. |
| Notifications | Width max 800px with 32px padding. List gap 12px; cards 16px radius and 20px padding. |
| 404 | Full-height centered content, max 520px; decorative `404` is 120px and message heading scales 28–40px. |

### Rendered capture observations

- Public layouts remain coherent at 1440px and 768px. At 360px the header
  visibly reduces to the mark plus Sign up or the signed-in avatar; search and
  primary navigation have no mobile replacement.
- Search category chips disappear below 768px as the source specifies. Type
  filters and sort remain visible in the 360px captures.
- Authentication becomes a single-column form below 1024px. Chrome's native
  required-field popover is visible in the 360px validation capture; larger
  CDP screenshots retain the invalid target/focus state but do not consistently
  composite the browser-owned popover.
- The 240px portal sidebar remains fixed at every width. The 360px Dashboard,
  Submit Project, My Projects, Profile, Notifications, and success captures
  visibly clip most main content instead of adapting it.
- Grid/list switching, empty filters, the deletion modal, deletion of all mock
  projects, login loading, registration strength/disabled states, gallery
  selection, saved state, and submission success are all visibly represented.

## Prototype Defects and Missing Evidence

These are limitations of the generated reference, not requirements to reproduce:

- Tall full-page responsive screenshots exceeded the Chrome extension's
  five-second CDP limit; the delivered set therefore uses the viewport framing
  documented in the Capture Contract.
- The portal shell is desktop-only and overflows at narrow widths.
- The public mobile header removes search/navigation without providing the
  documented hamburger or search overlay.
- Global and horizontal scrollbars are deliberately hidden.
- Many controls and labels are smaller than the 14px/44px production floor.
- Focus styling is generally only a border-colour change; several custom
  checkbox and icon controls are not keyboard-operable or labelled.
- Remote Google Fonts and Unsplash URLs make rendering network-dependent.
- Loading exists only for login/registration. No error state is implemented.
- No distinct edit screen, reachable 404 path, API states, mobile portal shell,
  success toast, or non-native inline validation state is supplied.
- The prototype contains mock data, unsupported Exhibition/Notification domain
  concepts, unsupported statuses, raw controls, inline styles/SVGs, and emoji
  icons. They are reference material only.

## Completion Checklist

- [x] Archive checksum matches the handoff.
- [x] Archive extracted in isolation and its `AGENTS.md` read.
- [x] Install used pnpm and the supplied frozen lockfile.
- [x] Prototype production build passes and local preview returns HTTP 200.
- [x] Reachable pages, meaningful states, navigation paths, missing states, and
  source measurements are indexed.
- [x] Capture every reachable row at 360px, 768px, and 1440px.
- [x] Visually inspect each capture and replace source-only assumptions with
  rendered measurements where they differ.
- [x] Record the final screenshot directory and capture date in the handoff.
