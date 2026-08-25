<!-- @format -->

# Figma Make Design Session Handoff

## Purpose

This file is the execution ledger for
`docs/FIGMA-MAKE-DESIGN-IMPLEMENTATION-PLAN.md`. It exists so the design work
can be completed in bounded sessions without reloading the full project history
or attempting the entire visual refactor in one context window.

This handoff is separate from `tasks/SESSION-HANDOFF.md`, which continues to
track the wider system hardening and deployment work.

## Scope Change â€” Revised Fidelity Directive (2026-08-02)

The project owner changed the visual goal from "structure + VM2026 brand
substitution" to **literal visual parity with the generated Figma design**
(red `#e60023` palette, Inter/Fraunces, cream surfaces, generated mark styling).
The master plan now carries a **Revised Fidelity Directive** before Phase 6 that
supersedes the Exactness Policy substitutions and translation-contract
`EX-001`/`EX-002`/`EX-003`.

Consequences for this ledger:

- The Phase 2â€“5 screens (Units 02â€“09) were built VM2026-blue with Nunito
  Sans/Oswald â€” the opposite of the new target. They are **not** discarded; they
  are re-skinned via the token foundation and reconciled to the baseline under
  the new Phase 6 (Units 10â€“11).
- Master-plan phases were renumbered: old Phase 6 (admin) â†’ Phase 7, old 7 â†’ 8,
  old 8 â†’ 9, old 9 â†’ 10. A new Phase 6 covers the foundation re-skin, the skipped
  baseline capture, the document corrections, and built-screen reconciliation.
- Constraints unchanged: no new DB entities/statuses, no Exhibition/Notification
  tables, real API data only, and the WCAG accessibility floor (the only allowed
  deviation from a literal clone). Product name stays TARC Nexus.

See decision **D-011**.

## Current State

- **Current work unit:** Unit 15 - Complete visual-fidelity review and
  exception classification
- **Status:** In progress - Unit 15 comparison artifacts and classifications
  recorded; high-impact unintended visual defects remain
- **Next work unit:** Unit 15 visual remediation and recapture
- **Last completed work unit:** Unit 14 - Responsive, accessibility, and
  content hardening (2 August 2026)
- **Master plan:** `docs/FIGMA-MAKE-DESIGN-IMPLEMENTATION-PLAN.md`
- **Translation contract:**
  `docs/FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md`
- **Design archive:** `docs/TarcNexusFrontendDesign.zip`
- **Archive SHA-256:**
  `2CA5BBC334403D388468B73F26353320963EE18EA17B5D58D3A3D835809AD1FB`
- **Last updated:** 2 August 2026

Phase 2â€“5 implementation was staged out of sequence at the user's direction. The
shared foundation, shells, public discovery screens, authentication/profile
routes, and Exhibitor project workflow pass their automated gates, but Units
02â€“09 were never browser-verified and are now visually superseded by the
fidelity directive. Their appearance is reconciled under Units 10â€“11; their
structure and API wiring are reused. Unit 00 is now complete, and its rendered
baseline is the required visual authority for Unit 11 reconciliation. Unit 12
was completed out of sequence after the owner directed continuation to Unit 12;
Unit 13 and Unit 14 are now complete. Unit 15 side-by-side/overlay review
confirmed that Unit 11 parity is still not complete; remaining composition
deltas are recorded as open visual defects, not approved exceptions.

## Copy-Ready Prompt for the Next Session

```text
Continue the Figma Make design implementation using
tasks/FIGMA-MAKE-DESIGN-SESSION-HANDOFF.md.

Continue Unit 15 using tasks/FIGMA-MAKE-DESIGN-SESSION-HANDOFF.md. Read
AGENTS.md, the handoff's Scope Change, Global Guardrails, the Unit 15 Work Unit
Matrix row, and the plan's Revised Fidelity Directive plus Phase 9. Inspect the
dirty worktree and preserve unrelated work.

Unit 15 is in progress. Side-by-side and 50% overlay artifacts were generated
for 54 mapped reference/production pairs at 1440px, 768px, and 360px under
`storage/app/codex-visual-smoke/unit15/comparisons/`; the review summary is
`docs/FIGMA-MAKE-DESIGN-VISUAL-FIDELITY-REVIEW.md`. The comparison found
accepted data/domain and accessibility deviations, but also open unintended
visual defects across home, gallery/search, taxonomy collections, project
detail, auth, Exhibitor workflow, My Projects, and profile. Continue Unit 15 by
fixing those visual defects screen group by screen group, then recapture and
regenerate the comparison artifacts. Do not move to Unit 16 yet.
```

## Session Protocol

### At the Start of Every Session

1. Read `AGENTS.md`.
2. Read `Current State`, `Global Guardrails`, and the active row in the Work
   Unit Matrix below.
3. Read the master plan's Purpose, Sources and Authority, Exactness Policy, and
   the phase named by the active row.
4. Consult only the source-of-truth sections named by the active row. Expand
   into other sections when a discovered conflict requires it.
5. Run `git status --short` and inspect diffs for files in scope. The current
   worktree contains user-owned changes and must not be cleaned or overwritten.
6. Confirm the preceding unit's recorded evidence before relying on its output.

### At the End of Every Session

1. Stop at the active unit boundary; do not spend the remaining context on the
   next unit.
2. Run the active unit's required checks.
3. Review the diff for duplicate components, hardcoded generated colours, mock
   data, inline styles, inline SVG/emoji icons, direct page-level Axios calls,
   and unsupported fields or statuses.
4. Mark the unit `Completed` only when every exit criterion passes. Otherwise
   leave it `In progress` and record the exact remaining task.
5. Update:
   - `Current State`
   - `Execution Ledger`
   - `Verification Evidence`
   - `Decision and Exception Log`
   - the copy-ready next-session prompt if special context is needed
6. Record file paths and test results, not a long narrative of the session.

## Token-Efficient Reading Policy

- `AGENTS.md` and this handoff are required every session.
- The four source-of-truth documents remain authoritative, but a session should
  load the sections relevant to its unit rather than repeatedly loading every
  document in full.
- Read only the active phase of the master plan after its short authority and
  exactness sections have been refreshed.
- After Unit 00, use the captured reference index instead of reopening every
  prototype source file. Open an individual prototype file only to resolve a
  specific visual ambiguity.
- Inspect the production files named by the active unit before searching the
  entire repository.
- Do not repeat already recorded audits. Revalidate only what the active unit
  can affect, then run the scheduled milestone suite.
- Decisions belong in this handoff or the approved decision/exception artifact;
  do not leave critical context only in chat.

This policy reduces repeated context loading; it does not weaken the authority
of `SYSTEM-ARCHITECTURE.md`, `SYSTEM-DESIGN.md`, `SYSTEM-DATABASE.md`, or
`SYSTEM-MODULES.md`.

