<!-- @format -->

# Figma Make Design Translation Contract

## Status

- **Implementation status:** Approved for the current design integration
- **Master plan phase:** Phase 1 — Approve the Translation Contract
- **Approved baseline:** Current system architecture, database, modules, and
  design documents
- **Design reference:** `docs/TarcNexusFrontendDesign.zip`
- **Last updated:** 31 July 2026

This contract resolves how the Figma Make prototype may influence the
production application. It approves visual composition patterns, not prototype
code, data, routes, identity, or business rules.

Phase 0 reference captures remain outstanding. When those captures are
completed, they may add measured visual detail to this contract but may not
override any decision below.

## Superseding Amendment — Fidelity Directive (2026-08-02)

The project owner approved **literal visual parity with the generated Figma
design** (master-plan Revised Fidelity Directive; handoff decision **D-011**).
This reverses the brand substitutions that were previously locked. The following
now apply and take precedence over any conflicting row or exception below:

- **Primary colour** is the generated Pinterest red `#e60023` (pressed
  `#cc001f`, on-primary `#ffffff`), not `vm-blue-500`. Implemented as the
  `--primary` token and the `pin-red-*` ramp in `resources/css/app.css`.
- **Typography** is Inter (body) and Fraunces (display), not Nunito Sans /
  Oswald. Implemented as `--font-sans` / `--font-display`.
- **Surfaces** are the generated warm-cream set — canvas `#ffffff`, body wash
  `#fbfbf9`, cream card `#f6f6f3`, secondary `#e5e5e0` — mapped onto
  `--background`, `--card`, `--muted`, `--secondary`, and the `cream-*` ramp.
- **Radii** follow the generated 16px / 32px / pill system (`--radius: 1rem`;
  `--radius-lg` 16px, `--radius-2xl` 32px).
- **Identity:** keep the **TARC Nexus** product name; reproduce the generated
  mark's visual treatment rather than the literal "ExhibitHub" wordmark.

What this amendment does **not** change: everything in Route and Domain
Translation, Data and Form Translation, the Status and Interaction Contract, and
the Accessibility and Responsive Exceptions. Real API data, the approved status
model, the omitted Exhibition/Notification entities, and the WCAG floor all
stand. Where a row below still reads "use the VM2026 token," read it as "use the
generated value via the token" per this amendment.

## Authority

When sources disagree, use this order:

1. `SYSTEM-ARCHITECTURE.md`
2. `SYSTEM-DATABASE.md`
3. `SYSTEM-MODULES.md`
4. `SYSTEM-DESIGN.md`
5. This translation contract
6. The rendered Figma Make prototype

Existing API-backed behaviour and authorization remain intact unless an
explicitly approved requirement changes the authoritative documents.

## Implementation Approval Rules

The following aspects of the prototype are approved as visual references:

- section hierarchy and supported section order
- container and column proportions
- card density and image aspect ratios
- whitespace rhythm and content grouping
- placement of supported navigation, filters, calls to action, metadata,
  steppers, tables, dialogs, and state feedback
- responsive stacking and navigation compression, after accessibility
  correction
- hover, focus, disabled, loading, success, error, and destructive-state
  composition

The following prototype aspects are rejected as production contracts:

- the literal ExhibitHub wordmark (its red/cream colour identity is now adopted
  per the 2026-08-02 amendment; only the fictional name is rejected)
- state-based routing inside a single component
- mock arrays, fictional analytics, and remote placeholder images
- Exhibition, Notification, track, faculty, keyword, or arbitrary-field
  persistence
- prototype project statuses or review outcomes
- raw controls, inline CSS, hardcoded brand colours, inline SVG, and emoji
  icons
- inaccessible text sizes, hidden scrollbars, missing focus treatment, or
  desktop-only fixed layouts

## Brand and Identity Contract

### Temporary Identity

Amended 2026-08-02: keep the **TARC Nexus** product name, but render it in the
generated mark's visual treatment (its shape language, weight, and red accent)
rather than the plain text-only lockup. Do not ship the literal "ExhibitHub"
wordmark. The rules below otherwise still prevent fabricating official VM2026
artwork.

Until official VM2026 RGB/SVG artwork and its measured clear-space ratio are
available:

- Use a `TARC Nexus` product identity with the descriptor
  `VM2026 Online Exhibition`, styled per the generated mark treatment above.
- Do not render a fabricated, traced, cropped, recoloured, or reconstructed
  VM2026 mark.
- Do not implement `VMLogo` against an unverified asset.
- Do not shrink the full VM2026 lockup below its documented 175px digital
  minimum.
- Do not use the prototype's ExhibitHub wordmark or Pinterest-like mark.
- Remove or omit the current generic globe badge when the header shell is
  restyled so it cannot be mistaken for an official campaign mark.
