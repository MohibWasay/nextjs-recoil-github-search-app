import { performRequest } from "@/helpers/performRequest";
import useSWR from "swr/immutable";

const searchUsers = async (queryParams: string) => {
  return await performRequest<unknown>({
    path: `/api/search/users${queryParams}`,
  });
};

export const useSearchUsers = (query: string) => {
  const { data } = useSWR("?query=Mohib", searchUsers);
  return { data };
};
