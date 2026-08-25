# TARC Nexus

TARC Nexus is the Online Exhibition System for student digital solutions based on the Visit Malaysia 2026 case study. It is a Laravel 12 modular monolith with a React 19 single-page application compiled through Laravel Vite.

The project is being delivered incrementally. Phase status and the next-session entry point are recorded in:

- [`docs/IMPLEMENTATION-ROADMAP.md`](docs/IMPLEMENTATION-ROADMAP.md)
- [`tasks/SESSION-HANDOFF.md`](tasks/SESSION-HANDOFF.md)

## Prerequisites

- PHP 8.2 or newer
- Composer 2
- MySQL
- Node.js `^20.19.0` or `>=22.12.0`
- NPM 10 or newer

## Local setup

```powershell
Copy-Item .env.example .env
composer install
php artisan key:generate
```

Create the MySQL database configured by `DB_DATABASE` in `.env`, then run:

```powershell
php artisan migrate
npm install
npm run build
```

The test suite uses a separate `tarc_nexus_test` MySQL database. Create both
databases before development:

```sql
CREATE DATABASE tarc_nexus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE tarc_nexus_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Laravel's PHP migrations in `database/migrations` are the executable source of
truth. As an alternative for provisioning an empty Phase 1 database, import the
synchronized schema snapshot:

```powershell
mysql --user=root --database=tarc_nexus --execute="SOURCE database/sql/phase-1-foundation.mysql.sql;"
```

The snapshot includes Laravel's migration history, so subsequent
`php artisan migrate` commands apply only newer migrations. It covers the
authentication foundation used by Phases 1 and 2; the Phase 3 project-domain
tables and Phase 5 engagement tables are then created by newer Laravel
migrations.

Create the public storage link used by profile pictures and project media:

```powershell
php artisan storage:link
```

## Authentication configuration

Phase 2 provides email/password registration and sessions, email verification,
password reset, Google OAuth, role guards, and user profile management.
Public registration permits Guest and Exhibitor accounts; Administrator
accounts must be provisioned through a trusted process.

Configure a mail transport in `.env` for verification and password-reset
messages. Local development defaults to the `log` mailer.

For Google OAuth, create a Google OAuth web client and configure:

```dotenv
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=/api/v1/auth/google/callback
```

Register the following authorized redirect URIs with Google, replacing the
host for each environment:

```text
http://localhost:8000/api/v1/auth/google/callback
http://localhost:8000/api/v1/profile/google/callback
```

TARC Nexus links an existing profile to Google only through the authenticated
profile flow and only when the Google email matches. It never auto-links an
account by email during sign-in.

For development, run the backend and frontend together:

```powershell
composer run dev
```

The application is available at `http://localhost:8000` by default. The versioned health endpoint is `GET /api/v1/health`.

Authentication screens:

- `/login`
- `/register`
- `/forgot-password`
- `/email/verify`
- `/profile`

## Exhibitor project management

Phase 3 provides documented project, team, category, SDG, technology, and media
management for Exhibitor accounts. Seed the initial taxonomy records after
migrating:

```powershell
php artisan db:seed
```

Exhibitor screens:

- `/exhibitor/projects`
- `/exhibitor/projects/new`
- `/exhibitor/projects/{project}/edit`

Draft projects can be edited, have media uploaded, and be submitted for review.
Submission locks project details and media while the administrator review
workflow progresses. Presentation slides use validated PPT/PPTX document
uploads; the approved schema does not include an external slides URL.

Project-media storage and size limits can be configured with:

```dotenv
PROJECT_MEDIA_DISK=public
PROJECT_MEDIA_DIRECTORY=projects
PROJECT_MEDIA_IMAGE_MAX_KB=10240
PROJECT_MEDIA_IMAGE_MAX_WIDTH=6000
PROJECT_MEDIA_IMAGE_MAX_HEIGHT=6000
PROJECT_MEDIA_IMAGE_MAX_PIXELS=24000000
PROJECT_MEDIA_POSTER_MAX_KB=20480
PROJECT_MEDIA_POSTER_MAX_WIDTH=8000
PROJECT_MEDIA_POSTER_MAX_HEIGHT=8000
PROJECT_MEDIA_POSTER_MAX_PIXELS=40000000
PROJECT_MEDIA_VIDEO_MAX_KB=102400
PROJECT_MEDIA_DOCUMENT_MAX_KB=20480
PROJECT_MEDIA_THUMBNAIL_MAX_WIDTH=960
PROJECT_MEDIA_THUMBNAIL_MAX_HEIGHT=720
PROJECT_MEDIA_THUMBNAIL_QUALITY=82
```

