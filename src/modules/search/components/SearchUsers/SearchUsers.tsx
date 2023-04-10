import { create } from "@/helpers/createBem";
import { UserReposList, useSearchUsers } from "@/modules/search";
import { Button } from "@/shared/components/Button";
import { Collapsible } from "@/shared/components/Collapsible";
import { Input } from "@/shared/components/Input";
import { FC, useRef } from "react";

import styles from "./SearchUsers.module.scss";

const bem = create(styles, "SearchUsers");

export const SearchUsers: FC = () => {
  const { query, setQuery, users, onSubmit } = useSearchUsers();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={bem()}>
      <div className={bem("search")}>
        <Input
          id="searchUsers"
          onChange={({ target: { value } }) => setQuery(value)}
          ref={inputRef}
          data-testid="searchUsersInput"
          placeholder="Search Users"
        />
        <Button
          variant="primary"
          disabled={!query.length}
          data-testid="searchUsersButton"
          onClick={() => onSubmit()}
        >
          Search
        </Button>
      </div>

      {users.length ? <span>Showing users for {`"${query}"`}</span> : null}

      <Collapsible>
        {users?.map(({ username }) => (
          <Collapsible.Item key={username} value={username} title={username}>
            <UserReposList username={username} />
          </Collapsible.Item>
        ))}
      </Collapsible>
    </div>
  );
};
