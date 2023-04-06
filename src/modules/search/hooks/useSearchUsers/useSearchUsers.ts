import { SearchUserResponse } from "@/clients/octokit/types";
import { performRequest } from "@/helpers/performRequest";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const userQueryString = atom<string>({
  key: "userQueryString",
  default: "",
});

export type SearchUserItem = {
  username: string;
};

export const searchUserData = atom<SearchUserResponse["items"]>({
  key: "searchUserData",
  default: [],
});

export const searchUserDataSelector = selector<SearchUserItem[]>({
  key: "searchUserDataSelector",
  get: ({ get }) => {
    const users = get(searchUserData);
    return users.map((user) => ({ username: user.login }));
  },
});

type UseSearchUsersHook = () => {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  users: SearchUserItem[];
};

export const useSearchUsers: UseSearchUsersHook = () => {
  const [query, setQuery] = useRecoilState(userQueryString);
  const [, setUsers] = useRecoilState(searchUserData);
  const users = useRecoilValue(searchUserDataSelector);

  const onSubmit = async () => {
    const response = await performRequest<SearchUserResponse>({
      path: `/api/search/users?query=${query}`,
    });
    setUsers(response.items);
  };

  return { query, users, setQuery, onSubmit };
};
