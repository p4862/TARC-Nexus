import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");
const sourceRoot = join(projectRoot, "resources/js");

function source(path) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

test("owned projects keep status filtering and pagination API driven", () => {
  const page = source("features/projects/pages/ProjectListPage.jsx");
  const service = source("features/projects/services/projectApi.js");

  assert.match(page, /useSearchParams/);
  assert.match(page, /fetchOwnedProjects\(query\)/);
  assert.match(page, /<PaginationControls/);
  assert.match(page, /project\.media\?\.find\(isRenderableImageMedia\)/);
  assert.match(page, /<ConfirmActionDialog/);

  for (const status of [
    "Draft",
    "Submitted",
    "Under Review",
    "Approved",
    "Published",
  ]) {
    assert.match(page, new RegExp(`"${status}"`));
  }

  assert.doesNotMatch(page, /Rejected|window\.confirm|unsplash|style=\{|#[\da-f]{3,8}/i);
  assert.match(service, /status: status \|\| undefined/);
});

test("project authoring uses the schema-backed stepped workflow", () => {
  const form = source("features/projects/components/ProjectForm.jsx");

  for (const step of [
    "Basic info",
    "Narrative",
    "SDGs & technology",
    "Team & development",
    "Review",
  ]) {
    assert.match(form, new RegExp(step.replace("&", "\\&")));
  }

  for (const field of [
    "category_id",
    "title",
    "subtitle",
    "team_name",
    "abstract",
    "problem_statement",
    "proposed_solution",
    "objectives",
    "target_users",
    "expected_impact",
    "methodology",
    "system_architecture",
    "github_url",
    "demo_url",
    "figma_url",
    "video_url",
    "members",
    "sdgs",
    "technology_ids",
  ]) {
    assert.match(form, new RegExp(field));
  }

  assert.match(form, /mediaContent/);
  assert.match(form, /Save and submit for review/);
  assert.doesNotMatch(
    form,
    /exhibition_id|faculty|keywords|slides_url|notification|style=\{|#[\da-f]{3,8}/i
  );
});

test("edit-only media is API-backed and uses accessible confirmation", () => {
  const createPage = source("features/projects/pages/ProjectCreatePage.jsx");
  const editPage = source("features/projects/pages/ProjectEditPage.jsx");
  const media = source("features/projects/components/MediaManager.jsx");

  assert.match(createPage, /createProject\(payload\)/);
  assert.doesNotMatch(createPage, /MediaManager|uploadProjectMedia/);
  assert.match(editPage, /mediaContent=\{/);
  assert.match(editPage, /<MediaManager/);
  assert.match(editPage, /updateProject\(projectId, pendingSubmissionPayload\)/);
  assert.match(editPage, /submitProject\(projectId\)/);
  assert.match(editPage, /<ConfirmActionDialog/);
  assert.match(media, /uploadProjectMedia\(projectId/);
  assert.match(media, /deleteProjectMedia\(projectId/);
  assert.match(media, /<ConfirmActionDialog/);
  assert.doesNotMatch(
    `${editPage}\n${media}`,
    /window\.confirm|style=\{|#[\da-f]{3,8}/i
  );
});

test("the exhibitor overview contains only supported aggregate analytics", () => {
  const analytics = source(
    "features/administration/pages/ExhibitorAnalyticsPage.jsx"
  );

  assert.match(analytics, /fetchExhibitorAnalytics/);
  assert.match(analytics, /analytics\.summary\.projects/);
  assert.match(analytics, /analytics\.summary\.views/);
  assert.match(analytics, /analytics\.summary\.favorites/);
  assert.match(analytics, /analytics\.summary\.votes/);
  assert.match(analytics, /Aggregate engagement only/);
  assert.match(analytics, /<PaginationControls/);
  assert.doesNotMatch(
    analytics,
    /daily visitors|referral sources|notifications|weekly trend|style=\{|#[\da-f]{3,8}/i
  );
});
