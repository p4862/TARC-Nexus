import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || "all"} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full rounded-full bg-muted">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label.toLowerCase()}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProjectFilters({
  filters,
  searchInput,
  taxonomies,
  discoveryType,
  onSearchInput,
  onSearch,
  onFilterChange,
  onClear,
}) {
  return (
    <form
      role="search"
      aria-label="Search and filter published projects"
      className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6"
      onSubmit={onSearch}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="grid gap-2">
          <Label htmlFor="project-search">Search projects</Label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="project-search"
              type="search"
              value={searchInput}
              onChange={(event) => onSearchInput(event.target.value)}
              placeholder="Project, team, or institution"
              className="h-12 rounded-full bg-muted pr-4 pl-11"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" className="rounded-full">
            <Search aria-hidden="true" />
            Search
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={onClear}
          >
            <X aria-hidden="true" />
            Clear
          </Button>
        </div>
      </div>

      <div
        className={`mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 ${
          discoveryType ? "lg:grid-cols-4" : "lg:grid-cols-5"
        }`}
      >
        {discoveryType !== "category" ? (
          <FilterSelect
            id="category-filter"
            label="Categories"
            value={filters.categoryId}
            options={taxonomies.categories.map((category) => ({
              id: category.id,
              label: `${category.name} (${category.projects_count})`,
            }))}
            onChange={(value) => onFilterChange("categoryId", value)}
          />
        ) : null}

        {discoveryType !== "sdg" ? (
          <FilterSelect
            id="sdg-filter"
            label="SDGs"
            value={filters.sdgId}
            options={taxonomies.sdgs.map((sdg) => ({
              id: sdg.id,
              label: `SDG ${sdg.code} (${sdg.projects_count})`,
            }))}
            onChange={(value) => onFilterChange("sdgId", value)}
          />
        ) : null}

        {discoveryType !== "technology" ? (
          <FilterSelect
            id="technology-filter"
            label="Technologies"
            value={filters.technologyId}
            options={taxonomies.technologies.map((technology) => ({
              id: technology.id,
              label: `${technology.name} (${technology.projects_count})`,
            }))}
            onChange={(value) => onFilterChange("technologyId", value)}
          />
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="year-filter">Publication year</Label>
          <Input
            id="year-filter"
            type="number"
            min="2000"
            max="2100"
            value={filters.year}
            placeholder="Any year"
            onChange={(event) => onFilterChange("year", event.target.value)}
            className="rounded-full bg-muted"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sort-filter">Sort projects</Label>
          <Select
            value={filters.sort}
            onValueChange={(value) => onFilterChange("sort", value)}
          >
            <SelectTrigger
              id="sort-filter"
              className="w-full rounded-full bg-muted"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most recent</SelectItem>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="viewed">Most viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
}
