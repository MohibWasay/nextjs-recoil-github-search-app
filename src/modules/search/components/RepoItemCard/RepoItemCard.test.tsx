import { ListUserReposResponse } from "@/clients/octokit/types";
import { act, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { listUserReposData } from "../../hooks/useUserReposList/useUserReposList";
import { RepoItemCard } from "./RepoItemCard";

const key = "MohibWasay";

describe("<RepoItemCard />", () => {
  test("show repo item card details", async () => {
    render(
      <RecoilRoot
        initializeState={(snap) =>
          snap.set(listUserReposData, {
            [key]: [
              {
                name: "just-sample-repo-name",
                description: "some description",
                stargazers_count: 20000
              },
            ] as ListUserReposResponse,
          })
        }
      >
        <RepoItemCard username={key} repo="just-sample-repo-name" />
      </RecoilRoot>
    );

    const name = screen.getByTestId<HTMLDivElement>(`repoCardName[${key}]`)
    const description = screen.getByTestId<HTMLDivElement>(`repoCardDescription[${key}]`)
    const starsCount = screen.getByTestId<HTMLDivElement>(`repoCardStarsCount[${key}]`)

    expect(name).toHaveTextContent('just-sample-repo-name')
    expect(description).toHaveTextContent('some description')
    expect(starsCount).toHaveTextContent('20,000')
  });
});
