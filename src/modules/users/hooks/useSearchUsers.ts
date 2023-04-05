import { performRequest } from "@/helpers/performRequest";
import useSWR from "swr/immutable";

const searchUsers = async (queryParams: string): Promise<unknown | null> => {
  if (!queryParams) {
    return null;
  }

  return await performRequest<unknown>({
    path: `/api/search/users${queryParams}`,
  });
};

export const useSearchUsers = (query: string) => {
  const { data } = useSWR(`query=${query}`, searchUsers);
  return { data };
};
