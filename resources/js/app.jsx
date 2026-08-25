import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { AppRouter } from "@/routes/AppRouter";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to mount the React application: #root was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
