import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function EmailVerifiedPage() {
  const { refreshUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    refreshUser()
      .catch(() => null)
      .finally(() => setIsRefreshing(false));
  }, [refreshUser]);

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Email address verified"
      description="Your account is ready for secure access to TARC Nexus."
    >
      <div className="grid place-items-center gap-6 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-cream-card text-foreground">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        {isRefreshing ? (
          <p className="text-sm text-muted-foreground" role="status">
            Refreshing profile...
          </p>
        ) : (
          <Button asChild>
            <Link to="/profile">Continue to your profile</Link>
          </Button>
        )}
      </div>
    </AuthShell>
  );
}
