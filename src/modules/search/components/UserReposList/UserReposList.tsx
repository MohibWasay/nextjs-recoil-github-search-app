import { FC } from "react";
import { userRepos, useUserReposList } from "@/modules/search";
import { create } from "@/helpers/createBem";

import styles from "./UserReposList.module.scss";
import { RenderIf } from "@/shared/components/RenderIf/RenderIf";
import { RepoItemCard } from "../RepoItemCard/RepoItemCard";
import { useRecoilValue } from "recoil";

const bem = create(styles, "UserReposList");

type UserReposList = {
  username: string;
};

export const UserReposList: FC<UserReposList> = ({ username }) => {
  const { loading } = useUserReposList(username);
  const repos = useRecoilValue(userRepos({ username }));

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={bem()} data-testid="usersRepoList">
      <RenderIf condition={repos.length === 0}>
        <span>{`'${username}'`}&apos;s has no public repositories</span>
      </RenderIf>

      {repos?.map?.((repo) => (
        <RepoItemCard key={repo.name} username={username} repo={repo.name} />
      ))}
    </div>
  );
};
