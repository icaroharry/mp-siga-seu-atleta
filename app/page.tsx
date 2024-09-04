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
  };
}) {
  const searchText = searchParams?.q || "";

  const athletes = await findAthletes({
    searchText,
  });

  const sports = await findSports();

  return (
    <main className="p-4 flex flex-col gap-12">
      <Filters />
      <Suspense key={searchText} fallback={<div>Carregando...</div>}>
        <AthletesList filters={{ searchText }} initialData={athletes} />
      </Suspense>
    </main>
  );
}
