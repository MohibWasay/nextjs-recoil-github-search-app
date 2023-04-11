import { ListUserReposResponse } from "@/clients/octokit/types";
import { act, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { listUserReposData } from "../../hooks/useUserReposList/useUserReposList";
import { UserReposList } from "./UserReposList";

const key = "MohibWasay";

describe("<UserReposList />", () => {
  test("display the loading indicator", async () => {
    render(
      <RecoilRoot
        initializeState={(snap) =>
          snap.set(listUserReposData, {
            [key]: [],
          })
        }
      >
        <UserReposList username="MohibWasay" />
      </RecoilRoot>
    );

    
    expect(screen.getByTestId("usersRepoList")).toBeInTheDocument();
  });
});