## Global Guardrails

These rules apply to every unit:

1. Treat the ZIP as an immutable visual reference. Do not copy its application
   over `resources/js`.
2. Preserve React Router, Sanctum, role guards, API services, validation,
   authorization, pagination, uploads, and current business behaviour.
3. Do not add a database table, field, relationship, status, or migration.
4. Do not create an Exhibition or user Notification entity.
5. Use only the documented project statuses: Draft, Submitted, Under Review,
   Approved, and Published.
6. **Amended by D-011 (2026-08-02).** Keep the TARC Nexus product name and reuse
   the generated design's look: reproduce its red palette, cream surfaces, and
   Inter/Fraunces typography as tokens, and apply the generated mark's visual
   treatment to the TARC Nexus name (not the literal "ExhibitHub" wordmark). Mock
   content and remote Unsplash dependencies remain forbidden â€” real API data and
   local fallbacks only.
7. Do not create, crop, trace, recolour, shrink below the documented minimum,
   or otherwise substitute a VM2026 logo.
8. Use Tailwind v4 tokens, shadcn/ui primitives, and Lucide icons. No inline
   CSS, component-level brand hex values, raw replacement controls, emoji
   icons, or hand-built shadcn substitutes.
9. Reuse or extend existing components through explicit variants before
   creating new components.
10. Keep business logic in Laravel and API/service layers. React remains
    presentation, state, interaction, routing, and API consumption only.
11. Maintain WCAG 2.1 AA, visible focus, logical keyboard order, 44Ã—44px touch
    targets, 14px minimum body text, reduced-motion support, and mobile-first
    behaviour.
12. Use real API resource fields, backend thumbnails, and local neutral
    fallbacks. Never ship prototype mock arrays or remote placeholder images.
13. Preserve user-owned work in the dirty worktree. Never reset, discard, or
    overwrite unrelated changes.
14. Introduce no new package unless an active-unit requirement cannot be met by
    the current stack and the justification is documented first.

## Verification Tiers

Use the smallest relevant tier during iteration, then complete the tier
assigned to the work unit before closing it.

### Tier A â€” Frontend Gate

```powershell
npm run test:frontend
npm run build
```

Also smoke-test the changed routes and widths named by the work unit.

### Tier B â€” Milestone Regression

```powershell
npm run test:frontend
npm run build
php artisan test
vendor\bin\pint --test
composer validate --strict
```

If a command fails because of an environment issue, record the exact command
and failure. Do not report the unit as verified.

### Tier C â€” Final Acceptance

Tier B plus:

- Guest, Exhibitor, and Administrator live route smoke tests
- 360px, 768px, 1024px, and 1440px viewport checks
- keyboard-only and reduced-motion checks
- computed contrast review
- Chromium, Firefox, WebKit/Safari, and Edge coverage
- upload, delete, pagination, search, filter, form-validation, and API-failure
  flows
- side-by-side and overlay comparison against the reference baselines

The local Node version was previously reported as 22.1.0, below Vite 8's
supported `>=22.12.0` floor. The Phase 2 frontend gate ran on Node 26.5.1
without that warning; final acceptance must still confirm the deployment
environment meets the declared engine range.

## Work Unit Matrix

Status values: `Not started`, `In progress`, `Blocked`, or `Completed`.

