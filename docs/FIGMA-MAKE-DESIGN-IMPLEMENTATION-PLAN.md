<!-- @format -->

# Figma Make Design Implementation Plan

## Purpose

This plan defines how to implement the visual design in
`docs/TarcNexusFrontendDesign.zip` across TARC Nexus while preserving the
project's approved architecture, modules, database contract, VM2026 branding,
accessibility requirements, and existing API-backed behaviour.

The intended outcome is the closest practical reproduction of the generated
design. "Closest practical" means:

- Match the generated layout hierarchy, component composition, proportions,
  density, content rhythm, responsive intent, and interaction placement.
- Use the existing VM2026 brand tokens, typography, logo rules, shadcn/ui
  primitives, Lucide icons, routes, API services, and domain language.
- Record every intentional visual deviation from the generated reference.
- Never copy prototype-only mock data, business rules, navigation state, or
  unsupported entities into the production application.

No database-schema change is part of this plan.

Session-by-session execution, verification evidence, decisions, and continuation
state are tracked in `tasks/FIGMA-MAKE-DESIGN-SESSION-HANDOFF.md`. This document
remains the canonical implementation plan; the handoff is its operational
ledger.

## Sources and Authority

The following authority order applies when sources disagree:

1. `SYSTEM-ARCHITECTURE.md` controls application structure and layer
   responsibilities.
2. `SYSTEM-DATABASE.md` controls entities, relationships, fields, constraints,
   and persisted states.
3. `SYSTEM-MODULES.md` controls supported roles, features, workflows, and
   content requirements.
4. `SYSTEM-DESIGN.md` controls VM2026 branding, visual tokens, component
   standards, responsive rules, and accessibility.
5. The rendered Figma Make prototype controls visual composition only where it
   does not conflict with items 1-4.
6. Existing production behaviour and tests must remain intact unless a
   separately approved requirement changes them.

The ZIP archive must remain an immutable design reference. Its source files
must not be copied wholesale over `resources/js`.

## Audit Summary

The archive contains a standalone React/TypeScript prototype with:

- A single state-driven `App.tsx` instead of React Router routes.
- Ten page files plus embedded Profile and Notifications screens.
- Hardcoded mock data and remote Unsplash images.
- Hardcoded colours, inline styles, inline SVG icons, and raw form controls.
- A Pinterest-inspired visual specification using the `ExhibitHub` name,
  Pinterest-like red `#e60023`, warm cream surfaces, Inter, and Fraunces.
- Generated pages for Home, Exhibition Listing, Exhibition Detail, Project
  Detail, Login/Registration, Exhibitor Dashboard, Submit Project, My Projects,
  Search Results, Profile, Notifications, and 404.

The repository already has a more complete Laravel-backed application,
including authentication, profiles, project management, public discovery,
engagement, administration, review, reports, announcements, analytics, and
error/loading states.

### Conflicts Requiring Deliberate Adaptation

| Area | Generated reference | Approved project contract | Required treatment |
| --- | --- | --- | --- |
| Brand | `ExhibitHub` and a Pinterest-like red mark | TARC Nexus and VM2026 brand rules | Keep TARC Nexus naming and use approved VM2026 assets when available. Never reproduce the generated logo. |
| Primary colour | `#e60023` | `vm-blue-500` / `#2054A3` | Preserve CTA placement and prominence, but use the semantic primary token. |
| Typography | Inter and Fraunces | Nunito Sans and Oswald substitutes | Preserve hierarchy and approximate measurements through approved type tokens. |
| Styling | Hundreds of hardcoded hex values and arbitrary pixel styles | Tailwind v4 theme tokens and shadcn semantic variables | Translate all values to tokens; no hardcoded brand colours in components. |
| Components | Raw controls and inline SVG/emoji icons | shadcn/ui and Lucide only | Rebuild the visual composition with existing or approved primitives. |
| Routing | Local `page` state and callback navigation | React Router with protected routes | Retain the existing router, route guards, lazy loading, and URL semantics. |
| Data | In-component mock arrays | Laravel REST API resources | Bind designs to existing services and resources; include loading, empty, and error states. |
| Exhibition entity | Exhibition records, tracks, dates, and project assignment | No `exhibitions` table or relationship | Map the visual pattern to the published project gallery and category/SDG/technology collection routes. Do not invent persistence. |
| Categories | Technology, Design, Science, Arts, and similar academic areas | Approved digital-solution categories | Display API-provided categories only. |
| Project status | Pending Review and Rejected | Draft, Submitted, Under Review, Approved, Published | Use the approved enum and existing transition rules only. |
| Notifications | User-specific notification feed | No notification entity or module | Use announcements where suitable or omit the screen until a notification contract is approved. |
| Form fields | Exhibition, faculty, keyword, arbitrary external-link pairs | Approved project and media fields | Retain the generated grouping style, but render only schema-backed fields. |
| Images | Remote, hardcoded Unsplash URLs | Uploaded project media and generated thumbnails | Use API media URLs, responsive loading, and a local neutral fallback. |
| Accessibility | Hidden scrollbars, small text, missing global focus treatment, desktop-first fixed sidebar | WCAG 2.1 AA, 14px minimum body, visible focus, 44px targets, mobile-first | Preserve visual intent only after correcting these issues. |

