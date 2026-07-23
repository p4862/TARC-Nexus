TASK: <one sentence — the single thing to build>

Produce EXACTLY these <N> files and nothing else:

1. <exact/path/one.php>
2. <exact/path/two.php>
3. <exact/path/Three.jsx>

=== SPEC (authoritative — paste the relevant slice of docs/ here) ===

<Paste ONLY the sections needed for these files: the tables involved, the
endpoints involved, the colour tokens involved. Never write "see docs/…" —
the model cannot open files. 200-400 lines maximum.>

=== ENDPOINTS (if backend) ===

GET    /api/projects          list, paginated 12/page, filter by category & sdg
POST   /api/projects          create, Exhibitor only
GET    /api/projects/{slug}   show
PUT    /api/projects/{slug}   update, owner only
DELETE /api/projects/{slug}   delete, owner or Administrator

=== DESIGN TOKENS (if frontend) ===

Primary   #0F766E   Malaysia Emerald   buttons, links, active nav
Secondary #166534   Rainforest Green
Accent    #DC2626   Hibiscus Red       use sparingly
Highlight #D4A017   Songket Gold       featured badges, awards
Ocean     #0284C7
Sunset    #EA580C   call-to-action
Surface   #FAFAF9   page background
Font      Geist Sans, fallback Inter

=== REQUIREMENTS ===

- <constraint 1>
- <constraint 2>
- <constraint 3>

Output the <N> files now, using the FILE: format.