| Unit | Master phase | Status | Session outcome | Primary scope | Required reading | Exit gate |
| --- | --- | --- | --- | --- | --- | --- |
| 00 | Phase 6 prerequisite (was Phase 0) | **Completed** (2 Aug 2026) | Froze and indexed the unchanged prototype reference with 102 screenshots across 34 reachable states | ZIP, isolated prototype, `docs/figma-make-reference/screenshots/`, measurements, reference index | Plan Audit Summary + Revised Fidelity Directive + Phase 6; Design Â§Â§6, 9, 12 | Baselines and states indexed at 360/768/1440; checksum confirmed |
| 01 | Phase 1 | **Completed** | Approve the translation and exceptions contract | Token mapping, route/domain substitutions, open decisions | Plan Conflicts + Route Mapping + Phase 1; Architecture layers; Database entities/statuses; Modules 3â€“17; Design Â§Â§0â€“5, 9, 13 | Every known deviation has a documented reason and replacement; no schema/brand ambiguity is silently assumed |
| 02 | Phase 2 | **In progress** | Normalize shared tokens, primitives, and states | `resources/css/app.css`, `components/ui`, shared loading/empty/error/dialog patterns | Architecture Presentation + frontend structure; Design Â§Â§2â€“4, 6â€“9, 11â€“12; Plan Target Component System + Phase 2 | Shared foundation needs no page-specific hardcoded brand values; Tier A |
| 03 | Phase 2 | **In progress** | Implement public and portal shells | `AppHeader`, `AppFooter`, `PublicLayout`, Exhibitor shell, `AdminLayout`, mobile navigation | Modules 1, 4, 12, 17; Design Â§Â§5â€“9; Plan Phase 2 | Shells, skip link, keyboard order, and mobile drawers work at 360/768/1440; Tier A |
| 04 | Phase 3 | **In progress** | Restyle the homepage | `HomePage`, announcement and collection/statistic components | Modules 5, 7, 15, 17; Database public-project and announcement rules; Design Â§Â§6â€“10; Plan Phase 3 | Every required homepage section remains real-data/API-backed and responsive; Tier A |
| 05 | Phase 3 | **In progress** | Restyle gallery, search, collections, favourites, and public states | `GalleryPage`, filters, cards, grid, pagination, `FavoritesPage`, `NotFoundPage` | Modules 5, 7, 8; Database Projects/Favorites; Design Â§Â§6â€“9; Plan Route Mapping + Phase 3 | URL/server-driven query state, published privacy, pagination, empty/error/loading, and card variants pass; Tier A |
| 06 | Phase 3 | **In progress** | Restyle project detail, media, and engagement | `ProjectDetailPage`, media gallery, comments, vote/favourite/share actions | Modules 6, 8â€“10; Database Media/Comments/Votes/Favorites; Design Â§Â§6â€“9; Plan Phase 3 | Detail data, downloads, media, SDGs, team, comments, and engagement remain authorized and API-backed; Tier B |
| 07 | Phase 4 | **In progress** | Restyle authentication and profile | `AuthShell`, auth pages, `ProfilePage` | Modules 1â€“2; Database Users; Architecture auth boundaries; Design Â§Â§6â€“9; Plan Phase 4 | All auth/profile routes have labels, announced errors, autocomplete, guards, and no unsupported mutation controls; Tier B |
| 08 | Phase 5 | **In progress** | Restyle Exhibitor overview and owned-project list | `ProjectListPage`, project headers/status cards, `ExhibitorAnalyticsPage` where supported | Modules 3, 5, 11; Database Projects; Design Â§Â§6â€“9; Plan Phase 5 | Owned projects, statuses, metrics, pagination, delete confirmation, and actions use real APIs; Tier A |
| 09 | Phase 5 | **In progress** | Implement the create/edit step workflow and media management | `ProjectForm`, taxonomy/team editors, create/edit pages, `MediaManager` | Modules 2â€“4; Database Projects/Members/SDGs/Technologies/Media; Architecture layer rules; Design Â§Â§6â€“9; Plan Phase 5 | Draft, edit, persist, revisit, media upload/removal, review, and submit flows pass without unsupported fields; Tier B |
| 10 | Phase 6 | **Completed** (2 Aug 2026) | Re-skinned the token foundation to the generated design and applied the document corrections | `resources/css/app.css` tokens (red `#e60023` primary, cream surfaces, Inter/Fraunces, 16px/32px radii); button/alert-dialog/sheet primitives de-VM'd; contract EX-001/002/003/011 re-scoped; `SYSTEM-DESIGN.md` annotated | Revised Fidelity Directive + Phase 6; Translation contract; Design Â§Â§2â€“4 | Tokens render the generated palette/type/surfaces with no per-component hardcoded hex; docs reconciled; Tier A |
| 11 | Phase 6 | In progress | Shared/generated colour sweep completed; full baseline reconciliation remains | Header/footer/shells, home, gallery/search/collections, project detail, favourites, 404, auth, profile, My Projects, create/edit workflow | Unit 00 baseline; Revised Fidelity Directive + Phase 6; Design §§6-9 | Every built screen matches its baseline at 360/768/1440 within accessibility-only deviations; no VM2026-blue/Nunito/Oswald residue; Tier B |
| 12 | Phase 7 | **Completed** (2 Aug 2026) | Administrator foundation and management screens restyled to the generated look | Admin shell, dashboard, users, taxonomies | Modules 12, 14; Database Users/Categories/SDGs/Technologies; Design Â§Â§6â€“9; Plan Phase 7 | Dense admin tasks usable, authorized, responsive, in the generated design system (no literal admin baseline exists); Tier A |
| 13 | Phase 7 | **Completed** (2 Aug 2026) | Review queue/detail, announcements, reports, and remaining admin states restyled to the generated look | Queue/review, announcements, reports, moderation-related states | Modules 10, 13, 15, 16; Database Projects/Comments/Announcements/Votes; Plan Phase 7 | Approved status model and existing actions intact; no Rejected/Revision state invented; Tier B |
| 14 | Phase 8 | **Completed** (2 Aug 2026) | Responsive, accessibility, and content hardening completed across public, auth, Exhibitor, Administrator, and shared primitives | All changed routes and shared components | Design Â§Â§6â€“10, 12; Plan Phase 8; Hardening Review interactive checklist | 360/768/1024/1440 checks, keyboard, focus, contrast, motion, overflow, and long/missing content passed; accessibility deviations recorded; Tier B |
| 15 | Phase 9 | **In progress** | Side-by-side/overlay review completed; open visual defects classified | Reference index, all mapped screens, decision/exception register, `docs/FIGMA-MAKE-DESIGN-VISUAL-FIDELITY-REVIEW.md` | Revised Fidelity Directive + Plan Phase 9; approved decisions from Unit 01 and D-011 | Every mapped route compared at 360/768/1440, but high-impact visual defects remain; continue Unit 15 remediation before Unit 16 |
| 16 | Phase 10 | Not started | Run final regression, synchronize docs, and close the handoff | Tests, browser matrix, docs, handoffs | Plan Phase 10 + Definition of Done; all source-of-truth docs for final consistency | Tier C passes; docs and both handoffs synchronized; no VM2026-blue residue, unexplained difference, or stale route remains |

Units 02â€“09 remain `In progress`. Their structure, routing, and API wiring are
kept, but their VM2026-blue appearance is superseded by D-011 and reconciled to
the generated baseline under Units 10â€“11. Do not mark 02â€“09 `Completed` on
appearance grounds; their remaining browser verification folds into Units 11 and
14.

## Unit 00 Active Brief

### Goal

Create a durable, searchable reference baseline without changing production
code.

### Tasks

1. Recompute the archive SHA-256 and compare it with `Current State`.
2. Extract the archive into an isolated temporary/reference directory. Do not
   extract it over the repository source tree.
3. Read the prototype's own `AGENTS.md` before running it in isolation.
4. Install with the package manager and lockfile supplied by the archive; do
   not alter the production `package.json` or lockfile.
5. Render every reachable screen and meaningful state listed in the master
   plan at 1440px, 768px, and 360px.
6. Record:
   - screenshot name and location
   - prototype page/state
   - viewport
   - navigation path used to reach it
   - major container, grid, gap, card, image-ratio, and type measurements
   - broken, inaccessible, desktop-only, or missing states
7. Create `docs/FIGMA-MAKE-DESIGN-REFERENCE.md` as the durable screenshot and
   measurement index. Keep large generated/runtime files out of production
   source.
8. Record the actual screenshot directory and isolated extraction directory in
   `Verification Evidence`.

### Required States

- Home, Exhibition Listing, Exhibition Detail, Search Results, Project Detail
- Login and registration modes
- Dashboard, Submit Project steps, My Projects
- Profile, Notifications, and 404
- logged-out and logged-in navigation
- populated and empty results
- form validation where present
- destructive confirmation, success, and error states where reachable

Missing prototype states must be explicitly marked `Not supplied`; do not
invent a baseline for them.

### Exit Criteria

- The checksum matches.
- Every reachable page/state has a named baseline at all three widths.
- Missing or broken states are recorded.
- `docs/FIGMA-MAKE-DESIGN-REFERENCE.md` is sufficient for later sessions to
  locate the correct reference without re-auditing the archive.
- No production application file or dependency manifest changed.

### Verification

This is a reference/documentation unit. Verify the isolated prototype runs and
visually inspect each capture. Production Tier A is not required unless a
production file changes unexpectedly.

## Execution Ledger

Append one concise row when a unit is completed or materially paused.

