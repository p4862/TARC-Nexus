<!-- @format -->

# Implementation Roadmap

## Purpose

This roadmap divides the Online Exhibition System into session-sized phases. It is derived from the four source-of-truth documents in `docs/`; those documents remain authoritative when this roadmap is less detailed.

Each phase must end with:

- Relevant automated tests passing
- A successful production frontend build when frontend code changes
- Laravel Pint and Composer validation passing
- Documentation and `tasks/SESSION-HANDOFF.md` updated
- Unfinished work and unresolved decisions written down for the next session

## Phase 1 — Application Foundation

**Status:** Complete on 29 July 2026.

Scope:

- Laravel 12 modular-monolith scaffold in the repository root
- Laravel Sanctum and stateful SPA middleware
- Versioned REST route foundation and safe JSON error envelopes
- Documented user authentication fields and role enum
- MySQL application, queue, and PHPUnit configuration with an isolated test database
- Importable Phase 1 MySQL schema snapshot synchronized with Laravel migration history
- React 19 SPA with React Router and feature-based folders
- Axios API client
- Tailwind CSS 4 VM2026 colour, typography, radius, shadow, and accessibility tokens
- Installed and customized shadcn/ui Button, Card, and Badge primitives
- Accessible responsive foundation page and API connectivity indicator
- PHPUnit coverage for the API, SPA shell, user schema, and role contract

Exit evidence:

- 8 PHP tests pass with 19 assertions
- The raw MySQL schema snapshot creates all 10 Phase 1 tables and Laravel recognizes all 4 migrations as applied
- Vite production build succeeds
- `GET /api/v1/health` returns the documented response envelope

## Phase 2 — Authentication and User Profiles

**Status:** Complete on 29 July 2026.

Delivered scope:

- Email/password registration, login, logout, session persistence, and password reset
- Email verification flow
- Google OAuth using the immutable `google_id`
- Role-based route protection for Administrator, Exhibitor, and Guest
- Profile read/update endpoints and screens
- Avatar storage with validated image uploads
- Thin controllers, Form Requests, Services, Repositories, API Resources, and policies
- Authentication and authorization tests

Resolved decisions:

1. Public registration permits only Exhibitor and Guest. Administrator accounts are created or promoted through a trusted administrative process.
2. The stale “Contact Information” profile requirement was removed and replaced by the already documented `institution` field. No schema change was introduced.

Exit evidence:

- 29 PHP tests pass with 134 assertions on the configured MySQL-compatible test database
- Laravel Pint and Composer validation pass
- The Vite production build succeeds with route-level code splitting
- 19 versioned authentication, profile, Google OAuth, avatar, and health routes are registered
- Guest HTTP smoke checks confirm the login and registration SPA shells return 200 and protected profile data returns 401

## Phase 3 — Project, Taxonomy, and Media Management

**Status:** Complete on 29 July 2026.

Delivered scope:

- Exact documented migrations and Eloquent relationships for projects, project members, categories, SDGs, technologies, pivots, and media
- Idempotent seeders for the documented solution categories, SDGs 8, 11, and 12, and documented example technology tags
- Exhibitor project draft, update, submit, and media workflows
- Project ownership policy and status-transition service
- Secure file validation and Laravel Storage integration
- Repository queries, API Resources, endpoints, React forms, and tests

Resolved decision:

- Presentation slides are uploaded as document media (`.ppt` or `.pptx`). No
  undocumented `slides_url` column was added.

Exit evidence:

- 41 PHP tests pass with 204 assertions on the configured MySQL-compatible test database
- Laravel Pint and Composer validation pass
- The Vite production build succeeds with route-level code splitting
- Nine versioned exhibitor taxonomy, project, submission, and media routes are registered
- Unsupported upload types, cross-owner access, non-exhibitor access, and post-submission mutations are covered by feature tests

## Phase 4 — Public Exhibition and Discovery

**Status:** Complete on 30 July 2026.

Delivered scope:

- Published-only public repository queries with eager loading, search, filters,
  four documented sort modes, and pagination
- Seven throttled public API routes for homepage data, taxonomies, gallery,
  detail, category, technology, and SDG collections
- Responsive, lazy-loaded gallery and project-detail routes with category, SDG,
  technology, media, team, documentation, and external-resource presentation
- Homepage sections backed by featured, newest, popular, category, SDG, and
  aggregate project/student/institution data
- Atomic aggregate view counting, lazy images/video metadata loading, dynamic
  Open Graph metadata, public-resource privacy boundaries, and accessibility
  semantics
- Backend feature coverage for public visibility, query combinations, route
  collections, view counting, homepage data, privacy, validation, and eager
  loading

Exit evidence:

- 49 PHP tests pass with 261 assertions on both the configured MySQL-compatible
  test database and the in-memory SQLite fallback
- Laravel Pint and Composer validation pass
- The Vite production build succeeds with gallery and detail route chunks
- Seven public API routes are registered and a live homepage API smoke check
  returns the standard success envelope
