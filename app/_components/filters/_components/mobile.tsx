import { FiltersProps } from "@/app/_components/filters";
import CategoriesFilter from "@/app/_components/filters/_components/categories";
import SortBy from "@/app/_components/filters/_components/sort-by";
import SportsFilter from "@/app/_components/filters/_components/sports";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { GoFilter } from "react-icons/go";

function MobileFilters({
  category,
  onCategoryChange,
  sports,
  sport,
  onSportChange,
  sort,
  onSortByChange,
  dir,
  onDirectionChange,
}: FiltersProps) {
  const [open, setOpen] = useState(false);

  const closeAfter = (callback: (params: any) => any) => {
    return (params: any) => {
      callback(params);
      setOpen(false);
    };
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex justify-end w-full">
        <Button
          className="bg-yellow-500 cursor-pointer border-2 border-black"
          onClick={() => setOpen(true)}
        >
          <GoFilter className="w-4 h-4 mr-2" />
          filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex flex-col gap-4">
        <CategoriesFilter
          category={category}
          onCategoryChange={closeAfter(onCategoryChange)}
        />

        <SportsFilter
          sports={sports}
          sport={sport}
          onSportChange={closeAfter(onSportChange)}
        />

        <SortBy
          sort={sort}
          dir={dir}
          onSortByChange={closeAfter(onSortByChange)}
          onDirectionChange={closeAfter(onDirectionChange)}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default MobileFilters;