| Date | Unit | Result | Files/artifacts | Verification | Remaining |
| --- | --- | --- | --- | --- | --- |
| 31 July 2026 | 01 | Completed out of sequence at the user's direction | `docs/FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md`; master plan and this handoff | Documentation consistency checks passed; no application code changed | Complete Unit 00 before Unit 02 |
| 31 July 2026 | 02â€“03 | In progress out of sequence at the user's direction | `resources/css/app.css`; shared layout, feedback, and shadcn primitives; public/portal shells; router; Phase 2 frontend contract tests | `npm run test:frontend` 9/9 passed; `npm run build` passed; five route shells returned HTTP 200 | Approved browser unavailable; complete 360/768/1440 visual, keyboard, focus, drawer, and overflow checks; Unit 00 remains open |
| 31 July 2026 | 04â€“06 | In progress out of sequence at the user's direction | Homepage; gallery/search/collections; public cards, filters, media, favorites, project detail, comments, 404; Phase 3 frontend contract tests | `npm run test:frontend` 14/14 passed; `npm run build`, `php artisan test` 70/70, Pint, and strict Composer validation passed; public shell and homepage API smoke passed | Approved browser unavailable; complete 360/768/1440 visual, keyboard, overflow, media, filter, pagination, engagement, dialog, and state checks; Units 00 and 02â€“03 remain open |
| 31 July 2026 | 07 | In progress out of sequence at the user's direction | Shared split `AuthShell`; login, registration, Google completion, recovery, and verification routes; consolidated `ProfilePage`; Phase 4 frontend contract tests | `npm run test:frontend` 19/19, `npm run build`, `php artisan test` 70/70, Pint, and strict Composer validation passed; eight auth/profile route shells returned HTTP 200 | Approved browser unavailable; complete 360/768/1440 visual, keyboard, focus, validation, async-state, avatar, and overflow checks; Units 00 and 02â€“06 remain open |
| 31 July 2026 | 08â€“09 | In progress out of sequence at the user's direction | Owned-project status API/filtering, real-media grid/list views, Exhibitor analytics composition, schema-backed step workflow, edit-only media, review/save/submit and deletion dialogs; Phase 5 frontend contract tests | `npm run test:frontend` 23/23, `npm run build`, `php artisan test` 71/71 (462 assertions), Pint, and strict Composer validation passed; four Exhibitor route shells returned HTTP 200 | Approved browser unavailable; complete authenticated 360/768/1440 visual, keyboard, focus, overflow, pagination, dialog, persist/revisit, upload/removal, and submission checks; Units 00 and 02â€“07 remain open |
| 2 August 2026 | 10 | Completed | `resources/css/app.css` re-skinned to the generated palette (red `#e60023`, cream surfaces, Inter/Fraunces, 16px/32px radii, warm-dark counterpart, `pin-red-*`/`cream-*`/`ink-*` ramps); `button.jsx`, `alert-dialog.jsx`, `sheet.jsx` de-VM'd to semantic tokens; installed `@fontsource-variable/inter` + `@fontsource-variable/fraunces`; translation contract EX-001/002/003/011 + Visual Token/Typography rows re-scoped; `SYSTEM-DESIGN.md` Â§0.1 override added | `npm run test:frontend` 23/23 and `npm run build` passed (Tier A); built `app-*.css` verified to contain `#e60023`, `#fbfbf9`, `Inter Variable`, `Fraunces Variable` with font woff2 bundled | Unit 00 baseline capture and Unit 11 built-screen reconciliation remain; direct `vm-blue`/`vm-navy` usages in feature pages/shells still to be swapped under Unit 11 |
| 2 August 2026 | 00 | In progress; non-visual audit completed | `docs/FIGMA-MAKE-DESIGN-REFERENCE.md`; isolated extraction at `C:\Users\User\AppData\Local\Temp\tarc-nexus-unit00-reference-20260802` | Checksum matched; frozen pnpm install passed; prototype build passed; local preview returned HTTP 200; route/state/measurement index completed; approved browser discovery returned no instances | Capture every indexed reachable state at 360/768/1440, visually inspect, and record rendered measurements; do not start Unit 11 first |
| 2 August 2026 | 00 | Completed | `docs/FIGMA-MAKE-DESIGN-REFERENCE.md`; 102 PNGs in `docs/figma-make-reference/screenshots/` | Chrome extension-connected capture at 1440Ã—900, 768Ã—1024, and 360Ã—800; true PNG encoding and exact dimensions verified; contact-sheet and targeted full-size review completed; two stale desktop frames and one nonstandard tablet frame recaptured | Begin Unit 11 reconciliation; do not modify unsupported prototype-only domain concepts into production |
| 2 August 2026 | 11 | In progress | Removed visible VM2026-blue/Nunito-era colour residue from shared Unit 11 chrome and public/auth/exhibitor surfaces; generated red/cream/ink tokens now drive the affected React screens | `BrandIdentity`, `AppHeader`, `AppFooter`, `PortalShell`, `PageHeader`, shared feedback states, `ProjectCard`, and Unit 11 pages/components under `resources/js/pages`, `features/auth`, `features/engagement`, `features/exhibition`, `features/profile`, and `features/projects` | `rg` found no `vm-blue`, `vm-navy`, `vm-teal`, `vm-purple`, `vm-yellow`, `vm-crimson`, `vm-green`, `vm-red`, `#2054`, `#213E`, `Nunito`, or `Oswald` in Unit 11 React surfaces; `npm run test:frontend` 23/23 passed; `npm run build` passed; `vendor\bin\pint --test` passed; `composer validate --strict` passed; browser smoke rendered auth at 1440 with `--primary: #e60023`, Inter body, Fraunces h1 | `php artisan test` timed out after 120s while local MySQL was unavailable; full side-by-side 360/768/1440 parity remains, especially page structure for Home, Gallery/Search, Project Detail, Profile, My Projects, and the create/edit workflow |
| 2 August 2026 | 11 | In progress | Focused rendering/accessibility cleanup after the colour sweep: generated mark treatment tightened, public auth labels aligned to baseline, homepage stats flattened, invalid utilities fixed, Unit 11 captions raised to 14px, public/detail dark hero surfaces corrected | `resources/js/components/layout/BrandIdentity.jsx`; `AppHeader.jsx`; `PortalShell.jsx`; `resources/js/pages/HomePage.jsx`; `features/auth/components/AuthShell.jsx`; `features/auth/pages/LoginPage.jsx`; `RegisterPage.jsx`; `features/engagement/components/CommentCard.jsx`; `CommentSection.jsx`; `features/exhibition/pages/GalleryPage.jsx`; `ProjectDetailPage.jsx`; `features/projects/components/ProjectForm.jsx`; `SdgBadge.jsx`; visual smoke PNGs under `storage/app/codex-visual-smoke/` | `rg` found no `bg-muted0`, malformed opacity utilities, Unit 11 `text-xs`, old `vm-*` colour utilities, old font names, or old brand hex residue in Unit 11 React surfaces; `npm run test:frontend` 23/23 passed; `npm run build` passed; `vendor\bin\pint --test` passed; `composer validate --strict` passed; home 1440 smoke was nonblank and rendered red/cream/ink/Fraunces treatment | `php artisan test` timed out after 120s and left PHPUnit processes, then stopped; `storage/logs/laravel.log` still shows MySQL `SQLSTATE[HY000] [2002]` connection refusal; headless Chrome did not exit reliably and only produced partial 1440px evidence, with login stuck at route-loading because session/API checks could not complete; full 360/768/1440 side-by-side parity remains |
| 2 August 2026 | 11 | In progress | Browser-connected viewport and overflow pass continued: hidden-scrollbar utility added for horizontal rails; public project filter placeholder shortened for mobile; `PageHeader`, `FormField`, and `ProjectForm` gained min-width/wrapping safeguards; profile avatar input no longer contributes hidden horizontal overflow | `resources/css/app.css`; `components/layout/PageHeader.jsx`; `components/form/FormField.jsx`; `features/exhibition/components/ProjectFilters.jsx`; `resources/js/pages/HomePage.jsx`; `features/exhibition/pages/ProjectDetailPage.jsx`; `features/projects/pages/ProjectListPage.jsx`; `features/projects/components/ProjectForm.jsx`; `features/profile/pages/ProfilePage.jsx`; `storage/app/codex-visual-smoke/unit11-browser-*.png` | Chrome extension-connected screenshots captured home, projects, data-backed project detail, profile, My Projects, project create, and project edit at 1440px/768px/360px; final checks reported no route loading, API-unavailable state, or document-level horizontal overflow on the recaptured affected routes. `rg` returned no old VM/generated residue or Unit 11 `text-xs`; `npm run test:frontend` passed 23/23; `npm run build` passed; `php artisan test` passed 71 tests/462 assertions; `vendor\bin\pint --test` passed; `composer validate --strict` passed | Full side-by-side comparison against every mapped Unit 00 baseline is still pending, including register/recovery/favourites/404/modal and finer visual deltas across all mapped states; do not mark Unit 11 completed yet |
| 2 August 2026 | 12 | Completed out of sequence at the user's direction | Administrator management foundation restyled to the generated red/cream/ink system; metric cards de-VM'd; dashboard colour residue removed; users and taxonomies use shared generated-style confirmation dialogs instead of native confirms; taxonomy metadata raised to the 14px floor | `features/administration/components/MetricCard.jsx`; `features/administration/pages/AdminDashboardPage.jsx`; `AdminUsersPage.jsx`; `AdminTaxonomiesPage.jsx`; `storage/app/codex-visual-smoke/unit12-browser-*.png` | Focused `rg` returned no `vm-blue`, `vm-navy`, `vm-teal`, `vm-purple`, `vm-yellow`, `vm-crimson`, `Nunito`, `Oswald`, `#2054`, `#213E`, `bg-muted0`, Unit 12 `text-xs`, or `window.confirm` residue in Unit 12 admin surfaces; `npm run test:frontend` passed 23/23; `npm run build` passed; Chrome extension-connected screenshots captured dashboard, users, and taxonomies at 1440px/768px/360px plus mobile delete dialog; final checks reported no route loading, data-loading, API-unavailable state, or document-level horizontal overflow | Unit 13 review queue, project review, announcements, reports, and remaining admin states still need Phase 7 restyling and Tier B; Unit 11 full side-by-side baseline parity remains open |
| 2 August 2026 | 13 | Completed | Remaining Administrator Phase 7 screens restyled to the generated red/cream/ink system; project review controls retain only approved status transitions; announcements switched from native confirm to the shared confirmation dialog; shared `highlight` button variant de-VM'd | `resources/js/components/ui/button.jsx`; `features/administration/pages/AdminProjectQueuePage.jsx`; `AdminProjectReviewPage.jsx`; `AdminAnnouncementsPage.jsx`; `AdminReportsPage.jsx`; `storage/app/codex-visual-smoke/unit13-browser-admin-*.png` | Focused `rg` returned no `vm-blue`, `vm-navy`, `vm-teal`, `vm-purple`, `vm-yellow`, `vm-crimson`, `vm-green`, `vm-red`, `#2054`, `#213E`, `Nunito`, `Oswald`, `bg-muted0`, Unit 13 `text-xs`, or `window.confirm` in scoped Unit 13 files and `button.jsx`; `npm run test:frontend` passed 23/23; `npm run build` passed; `php artisan test` passed 71 tests/462 assertions; `vendor\bin\pint --test` passed; `composer validate --strict` passed; Chrome screenshots captured queue, review detail, announcements, and reports at 1440px/768px/360px plus mobile announcement delete dialog, with no API-unavailable state or document-level horizontal overflow | Unit 14 responsive/accessibility/content hardening remains; Unit 11 full side-by-side baseline parity remains open |
| 2 August 2026 | 14 | Completed | Responsive/accessibility/content hardening: shared badge/select/button text and icon targets raised; remaining React VM utility colours and mojibake removed; announcement/system-status/Exhibitor analytics surfaces tokenized; inline project/category/breadcrumb/auth links given touch-safe targets; shared `PageHeader` row breakpoint moved to `xl` for portal small-desktop safety; frontend hardening contract added | `resources/js/components/ui/badge.jsx`; `avatar.jsx`; `select.jsx`; `button.jsx`; `components/layout/PageHeader.jsx`; `pages/HomePage.jsx`; `features/announcements/components/AnnouncementCard.jsx`; `features/system-status/components/SystemStatusCard.jsx`; `features/administration/pages/ExhibitorAnalyticsPage.jsx`; `features/exhibition/components/ProjectCard.jsx`; `features/exhibition/pages/ProjectDetailPage.jsx`; auth/profile/project workflow string cleanups; `tests/frontend/accessibility-contract.test.mjs`; `storage/app/codex-visual-smoke/unit14-browser-*.png`; `unit14-browser-interactive-summary.json` | Source `rg` returned no `text-xs`, old `vm-*` utilities, component hex/style attributes, mojibake, `window.confirm`, Unsplash, or ExhibitHub in `resources/js`; Chrome route matrix covered 72 route/viewport checks at 360/768/1024/1440 with `exhibitor.visual@example.test` and `admin.visual@example.test`; targeted 1024 analytics recapture reported `scrollWidth=1009`, `clientWidth=1009`; mobile menu keyboard sample showed visible focus order; 360px Exhibitor delete dialog stayed within viewport with focus inside; query back/forward preserved `/projects?search=tourism&sort=latest`; `npm run test:frontend` passed 24/24; `npm run build` passed; `php artisan test` passed 71 tests/462 assertions; `vendor\bin\pint --test` passed; `composer validate --strict` passed | Unit 15 visual-fidelity review remains; Unit 11 full side-by-side baseline parity remains open |
| 2 August 2026 | 15 | In progress | Visual-fidelity review and exception classification completed, but Unit 15 cannot close because high-impact unintended visual defects remain under D-011 | `docs/FIGMA-MAKE-DESIGN-VISUAL-FIDELITY-REVIEW.md`; `docs/FIGMA-MAKE-DESIGN-TRANSLATION-CONTRACT.md` EX-013/014/015; production captures under `storage/app/codex-visual-smoke/unit15/unit15-prod-*.png`; side-by-side/overlay artifacts and contact sheets under `storage/app/codex-visual-smoke/unit15/comparisons/` | Chrome/local captures plus reused validated Unit 11/14 protected-route evidence produced 54 mapped side-by-side/overlay pairs at 1440px, 768px, and 360px with no missing files; accepted deviations and open defects recorded. Source `rg` returned no old VM utility/font/hex residue or hardcoded generated hex in `resources/js`; `git diff --check` passed for the changed docs/handoff; `npm run test:frontend` passed 24/24; `npm run build` passed | Continue Unit 15 remediation for home, gallery/search, taxonomy collections, project detail, auth, Exhibitor workflow, My Projects, profile, and missing generated states; recapture and regenerate comparisons before Unit 16 |

