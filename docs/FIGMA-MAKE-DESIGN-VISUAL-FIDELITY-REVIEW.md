<!-- @format -->

# Figma Make Visual Fidelity Review

## Status

**Unit 15 is in progress.** The mapped generated screens were compared against
production screenshots at 1440px, 768px, and 360px on 2 August 2026. The review
found that palette, typography, and warm surface tokens are broadly in place,
but several mapped screens still have material composition differences from the
generated baseline.

Under D-011, brand substitution is no longer an accepted exception category.
The differences below are therefore classified as either required data/domain
substitutions, required accessibility/responsive corrections, or unintended
visual defects.

## Evidence

| Evidence | Path |
| --- | --- |
| Production captures | `storage/app/codex-visual-smoke/unit15/unit15-prod-*.png` |
| Side-by-side and overlay artifacts | `storage/app/codex-visual-smoke/unit15/comparisons/` |
| Comparison summary JSON | `storage/app/codex-visual-smoke/unit15/comparisons/unit15-visual-comparison-summary.json` |
| Desktop contact sheet | `storage/app/codex-visual-smoke/unit15/comparisons/unit15-contact-sheet--1440.png` |
| Tablet contact sheet | `storage/app/codex-visual-smoke/unit15/comparisons/unit15-contact-sheet--768.png` |
| Mobile contact sheet | `storage/app/codex-visual-smoke/unit15/comparisons/unit15-contact-sheet--360.png` |

The comparison generator produced 54 side-by-side/overlay pairs with no missing
files for the mapped reference/production pairs.

## Accepted Deviations

| Area | Classification | Reason |
| --- | --- | --- |
| Product identity | Required data/domain substitution | Production keeps `TARC Nexus`; the generated `ExhibitHub` name remains rejected. |
| Project and taxonomy content | Required data/domain substitution | Production uses API-backed projects, categories, SDGs, technologies, uploaded media, and local fallbacks instead of mock arrays and Unsplash imagery. |
| Exhibition detail entity | Required data/domain substitution | Production maps this to taxonomy collection routes because no Exhibition entity exists. |
| Notifications | Required data/domain substitution | Production has no personal notification route or unread feed; announcements remain homepage/admin content. |
| Status labels and review outcomes | Required data/domain substitution | Production uses only Draft, Submitted, Under Review, Approved, and Published; generated Pending Review/Rejected states are not persisted. |
| Project form fields | Required data/domain substitution | Production omits unsupported exhibition, faculty, keyword, arbitrary link, and external slides URL fields. |
| Mobile public navigation | Required accessibility/responsive correction | Production provides accessible mobile navigation/search instead of reproducing the prototype's removed mobile navigation. |
| Portal shell below desktop | Required accessibility/responsive correction | Production uses accessible responsive navigation instead of the prototype's fixed 240px sidebar that clips mobile content. |
| Text size, touch targets, focus, overflow | Required accessibility correction | Unit 14 raised visible text to at least 14px, maintained 44px targets, visible focus, and no document-level horizontal overflow. |

## Unintended Visual Defects

These are not approved exceptions and block Unit 15 completion.

| Screen group | Affected mapped states | Defect classification |
| --- | --- | --- |
| Home | `home--logged-out`, `home--logged-in`, `home--category-active` | Hero geometry, section rhythm, stats treatment, discovery imagery, and below-fold composition still differ materially from the generated baseline. |
| Gallery and search | `exhibitions--populated`, `exhibitions--empty`, `search--populated`, `search--empty` | Production discovery composition, filter placement, card/grid density, and empty-state layout remain visibly different from generated listing/search screens. |
| Taxonomy collections | `exhibition-detail--populated` | Production collection pages do not yet reproduce the generated exhibition-detail hero/sidebar/content proportions, apart from the required no-Exhibition-entity substitution. |
| Project detail | `project-detail--default`, `project-detail--saved` | Hero, media/gallery proportions, sidebar, metadata hierarchy, and engagement layout remain visually divergent from the generated detail page. |
| Authentication | `auth--login`, `auth--register` | Auth shell has the generated palette/type but desktop split-panel composition, image treatment, spacing, and form rhythm are not close enough to baseline. |
| Exhibitor dashboard and workflow | `dashboard--overview`, `submit--basic-info`, `submit--review` | Portal screens use the generated token system, but dashboard cards, stepper/workflow layout, and form grouping do not yet match generated proportions closely. |
| My Projects | `my-projects--grid`, `my-projects--delete-confirmation` | Portal shell is correctly responsive, but project card/list density and view-mode states need closer parity. The confirmation dialog is acceptable on accessibility, but spacing/content still differs from generated copy. |
| Profile | `profile--default` | Profile uses shared generated tokens, but the card layout and field grouping are still materially different from the generated profile screen. |
| Uncaptured generated states | login loading/native validation, register strength/disabled, submit intermediate/success, my-projects list/empty-all | These states still need explicit production-state capture or reconciliation. Some generated states depend on unsupported statuses or mock-only behaviour and must be classified per the accepted deviations above. |

## Required Follow-up

1. Reconcile the unintended visual defects screen group by screen group.
2. Recapture each corrected production state at 1440px, 768px, and 360px.
3. Regenerate the Unit 15 comparison artifacts.
4. Leave only data/domain and accessibility/responsive deviations in this file
   and the translation-contract exception register.
5. Mark Unit 15 complete only after no unexplained high-impact appearance
   differences remain.