### Exactness Policy

The implementation will target two kinds of fidelity.

**High-fidelity elements**

- Page composition and section order where the section is supported.
- Container widths, column proportions, card density, image aspect ratios, and
  whitespace rhythm.
- Placement of navigation, filters, calls to action, metadata, form steps,
  side panels, tables/cards, empty states, and confirmation dialogs.
- Responsive changes such as stacking, grid collapse, navigation compression,
  and mobile drawers.
- Hover, focus, disabled, loading, success, error, and destructive states.

**Intentional substitutions**

- VM2026 colours replace the generated red/cream palette.
- Approved typography replaces Inter/Fraunces.
- TARC Nexus/VM2026 identity replaces ExhibitHub/Pinterest-like identity.
- System-design radii, shadows, spacing, motion, and contrast rules replace
  undocumented arbitrary values.
- Real project terminology and API data replace fictional exhibition content.
- Accessible shadcn and Lucide implementations replace raw controls and inline
  graphics.

A literal pixel clone of the archive would violate the current brand,
architecture, database, and accessibility sources of truth. Literal use of the
generated palette, fonts, logo, or unsupported entities requires a separately
approved change to those authoritative documents and is outside this plan.

> **Superseded on 2026-08-02.** The project owner has since approved reproducing
> the generated palette, typography, surface treatment, and logo/mark styling.
> The "Intentional substitutions" above no longer apply to brand colour, fonts,
> or surfaces. See **Revised Fidelity Directive** immediately before Phase 6.
> The domain, database, status, and accessibility constraints in this section
> and elsewhere remain fully in force.

## Route and Screen Mapping

| Generated screen | Production destination | Implementation direction |
| --- | --- | --- |
| Home | `/` → `HomePage.jsx` | Recompose the existing API-backed hero, statistics, featured/latest/popular projects, categories, SDGs, announcements, and CTA sections using the generated layout rhythm. |
| Exhibition Listing | `/projects` → `GalleryPage.jsx` | Apply the generated discovery header, search/filter bar, card density, and empty state to the published-project gallery. Use "Projects" or "Exhibition Gallery", not a persisted exhibition entity. |
| Exhibition Detail | Existing category, SDG, and technology collection routes | Reuse its banner, metadata-panel, filter, and project-grid composition for collection landing states where supported. Do not add an exhibition-detail entity or route. |
| Search Results | `/projects` with validated query parameters | Integrate the generated search results composition into `GalleryPage`; retain server-side search, filters, sorting, and pagination. |
| Project Detail | `/projects/:slug` → `ProjectDetailPage.jsx` | Adopt the generated hero/media/content/sidebar proportions while retaining SDG contributions, engagement controls, documents, external resources, comments, view counting, and API privacy rules. |
| Login | `/login` → `LoginPage.jsx` | Apply generated auth proportions and surface treatment through `AuthShell`, while retaining Sanctum, remember-me, error handling, and Google OAuth. |
| Registration mode | `/register` → `RegisterPage.jsx` | Use the same auth visual language on the existing dedicated route and approved role fields. |
| Submit Project | `/exhibitor/projects/new` → `ProjectCreatePage.jsx` | Convert the generated stepper and section grouping to the existing draft-creation contract and schema-backed `ProjectForm`. |
| Edit Project | `/exhibitor/projects/:projectId/edit` → `ProjectEditPage.jsx` | Reuse the same stepper/form shell with existing data, media management, save, and submit-state restrictions. |
| My Projects | `/exhibitor/projects` → `ProjectListPage.jsx` | Apply the generated filter/header/card or list treatment while preserving pagination, exact statuses, ownership, edit/view actions, and delete confirmation. |
| Dashboard | Existing exhibitor analytics and project routes | Reuse metric, quick-action, and project-summary compositions where existing APIs support them. Do not display fictional weekly trends, notifications, or exhibition counts. |
| Profile | `/profile` → `ProfilePage.jsx` | Apply the generated two-column/surface composition to the existing profile and avatar workflow. Omit unsupported password-changing controls unless that backend feature is separately approved. |
| Notifications | No supported route | Do not implement as a user notification feed. A visually similar panel may present public announcements only if clearly labelled as announcements. |
| 404 | `*` → `NotFoundPage.jsx` | Match generated composition with TARC Nexus language, accessible actions, and production routes. |