## Verification Evidence

Record only reproducible evidence:

- **Archive checksum:** SHA-256
  `2CA5BBC334403D388468B73F26353320963EE18EA17B5D58D3A3D835809AD1FB`
  on 31 July 2026.
- **Targeted Phase 2 reference extraction:** Archive extracted to
  `C:\Users\User\AppData\Local\Temp\tarc-nexus-phase2-reference-6bd67fb5ffe649d08be6bc242cfc8787`;
  its `AGENTS.md`, public navigation, portal shell, and responsive design
  sections were inspected. This is not the durable Unit 00 reference baseline.
- **Phase 3 targeted reference extraction:** Archive checksum reconfirmed and
  extracted to
  `C:\Users\User\AppData\Local\Temp\tarc-nexus-phase3-reference`; its
  `AGENTS.md` and Home, Exhibitions, Exhibition Detail, Search Results, Project
  Detail, and 404 sources were inspected as composition references. This is not
  the durable Unit 00 reference baseline.
- **Phase 4 targeted reference extraction:** Archive checksum reconfirmed and
  extracted to
  `C:\Users\User\AppData\Local\Temp\tarc-nexus-phase4-reference-cba6854e60a04d9c8f14a2fce1e0b5b2`;
  its `AGENTS.md`, login/registration composition, and embedded profile source
  were inspected. This is not the durable Unit 00 reference baseline.
