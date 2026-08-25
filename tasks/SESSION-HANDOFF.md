<!-- @format -->

# Session Handoff

## Current State

- **Current phase:** Phase 7 — Hardening and Deployment Readiness
- **Phase status:** In progress; the independent implementation and automated
  verification pass is complete
- **Roadmap:** `docs/IMPLEMENTATION-ROADMAP.md`
- **Hardening evidence:** `docs/HARDENING-REVIEW.md`
- **Deployment instructions:** `docs/DEPLOYMENT-RUNBOOK.md`
- **Last updated:** 30 July 2026

The next session must read `AGENTS.md`, all four source-of-truth documents, this
handoff, the roadmap, and the two Phase 7 documents before changing code.

## Delivered in the Phase 7 Hardening Pass

- Audited protected routes end to end. Sanctum authentication, explicit role
  middleware, policies, Service Layer state checks, CSRF protection, safe API
  errors, and bounded pagination are present.
- Added endpoint-specific throttles to profile, avatar, Exhibitor project and
  media, Administrator taxonomy, and announcement mutations.
- Added global defensive browser headers, private API cache prevention, a
  production nonce-based Content Security Policy, and HTTPS-only HSTS.
- Enabled Eloquent strict mode outside production. It exposed and led to a fix
  for an Administrator dashboard selected-column/resource mismatch.
- Added raster width, height, and decoded-pixel ceilings to project images and
  raster posters.
- Added GD-backed bounded WebP thumbnail generation using the existing nullable
  `media.thumbnail` field. Validated originals remain available, and cleanup
  removes both files.
- Declared the required Fileinfo and GD PHP extensions in Composer metadata.
- Added six backend hardening tests, expanded project-media tests, a gallery
  query ceiling, and five Node-native frontend accessibility contract tests.
- Added a safe production environment template.
- Added a deployment runbook covering HTTPS, web-server isolation, queues,
  scheduling, mail, storage, immutable assets, caching, logs, backups, restore
  drills, release steps, rollback, and smoke checks.
- Added a hardening review recording authorization, upload, dependency,
  performance, response-header, and accessibility evidence and residual risks.
- Updated architecture, database, module, roadmap, README, and handoff
  documentation.
- Regenerated the Composer lock metadata through canonical repositories; the
  former temporary mirror distribution references are gone.

## Phase 7 Decisions

1. CSP and HSTS default on in production and off in local/testing environments
   unless explicitly enabled. HSTS is emitted only for HTTPS requests.
2. CSP uses a per-response Laravel Vite nonce. Inline styles remain allowed
   because Radix/shadcn components use runtime positioning styles.
3. Private authentication, profile, Exhibitor, Administrator, and engagement
   API responses use `no-store, private`.
4. Raster originals are preserved; the UI's existing `thumbnail_url` path now
   selects a generated WebP preview.
5. Image safety limits are configurable and require no schema change.
6. Office, PDF, and video files remain MIME/extension/size validated but are
   not malware scanned. Use hosting-platform scanning or approve a
   quarantine-and-scan workflow before accepting less-trusted upload roles.
7. The React Router audit advisory was not “fixed” with NPM's forced breaking
   downgrade. The advisory is limited to unstable RSC APIs, while this system
   uses client-only routing and Laravel API mutations. Track a compatible
   patched release.
8. Reject and Return for Revision remain untouched; no undocumented project
   status was invented.

## Verification Results

- Configured MySQL-compatible test database: **70 passed, 455 assertions**
- In-memory SQLite fallback: **70 passed, 455 assertions**
- Frontend accessibility contract suite: **5 passed**
- Phase 7 backend hardening suite: **6 passed, 37 assertions**
- `vendor\bin\pint --test`: **passed**
- `composer validate --no-check-publish`: **passed**
- `composer audit --locked`: **no known advisories**
- `composer check-platform-reqs --no-dev`: **passed**
- `php artisan optimize` and `php artisan optimize:clear`: **passed**
- Production Vite build: **passed**
- `npm audit --omit=dev`: two high-severity dependency entries for the same
  RSC-only React Router advisory; applicability and disposition are documented
  in `docs/HARDENING-REVIEW.md`
- API route inspection: **68** versioned routes with the expected role and
  mutation throttle middleware
- Gallery performance regression: **at most 8 queries** for a 12-project page
- Bundle review: shared entry approximately **325 KB / 102 KB gzip**; largest
  lazy route approximately **17 KB / 5 KB gzip**
- Live local smoke check: homepage returned 200 with defensive response headers

## Environment Notes

- The installed Node version is 22.1.0, below Vite 8's supported `>=22.12.0`
  floor. Vite emits a warning but completes the build. Upgrade Node before
  routine development and deployment builds.
- Local verification uses XAMPP MariaDB 10.4.32. Re-run migrations and tests on
  the target MySQL release before deployment.
- GD, EXIF, and Fileinfo are present locally and are now explicit production
  requirements.
- The local browser runtime exposed no browser target after setup and the
  required troubleshooting pass.

## Remaining Blockers and External Checks

1. Complete the interactive 360px/768px/1440px visual, keyboard-only, computed
   contrast, reduced-motion, and screen-reader pass.
2. Complete cross-browser checks in current Chromium, Firefox, WebKit/Safari,
   and Edge.
3. Decide whether production hosting supplies malware scanning for uploaded
   Office, PDF, and video files or approve an application quarantine workflow.
4. Resolve the four official VM2026 font, mobile mark, asset-pack, and
   clear-space questions before brand integration.
5. Define the exact outcomes and Exhibitor mutability rules for Reject and
   Return for Revision before closing the remaining Phase 6 gap.

## Exact Next-Session Work

1. Retry the in-app browser only if a browser target becomes available;
   otherwise execute the checklist in `docs/HARDENING-REVIEW.md` manually on the
   target browser matrix and record evidence.
2. Fix any issues found in the interactive pass and rerun both database suites,
   frontend contracts, Pint, Composer validation/audit, and the Vite build.
3. Confirm the target hosting stack against `docs/DEPLOYMENT-RUNBOOK.md`,
   including TLS proxy headers, PHP upload limits, writable paths, queue
   supervision, SMTP, backup storage, and restore testing.
4. Obtain the remaining status, brand, and malware-scanning decisions.
5. Mark Phase 7 complete only after the browser matrix and target-environment
   deployment rehearsal pass.

## Do Not Start Yet

- Do not invent Rejected or Revision statuses.
- Do not infer that Return for Revision maps to Draft.
- Do not add visitor sessions, referrals, trends, page-view events, or
  active-user counts.
- Do not expose review fields or student matric numbers publicly.
- Do not create, crop, trace, recolour, or substitute a VM2026 logo.
- Do not enable HSTS before HTTPS is verified end to end.
- Do not run untrusted uploads through a third-party scanning service without
  an approved data-handling decision.
