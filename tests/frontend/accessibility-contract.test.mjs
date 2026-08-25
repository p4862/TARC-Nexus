import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");
const sourceRoot = join(projectRoot, "resources/js");

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return sourceFiles(path);
    }

    return [".js", ".jsx"].includes(extname(entry.name)) ? [path] : [];
  });
}

const sources = sourceFiles(sourceRoot).map((path) => ({
  path,
  content: readFileSync(path, "utf8"),
}));

test("brand fill colors never use the documented unsafe white text pairing", () => {
  const unsafePair =
    /(?:bg-vm-(?:yellow|green|teal)-500[^"\n]*text-white|text-white[^"\n]*bg-vm-(?:yellow|green|teal)-500)/;
  const violations = sources
    .filter(({ content }) => unsafePair.test(content))
    .map(({ path }) => path);

  assert.deepEqual(violations, []);
});

test("the public layout retains a keyboard skip link and focusable main target", () => {
  const layout = readFileSync(
    join(sourceRoot, "layouts/PublicLayout.jsx"),
    "utf8"
  );

  assert.match(layout, /href="#main-content"/);
  assert.match(layout, /<main id="main-content"[^>]*tabIndex="-1"/);
});

test("literal images retain alternative text and deferred decoding", () => {
  const violations = [];

  for (const { path, content } of sources) {
    for (const match of content.matchAll(/<img\b[\s\S]*?\/>/g)) {
      if (
        !/\balt=/.test(match[0]) ||
        !/\bloading="lazy"/.test(match[0]) ||
        !/\bdecoding="async"/.test(match[0])
      ) {
        violations.push(path);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test("new-tab links retain reverse-tabnabbing protection", () => {
  const violations = [];

  for (const { path, content } of sources) {
    for (const match of content.matchAll(/<a\b[\s\S]*?<\/a>/g)) {
      if (
        /target="_blank"/.test(match[0]) &&
        !/rel="[^"]*\bnoreferrer\b[^"]*"/.test(match[0])
      ) {
        violations.push(path);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test("global styles retain the reduced-motion override", () => {
  const styles = readFileSync(
    join(projectRoot, "resources/css/app.css"),
    "utf8"
  );

  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /animation-duration: 0\.01ms !important/);
  assert.match(styles, /transition-duration: 0\.01ms !important/);
  assert.match(styles, /scroll-behavior: auto !important/);
});

test("React surfaces keep hardening-safe text and colour contracts", () => {
  const combined = sources.map(({ content }) => content).join("\n");
  const violations = sources
    .filter(({ content }) =>
      /\btext-xs\b|(?:bg|text|border|from|to)-vm-|style=\{|#[\da-f]{3,8}|[âÂÃð]/i.test(
        content
      )
    )
    .map(({ path }) => path);

  assert.deepEqual(violations, []);
  assert.doesNotMatch(combined, /window\.confirm|unsplash|ExhibitHub/i);
});