- **Phase 5 targeted reference extraction:** Archive checksum reconfirmed and
  extracted to
  `C:\Users\User\AppData\Local\Temp\tarc-nexus-phase5-reference-39fda1b86d3f499bafba6c54483ac5e5`;
  its `AGENTS.md`, Dashboard, My Projects, and Submit Project sources were
  inspected as composition references. This is not the durable Unit 00
  reference baseline.
- **Unit 00 source audit (2 August 2026):** Archive checksum reconfirmed;
  extracted to
  `C:\Users\User\AppData\Local\Temp\tarc-nexus-unit00-reference-20260802`;
  archive `AGENTS.md` read; `npx --yes pnpm@10.34.3 install
  --frozen-lockfile` and `npx --yes pnpm@10.34.3 run build` passed; isolated
  preview at `http://127.0.0.1:4174/` returned HTTP 200. Route/state paths,
  filename stems, source measurements, missing states, and prototype defects
  are indexed in `docs/FIGMA-MAKE-DESIGN-REFERENCE.md`.
- **Reference screenshots (2 August 2026):** Chrome extension-connected capture
  created 102 non-empty PNGs (30,427,020 bytes) for 34 reachable states at
  1440Ã—900, 768Ã—1024, and 360Ã—800 in
  `docs/figma-make-reference/screenshots/`. Contact-sheet review covered all
  files; targeted full-size review covered public, authentication, portal,
  modal, loading, success, and mobile states. Two stale 1440px transition frames
  and one nonstandard 768px frame were identified and recaptured. True PNG
  encoding and the 1440Ã—900, 768Ã—1024, and 360Ã—800 dimensions were verified;
  `home--logged-out--1440.png` is the documented full-page exception. The
  unchanged prototype's missing 404, edit, and global-error states remain
  explicitly `Not supplied`.
- **Latest frontend gate:** `npm run test:frontend` passed 23/23 and
  `npm run build` passed with Vite 8.1.5 on 2 August 2026.
- **HTTP route smoke:** `/`, `/projects`, category, SDG, technology, project
  detail, favorites, and unknown-route shells each returned HTTP 200 with the
  React root on 31 July 2026. `/api/v1/public/homepage` returned HTTP 200 JSON.
- **Phase 2 browser verification:** Not run. The approved browser runtime
  reported no available browser, so viewport, keyboard, drawer focus, and
  overflow evidence remains outstanding.
- **Phase 3 browser verification:** Not run. The approved browser runtime
  reported no browser instances, so 360px, 768px, and 1440px visual, keyboard,
  overflow, filter, pagination, media, engagement, dialog, and state evidence
  remains outstanding.
- **Phase 4 HTTP route smoke:** `/login`, `/register`, `/forgot-password`,
  `/reset-password/test-token`, `/register/google`, `/email/verify`,
  `/email/verified`, and `/profile` each returned HTTP 200 with the React root
  on 31 July 2026.
- **Phase 4 browser verification:** Not run. The approved browser runtime
  reported no browser instances, so 360px, 768px, and 1440px visual, keyboard,
  focus, validation, async-state, avatar, and overflow evidence remains
  outstanding.
- **Phase 5 HTTP route smoke:** `/exhibitor/projects`,
  `/exhibitor/projects/new`, `/exhibitor/projects/1/edit`, and
  `/exhibitor/analytics` each returned HTTP 200 with the React root on 31 July
  2026.
- **Phase 5 browser verification:** Not run. The approved browser runtime
  reported no installed browser, so authenticated 360px, 768px, and 1440px
  visual, keyboard, focus, overflow, filter, pagination, dialog, persist/revisit,
  upload/removal, and submission evidence remains outstanding.
- **Latest milestone regression:** `npm run test:frontend` passed 23/23,
  `npm run build` passed, `php artisan test` passed 71 tests and 462
  assertions, `vendor\bin\pint --test` passed, and `composer validate
  --strict` passed on 2 August 2026.
- **Unit 10 foundation re-skin (2 August 2026):** `npm run test:frontend` 23/23
  and `npm run build` passed. The built `public/build/assets/app-*.css` contains
  `#e60023` (primary), `#fbfbf9` (cream wash), `Inter Variable`, and
  `Fraunces Variable`; Inter and Fraunces `.woff2` files are bundled. The single
  remaining `#2054a3` is the retained `--color-vm-blue-500` ramp definition, not
  a semantic role. New dependencies `@fontsource-variable/inter` and
  `@fontsource-variable/fraunces` were added (guardrail 14 justification: the
  fidelity directive requires Inter/Fraunces, unmet by the existing
  nunito-sans/oswald packages). Browser/visual verification still pending under
  Units 00 and 11.
