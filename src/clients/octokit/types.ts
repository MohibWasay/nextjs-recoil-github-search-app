import { client } from ".";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

export type SearchUserResponse = GetResponseDataTypeFromEndpointMethod<
  typeof client.rest.search.users
>;

export type ListUserReposResponse = GetResponseDataTypeFromEndpointMethod<
  typeof client.rest.repos.listForUser
>;
