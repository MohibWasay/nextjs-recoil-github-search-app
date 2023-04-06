import { create } from "@/helpers/createBem";
import { Card } from "@/shared/components/Card";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { userRepoDataSelector } from "../../hooks/useUserReposList/useUserReposList";

import styles from "./RepoItemCard.module.scss";

const bem = create(styles, "RepoItemCard");

type RepoItemCard = {
  repo: string;
  username: string;
};

export const RepoItemCard: FC<RepoItemCard> = ({ repo, username }) => {
  const { name, starsCount, description } = useRecoilValue(
    userRepoDataSelector({ username, repo })
  )!;

  return (
    <Card className={bem()} variant="primary">
      <div className={bem("heading")}>
        <span className={bem("title")}>{name}</span>
        <span>{starsCount} ★</span>
      </div>
      <div className={bem("details")}>
        <span className={bem("description")}>{description}</span>
      </div>
    </Card>
  );
};