- Keep an optional, non-obstructive header region available for future official
  artwork, but do not reserve space that breaks the mobile layout.

This temporary treatment is a safe product identity, not a replacement
VM2026 logo. It lets page implementation proceed without silently deciding the
open asset, mobile-mark, or clear-space questions.

### Future Official Artwork

Official artwork may replace the temporary treatment only when:

1. the RGB/SVG asset pack is supplied from an authoritative source;
2. the exact clear-space ratio is confirmed;
3. the full lockup can meet the 175px minimum; and
4. a separately supplied compact mobile mark is used where the full lockup
   cannot fit.

No one may crop the full lockup to create that mobile mark.

### Typography

- Superseded by the 2026-08-02 amendment: use the installed **Inter** variable
  font for body and interface text and the installed **Fraunces** variable font
  for display headings (`@fontsource-variable/inter` and
  `@fontsource-variable/fraunces`).
- Nunito Sans and Oswald are no longer the interface/display families; the
  `--font-sans` / `--font-display` tokens now resolve to Inter / Fraunces.
- Do not load additional licensed families (DIN, Filson, and similar) unless
  licensed webfont assets and redistribution rights are confirmed.

## Visual Token Translation

Use semantic tokens where a semantic role exists. Direct VM ramp utilities are
permitted only for documented brand-specific roles.

| Prototype visual role | Production token or component | Binding rule |
| --- | --- | --- |
| Pinterest-like red primary action | `primary` = `#e60023` (`pin-red-500`), hover `#cc001f` | Reproduce the red hue, prominence, and placement (amended 2026-08-02) |
| Dark charcoal sidebar | semantic `sidebar` variables, now the generated warm near-black `#262622` | Maintain readable active, hover, and focus states |
| Warm cream page canvas | `background` `#fbfbf9`, `card` `#ffffff`, `muted`/`secondary` `#f6f6f3`, plus the `cream-*` ramp | Reproduce the generated cream chrome via these tokens |
| Warm grey secondary text | `muted-foreground` = `#62625b` | Body text still requires AA contrast |
| Prototype red destructive action | `destructive` / `vm-crimson-500` | Always include destructive wording or icon context |
| Prototype green success | pale semantic success surface with `vm-green-800` body text or `vm-green-700` large/UI text | Never use white text on `vm-green-500` |
| Prototype yellow highlight | `vm-yellow-500` fill with `vm-navy-900` text | Use for award/vote emphasis, never white text |
| Prototype teal accent | `vm-teal-500` decorative fill or `vm-teal-700/800` text | Never use white text on the base teal |
| Inter body | `font-sans` = Inter | Reproduce Inter for body/interface text (amended 2026-08-02) |
| Fraunces display | `font-display` = Fraunces | Reproduce the Fraunces serif for display headings (amended 2026-08-02) |
| Generated 16px standard radius | `--radius-lg` = 16px (`rounded-lg`) on most surfaces | Matches the generated shape system |
| Generated 32px large radius | `--radius-2xl` = 32px (`rounded-2xl`) for large cards/modals | 32px is now approved (amended 2026-08-02) |
| Heavy or arbitrary shadow | documented `shadow-xs` through `shadow-xl` | Logo never receives a shadow |
| Arbitrary pixel spacing | documented 4px spacing scale and container system | Match rhythm with approved values |
| Raw form control | existing or installed shadcn/ui primitive | Preserve labels, errors, focus, disabled, and keyboard behaviour |
| Inline SVG or emoji | Lucide component | Official brand and SDG artwork remain externally owned exceptions |
| Remote Unsplash image | API media thumbnail/original or local neutral fallback | Maintain dimensions, alt text, lazy loading, and async decoding |
| Hidden scrollbar | normal accessible scrolling or shadcn Scroll Area where justified | Scrollable content must remain discoverable and keyboard accessible |

Category badges continue to use the deterministic category-to-VM-colour
mapping in `SYSTEM-DESIGN.md`. SDG badges keep official UN SDG colours rather
than adopting the VM2026 rotation.

## Route and Domain Translation

No new production route is approved by this contract.

