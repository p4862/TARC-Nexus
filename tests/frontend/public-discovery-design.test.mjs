import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");
const sourceRoot = join(projectRoot, "resources/js");

function source(path) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

test("the homepage keeps every required API-backed public section", () => {
  const homepage = source("pages/HomePage.jsx");

  assert.match(homepage, /fetchHomepageExhibition/);
  assert.match(homepage, /About the exhibition/);
  assert.match(homepage, /Exhibition statistics/);
  assert.match(homepage, /Featured projects/);
  assert.match(homepage, /Solution categories/);
  assert.match(homepage, /SDG showcase/);
  assert.match(homepage, /Latest projects/);
  assert.match(homepage, /Popular projects/);
  assert.match(homepage, /Announcements/);
  assert.match(homepage, /preview_media/);
  assert.doesNotMatch(homepage, /unsplash|ExhibitHub|#e60023/i);
});

test("gallery search, filters, sorting, and pagination remain URL and server driven", () => {
  const gallery = source("features/exhibition/pages/GalleryPage.jsx");
  const service = source(
    "features/exhibition/services/publicExhibitionApi.js"
  );

  assert.match(gallery, /useSearchParams/);
  assert.match(gallery, /fetchPublishedProjects/);
  assert.match(gallery, /discoveryType/);
  assert.match(gallery, /setSearchParams/);
  assert.match(gallery, /<ProjectFilters/);
  assert.match(gallery, /<PaginationControls/);
  assert.match(gallery, /variant="compact"/);
  assert.match(service, /\/public\/projects/);
  assert.match(service, /category_id/);
  assert.match(service, /sdg_id/);
  assert.match(service, /technology_id/);
  assert.match(service, /sort/);
});

test("project detail preserves media, narrative, sustainability, team, resources, and engagement", () => {
  const detail = source(
    "features/exhibition/pages/ProjectDetailPage.jsx"
  );

  for (const field of [
    "abstract",
    "problem_statement",
    "proposed_solution",
    "objectives",
    "target_users",
    "expected_impact",
    "methodology",
    "system_architecture",
    "members",
    "sdgs",
    "technologies",
    "media",
  ]) {
    assert.match(detail, new RegExp(`project\\.${field}`));
  }

  assert.match(detail, /ProjectEngagementActions/);
  assert.match(detail, /MediaGallery/);
  assert.match(detail, /CommentSection/);
  assert.match(detail, /fetchPublishedProject/);
  assert.doesNotMatch(detail, /unsplash|ExhibitHub|#e60023/i);
});

test("public comment moderation uses the shared accessible confirmation dialog", () => {
  const comments = source(
    "features/engagement/components/CommentSection.jsx"
  );

  assert.match(comments, /ConfirmActionDialog/);
  assert.match(comments, /Remove this comment thread/);
  assert.doesNotMatch(comments, /window\.confirm/);
});

test("public cards expose explicit visual variants and backend media only", () => {
  const card = source("features/exhibition/components/ProjectCard.jsx");
  const grid = source("features/exhibition/components/ProjectGrid.jsx");

  assert.match(card, /public:/);
  assert.match(card, /featured:/);
  assert.match(card, /compact:/);
  assert.match(card, /preview_media/);
  assert.match(card, /thumbnail_url \|\| preview\.url/);
  assert.match(grid, /variant === "compact"/);
  assert.doesNotMatch(card, /https?:\/\//);
});
