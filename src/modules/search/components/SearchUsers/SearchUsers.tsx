import { create } from "@/helpers/createBem";
import { UserReposList, useSearchUsers } from "@/modules/search";
import { Button } from "@/shared/components/Button";
import { Collapsible } from "@/shared/components/Collapsible";
import { Input } from "@/shared/components/Input";
import { FC, useState } from "react";

import styles from "./SearchUsers.module.scss";

const bem = create(styles, "SearchUsers");

export const SearchUsers: FC = () => {
  const [query, setQuery] = useState("");
  const { data: users, mutate } = useSearchUsers(query);

  return (
    <div className={bem()}>
      <div className={bem("search")}>
        <Input
          id="searchUsers"
          onChange={({ target: { value } }) => setQuery(value)}
          name="search-users"
          placeholder="Search Users"
        />

        <Button variant="primary" onClick={() => mutate()}>
          Search
        </Button>

        {users.length ? <span>Showing users for {`"${query}"`}</span> : null}
      </div>

      <Collapsible>
        {users?.map(({ login }) => (
          <Collapsible.Item key={login} value={login} title={login}>
            <UserReposList username={login} />
          </Collapsible.Item>
        ))}
      </Collapsible>
    </div>
  );
};