| Prototype screen or concept | Approved production destination | Contract |
| --- | --- | --- |
| Home | `/` | Apply its composition to the existing API-backed homepage while retaining every Module 17 section |
| Exhibition Listing | `/projects` | Present published projects as the Exhibition Gallery; no Exhibition record exists |
| Exhibition Detail | `/projects/category/:categoryId`, `/projects/sdg/:sdgId`, and `/projects/technology/:technologyId` | Reuse the banner, metadata, filter, and grid composition for taxonomy collections |
| Search Results | `/projects` with validated query parameters | Keep search, filter, sorting, and pagination URL- and server-driven |
| Project Detail | `/projects/:slug` | Retain media, documentation, team, SDGs, technologies, engagement, comments, and view counting |
| Login | `/login` | Keep Sanctum, remember-me, Google OAuth, errors, and redirects |
| Registration mode | `/register` | Preserve a dedicated browser route and the supported Exhibitor/Guest roles |
| Dashboard | `/exhibitor/projects` and `/exhibitor/analytics` | Use only project and aggregate analytics returned by existing APIs |
| Submit Project | `/exhibitor/projects/new` | Apply the visual stepper to schema-backed project fields |
| Edit Project | `/exhibitor/projects/:projectId/edit` | Preserve authorization, persisted data, media workflow, and status restrictions |
| My Projects | `/exhibitor/projects` | Preserve ownership, exact statuses, pagination, and destructive confirmation |
| Profile | `/profile` | Use existing profile and avatar mutations only |
| Notifications | No route | Omit the user-notification screen; do not substitute announcements into an account feed |
| 404 | `*` | Use TARC Nexus language and valid production destinations |

Announcements remain:

- public homepage content returned by `/api/v1/public/homepage`; and
- Administrator-managed content under `/administrator/announcements`.

They do not occupy a bell, inbox, notification count, personal feed, or
notification route.

## Data and Form Translation

### Approved Project Fields

The design may group and sequence only these persisted project values:

- category
- title, subtitle, and team name
- abstract, problem statement, proposed solution, objectives, target users,
  and expected impact
- methodology and system architecture
- GitHub, live demo, Figma, and YouTube/Vimeo URLs
- project members: student name, matric number, programme, and supervisor
- SDGs with contribution descriptions
- technology IDs
- uploaded image, poster, video, and document media

The visual workflow must preserve draft creation before media upload because
media requires a persisted and authorized project.

### Explicit Prototype Substitutions

| Prototype value | Approved treatment |
| --- | --- |
| Exhibition selection, assignment, date, track, or count | Omit; no Exhibition entity or relationship exists |
| Faculty field | Omit from the project form; institution comes from the owner's profile and faculty is not persisted |
| Keyword field or tag array | Omit from the form; public keyword search remains a server query over supported project data |
| Arbitrary external-link pairs | Replace with the fixed GitHub, live demo, Figma, and video URL fields |
| External slides URL | Omit; presentation slides are uploaded document media |
| Fictional category values | Replace with API-provided digital-solution categories |
| Pending Review | Display `Submitted` or `Under Review` according to the actual API value; do not collapse the two |
| Rejected | Omit; no rejected status or transition exists |
| Return for Revision | Omit; no revision status or mutability contract exists |
| Weekly trends, daily visitors, referrals, active users | Omit; visitor-level analytics are not persisted |
| User notification list or unread count | Omit |
| Profile password controls | Omit until a supported authenticated password-change contract is approved |
| Remote prototype image URL | Use `thumbnail_url`, original media URL where appropriate, or a local neutral fallback |

Institution may be displayed from the project owner's resource. Student matric
numbers and review fields must not be exposed on public cards or public project
resources.

## Status and Interaction Contract

- Project states are exactly `Draft`, `Submitted`, `Under Review`, `Approved`,
  and `Published`.
- The approved forward review flow remains Submitted → Under Review → Approved
  → Published.
- Public discovery includes only Published projects whose `published_at` time
  has arrived.
- Favorites, votes, and comments retain their current authenticated role,
  publication, uniqueness, and authorization rules.
- A vote is not visually offered as removable.
- Deleting a comment may remove its reply branch; the confirmation must not
  imply soft deletion or restoration.
- Generated buttons or navigation may not suggest an API mutation that does not
  exist.

## Component Translation Contract

Implementation must reuse or extend these existing component families:

- `AppHeader`, `AppFooter`, `PublicLayout`, and `AdminLayout`
- `AuthShell`
- `ProjectCard`, `ProjectGrid`, `ProjectCollectionSection`, and
  `ProjectFilters`
- `ProjectPageHeader`, `AdminPageHeader`, and `MetricCard`
- `CategoryBadge`, `SdgBadge`, `TechnologyChip`, and `ProjectStatusBadge`
- `MediaGallery` and `MediaManager`
- `ProjectForm`, `ProjectTaxonomyFields`, and `TeamMembersEditor`
- `PaginationControls`
- current loading, API error, validation, permission, empty, and route-loading
  states

Variants must be explicit props or composed subcomponents. Similar markup may
not be copied into multiple pages to reproduce minor prototype differences.

Additional shadcn primitives may be installed only when used by an approved
screen. The anticipated candidates are Sheet, Alert Dialog, Progress, Skeleton,
Pagination, Tabs, and Tooltip. Installation is not approved merely because a
candidate appears in this list; the implementing unit must confirm that the
current repository has no suitable primitive.

## Accessibility and Responsive Exceptions

The following are required corrections, not fidelity failures:

