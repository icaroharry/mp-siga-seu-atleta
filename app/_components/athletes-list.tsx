"use client";

import AthleteCard from "@/app/_components/athlete-card";
import { AthleteWithSport } from "@/lib/athletes";

interface AthletesListProps {
  initialData: AthleteWithSport[];
}

function AthletesList({ initialData }: AthletesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {initialData.map((athlete) => (
        <AthleteCard key={athlete.id} athlete={athlete} />
      ))}
    </div>
  );
}

export default AthletesList;