- **Unit 11 partial reconciliation (2 August 2026):** Shared chrome and Unit 11
  React surfaces were swept to generated red/cream/ink tokens. `rg` returned no
  `vm-blue`, `vm-navy`, `vm-teal`, `vm-purple`, `vm-yellow`, `vm-crimson`,
  `vm-green`, `vm-red`, `#2054`, `#213E`, `Nunito`, or `Oswald` matches in
  `resources/js/pages`, `features/auth`, `features/engagement`,
  `features/exhibition`, `features/profile`, `features/projects`,
  `components/layout`, or `components/feedback`. `npm run test:frontend` passed
  23/23; `npm run build` passed; `vendor\bin\pint --test` passed;
  `composer validate --strict` passed. Browser smoke used Laravel on
  `http://127.0.0.1:8001/` with `SESSION_DRIVER=file` and Vite on
  `http://127.0.0.1:5173/`; the rendered auth smoke at
  `storage/app/codex-visual-smoke/home-rendered-current--1440.png` showed
  `--primary: #e60023`, Inter body, and Fraunces h1. `php artisan test` timed
  out after 120s; local MySQL was unavailable (`PDOException` 2002 in
  `storage/logs/laravel.log` during browser/API smoke), and `phpunit.xml` is
  configured for MySQL database `tarc_nexus_test`.
- **Unit 11 focused cleanup (2 August 2026):** `BrandIdentity` now renders the
  generated-style red mark plus TARC Nexus name without the old visible
  descriptor; public header labels use "Log in" / "Sign up"; homepage
  statistics render as flat generated-style numerals; invalid `bg-muted0` and
  malformed opacity utilities were removed; visible Unit 11 `text-xs` labels
  were raised to the 14px floor; public and detail hero surfaces use `ink-900`.
  Focused `rg` returned no `bg-muted0`, malformed opacity utilities, Unit 11
  `text-xs`, old `vm-*` colour utilities, old font names, or old brand hex
  residue in Unit 11 React surfaces. `npm run test:frontend` passed 23/23;
  `npm run build` passed; `vendor\bin\pint --test` passed; `composer validate
  --strict` passed. Headless Chrome smoke through Laravel on
  `http://127.0.0.1:8001/` with `SESSION_DRIVER=file` produced
  `storage/app/codex-visual-smoke/unit11-home--1440.png` and
  `unit11-login--1440.png`; the home screenshot was nonblank and rendered the
  generated red/cream/ink/Fraunces treatment, while the login screenshot stayed
  on the route-loading state because session/API checks could not complete.
  Chrome did not exit reliably for the full route/viewport matrix and remaining
  headless processes were stopped. `php artisan test` timed out after 120s and
  was stopped; `storage/logs/laravel.log` still shows MySQL
  `SQLSTATE[HY000] [2002]` connection refusal.
- **Unit 11 browser viewport and Tier B continuation (2 August 2026):** Local
  visual-smoke records were created with real MySQL/API data for
  `exhibitor.visual@example.test` and the published project slug
  `visual-smoke-sustainable-tourism-companion`. Chrome extension-connected
  screenshots under `storage/app/codex-visual-smoke/unit11-browser-*.png`
  cover home, projects, data-backed project detail, profile, My Projects,
  project create, and project edit at 1440px, 768px, and 360px. The focused
  overflow recaptures reported no route loading, API unavailable state, or
  document-level horizontal overflow after the rail, form, profile-input, and
  page-header fixes. Focused `rg` returned no `vm-blue`, `vm-navy`, `vm-teal`,
  `vm-purple`, `vm-yellow`, `vm-crimson`, `Nunito`, `Oswald`, `#2054`, `#213E`,
  `bg-muted0`, or Unit 11 `text-xs` residue in the scoped React surfaces.
  `npm run test:frontend`, `npm run build`, `php artisan test`,
  `vendor\bin\pint --test`, and `composer validate --strict` all passed. The
  browser session was finalized.
- **Unit 12 administrator foundation (2 August 2026):** Local visual-smoke
  administrator account `admin.visual@example.test` was created/updated with
  password `password` for browser verification. Chrome extension-connected
  screenshots under `storage/app/codex-visual-smoke/unit12-browser-*.png`
  cover `/administrator`, `/administrator/users`, and
  `/administrator/taxonomies` at 1440px, 768px, and 360px, plus
  `unit12-browser-admin-users-delete-dialog--360.png`. Final browser checks
  reported no route loading, data-loading, API-unavailable state, or
  document-level horizontal overflow. Focused `rg` returned no old VM/generated
  residue, Unit 12 `text-xs`, or `window.confirm` in the Unit 12 admin surfaces.
  `npm run test:frontend` passed 23/23 and `npm run build` passed.
- **Unit 13 remaining administration states (2 August 2026):** Chrome
  extension-connected screenshots under
  `storage/app/codex-visual-smoke/unit13-browser-admin-*.png` cover
  `/administrator/projects`, `/administrator/projects/1`,
  `/administrator/announcements`, and `/administrator/reports` at 1440px,
  768px, and 360px, plus
  `unit13-browser-admin-announcements-delete-dialog--360.png`. The browser
  smoke used `admin.visual@example.test`; a temporary smoke announcement was
  created through the UI only to expose the delete dialog, then deleted through
  the same dialog. Final checks reported no API-unavailable state and no
  document-level horizontal overflow. Focused `rg` returned no old
  VM/generated residue, Unit 13 `text-xs`, or `window.confirm` in the scoped
  Unit 13 files and `button.jsx`. `npm run test:frontend` passed 23/23,
  `npm run build` passed, `php artisan test` passed 71 tests/462 assertions,
  `vendor\bin\pint --test` passed, and `composer validate --strict` passed.
- **Unit 14 responsive/accessibility/content hardening (2 August 2026):**
  Chrome extension-connected screenshots under
  `storage/app/codex-visual-smoke/unit14-browser-*.png` cover public, auth,
  Exhibitor, and Administrator routes at 360px, 768px, 1024px, and 1440px
  using real API data and the visual-smoke accounts
  `exhibitor.visual@example.test` and `admin.visual@example.test`. The final
  targeted 1024px Exhibitor analytics recapture
  `unit14-browser-exhibitor-analytics-targeted--1024.png` reported no
  document-level overflow (`scrollWidth=1009`, `clientWidth=1009`).
  `unit14-browser-interactive-summary.json` records mobile menu keyboard focus
  order with visible rings, a 360px delete confirmation dialog contained within
  the viewport with focus inside, and browser back/forward preserving
  `/projects?search=tourism&sort=latest`. Source `rg` returned no `text-xs`,
  old `vm-*` utilities, component hex/style attributes, mojibake,
  `window.confirm`, Unsplash, or ExhibitHub in `resources/js`.
  `npm run test:frontend` passed 24/24, `npm run build` passed,
  `php artisan test` passed 71 tests/462 assertions, `vendor\bin\pint --test`
  passed, and `composer validate --strict` passed.
