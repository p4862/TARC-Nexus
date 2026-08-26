<!-- @format -->

# Deployment Runbook

## Purpose

This runbook covers a production deployment of the Laravel and React modular
monolith. The web server document root must be the repository's `public/`
directory. Never expose the repository root, `.env`, storage internals, or
Composer files through the web server.

The official VM2026 logo remains excluded until the four brand decisions in
`SYSTEM-DESIGN.md` are approved.

## Runtime Requirements

- PHP 8.2 or newer with cURL, DOM, EXIF, Fileinfo, GD, Mbstring, OpenSSL, PDO
  MySQL, Sodium, XML, and ZIP
- Composer 2
- MySQL 8 or the target production-compatible MySQL release
- A supported Node.js release (`^20.19.0` or `>=22.12.0`) for the build stage
- Nginx or Apache with HTTPS
- A process supervisor for Laravel queue workers
- Cron or an equivalent scheduler

Node.js and NPM are build-time requirements. They do not need to run beside
PHP-FPM when the built `public/build` assets are deployed.

## Environment

Copy `.env.production.example` to `.env` on the server and replace every
placeholder. Do not commit the resulting file.

Mandatory production rules:

- `APP_ENV=production`
- `APP_DEBUG=false`
- a unique `APP_KEY` generated once and backed up securely
- an HTTPS `APP_URL`
- least-privilege database credentials
- encrypted, secure, HTTP-only session cookies
- the exact application host in `SESSION_DOMAIN` and
  `SANCTUM_STATEFUL_DOMAINS`
- real SMTP credentials and a monitored sender address
- `SECURITY_CSP_ENABLED=true` and `SECURITY_HSTS_ENABLED=true` only after HTTPS
  is working end to end
- unique cache and Redis prefixes when infrastructure is shared

Keep the application, database, PHP, queue worker, and reverse proxy clocks
synchronized. Scheduled publication uses application timestamps.

## Build and First Provisioning

Run these commands from the release directory:

```bash
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build
php artisan storage:link
php artisan migrate --force
php artisan db:seed --force
php artisan optimize
```

Prefer building frontend assets in CI and deploying the immutable release
artifact. If that is done, production does not need Node.js or `node_modules`.
Taxonomy seeders are idempotent; do not run custom or destructive seeders
against production.

Grant the web and worker user write access only to `storage/` and
`bootstrap/cache/`. All other application files should be read-only to the
runtime user.

## Railway Deployment

Railway detects Laravel and serves the app with PHP-FPM and Caddy. Keep
database migrations out of the build command; run them as a Railway pre-deploy
command after environment variables are available.

Required Railway service settings:

- Build command: `npm run build`
- Pre-deploy command:

  ```bash
  chmod +x ./railway/init-app.sh && sh ./railway/init-app.sh
  ```

The repository declares `ext-pdo_mysql` in `composer.json` so Railway's PHP
builder installs the MySQL PDO driver. If this requirement is removed, Laravel
will fail with `could not find driver` when `DB_CONNECTION=mysql`.

Required Railway variables:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY` set to the generated Laravel key
- `APP_URL` set to the Railway or custom HTTPS domain
- `DB_CONNECTION=mysql`
- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`
- `MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt` when using
  PlanetScale
- `SESSION_DOMAIN` and `SANCTUM_STATEFUL_DOMAINS` set to the deployed host

If logs show `Host: 127.0.0.1` and `Database: laravel`, Railway has not received
the production database variables for that service/environment, or a cached
configuration was built before the variables were present.

## Web Server and Static Assets

- Terminate TLS with a valid certificate and redirect HTTP to HTTPS.
- Forward the original HTTPS scheme correctly so Laravel generates secure URLs.
- Route missing files to `public/index.php`.
- Serve hashed files under `public/build/` with a one-year immutable cache.
- Serve user media under `public/storage/` with MIME sniffing disabled. Do not
  allow script execution in the storage directory.
- Set request-body limits above the configured maximum video upload plus
  multipart overhead. PHP `upload_max_filesize` and `post_max_size` must agree.
- Preserve the security headers emitted by Laravel; the reverse proxy may add
  stricter compatible headers but must not remove them.

## Queue, Scheduler, and Mail

Run a supervised worker similar to:

```bash
php artisan queue:work database --sleep=3 --tries=3 --timeout=90 --max-time=3600
```

Configure the process supervisor to restart the worker on failure. After every
deployment run:

```bash
php artisan queue:restart
```

Invoke Laravel's scheduler once per minute:

```cron
* * * * * cd /var/www/tarc-nexus/current && php artisan schedule:run >> /dev/null 2>&1
```

Before launch, send a verification email and a password-reset email to a test
account. Confirm delivery, the HTTPS links, sender identity, and that failed
jobs remain empty:

```bash
php artisan queue:failed
```

## Release Procedure

1. Confirm the test suite, Pint, Composer validation and audit, NPM audit
   assessment, and production frontend build for the exact release commit.
2. Create a fresh database and public-media backup.
3. Put the application into maintenance mode:

   ```bash
   php artisan down --retry=60
   ```

4. Deploy the new immutable release and install production dependencies.
5. Run `php artisan migrate --force`, `php artisan storage:link`, and
   `php artisan optimize`.
6. Switch the `current` release symlink or web-server release path atomically.
7. Run `php artisan queue:restart`.
8. Return the application to service:

   ```bash
   php artisan up
   ```

9. Complete the smoke checks below.

Use a backward-compatible database migration strategy. If application rollback
is required, restore the previous release. Restore a database backup only when
the migration itself is not backward compatible and the recovery impact has
been reviewed.

## Backups and Restore Drills

Back up both data stores:

- MySQL using a transactional logical backup such as `mysqldump
  --single-transaction --routines --triggers`
- the configured avatar and project-media disk, including generated thumbnails

Store backups outside the application server, encrypt them, restrict access,
and define retention with the system owner. Never place database passwords
directly in shell history; use a protected MySQL option file or the backup
platform's secret store.

At least once per release cycle, restore the latest database and media backup
into an isolated environment, run migrations, and verify a project image,
document download, login, and administrator report. An untested backup is not a
verified recovery path.

## Logging and Monitoring

- Use the `daily` log channel (the production example retains 14 days).
- Ship logs off-host when the hosting platform supports it.
- Alert on HTTP 5xx rates, unavailable `/up`, queue failures, disk capacity,
  database connectivity, certificate expiry, and backup failures.
- Do not log passwords, OAuth tokens, cookies, CSRF tokens, or uploaded file
  contents.

## Post-Deployment Smoke Checks

```bash
curl --fail --silent --show-error https://exhibition.example.edu/up
curl --fail --silent --show-error https://exhibition.example.edu/api/v1/health
php artisan migrate:status
php artisan queue:failed
php artisan about --only=environment,cache,drivers
```

Also verify:

- HTTP redirects to HTTPS.
- `APP_DEBUG` is off and an unknown API route returns the safe JSON envelope.
- CSP, HSTS, `nosniff`, frame, referrer, and permissions headers are present.
- Registration/login, verification mail, password reset, and logout work.
- An Exhibitor can upload an accepted image and the WebP thumbnail loads.
- Private administration and Exhibitor routes reject other roles.
- A scheduled announcement and project do not appear before their publication
  time.
- The homepage, gallery, a project detail, and a document download work at
  360px, 768px, and 1440px.

Record the deployed commit, migration batch, operator, backup identifier,
smoke-test result, and rollback release for every production deployment.
