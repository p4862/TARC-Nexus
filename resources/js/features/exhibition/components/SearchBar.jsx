import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function SearchBar({
  id,
  value,
  onValueChange,
  onSubmit,
  label = "Search projects",
  placeholder = "Search projects, teams, or technologies",
  className,
}) {
  return (
    <form
      role="search"
      className={cn("relative flex min-w-0 items-center", className)}
      onSubmit={onSubmit}
    >
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 size-4 text-muted-foreground"
      />
      <Input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-full bg-muted pr-12 pl-11"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 rounded-full"
        aria-label="Submit project search"
      >
        <Search aria-hidden="true" />
      </Button>
    </form>
  );
}
