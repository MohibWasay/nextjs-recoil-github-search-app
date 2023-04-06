import { ListUserReposResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import { useEffect } from "react";
import { atom, selectorFamily, useRecoilState } from "recoil";
import useSWR from "swr/immutable";

const listUserRepos = async (path: string) => {
  return await performRequest<ListUserReposResponse>({
    path: path,
  });
};

export const listUserReposData = atom<{ [key: string]: ListUserReposResponse }>(
  {
    key: "listUserReposData",
    default: {},
  }
);

export const userRepos = selectorFamily<
  ListUserReposResponse,
  { username: string }
>({
  key: "userRepos",
  get:
    ({ username }) =>
    ({ get }) =>
      get(listUserReposData)[username] ?? [],
});

export type UserRepoData = Pick<
  ListUserReposResponse[0],
  "name" | "description"
> & { starsCount: string };

export type UserRepoParams = {
  username: string;
  repo: string;
};

export const userRepoDataSelector = selectorFamily<
  UserRepoData | null,
  UserRepoParams
>({
  key: "userRepoDataSelector",
  get:
    (params) =>
    ({ get }) => {
      const userRepos = get(listUserReposData)[params.username];
      const repo = userRepos.find((repo) => repo.name === params.repo);

      if (!repo) return null;

      return {
        name: repo.name,
        description: repo.description,
        starsCount: Intl.NumberFormat("en-GB").format(
          repo.stargazers_count ?? 0
        ),
      };
    },
});

type UseUserReposListHook = (query: string) => { loading: boolean };

export const useUserReposList: UseUserReposListHook = (username: string) => {
  const [usersRepoData, setUsersReposData] = useRecoilState(listUserReposData);
  const { data, isLoading: loading } = useSWR(
    usersRepoData[username] ? null : `/api/owner/${username}/repos`,
    listUserRepos
  );

  useEffect(() => {
    if (data && !usersRepoData[username]) {
      setUsersReposData({ ...usersRepoData, [username]: data });
    }
  }, [data, setUsersReposData, usersRepoData, username]);

  return { loading };
};