## Coverage Beyond the Generated Screens

The generated archive does not specify every screen already required by the
system. The following must be restyled using the same translated component
system so the application does not look like two products:

- Forgot password, reset password, email verification, verified confirmation,
  and Google registration.
- Favorites and all project engagement controls.
- Exhibitor analytics.
- Administrator shell, dashboard, users, taxonomies, project queue/review,
  announcements, and reports.
- Loading, API error, validation error, permission, empty collection, upload
  failure, and destructive-confirmation states.
- Comment threads, replies, and moderation.
- Route loading and system-status components.

These screens should reuse the same shell, page header, cards, filters, form
fields, status badges, tables, dialogs, and responsive behaviours established
from the primary Figma-aligned screens.

## Target Component System

### Foundations

Before page work, create a translation sheet from generated values to approved
tokens. The initial mapping is:

> **Partly superseded on 2026-08-02** by the Revised Fidelity Directive (before
> Phase 6). The colour, typography, radius, and surface rows below no longer map
> the generated design onto VM2026 substitutes — the Phase 6 re-skin instead
> reproduces the generated red primary, cream surfaces, Inter/Fraunces, and
> generated radii as tokens. The structural rules (semantic classes, category
> and SDG mappings) still stand.

| Generated role | Approved implementation |
| --- | --- |
| Red primary CTA | `primary` / `vm-blue-500`; `vm-blue-600` hover |
| Dark charcoal sidebar | `vm-navy-950` or semantic sidebar tokens |
| Warm cream card/canvas | `background`, `card`, `muted`, or approved VM neutral surfaces |
| Muted warm grey text | `muted-foreground` |
| Red destructive action | `destructive` / `vm-crimson-500` |
| Green success | documented `vm-green-700/800` text and safe pale surface |
| Inter body | `font-sans` / Nunito Sans |
| Fraunces display | `font-display` / Oswald |
| Generated 16px standard radius | `rounded-xl` where the system assigns a 16px feature surface; otherwise the component's documented default |
| Generated 32px large radius | `rounded-2xl` from the approved 24px token unless a design-token change is separately approved |

The implementation must use semantic classes whenever a semantic role exists.
Category colours must continue to use the deterministic documented mapping,
and SDG badges must keep official UN colours.

### Shared Primitives

Reuse the current shadcn components first:

- Alert
- Avatar
- Badge
- Button
- Card
- Checkbox
- Input
- Label
- Select
- Separator
- Textarea

Install only the additional shadcn primitives actually needed by an approved
screen, likely:

- Dialog or Alert Dialog for destructive confirmation.
- Sheet for mobile public and portal navigation.
- Tabs for compact screen switching where URL navigation is not required.
- Progress for the project-form step indicator.
- Skeleton for stable loading layouts.
- Pagination for gallery and owned-project collections.
- Tooltip for icon-only controls.

