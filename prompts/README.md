# Ollama prompts

Local models cannot read `docs/`. Each task prompt must be self-contained:
paste the relevant spec slice inline, name the exact output files, keep the
run under ~12 files.

## Run

```bash
ollama run qwen2.5-coder:14b \
  --system "$(cat prompts/ollama-system.txt)" \
  "$(cat prompts/task-01-database.md)"
```

PowerShell:

```powershell
$sys  = Get-Content prompts/ollama-system.txt -Raw
$task = Get-Content prompts/task-01-database.md -Raw
ollama run qwen2.5-coder:14b --system $sys $task
```

## Required settings

Ollama defaults to a tiny context window and will silently truncate the prompt.
Set it explicitly with a Modelfile:

```
FROM qwen2.5-coder:14b
PARAMETER num_ctx 16384
PARAMETER temperature 0.2
PARAMETER top_p 0.9
SYSTEM """<paste ollama-system.txt here>"""
```

```bash
ollama create nexus-dev -f Modelfile
ollama run nexus-dev "$(cat prompts/task-01-database.md)"
```

`num_ctx 16384` minimum — 32768 if your VRAM allows. `temperature 0.2` because
code generation should be near-deterministic.

## Model choice

Anything below ~14B will not hold this architecture. In order of preference:

- `qwen2.5-coder:32b` — best if you have the VRAM
- `qwen2.5-coder:14b` — the practical default
- `deepseek-coder-v2:16b` — good alternative
- `qwen2.5-coder:7b` — will produce syntactically valid but architecturally
  sloppy output; expect to fix it by hand

## Task order

Build in dependency order, one prompt per step, verifying each before moving on:

1. Migrations + models  ← `task-01-database.md`
2. Seeders (categories, SDGs 8/11/12, technologies)
3. Sanctum auth: register, login, logout, /api/me
4. Project CRUD: Form Requests, ProjectService, Policy, Resource, Controller
5. Media upload
6. React shell: axios client, AuthContext, router, layout
7. Gallery page + ProjectCard
8. Project detail page
9. Search & filters
10. Admin dashboard

Copy `task-template.md` for each new step.

## If output is still poor

- Cut the file list in half and run twice.
- Move any rule the model ignored from the system prompt into the task prompt —
  proximity to the task matters more than position in the system prompt.
- Add one short example of the exact output you want. Small models imitate
  far better than they follow instructions.
