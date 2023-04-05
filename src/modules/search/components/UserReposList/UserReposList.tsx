import { FC } from "react";
import { useUserReposList } from "@/modules/search";
import { Card } from "@/shared/components/Card";
import { create } from "@/helpers/createBem";

import styles from "./UserReposList.module.scss";
import { RenderIf } from "@/shared/components/RenderIf/RenderIf";

const bem = create(styles, "UserReposList");

type UserReposList = {
  username: string;
};

export const UserReposList: FC<UserReposList> = ({ username }) => {
  const { data: repos, loading } = useUserReposList(username);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={bem()}>
      <RenderIf
        fallback={
          <span>Here is a list of {`'${username}'`}&apos;s repositories</span>
        }
        condition={repos?.length === 0}
      >
        <span>{`'${username}'`}&apos;s has no public repositories</span>
      </RenderIf>

      {repos?.map?.((repo) => (
        <Card className={bem("repo_card")} key={repo.name} variant="primary">
          <p className={bem("repo_card__name")}>{repo.name}</p>
        </Card>
      ))}
    </div>
  );
};
