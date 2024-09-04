import db from "@/prisma/db";
import { Athlete } from "@prisma/client";

export type AthleteWithSport = Athlete & {
  sport: { name: string };
};

export function findAthletes() {
  return db.athlete.findMany({
    include: { sport: { select: { name: true } } },
  });
}
