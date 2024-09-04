"use server";

import { ATHLETES_PER_PAGE } from "@/lib/constants";
import db from "@/prisma/db";
import { Athlete } from "@prisma/client";

export type AthleteWithSport = Athlete & {
  sport: { name: string };
};

interface FindAthletesParams {
  offset?: number;
  limit?: number;
  searchText?: string;
}

export async function findAthletes({
  offset = 0,
  limit = ATHLETES_PER_PAGE,
  searchText = "",
}: FindAthletesParams) {
  return db.athlete.findMany({
    skip: offset,
    take: limit,
    include: { sport: { select: { name: true } } },
    where: {
      AND: [
        {
          OR: [
            {
              instagramName: {
                contains: searchText,
              },
            },
            {
              instagramBio: {
                contains: searchText,
              },
            },
          ],
        },
      ],
    },
  });
}
