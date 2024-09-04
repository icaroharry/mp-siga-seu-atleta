import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function CategoriesFilter({
  category,
  onCategoryChange,
}: {
  category: string;
  onCategoryChange: (selecetedCategory: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 mt-10 md:mt-0">
      <span className="text-sm underline decoration-yellow-500 block md:hidden">
        Categoria:
      </span>
      <ToggleGroup
        type="single"
        value={category}
        onValueChange={onCategoryChange}
      >
        <ToggleGroupItem value="all" aria-label="Selecionar todos">
          Todos
        </ToggleGroupItem>
        <ToggleGroupItem value="olympic" aria-label="Selecionar olímpicos">
          Olímpicos
        </ToggleGroupItem>
        <ToggleGroupItem
          value="paralympic"
          aria-label="Selecionar paralímpicos"
        >
          Paralímpicos
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default CategoriesFilter;
