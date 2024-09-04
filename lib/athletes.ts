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
  category?: "all" | "paralympic" | "olympic";
  sport?: string;
  sort?: "followers" | "name" | "sport";
  dir?: "desc" | "asc";
}

function getOrderBy(
  sort: FindAthletesParams["sort"],
  dir: FindAthletesParams["dir"]
) {
  switch (sort) {
    case "followers":
      return { instagramFollowersCount: dir || "desc" } as any;
    case "name":
      return {
        instagramName: dir || "asc",
      };
    case "sport":
      return { sport: { name: dir || "asc" } };
    default:
      return { instagramFollowersCount: "desc" };
  }
}

export async function findAthletes({
  offset = 0,
  limit = ATHLETES_PER_PAGE,
  searchText = "",
  category = "all",
  sport,
  sort,
  dir,
}: FindAthletesParams) {
  const paralympic =
    category === "all" || category === null
      ? undefined
      : category === "paralympic";

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

        {
          paralympic,
        },

        {
          sport: {
            code: sport,
          },
        },
      ],
    },

    orderBy: getOrderBy(sort, dir),
  });
}