- The browser connector exposed no usable target, so the interactive
  360px/768px/1440px visual and keyboard pass remains a Phase 7 hardening item

Constraints:

- Do not display a visitor total until visitor-level analytics exists.
- Categories are digital solution types, not tourism sectors, despite one stale “Tourism Categories” phrase in Module 14.

## Phase 5 — Visitor Engagement

**Status:** Complete on 30 July 2026.

Delivered scope:

- Guest favorite add/remove flows, an authenticated favorites collection, and
  database-backed idempotent duplicate handling
- People's Choice voting with a unique `(user_id, project_id)` constraint,
  transaction-safe duplicate detection, and conflict responses
- Paginated threaded project discussions for Guests and owning Exhibitors,
  recursively eager-loaded replies, and Administrator branch moderation
- Public favorite, vote, and comment counts plus viewer-specific favorite and
  vote state on project cards and detail resources
- Reusable card/detail favorite, vote, comment, and native/copy-link share
  controls, with a responsive favorites page
- Popularity ordering extended to the combined view, favorite, and vote total
- Backend coverage for roles, visibility, validation, duplicates, cascading,
  privacy, eager loading, viewer state, and popularity

Exit evidence:

- 56 PHP tests pass with 321 assertions on both the configured
  MySQL-compatible test database and the in-memory SQLite fallback
- Laravel Pint and Composer validation pass
- The production Vite build succeeds with a lazy-loaded favorites page and the
  engagement-enhanced project detail chunk
- Six authenticated engagement routes and one public discussion route are
  registered with mutation throttles

## Phase 6 — Administration, Review, Announcements, and Reports

**Status:** In progress on 30 July 2026; all unblocked scope is complete.

Delivered scope:

- Administrator overview with project, Exhibitor, Guest, publication,
  pending-approval, recent-submission, and popular-category metrics
- Paginated user search/filter, trusted role management, protected
  self-administration, user deletion, and owned-media cleanup
- Category, technology, and supported SDG 8/11/12 management with assignment
  protection
- Project queue/detail review, notes and reviewer audit fields, the documented
  Submitted → Under Review → Approved → Published transitions, featured
  selection, and scheduled publication
- Data-backed announcement create/edit/schedule/delete management and due
  homepage announcements
- Exhibitor aggregate analytics using views, favorites, and votes only
- Schema-backed project, user, institution, SDG, category, and voting reports
  without unsupported visitor or active-user metrics
- Role-gated, responsive React screens for every delivered workflow
- Seven focused Phase 6 feature tests covering 71 assertions

Current exit evidence:

- 63 PHP tests pass with 406 assertions on both the configured MySQL-compatible
  database and the in-memory SQLite fallback
- Laravel Pint passes and the production Vite build succeeds
- 25 Administrator API routes and one Exhibitor analytics API route are
  registered

Remaining decision:

- Reject and Return for Revision still have no representable outcome in the
  documented project status enum. Define those status transitions before the
  two actions are implemented and Phase 6 is marked complete.

## Phase 7 — Hardening and Deployment Readiness

**Status:** In progress on 30 July 2026.

Planned scope:

- End-to-end authorization and upload-security review
- Performance profiling, eager-loading audit, pagination limits, and image optimization
- Expanded frontend and backend automated tests
- Cross-browser, responsive, keyboard, contrast, and reduced-motion verification
- Production environment, queues, mail, storage linking, caching, logging, backups, and deployment runbook
- Official branding integration after assets and usage measurements are approved

Delivered in the first hardening pass:

- End-to-end review confirmed route-role middleware plus policy authorization
  on protected domain actions and bounded pagination on every collection API
- Defensive response headers, production nonce-based CSP, HTTPS-only HSTS,
  private-response cache prevention, and mutation-specific throttles
- Raster dimension and decoded-pixel ceilings plus generated WebP thumbnails
  using the approved nullable `media.thumbnail` field
- Strict Eloquent behavior outside production to expose lazy loading, missing
  attributes, and silently discarded attributes during automated tests
- A production environment template and deployment runbook covering HTTPS,
  queues, scheduling, mail, storage, caching, logs, backups, smoke checks, and
  rollback
- Focused hardening, query-budget, thumbnail, and frontend accessibility
  contract tests

Remaining Phase 7 work:

- Complete the 360px/768px/1440px interactive browser, keyboard, contrast,
  reduced-motion, and cross-browser pass
- Repeat both database configurations and quality checks after any remaining
  Phase 7 code changes
- Integrate official branding only after all four decisions below are approved

## Brand Decisions Still Open

The following items come directly from `SYSTEM-DESIGN.md` and block final brand integration:

1. Confirm licensed webfont availability; the foundation currently uses the approved open-source substitutes Nunito Sans and Oswald.
2. Obtain the official standalone mobile Bunga Raya mark or approve the documented tall mobile header option.
3. Obtain the official RGB/SVG VM2026 asset pack.
4. Confirm the numeric clear-space ratio `a` before implementing `VMLogo`.

Until these are resolved, do not invent, crop, trace, or modify a VM2026 logo asset.