Do not create custom substitutes for those primitives.

### Shared Application Components

Refactor or extend components rather than duplicating markup:

- `AppHeader` and `AppFooter`
- `AuthShell`
- An accessible responsive Exhibitor portal shell
- `AdminLayout`
- `ProjectPageHeader` and `AdminPageHeader`
- `ProjectCard` with explicit public, compact, and owner variants
- `ProjectGrid` and collection sections
- `ProjectFilters` / shared `SearchBar`
- `ProjectStatusBadge`, `CategoryBadge`, `SdgBadge`, and `TechnologyChip`
- `MetricCard` / `StatisticsCard`
- `MediaGallery` and `MediaManager`
- `ProjectForm`, `ProjectTaxonomyFields`, and `TeamMembersEditor`
- `EmptyState`, `ErrorState`, and `LoadingState`
- `ConfirmActionDialog`

Variants should be explicit component APIs, not copied pages with slightly
different hardcoded classes.

## Implementation Phases

### Phase 0 — Freeze the Visual Reference

1. Extract the ZIP into a reference-only temporary directory.
2. Install and run the generated application in isolation without changing its
   source.
3. Capture every reachable page and important state at 1440px, 768px, and
   360px viewport widths.
4. Capture form steps, empty results, delete confirmation, success states,
   logged-out navigation, and logged-in portal navigation.
5. Record computed measurements for containers, gaps, card sizes, image aspect
   ratios, typography, and major breakpoints.
6. Save a reference checklist and screenshot index. Do not treat inaccessible
   or broken responsive behaviour as an acceptance target.

Exit criteria:

- Every generated route/state has a named baseline.
- Desktop-only or incomplete generated states are clearly identified.
- The ZIP checksum is recorded so the reference cannot silently change.

### Phase 1 — Approve the Translation Contract

Approved contract:
`docs/FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md`.

1. Finalize the generated-to-VM2026 token mapping.
2. Create an exceptions register covering brand, domain, accessibility, and
   unsupported-data deviations.
3. Confirm temporary logo handling while official VM2026 assets, mobile mark,
   and clear-space measurements remain unresolved.
4. Confirm that "Exhibition" compositions map to the project gallery and
   taxonomy collections rather than a new entity.
5. Confirm whether announcements should visually occupy the prototype's
   notification area or whether that screen is omitted.

Exit criteria:

- No unresolved decision can trigger a schema or brand-contract change during
  page implementation.
- Every known visual deviation has a reason and an approved replacement.

### Phase 2 — Build the Shared Visual Foundation

1. Keep the current Tailwind v4 token definitions and semantic shadcn
   variables as the implementation base.
2. Normalize page containers, section spacing, headings, cards, fields,
   buttons, badges, and focus states.
3. Restyle `AppHeader` and `AppFooter` to the generated composition while
   preserving TARC Nexus navigation, role visibility, and authentication.
4. Implement the mobile navigation as an accessible Sheet, not a compressed
   desktop header.
5. Create the responsive Exhibitor shell based on the generated sidebar. The
   sidebar must collapse to a mobile drawer and must not reserve a fixed
   240px margin on small screens.
6. Align `AdminLayout` with the same shell vocabulary without obscuring role
   differences.
7. Add shared loading, empty, error, and dialog compositions.

Exit criteria:

- Shells work at 360px, 768px, and 1440px.
- Keyboard focus order, skip links, and mobile navigation are complete.
- No page-specific hardcoded brand values are required.

### Phase 3 — Public Discovery Screens

Implement in this order:

1. Home
2. Project gallery/search
3. Category, SDG, and technology collection states
4. Project detail
5. Favorites
6. 404 and public empty/error states

For each screen:

- Preserve its current API call, error boundary, loading state, metadata, and
  pagination behaviour.
- Match the generated composition using real resource fields.
- Keep homepage sections required by Module 17 even when they are absent from
  the generated mockup.
- Keep engagement, SDG, documentation, and discussion content required by
  Modules 6, 8, 9, and 10.
- Use backend thumbnails and original media rather than generated remote URLs.

Exit criteria:

- Public workflows are visually cohesive and remain fully API-backed.
- Search/filter/sort state remains URL- and server-driven.
- Published-only privacy and viewer-specific engagement state remain intact.

