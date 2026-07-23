TASK: Create the database migrations and Eloquent models for the Online Exhibition System.

Produce EXACTLY these 12 files and nothing else:

1.  database/migrations/2026_01_01_000001_create_categories_table.php
2.  database/migrations/2026_01_01_000002_create_sdgs_table.php
3.  database/migrations/2026_01_01_000003_create_technologies_table.php
4.  database/migrations/2026_01_01_000004_create_projects_table.php
5.  database/migrations/2026_01_01_000005_create_project_members_table.php
6.  database/migrations/2026_01_01_000006_create_project_sdgs_table.php
7.  database/migrations/2026_01_01_000007_create_project_technologies_table.php
8.  app/Models/User.php
9.  app/Models/Project.php
10. app/Models/Category.php
11. app/Models/Sdg.php
12. app/Models/Technology.php

=== SCHEMA (authoritative — do not add, rename, or remove columns) ===

users
  id                bigint PK
  name              string
  email             string unique
  password          string nullable
  google_id         string nullable unique
  avatar            string nullable
  biography         text nullable
  institution       string
  role              enum('Administrator','Exhibitor','Guest') default 'Guest'
  email_verified_at timestamp nullable
  remember_token    string
  timestamps

categories
  id          bigint PK
  name        string
  slug        string unique
  description text nullable
  timestamps

sdgs
  id          bigint PK
  number      integer          -- 8, 11, 12
  title       string
  description text nullable
  timestamps

technologies
  id   bigint PK
  name string
  slug string unique
  timestamps

projects
  id                  bigint PK
  user_id             bigint FK -> users.id      cascadeOnDelete
  category_id         bigint FK -> categories.id restrictOnDelete
  title               string
  subtitle            string nullable
  slug                string unique
  abstract            text
  problem_statement   text
  proposed_solution   text
  objectives          text
  target_users        text
  expected_impact     text
  methodology         text
  system_architecture text
  github_url          string nullable
  demo_url            string nullable
  figma_url           string nullable
  video_url           string nullable
  status              enum('Draft','Submitted','Under Review','Approved','Published') default 'Draft'
  featured            boolean default false
  published_at        timestamp nullable
  timestamps
  INDEX on (status), (featured), (category_id)

project_members
  id         bigint PK
  project_id bigint FK -> projects.id cascadeOnDelete
  user_id    bigint FK -> users.id    nullable  nullOnDelete
  name       string
  role       string
  email      string nullable
  timestamps

project_sdgs   (junction)
  id         bigint PK
  project_id bigint FK -> projects.id cascadeOnDelete
  sdg_id     bigint FK -> sdgs.id     cascadeOnDelete
  UNIQUE (project_id, sdg_id)

project_technologies   (junction)
  id            bigint PK
  project_id    bigint FK -> projects.id     cascadeOnDelete
  technology_id bigint FK -> technologies.id cascadeOnDelete
  UNIQUE (project_id, technology_id)

=== RELATIONSHIPS TO IMPLEMENT ===

User:      hasMany(Project)
Project:   belongsTo(User), belongsTo(Category), hasMany(ProjectMember),
           belongsToMany(Sdg, 'project_sdgs'),
           belongsToMany(Technology, 'project_technologies')
Category:  hasMany(Project)
Sdg:       belongsToMany(Project, 'project_sdgs')
Technology:belongsToMany(Project, 'project_technologies')

=== MODEL REQUIREMENTS ===

- Every model declares $fillable (never $guarded = []).
- User hides password and remember_token via $hidden, and casts
  email_verified_at => 'datetime', password => 'hashed'.
- User uses HasApiTokens (Laravel Sanctum), HasFactory, Notifiable.
- Project casts featured => 'boolean', published_at => 'datetime'.
- Project uses getRouteKeyName() returning 'slug'.
- Migrations use the anonymous-class style: return new class extends Migration
- Each migration has both up() and down().

Output the 12 files now, using the FILE: format.
