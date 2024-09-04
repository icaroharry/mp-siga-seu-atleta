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
  };
}) {
  const searchText = searchParams?.q || "";
  const category = searchParams?.category || "all";

  const athletes = await findAthletes({
    searchText,
    category,
  });

  const sports = await findSports();

  return (
    <main className="p-4 flex flex-col gap-12">
      <Filters />
      <Suspense key={searchText + category} fallback={<div>Carregando...</div>}>
        <AthletesList
          filters={{ searchText, category }}
          initialData={athletes}
        />
      </Suspense>
    </main>
  );
}
