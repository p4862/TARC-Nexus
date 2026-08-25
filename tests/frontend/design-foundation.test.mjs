import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");
const sourceRoot = join(projectRoot, "resources/js");

function source(path) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

test("the public shell uses a text identity, project search, and mobile sheet", () => {
  const header = source("components/layout/AppHeader.jsx");

  assert.match(header, /BrandIdentity/);
  assert.match(header, /SearchBar/);
  assert.match(header, /SheetContent/);
  assert.match(header, /aria-label="Open navigation menu"/);
  assert.doesNotMatch(header, /Globe2|ExhibitHub|#e60023/i);
});

test("portal shells retain skip navigation and responsive drawer navigation", () => {
  const portal = source("components/layout/PortalShell.jsx");
  const exhibitor = source(
    "features/projects/components/ExhibitorLayout.jsx"
  );
  const administrator = source(
    "features/administration/components/AdminLayout.jsx"
  );

  assert.match(portal, /href="#main-content"/);
  assert.match(portal, /<main id="main-content"[^>]*tabIndex="-1"/);
  assert.match(portal, /SheetContent/);
  assert.match(portal, /lg:grid-cols-\[17rem_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(portal, /ml-\[240px\]/);
  assert.match(exhibitor, /PortalShell/);
  assert.match(administrator, /PortalShell/);
});

test("shared feedback and dialog compositions are present", () => {
  const routeLoading = source(
    "features/auth/components/RouteLoadingState.jsx"
  );
  const projectGrid = source(
    "features/exhibition/components/ProjectGrid.jsx"
  );
  const projectList = source("features/projects/pages/ProjectListPage.jsx");

  assert.match(routeLoading, /LoadingState/);
  assert.match(projectGrid, /EmptyState/);
  assert.match(projectList, /ErrorState/);
  assert.match(projectList, /ConfirmActionDialog/);
  assert.doesNotMatch(projectList, /window\.confirm/);
});

test("shared container and section utilities follow documented widths", () => {
  const styles = readFileSync(
    join(projectRoot, "resources/css/app.css"),
    "utf8"
  );

  assert.match(styles, /\.page-container-wide/);
  assert.match(styles, /max-width: 90rem/);
  assert.match(styles, /\.page-container-reading/);
  assert.match(styles, /max-width: 48rem/);
  assert.match(styles, /\.page-section-compact/);
});
