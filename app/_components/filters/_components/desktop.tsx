import CategoriesFilter from "@/app/_components/filters/_components/categories";
import SortBy from "@/app/_components/filters/_components/sort-by";
import SportsFilter from "@/app/_components/filters/_components/sports";
import { Sport } from "@prisma/client";

interface DesktopFiltersProps {
  category: string;
  onCategoryChange: (selectedCategory: string) => void;
  sports: Sport[];
  sport: string;
  onSportChange: (sport: string) => void;
  sort: string;
  onSortByChange: (selectedSort: string) => void;
  dir: string;
  onDirectionChange: () => void;
}

function DesktopFilters({
  category,
  onCategoryChange,
  sports,
  sport,
  onSportChange,
  sort,
  onSortByChange,
  dir,
  onDirectionChange,
}: DesktopFiltersProps) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-8">
        <CategoriesFilter
          category={category}
          onCategoryChange={onCategoryChange}
        />

        <SportsFilter
          sport={sport}
          onSportChange={onSportChange}
          sports={sports}
        />
      </div>
      <SortBy
        sort={sort}
        onSortByChange={onSortByChange}
        dir={dir}
        onDirectionChange={onDirectionChange}
      />
    </div>
  );
}

export default DesktopFilters;
