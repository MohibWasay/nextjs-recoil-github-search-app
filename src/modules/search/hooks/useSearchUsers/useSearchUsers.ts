import { SearchUserResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import useDebounce from "@/shared/hooks/useDebounce";
import useSWR from "swr/immutable";

const searchUsers = async (params: string) => {
  if (!params) return null;

  return await performRequest<{ data: SearchUserResponse }>({
    path: `/api/search/users?query=${params}`,
  });
};

export const useSearchUsers = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useSWR(debouncedQuery, searchUsers);

  return { data: data?.data?.items ?? [] };
};
