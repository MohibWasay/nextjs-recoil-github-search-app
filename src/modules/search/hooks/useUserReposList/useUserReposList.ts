import { ListUserReposResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import useSWR from "swr/immutable";

const listUserRepos = async (ownerId: string) => {
  if (!ownerId) return null;

  return await performRequest<ListUserReposResponse>({
    path: `/api/owner/${ownerId}/repos`,
  });
};

type UseUserReposListHook = (query: string) => {
  loading: boolean;
  data: ListUserReposResponse;
};

export const useUserReposList: UseUserReposListHook = (username: string) => {
  const { data, isLoading } = useSWR(username, listUserRepos);
  return { data: data ?? [], loading: isLoading };
};
