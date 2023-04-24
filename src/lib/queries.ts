import { IProfile } from "@/features/api-types";

export const QUERIES = {
  USERS: ({ currentPage }: { currentPage: number }) => ["users", currentPage],
  USER: ({ userId }: { userId: IProfile["user"]["id"] }) => ["user", userId],
};
