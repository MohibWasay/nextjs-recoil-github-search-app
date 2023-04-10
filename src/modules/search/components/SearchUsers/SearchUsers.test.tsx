import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { SearchUsers } from "./SearchUsers";

const onSubmitFn = jest.fn();

jest.mock("../../hooks/useSearchUsers/useSearchUsers", () => ({
  useSearchUsers: () => ({
    users: [],
    setQuery: () => {},
    query: "MohibWasay",
    onSubmit: onSubmitFn,
  }),
}));

describe("<SearchUsers />", () => {
  it("should render list of users when query changed", async () => {
    render(
      <RecoilRoot>
        <SearchUsers />
      </RecoilRoot>
    );

    const input = screen.getByTestId<HTMLInputElement>("searchUsersInput");
    const button = screen.getByTestId("searchUsersButton");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId("usersRepoList")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "MohibWasay" } });

    expect(input.value).toBe("MohibWasay");
    fireEvent.click(button);
    expect(onSubmitFn).toHaveBeenCalled();
  });
});
