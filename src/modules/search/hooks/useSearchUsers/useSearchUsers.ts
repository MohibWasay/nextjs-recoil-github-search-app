import { SearchUserResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import useDebounce from "@/shared/hooks/useDebounce";
import { KeyedMutator } from "swr";
import useSWR from "swr/immutable";

const searchUsers = async (query: string) => {
  if (!query) return null;

  return await performRequest<SearchUserResponse>({
    path: `/api/search/users?query=${query}`,
  });
};

type UseSearchUsersHook = (query: string) => {
  data: SearchUserResponse["items"];
  mutate: KeyedMutator<SearchUserResponse | null>;
};

export const useSearchUsers: UseSearchUsersHook = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);
  const { data, mutate } = useSWR(debouncedQuery, searchUsers);

  return { data: data?.items ?? [], mutate };
};