### Phase 4 — Authentication and Profile Screens

1. Apply one consistent Figma-aligned auth shell to login, registration,
   Google completion, forgot/reset password, and email verification.
2. Preserve separate routes instead of the generated login/register local
   toggle where browser history and validation benefit from dedicated URLs.
3. Preserve Sanctum CSRF handling, Google immutable-ID rules, role selection,
   remember-me, validation messages, and redirect behaviour.
4. Restyle Profile around existing avatar, personal details, and account data.
5. Do not render controls whose mutations are unsupported.

Exit criteria:

- Every auth field has a visible label, announced error, and correct
  autocomplete attributes.
- Authentication behaviour and route guards pass existing tests.

### Phase 5 — Exhibitor Project Workflow

1. Apply the generated My Projects composition to `ProjectListPage`.
2. Rework `ProjectForm` into the generated step structure using schema-backed
   groups:
   - Basic information
   - Project narrative
   - Taxonomies and SDG contributions
   - Team and development information
   - External links and review
3. Keep draft creation separate from media mutations because media requires a
   persisted, authorized project.
4. On edit, integrate `MediaManager` into the visual workflow and show existing
   files, upload status, removal confirmation, and upload errors.
5. Preserve status-based edit restrictions and the explicit final submission
   transition.
6. Use the generated dashboard metric and quick-action patterns only with
   values returned by the existing analytics/project APIs.

Exit criteria:

- A user can create a draft, edit every supported field, manage media, review,
  submit, view, paginate, and delete without mock state.
- Refreshing or revisiting a route does not lose persisted work.
- Unsupported exhibition, faculty, keyword, arbitrary-link, and notification
  fields are absent.

## Revised Fidelity Directive — Visual Parity With the Generated Design (2026-08-02)

### Decision and authority

On 2026-08-02 the project owner directed that the production UI must **visually
match the generated Figma design as closely as practical**, including its colour
palette, typography, surface treatment, radii, shadows, spacing rhythm, and
logo/mark styling — not only its structure.

This directive is now the top visual authority for the remainder of the plan. It
**supersedes**:

- the "Intentional substitutions" in the Exactness Policy for brand colour,
  typography, and surfaces;
- translation-contract exceptions `EX-002` (colour), `EX-003` (typography), and
  the surface/radius/shadow/spacing rows of Visual Token Translation; and
- `EX-001` is re-scoped from "text-only identity" to "reproduce the generated
  logo/mark visual treatment" (see logo note below).

Because this reverses a decision that `SYSTEM-DESIGN.md` currently controls,
Phase 10 must reconcile the authority conflict in writing rather than leaving
`SYSTEM-DESIGN.md` silently overridden. The owner is the approver of record for
this change; the tradeoff (departing from official VM2026 brand colours for the
VM2026 Online Exhibition submission) is accepted knowingly and is recorded here
so any reviewer sees it.

### This changes already-built work (Phases 2–5)

Phases 2–5 shipped screens rendering VM2026 blue (`#2054a3`), Nunito Sans /
Oswald, and a text-only identity — the opposite of the new target. Parity
therefore **cannot** be achieved by editing Phase 6+ screens alone. It is
achieved primarily by **re-skinning the shared token foundation**, which
cascades to every screen already built on semantic tokens, plus a per-screen
reconciliation pass for anything that does not cascade. Both are scheduled in
the revised Phase 6 below.

### What does NOT change

These constraints are grounded in the real backend and accessibility law, not in
brand preference, and remain non-negotiable:

- No new database table, field, relationship, status, or migration.
- No Exhibition or user Notification entity. Exhibition views still map to
  published projects and taxonomy collections; the Notifications screen stays
  omitted.
- Only `Draft`, `Submitted`, `Under Review`, `Approved`, and `Published`.
- Real API data, backend media, and local neutral fallbacks only — never the
  prototype's mock arrays or remote Unsplash URLs.
- React Router, Sanctum, role guards, validation, authorization, pagination,
  and uploads preserved.
