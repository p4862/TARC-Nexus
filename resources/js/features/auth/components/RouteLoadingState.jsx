import { LoadingState } from "@/components/feedback/LoadingState";

export function RouteLoadingState() {
  return (
    <div className="page-container-reading py-12">
      <LoadingState
        title="Preparing your page…"
        description="Checking your session and loading the requested content."
      />
    </div>
  );
}
