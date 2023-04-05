import { SearchUserResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import useDebounce from "@/shared/hooks/useDebounce";
import { KeyedMutator } from "swr";
import useSWR from "swr/immutable";

const searchUsers = async (path: string) => {
  return await performRequest<SearchUserResponse>({ path });
};

type UseSearchUsersHook = (query: string) => {
  data: SearchUserResponse["items"];
  mutate: KeyedMutator<SearchUserResponse>;
};

export const useSearchUsers: UseSearchUsersHook = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);
  const { data, mutate } = useSWR(
    debouncedQuery ? `/api/search/users?query=${debouncedQuery}` : null,
    searchUsers,
  );

  return { data: data?.items ?? [], mutate };
};