- The accessibility floor holds and is the **only** permitted deviation from a
  literal clone: 14px minimum body text, visible focus, 44×44px targets, logical
  keyboard order, reduced-motion support, and text contrast for meaningful text.
  Where the generated design violates these (small text, hidden scrollbars, weak
  focus, colour-only state), correct minimally and record it as an accessibility
  deviation, not a defect.

### Logo and product name (assumption — confirm if wrong)

The product remains **TARC Nexus** (a real domain fact for VM2026). The directive
is read as: adopt the generated logo/mark's *visual treatment* — its shape
language, weight, colour, and placement — applied to the TARC Nexus name, rather
than literally shipping the fictional "ExhibitHub" wordmark. If the owner instead
wants the literal ExhibitHub wordmark, that is a further explicit decision to be
recorded before Phase 6 execution.

### Required document corrections (precondition to Phase 6 execution)

Even though they sit "before Phase 6," these must be updated first or the plan
contradicts itself:

1. In `FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md`, flip `EX-002` and `EX-003`
   and the colour/typography/surface/radius/shadow rows of Visual Token
   Translation to "reproduce the generated design," and re-scope `EX-001` per
   the logo note. Mark each superseded row with the 2026-08-02 decision.
2. Annotate `SYSTEM-DESIGN.md` to record that, for this build, the generated
   palette and typography take precedence over the VM2026 brand ramp by owner
   decision (resolve, do not hide, the authority conflict).
3. Re-skin the token foundation in `resources/css/app.css`: the generated red
   primary (`#e60023`) with its hover, warm cream page/card/muted surfaces, the
   Inter body and Fraunces display families, and the generated radii (16px /
   32px), shadow, and spacing scale — expressed as tokens, never as per-component
   hardcoded hex.

### Phase 6 — Re-skin the Foundation and Reconcile the Built Screens

This replaces the former "Administration and Unspecified Screens" phase, whose
content moves to Phase 7.

1. **Capture the Phase 0 baseline first (mandatory; it was skipped).** Without a
   rendered reference, visual parity cannot be verified. Extract the archive to
   an isolated directory, run the prototype unchanged, and screenshot every
   reachable screen and state at 1440px, 768px, and 360px. Record container,
   grid, gap, card, image-ratio, type, radius, shadow, and colour measurements.
   Save `docs/FIGMA-MAKE-DESIGN-REFERENCE.md` as the durable index and confirm
   the recorded ZIP checksum.
2. Complete the three "Required document corrections" above, including the
   `app.css` token re-skin.
3. Sweep the Phase 2–5 code for anything that will not cascade from the token
   change — hardcoded VM ramp utilities, semantic tokens used where a literal
   generated value is now wanted, `font-display`/`font-sans` assumptions, and
   places the generated design uses cream/red directly. Fix so the foundation
   re-skin propagates cleanly.
4. Reconcile each already-built surface against its captured baseline at all
   three widths: `AppHeader`/`AppFooter`/shells, Home, gallery/search/collections,
   project detail, favourites, 404, all auth routes, profile, My Projects, and
   the create/edit workflow. Fix both structural drift and brand parity.
5. Preserve every constraint in "What does NOT change" while doing so.

Exit criteria:

- The Phase 0 baseline exists and the reference index is usable.
- The three document corrections are complete and the token foundation renders
  the generated palette, fonts, and surfaces.
- Every already-built screen matches its generated baseline at 360/768/1440
  within the documented accessibility-only deviations.
- No screen still shows VM2026 blue, Nunito Sans/Oswald, or the text-only
  identity where the generated design specifies otherwise.

### Phase 7 — Administration and Unspecified Screens

1. Apply the generated design's palette, typography, card/table/dialog styling,
   and spacing rhythm to every Administrator route: shell, dashboard, users,
   taxonomies, and to analytics, announcements, reports, project review, comment
   moderation, and all remaining empty/error/loading states.
2. The generated archive supplies **no** administrator screens, so there is no
   literal baseline to match here. Match the generated **design system** — the
   same tokens, type scale, surfaces, and component treatments reconciled in
   Phase 6 — extended consistently, not a per-screen clone.
3. Preserve dense administrative information where a consumer-style card grid
   would reduce usability; density is a usability requirement, not a fidelity
   failure.
