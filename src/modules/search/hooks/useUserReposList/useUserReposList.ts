import { ListUserReposResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import useSWR from "swr/immutable";

const listUserRepos = async (path: string) => {
  return await performRequest<ListUserReposResponse>({
    path: path,
  });
};

type UseUserReposListHook = (query: string) => {
  loading: boolean;
  data: ListUserReposResponse;
};

export const useUserReposList: UseUserReposListHook = (username: string) => {
  const { data, isLoading } = useSWR(`/api/owner/${username}/repos`, listUserRepos);
  return { data: data ?? [], loading: isLoading };
};
