import AthletesList from "@/app/_components/athletes-list";
import { findAthletes } from "@/lib/athletes";
import { findSports } from "@/lib/sports";
import { Suspense } from "react";

export default async function Home() {
  const athletes = await findAthletes({});

  const sports = await findSports();

  return (
    <main className="p-4 flex flex-col gap-12">
      <Suspense key={"qualquer-valor"} fallback={<div>Carregando...</div>}>
        <AthletesList initialData={athletes} />
      </Suspense>
    </main>
  );
}
