import AthletesList from "@/app/_components/athletes-list";
import Filters from "@/app/_components/filters";
import { findAthletes } from "@/lib/athletes";
import { findSports } from "@/lib/sports";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: "all" | "olympic" | "paralympic";
    sport?: string;
    sort: "followers" | "name" | "sport";
    dir: "desc" | "asc";
  };
}) {
  const searchText = searchParams?.q || "";
  const category = searchParams?.category || "all";
  const sport = searchParams?.sport;

  const sort = searchParams?.sort || "followers";
  const dir = searchParams?.dir || "desc";

  const athletes = await findAthletes({
    searchText,
    category,
    sport,
    sort,
    dir,
  });

  const sports = await findSports();

  return (
    <main className="p-4 flex flex-col gap-12">
      <Filters sports={sports} />
      <Suspense
        key={searchText + category + sport + sort + dir}
        fallback={<div>Carregando...</div>}
      >
        <AthletesList
          filters={{ searchText, category, sport, sort, dir }}
          initialData={athletes}
        />
      </Suspense>
    </main>
  );
}
