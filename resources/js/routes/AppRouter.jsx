import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "@/features/administration/components/AdminLayout";
import { ExhibitorLayout } from "@/features/projects/components/ExhibitorLayout";
import { AdminAnnouncementsPage } from "@/features/administration/pages/AdminAnnouncementsPage";
import { AdminDashboardPage } from "@/features/administration/pages/AdminDashboardPage";
import { AdminProjectQueuePage } from "@/features/administration/pages/AdminProjectQueuePage";
import { AdminProjectReviewPage } from "@/features/administration/pages/AdminProjectReviewPage";
import { AdminReportsPage } from "@/features/administration/pages/AdminReportsPage";
import { AdminTaxonomiesPage } from "@/features/administration/pages/AdminTaxonomiesPage";
import { AdminUsersPage } from "@/features/administration/pages/AdminUsersPage";
import { ExhibitorAnalyticsPage } from "@/features/administration/pages/ExhibitorAnalyticsPage";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { RequireGuest } from "@/features/auth/components/RequireGuest";
import { RequireRole } from "@/features/auth/components/RequireRole";
import { EmailVerifiedPage } from "@/features/auth/pages/EmailVerifiedPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { GoogleRegistrationPage } from "@/features/auth/pages/GoogleRegistrationPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { VerifyEmailPage } from "@/features/auth/pages/VerifyEmailPage";
import { FavoritesPage } from "@/features/engagement/pages/FavoritesPage";
import { GalleryPage } from "@/features/exhibition/pages/GalleryPage";
import { ProjectDetailPage } from "@/features/exhibition/pages/ProjectDetailPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProjectCreatePage } from "@/features/projects/pages/ProjectCreatePage";
import { ProjectEditPage } from "@/features/projects/pages/ProjectEditPage";
import { ProjectListPage } from "@/features/projects/pages/ProjectListPage";
import { PublicLayout } from "@/layouts/PublicLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<GalleryPage />} />
          <Route
            path="projects/category/:categoryId"
            element={<GalleryPage discoveryType="category" />}
          />
          <Route
            path="projects/sdg/:sdgId"
            element={<GalleryPage discoveryType="sdg" />}
          />
          <Route
            path="projects/technology/:technologyId"
            element={<GalleryPage discoveryType="technology" />}
          />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />

          <Route element={<RequireGuest />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="auth/google/complete"
              element={<GoogleRegistrationPage />}
            />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="email/verify" element={<VerifyEmailPage />} />
            <Route path="email/verified" element={<EmailVerifiedPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<RequireRole roles={["Exhibitor"]} />}>
          <Route path="exhibitor" element={<ExhibitorLayout />}>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<ProjectListPage />} />
            <Route path="projects/new" element={<ProjectCreatePage />} />
            <Route path="projects/:projectId/edit" element={<ProjectEditPage />} />
            <Route path="analytics" element={<ExhibitorAnalyticsPage />} />
          </Route>
        </Route>

        <Route element={<RequireRole roles={["Administrator"]} />}>
          <Route path="administrator" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="projects" element={<AdminProjectQueuePage />} />
            <Route
              path="projects/:projectId"
              element={<AdminProjectReviewPage />}
            />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="taxonomies" element={<AdminTaxonomiesPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