- **Unit 15 visual-fidelity review (2 August 2026):** Chrome-connected local
  captures were written to `storage/app/codex-visual-smoke/unit15/` for mapped
  public, auth/support, guest favorites/detail, taxonomy collection, and modal
  states. Validated Unit 11/14 protected-route screenshots were copied into the
  Unit 15 evidence folder where fresh protected captures hit route-loading
  timing. The comparison generator produced 54 side-by-side and 50% overlay
  pairs with no missing files plus contact sheets at 1440px, 768px, and 360px
  under `storage/app/codex-visual-smoke/unit15/comparisons/`. The review is
  recorded in `docs/FIGMA-MAKE-DESIGN-VISUAL-FIDELITY-REVIEW.md`; the
  translation contract adds EX-013, EX-014, and EX-015. Unit 15 remains in
  progress because home, gallery/search, taxonomy collections, project detail,
  auth, Exhibitor workflow, My Projects, and profile still have high-impact
  unintended visual deltas under D-011. Source `rg` returned no old
  VM utility/font/hex residue or hardcoded generated hex in `resources/js`;
  `git diff --check` passed for the changed docs/handoff;
  `npm run test:frontend` passed 24/24; `npm run build` passed.
- **Latest final acceptance:** Not run.
- **Phase 1 contract review:** Current React routes, API routes, project enum,
  project resources, homepage resource, project form, theme tokens, header,
  authoritative docs, and prototype conflict inventory reviewed on 31 July
  2026.

Do not inherit the 30 July hardening results as evidence for code changed by
this plan. They are useful pre-refactor context only.

## Decision and Exception Log

Record decisions once and reference them by ID from later ledger rows.

| ID | Status | Decision or exception | Authority/reason | Affected units |
| --- | --- | --- | --- | --- |
| D-001 | Approved by existing docs | TARC Nexus and VM2026 replace the prototype's ExhibitHub/Pinterest-like identity | System Design and master plan | All |
| D-002 | Approved by existing docs | Prototype Exhibition views map to published projects and taxonomy collections; no Exhibition entity is added | System Database, System Modules, master plan | 01, 04â€“06 |
| D-003 | Locked in Phase 1 | The prototype Notifications screen and personal feed are omitted; announcements remain homepage and Administrator content only | No notification entity/module exists | 01, 04, 11 |
| D-004 | Approved by existing docs | Only Draft, Submitted, Under Review, Approved, and Published may appear as project workflow states | System Database and System Modules | 05, 08â€“11 |
| D-005 | Safe default locked; external enhancement open | Use Nunito Sans/Oswald and a text-only TARC Nexus identity until official VM2026 font licensing, mobile mark, digital assets, and clear-space ratio are resolved | System Design Â§13 and translation contract | 01, 03, 13â€“14 |
| D-006 | Locked in Phase 1 | The generic globe badge is omitted when the header is restyled so it cannot be mistaken for campaign artwork | Translation contract temporary-identity rule | 03 |
| D-007 | User-directed sequencing exception | Phase 2 implementation was staged before Unit 00; a targeted temporary archive inspection informed shell composition, but Unit 00 baselines and screenshots remain mandatory | User requested â€œExecute phase 2â€; no schema, domain, or brand exception was inferred | 00, 02â€“03 |
| D-008 | User-directed sequencing exception | Phase 3 implementation was staged while Unit 00 and Phase 2 browser verification remained open; targeted reference inspection informed public composition, but no earlier exit gate was waived | User requested â€œExecute phase 3â€; no schema, domain, status, or brand exception was inferred | 00, 02â€“06 |
| D-009 | User-directed sequencing exception | Phase 4 implementation was staged while Unit 00 and Units 02â€“06 browser verification remained open; targeted reference inspection informed auth/profile composition, but no earlier exit gate was waived | User requested â€œExecute phase 4â€; no schema, auth, profile, or brand exception was inferred | 00, 02â€“07 |
| D-010 | User-directed sequencing exception | Phase 5 implementation was staged while Unit 00 and Units 02â€“07 browser verification remained open; targeted reference inspection informed the Exhibitor dashboard, owned-project, and step-workflow composition, but no earlier exit gate was waived | User requested â€œExecute phase 5â€; no schema, unsupported status, analytics, or media exception was inferred | 00, 02â€“09 |
| D-011 | Approved by owner (2026-08-02) | Reverse the visual goal to literal parity with the generated Figma design: reproduce its red `#e60023` palette, cream surfaces, and Inter/Fraunces typography as tokens, and the generated mark's visual treatment on the TARC Nexus name. Supersedes the Exactness Policy substitutions and contract EX-001/EX-002/EX-003. Domain, database, status, and accessibility constraints are unchanged | Owner directed that the localhost UI must match the generated design; the departure from official VM2026 brand colours is knowingly accepted and must be recorded in `SYSTEM-DESIGN.md` and the translation contract | 00, 02â€“16 |
| D-012 | User-directed sequencing exception | Unit 12 was executed and completed while Unit 11 full side-by-side baseline parity remained open | User requested "Continue to unit 12"; no schema, role, status, authorization, or unsupported admin-domain exception was inferred | 11â€“13 |
| D-013 | Accepted accessibility deviation | Unit 14 may depart from literal generated spacing where needed to maintain 14px minimum visible text, 44px touch targets, visible focus, and no small-desktop portal overflow; the shared `PageHeader` stacks actions until `xl` on portal-sized layouts | Phase 8 accessibility floor under D-011; WCAG/touch/overflow requirements override pixel parity | 14â€“15 |
| D-014 | Unit 15 review decision | Remaining high-impact composition differences found in Unit 15 are classified as unintended visual defects, not approved exceptions. Brand substitution is not an allowed category after D-011; only data/domain and accessibility/responsive deviations remain accepted | Phase 9 review artifacts and `docs/FIGMA-MAKE-DESIGN-VISUAL-FIDELITY-REVIEW.md`; EX-013 and EX-014 locked, EX-015 remains open | 15 |

## Known Environment and Scope Risks

- The worktree is not clean. All pre-existing changes are user-owned.
- The design archive is small and self-contained, but its generated source uses
  mock state, unsupported domain concepts, hardcoded colours, raw controls,
  inline graphics, and remote images. It is reference material only.
- Official VM2026 asset questions can block final brand acceptance but do not
  authorize fabricating substitute artwork.
- Browser automation may be unavailable in a session. If so, record the
  missing evidence and keep the affected visual/accessibility unit open.
- Cross-browser verification and target-environment checks are external final
  acceptance requirements.
- The generic `tasks/SESSION-HANDOFF.md` still tracks unresolved hardening,
  deployment, malware-scanning, status-workflow, and brand decisions. This
  design handoff must not silently mark those wider items complete.

## Completion Rule

The Figma Make design implementation is complete only when Unit 16 is completed
and the master plan's Definition of Done is satisfied. Completing a visual
slice, passing a build, or exhausting a session is not completion.
