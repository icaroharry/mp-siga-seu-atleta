import CategoriesFilter from "@/app/_components/filters/_components/categories";

interface DesktopFiltersProps {
  category: string;
  onCategoryChange: (selectedCategory: string) => void;
}

function DesktopFilters({ category, onCategoryChange }: DesktopFiltersProps) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-8">
        <CategoriesFilter
          category={category}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}

export default DesktopFilters;