4. Use the approved status model. Do not introduce a Rejected display state
   until the status transition is formally added to the system contract.

Exit criteria:

- All roles see one coherent visual system rendered in the generated look.
- No route retains the pre-directive VM2026-blue vocabulary.
- Existing authorization and destructive-action safeguards remain visible.

### Phase 8 — Responsive, Accessibility, and Content Hardening

Any correction made here that departs from the generated design is an accepted
accessibility deviation under the Revised Fidelity Directive; record it so
Phase 9 does not reclassify it as a defect.

Verify at minimum:

- 360px mobile
- 768px tablet
- 1024px small desktop
- 1440px desktop

Checks:

- No horizontal overflow, clipped dialog, fixed-sidebar obstruction, or
  inaccessible off-screen action.
- Touch targets are at least 44×44px.
- Body text is never below 14px.
- All focus indicators remain visible.
- Tab order follows the visual order.
- Navigation, filters, dialogs, stepper, uploads, and galleries are keyboard
  operable.
- Colour contrast meets WCAG 2.1 AA and documented VM2026 pairings.
- Meaning is not conveyed by colour alone.
- Reduced-motion preferences disable nonessential motion.
- Images have useful alternative text, lazy loading, asynchronous decoding,
  stable dimensions/aspect ratios, and appropriate fallbacks.
- Long titles, institutions, team names, empty values, validation errors, and
  maximum-length content do not break layouts.
- Browser back/forward navigation and query parameters remain correct.

### Phase 9 — Visual Fidelity Verification

Under the Revised Fidelity Directive the acceptance bar is now **close visual
match to the generated baseline**, since brand, fonts, and surfaces are no
longer substituted. For each mapped screen:

1. Render the generated baseline and production implementation at the same
   viewport and content-length profile.
2. Compare side by side and with a semi-transparent overlay. Palette, type
   family, radii, shadows, and surface tone are now in scope for the overlay,
   not just structure.
3. Review:
   - Section order
   - Container and grid alignment
   - Major vertical rhythm
   - Card/image proportions
   - Colour palette, surface tone, radii, and shadows
   - Type family, heading and body hierarchy
   - CTA prominence and colour
   - Filter/form control placement
   - Responsive collapse
   - Empty, error, loading, dialog, and success states
4. Classify each remaining difference as one of only these — **brand
   substitution is no longer an accepted category**:
   - Required data/domain substitution (real projects vs. mock exhibitions;
     omitted unsupported entities)
   - Required accessibility correction (recorded in Phase 8)
   - Required responsive correction
   - Unintended visual defect
5. Fix every unintended defect and every avoidable brand/appearance difference;
   retain only the data/domain and accessibility deviations in the register.

Because the domain data, unsupported-entity omissions, and accessibility floor
still differ from the prototype, acceptance is close visual parity with those
documented deviations — not an unqualified pixel-difference percentage, but a
materially tighter appearance match than the pre-directive plan required.

Exit criteria:

- Every route in the screen matrix has a completed visual review at 360px,
  768px, and 1440px.
- Palette, typography, and surface treatment match the generated baseline
  except where an accessibility or data/domain deviation is recorded.
- No unexplained high-impact difference remains.
- Missing prototype states have been implemented consistently from shared
  components rather than invented page-by-page.

### Phase 10 — Regression, Documentation, and Handoff

Run:

```powershell
npm run test:frontend
npm run build
php artisan test
vendor\bin\pint --test
composer validate --strict
```

Also complete:

- Live browser smoke tests for all public and protected routes.
- Role tests for Guest, Exhibitor, and Administrator navigation.
- Form validation and API-failure tests.
- Upload, delete-confirmation, pagination, search, and filter tests.
- Keyboard-only and reduced-motion passes.
- Review for per-component hardcoded hex (the generated palette must live in
  tokens, not in JSX), mock arrays, inline SVG/emoji icons, direct Axios calls
  in pages, and duplicate components.
- Confirm no VM2026-blue / Nunito Sans / Oswald / text-only-identity residue
  remains where the generated design specifies the red palette, Inter/Fraunces,
  or the generated mark.
