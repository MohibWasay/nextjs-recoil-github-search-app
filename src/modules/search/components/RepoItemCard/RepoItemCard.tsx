import { ListUserReposResponse } from "@/clients/octokit/types";
import { create } from "@/helpers/createBem";
import { Card } from "@/shared/components/Card";
import { FC } from "react";
import styles from "./RepoItemCard.module.scss";

const bem = create(styles, "RepoItemCard");

type RepoItemCard = {
  repo: ListUserReposResponse["0"];
};

export const RepoItemCard: FC<RepoItemCard> = ({ repo }) => {
  return (
    <Card className={bem()} variant="primary">
      <div className={bem("heading")}>
        <span className={bem("itle")}>{repo.name}</span>
        <span>
          {Intl.NumberFormat("en-GB").format(repo.stargazers_count ?? 0)} ★
        </span>
      </div>

      <div>
        <span className={bem("description")}>
          {repo.description ?? "[No description available]"}
        </span>
      </div>
    </Card>
  );
};
