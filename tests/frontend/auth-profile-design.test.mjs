import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");
const sourceRoot = join(projectRoot, "resources/js");

function source(path) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

const authPages = [
  "features/auth/pages/LoginPage.jsx",
  "features/auth/pages/RegisterPage.jsx",
  "features/auth/pages/GoogleRegistrationPage.jsx",
  "features/auth/pages/ForgotPasswordPage.jsx",
  "features/auth/pages/ResetPasswordPage.jsx",
  "features/auth/pages/VerifyEmailPage.jsx",
  "features/auth/pages/EmailVerifiedPage.jsx",
];

test("all authentication routes share the Figma-aligned auth composition", () => {
  const shell = source("features/auth/components/AuthShell.jsx");

  assert.match(shell, /lg:grid-cols-\[minmax\(0,1fr\)_minmax\(30rem,36rem\)\]/);
  assert.match(shell, /<BrandIdentity inverse \/>/);
  assert.match(shell, /Visit Malaysia 2026/);
  assert.doesNotMatch(shell, /ExhibitHub|unsplash|style=\{|#[\da-f]{3,8}/i);

  for (const page of authPages) {
    const content = source(page);

    assert.match(content, /features\/auth\/components\/AuthShell/);
    assert.match(content, /<AuthShell/);
  }
});

test("authentication stays on dedicated guarded routes", () => {
  const router = source("routes/AppRouter.jsx");

  for (const path of [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password/:token",
    "/register/google",
    "/email/verify",
    "/email/verified",
    "/profile",
  ]) {
    assert.match(router, new RegExp(`path: "${path.replace("/", "\\/")}"`));
  }

  assert.match(router, /element: <RequireGuest \/>/);
  assert.match(router, /element: <RequireAuth \/>/);
});

test("authentication fields retain labels, announced errors, and autocomplete", () => {
  const formField = source("components/form/FormField.jsx");
  const alert = source("components/ui/alert.jsx");
  const expectedAutocomplete = new Map([
    ["features/auth/pages/LoginPage.jsx", ["email", "current-password"]],
    [
      "features/auth/pages/RegisterPage.jsx",
      ["name", "email", "organization", "new-password"],
    ],
    [
      "features/auth/pages/GoogleRegistrationPage.jsx",
      ["name", "organization"],
    ],
    ["features/auth/pages/ForgotPasswordPage.jsx", ["email"]],
    [
      "features/auth/pages/ResetPasswordPage.jsx",
      ["email", "new-password"],
    ],
  ]);

  assert.match(formField, /<Label htmlFor=\{id\}>\{label\}<\/Label>/);
  assert.match(formField, /role="alert"/);
  assert.match(alert, /role="alert"/);

  for (const [page, values] of expectedAutocomplete) {
    const content = source(page);

    assert.match(content, /<FormField/);
    for (const value of values) {
      assert.match(content, new RegExp(`autoComplete="${value}"`));
    }
  }
});

test("profile uses only supported profile, avatar, and Google mutations", () => {
  const profile = source("features/profile/pages/ProfilePage.jsx");

  assert.match(profile, /updateProfile\(form\)/);
  assert.match(profile, /uploadAvatar\(file\)/);
  assert.match(profile, /removeAvatar\(\)/);
  assert.match(profile, /href="\/api\/v1\/profile\/google\/redirect"/);
  assert.match(profile, /type="file"/);

  for (const field of ["name", "email", "institution", "biography"]) {
    assert.match(profile, new RegExp(`id="${field}"`));
  }

  assert.doesNotMatch(
    profile,
    /current password|new password|change password|update password/i
  );
  assert.doesNotMatch(profile, /apiClient|axios|style=\{|#[\da-f]{3,8}/i);
});

test("Google authentication remains API-backed without a substitute logo", () => {
  const googleButton = source("features/auth/components/GoogleButton.jsx");
  const authApi = source("features/auth/services/authApi.js");

  assert.match(googleButton, /\/api\/v1\/auth\/google\/redirect/);
  assert.doesNotMatch(googleButton, /Globe|svg|style=\{/);
  assert.match(authApi, /\/auth\/google\/pending/);
  assert.match(authApi, /\/auth\/google\/complete/);
});