- body text below 14px is raised to at least 14px;
- touch targets below 44×44px are enlarged;
- hidden or absent focus indicators are replaced with the global focus ring;
- colour-only state communication gains text and/or an icon;
- desktop fixed sidebars collapse into accessible mobile navigation;
- horizontal overflow and off-screen actions are corrected;
- generated tab/callback navigation becomes semantic React Router navigation
  where the URL represents a destination;
- nonessential motion is disabled under `prefers-reduced-motion`;
- busy-image text receives a contrast-safe scrim;
- images receive meaningful alt text or empty alt text when decorative.

Accessibility corrections take precedence over pixel similarity and must be
classified as such during Phase 8 comparison.

## Exception Register

| ID | Category | Prototype deviation | Approved replacement | Status |
| --- | --- | --- | --- | --- |
| EX-001 | Brand | ExhibitHub name and Pinterest-like mark | Keep TARC Nexus name in the generated mark's visual treatment; official VM2026 artwork only when verified | Re-scoped by D-011 (2026-08-02) |
| EX-002 | Brand | Red/cream product identity | Reproduce the generated red `#e60023` primary and warm-cream surfaces via tokens | Superseded by D-011 (2026-08-02) |
| EX-003 | Typography | Inter and Fraunces | Reproduce Inter (body) and Fraunces (display) via `--font-sans`/`--font-display` | Superseded by D-011 (2026-08-02) |
| EX-004 | Domain | Persisted Exhibition records and detail | Published project gallery and taxonomy collection routes | Locked |
| EX-005 | Domain | Personal Notifications | No route or feed; announcements remain homepage/admin content | Locked |
| EX-006 | Data | Mock categories, projects, images, and analytics | Existing Laravel API resources and local fallback media | Locked |
| EX-007 | Workflow | Pending Review and Rejected | Exact current ProjectStatus values and forward transitions | Locked |
| EX-008 | Forms | Faculty, keyword, exhibition, and arbitrary links | Omit or replace only as specified in Data and Form Translation | Locked |
| EX-009 | Components | Raw controls, inline graphics, and page-state routing | shadcn/ui, Lucide, React Router, existing services and guards | Locked |
| EX-010 | Accessibility | Small text, hidden scrollbars, weak focus, fixed desktop sidebar | WCAG 2.1 AA and mobile-first corrections | Locked |
| EX-011 | Visual | Arbitrary radii, spacing, and shadows | Generated 16px/32px/pill radii and shadow scale, expressed as tokens | Re-scoped by D-011 (2026-08-02) |
| EX-012 | Coverage | Prototype omits several supported production routes and states | Extend the translated shared system to all existing routes | Locked |
| EX-013 | Data/domain | Generated mock projects, exhibitions, imagery, notifications, unsupported statuses, and unsupported form fields still create visible differences during Unit 15 review | Keep production on real API data, published project/taxonomy mappings, no personal notification feed, documented statuses only, and schema-backed form fields | Locked by Unit 15 review (2026-08-02) |
| EX-014 | Accessibility/responsive | Generated mobile public navigation, fixed portal sidebar, small labels, hidden scrollbars, weak focus, and undersized targets differ from production | Keep Unit 14 accessibility corrections: mobile navigation/search, responsive portal navigation, 14px minimum visible text, 44px targets, visible focus, and no document-level horizontal overflow | Locked by Unit 15 review (2026-08-02) |
| EX-015 | Visual defect | Unit 15 side-by-side/overlay review found remaining composition deltas in home, gallery/search, taxonomy collections, project detail, auth, portal workflow, my projects, and profile screens | Not an approved exception; reconcile these screens before Unit 15 can complete | Open defect (2026-08-02) |

## Open External Items With Safe Defaults

The following remain externally unresolved but do not block page
implementation because this contract defines a safe default:

| Item | Safe default now | Later change permitted |
| --- | --- | --- |
| Official typeface licensing | Ship Nunito Sans and Oswald | Use licensed supplied webfonts through the existing fallback tokens |
| Official digital logo asset pack | Use text-only product identity | Add verified full-colour/reverse/black assets through a constrained `VMLogo` |
| Mobile brandmark | Show text identity without a fabricated icon | Use a separately supplied official compact mark |
| Logo clear-space ratio | Do not render the official logo | Encode the confirmed ratio inside `VMLogo` |

No implementation session may guess these values.

## Phase 1 Exit Decision

Phase 1 is approved for closure because:

- every known prototype conflict has a documented replacement;
- page work can proceed without a database or business-contract change;
- the Exhibition mapping is fixed to projects and taxonomy collections;
- the Notifications screen is explicitly omitted;
- temporary identity handling cannot be mistaken for fabricated VM2026
  artwork; and
- unresolved external brand inputs have safe defaults and cannot silently alter
  implementation scope.
