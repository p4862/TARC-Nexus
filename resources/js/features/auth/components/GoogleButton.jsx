import { Button } from "@/components/ui/button";

export function GoogleButton({ role, children = "Continue with Google" }) {
  const query = role ? `?${new URLSearchParams({ role })}` : "";

  return (
    <Button variant="outline" className="w-full" asChild>
      <a href={`/api/v1/auth/google/redirect${query}`}>{children}</a>
    </Button>
  );
}
