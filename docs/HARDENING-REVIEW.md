<!-- @format -->

# Phase 7 Hardening Review

## Review Scope

Reviewed on 30 July 2026 against the approved architecture, database, design,
and module documents. This review covers implementation controls and automated
evidence; it does not replace an infrastructure penetration test.

## Authorization and Request Security

- Protected routes use Sanctum authentication plus explicit Administrator or
  Exhibitor role middleware where applicable.
- Controllers authorize domain actions through policies before invoking
  services.
- Guest engagement policies require a currently public project.
- Exhibitor project and media policies require ownership; the Service Layer
  separately enforces Draft mutability.
- Administrator user management protects self-mutation and the final
  Administrator.
- SPA mutations use stateful sessions and CSRF validation.
- Authentication, engagement, upload, review, taxonomy, announcement, profile,
  and user mutations have endpoint-specific throttles.
- API exception responses hide stack traces and return consistent safe
  envelopes.
- Private API routes emit `Cache-Control: no-store, private`.

Reject and Return for Revision remain excluded because the approved project
status enum still cannot represent their outcomes.

## Upload and Storage Security

- Uploads require both an allowed extension and a server-detected MIME type.
- SVG, archives, executables, and undocumented formats are rejected.
- Avatar uploads require safe raster formats, bounded file size, and bounded
  dimensions.
- Project media uses per-type size limits. Raster images and raster posters also
  enforce width, height, and decoded-pixel ceilings.
- Storage-generated names prevent user-controlled filesystem paths. The
  sanitized original filename is retained only as display metadata.
- Project thumbnails are re-encoded as bounded WebP files with GD and stored in
  the existing nullable thumbnail field.
- Failed writes and domain deletion remove associated originals and
  thumbnails.
- The public storage directory must have script execution disabled and
  `nosniff` enabled at the web server, as specified in the deployment runbook.

Residual infrastructure item: Office files, PDFs, and videos are type-validated
but are not scanned by an antivirus engine. Before accepting uploads from
untrusted public users in production, add a hosting-platform malware scan or a
quarantine-and-scan workflow. The current upload role is limited to
authenticated Exhibitors.

## Performance

- Every collection request validates an upper `per_page` limit.
- Public card, detail, review, analytics, favorite, and discussion queries use
  explicit eager loads and aggregate subqueries.
- Eloquent strict mode is enabled outside production. It exposed and led to a
  fix for an existing Administrator dashboard selected-column mismatch.
- A regression test holds a twelve-result public gallery page to at most eight
  database queries.
- Images use lazy loading and asynchronous decoding; videos preload metadata.
- Public cards and galleries use generated thumbnails rather than full-size
  raster originals.
- React routes are lazy-loaded. The current production build's largest route
  chunk is the project-detail page at about 17 KB before gzip. The shared entry
  chunk is about 325 KB before gzip and 102 KB after gzip.

## Browser and Accessibility

Automated source contracts verify:

- the keyboard skip link and focusable main-content target
- no documented unsafe white-text pairing on yellow, green, or teal brand fills
- alternative text, lazy loading, and async decoding on literal images
- `noreferrer` on links that open a new tab
- the global reduced-motion override

The source review also confirms semantic page headings, labelled form
components, visible focus rings, 44px minimum button/navigation targets, and
the documented responsive grid breakpoints.

The in-app browser runtime exposed no browser target after the required
connection and troubleshooting pass. Interactive checks at 360px, 768px, and
1440px, keyboard-only operation, computed contrast, screen-reader output, and
cross-browser verification therefore remain open. Complete them in current
Chromium, Firefox, WebKit/Safari, and Edge before public deployment.

## Response and Production Controls

The application now emits:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- a restrictive Permissions Policy
- `X-Permitted-Cross-Domain-Policies: none`
- a nonce-based Content Security Policy in production
- HSTS on secure production requests

The production template enables HTTPS-only encrypted session cookies, CSP,
HSTS, daily warning-level logs, a database queue/cache, and real SMTP
placeholders. The deployment runbook covers immutable builds, workers,
scheduling, mail checks, storage linking, caching, backups, restore drills,
logging, smoke tests, and rollback.

## Dependency Review

- `composer audit --locked`: no known Composer security advisories.
- `npm audit --omit=dev`: reports
  [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2)
  through React Router.

The advisory explicitly applies only to unstable React Server Components
APIs. This application uses client-only `createBrowserRouter`, has no RSC
server or action routes, and sends mutations to Laravel's CSRF-protected API.
The currently offered NPM fix forces a breaking downgrade outside the declared
range, so it was not applied. Track a compatible patched React Router release
and reassess before each deployment.

## Current Verification

- MySQL-compatible suite: 70 tests, 455 assertions
- In-memory SQLite suite: 70 tests, 455 assertions
- Frontend accessibility contracts: 5 tests
- Laravel Pint: passed
- Composer validation: passed
- Composer audit: no known advisories
- Production Vite build: passed
- Production Laravel optimization and cache clearing: passed
- Non-development Composer platform requirements: passed

The local Node.js version remains 22.1.0, below Vite 8's supported 22.12.0
floor. The build succeeds with a warning; upgrade Node before routine
development or deployment builds.