- Reconcile the authority conflict from the Revised Fidelity Directive:
  annotate `SYSTEM-DESIGN.md` and update the translation contract
  (`EX-001`/`EX-002`/`EX-003` and the affected Visual Token Translation rows)
  so the documents state the generated palette/typography now take precedence
  for this build. Do not leave `SYSTEM-DESIGN.md` silently overridden.
- Update `SYSTEM-DESIGN.md` further only for other approved reusable
  token/component decisions.
- Update `SYSTEM-ARCHITECTURE.md`, `SYSTEM-MODULES.md`, or
  `SYSTEM-DATABASE.md` only if an explicitly approved requirement changes
  those contracts.
- Update `IMPLEMENTATION-ROADMAP.md`,
  `tasks/FIGMA-MAKE-DESIGN-SESSION-HANDOFF.md`, and
  `tasks/SESSION-HANDOFF.md` with completed scope, evidence, and remaining
  decisions.

## Suggested Delivery Slices

Keep reviewable changes small and independently verifiable:

1. Reference baseline and translation contract.
2. Shared tokens, primitives, public header/footer, and portal shells.
3. Home and public project cards.
4. Gallery, search, filters, collections, and pagination.
5. Project detail, media, engagement, and comments.
6. Authentication and profile.
7. My Projects and the create/edit workflow.
8. Analytics and administration.
9. Responsive/accessibility fixes and visual regression.
10. Documentation and final hardening evidence.

Each slice should build successfully and preserve existing tests before the
next slice begins.

## Risks and Controls

| Risk | Control |
| --- | --- |
| The prototype is mistaken for production-ready code | Treat it only as a renderable visual reference; reimplement the *look* through current components and services, never by copying prototype source over `resources/js`. |
| Departing from official VM2026 brand colours affects the real submission | The owner accepted this on 2026-08-02; record the tradeoff in `SYSTEM-DESIGN.md` and the translation contract so it is a visible, reversible decision, not a silent drift. |
| The generated palette is hardcoded into JSX instead of tokens | Express the generated red/cream/type/radii/shadows as `app.css` tokens; prohibit per-component hardcoded hex so a later brand change stays single-source. |
| Unsupported Exhibition or Notification features leak into scope | Enforce the route mapping and database contract; require separate approval for new entities. This constraint is untouched by the fidelity directive. |
| Mock content hides real-data layout failures | Test with seeded short, typical, long, missing, and maximum-length values; the generated mock data is never shipped. |
| Desktop prototype produces broken mobile pages | Treat generated mobile behaviour as a hypothesis and verify against the project's mobile-first accessibility floor, which overrides literal fidelity. |
| The literal ExhibitHub wordmark is shipped by mistake | Keep the TARC Nexus name; reproduce only the generated mark's visual treatment unless the owner explicitly approves the ExhibitHub wordmark. |
| Remote prototype imagery becomes a production dependency | Use project media and local fallbacks only. |
| Restyling breaks working business flows | Preserve service boundaries and add route-level smoke tests before visual refactors. |
| Unspecified screens drift from the main design | Build them from the same shared shells, headers, cards, controls, states, and tokens. |

## Definition of Done

The design integration is complete only when:

- Every supported route has been reviewed and restyled, including screens not
  present in the archive.
- The implementation matches the generated design's composition **and
  appearance** (palette, typography, surfaces, radii, shadows) as closely as the
  domain-data and accessibility constraints permit.
- Every remaining difference is a documented data/domain or accessibility
  deviation; no unexplained brand or appearance difference remains.
- There are no generated mock arrays, remote placeholder images, per-component
  hardcoded hex, inline SVG/emoji icon substitutes, or prototype navigation
  state in production code.
- There are no new database fields, statuses, entities, or business rules
  introduced by the visual refactor.
- Existing API, authorization, validation, pagination, upload, engagement, and
  administration behaviour remains functional.
- Shared shadcn and feature components are reused consistently.
- All responsive, keyboard, focus, contrast, loading, empty, error, and
  reduced-motion checks pass.
- Frontend tests, production build, backend tests, Pint, and Composer
  validation pass.
- Relevant documentation and the session handoff are synchronized with the
  delivered implementation.
