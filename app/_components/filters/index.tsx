"use client";

import DesktopFilters from "@/app/_components/filters/_components/desktop";
import MobileFilters from "@/app/_components/filters/_components/mobile";
import { SearchInput } from "@/components/ui/input";
import { Sport } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMediaQuery } from "@react-hook/media-query";

export interface FiltersProps {
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

function Filters({ sports }: { sports: Sport[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sport = searchParams.get("sport") || "";
  const sort = searchParams.get("sort") || "";
  const dir = searchParams.get("dir") || "desc";

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

  const handleSportChange = (selectedSport: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedSport.length === 0) {
      params.delete("sport");
    } else {
      params.set("sport", selectedSport);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSortByChange = (selectedSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", selectedSort);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDirectionChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set("dir", dir === "desc" ? "asc" : "desc");
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
      {isMobile ? (
        <MobileFilters
          category={category}
          onCategoryChange={handleCategoryChange}
          sports={sports}
          sport={sport}
          onSportChange={handleSportChange}
          sort={sort}
          onSortByChange={handleSortByChange}
          dir={dir}
          onDirectionChange={handleDirectionChange}
        />
      ) : (
        <DesktopFilters
          category={category}
          onCategoryChange={handleCategoryChange}
          sports={sports}
          sport={sport}
          onSportChange={handleSportChange}
          sort={sort}
          onSortByChange={handleSortByChange}
          dir={dir}
          onDirectionChange={handleDirectionChange}
        />
      )}
    </div>
  );
}

export default Filters;