Raster images and image posters receive a bounded WebP thumbnail while the
validated original remains available for full-size viewing.

## Public exhibition and discovery

Phase 4 provides read-only public discovery for projects with the `Published`
status and a publication date that has arrived. Public access does not require
an account.

Public screens:

- `/` — live homepage collections and exhibition statistics
- `/projects` — searchable, filterable, sortable project gallery
- `/projects/category/{category}` — category collection
- `/projects/sdg/{sdg}` — SDG collection
- `/projects/technology/{technology}` — technology collection
- `/projects/{slug}` — complete project exhibition

The gallery supports project, student, team, institution, category, technology,
SDG, keyword, year, and popularity discovery with paginated repository queries.
Project detail views increment the existing aggregate `views_count`. Visitor-
level analytics remains a later enhancement.

## Visitor engagement

Phase 5 adds registered-visitor interaction to currently published projects.
Guest accounts can save favorites, cast one People's Choice vote per project,
post comments and threaded replies, and share canonical project links. The
owning Exhibitor can reply to their project's discussion, while Administrators
can remove a comment branch from the public discussion.

Engagement screens:

- `/favorites` — the authenticated Guest's saved-project collection
- `/projects/{slug}#discussion` — the public discussion and reply interface

Favorite additions are idempotent, and duplicate votes return a conflict.
Database unique constraints remain the final guard against concurrent
duplicates. Public project cards and details include favorites, votes, and
comment counts; popularity combines views, favorites, and votes, while the
separate Most Viewed sort remains view-only.

## Administration, announcements, reports, and analytics

Phase 6 provides the unblocked administration workflow. Administrators can
monitor the exhibition, manage users and taxonomies, inspect submissions,
record review notes, approve projects, choose featured work, schedule
publication, manage homepage announcements, and inspect reports supported by
the current schema.

Administrator screens:

- `/administrator`
- `/administrator/projects`
- `/administrator/projects/{project}`
- `/administrator/users`
- `/administrator/taxonomies`
- `/administrator/announcements`
- `/administrator/reports`

Exhibitors can compare aggregate project views, favorites, and votes at
`/exhibitor/analytics`. Visitor trends, referral sources, daily/monthly
visitors, and active-user metrics are not displayed because visitor-level
analytics is not part of the approved schema.

The implemented review path is `Submitted` → `Under Review` → `Approved` →
`Published`, with scheduled publication supported. Reject and Return for
Revision remain blocked until their missing project-status outcomes are
approved.

## Quality checks

```powershell
php artisan test
vendor\bin\pint --test
composer validate --no-check-publish
npm run build
```

## Production deployment

Use [the production environment template](.env.production.example) and
follow the complete [deployment runbook](docs/DEPLOYMENT-RUNBOOK.md). The
runbook covers HTTPS and security headers, immutable frontend assets, queue
workers, mail, storage linking, cache/config optimization, logging, backups,
release steps, rollback, and smoke checks.

The current security, upload, performance, dependency, and accessibility audit
is recorded in [the Phase 7 hardening review](docs/HARDENING-REVIEW.md).

## Source-of-truth documentation

- [`docs/SYSTEM-ARCHITECTURE.md`](docs/SYSTEM-ARCHITECTURE.md)
- [`docs/SYSTEM-DESIGN.md`](docs/SYSTEM-DESIGN.md)
- [`docs/SYSTEM-DATABASE.md`](docs/SYSTEM-DATABASE.md)
- [`docs/SYSTEM-MODULES.md`](docs/SYSTEM-MODULES.md)

Implementation must stay synchronized with these documents. Open questions recorded in the roadmap must be resolved before their affected features are built.
