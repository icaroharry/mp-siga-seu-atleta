import CategoriesFilter from "@/app/_components/filters/_components/categories";
import SportsFilter from "@/app/_components/filters/_components/sports";
import { Sport } from "@prisma/client";

interface DesktopFiltersProps {
  category: string;
  onCategoryChange: (selectedCategory: string) => void;
  sports: Sport[];
  sport: string;
  onSportChange: (sport: string) => void;
}

function DesktopFilters({
  category,
  onCategoryChange,
  sports,
  sport,
  onSportChange,
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
    </div>
  );
}

export default DesktopFilters;
