"use client";

import DesktopFilters from "@/app/_components/filters/_components/desktop";
import { SearchInput } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

function Filters() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      const searchString = event.target.value;

      if (searchString) {
        params.set("q", searchString);
      } else {
        params.delete("q");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    200
  );

  const handleCategoryChange = (selectedCategory: string) => {
    if (selectedCategory.length === 0) return;

    const params = new URLSearchParams(searchParams);
    params.set("category", selectedCategory);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-row md:flex-col lg:flex-row gap-8">
      <div>
        <SearchInput
          className="w-56 md:w-full lg:w-56"
          type="text"
          name="q"
          placeholder="Pesquisar"
          defaultValue={q}
          onChange={handleSearch}
        />
      </div>
      <DesktopFilters
        category={category}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}

export default Filters;
