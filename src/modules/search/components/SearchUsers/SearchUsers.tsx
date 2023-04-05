import { create } from "@/helpers/createBem";
import { useSearchUsers } from "@/modules/search";
import { Collapsible } from "@/shared/components/Collapsible";
import { Input } from "@/shared/components/Input";
import { FC, useState } from "react";

import styles from "./SearchUsers.module.scss";

const bem = create(styles, "SearchUsers");

export const SearchUsers: FC = () => {
  const [query, setQuery] = useState("");
  const { data: users } = useSearchUsers(query);

  return (
    <div className={bem()}>
      <div className={bem("search")}>
        <Input
          id="searchUsers"
          name="search-users"
          placeholder="Search Users"
          onChange={({ target: { value } }) => setQuery(value)}
        />
        {users.length ? <span>Showing users for {`"${query}"`}</span> : null}
      </div>

      <Collapsible>
        {users?.map((user) => (
          <Collapsible.Item
            key={user.login}
            value={user.login}
            title={user.login}
          >
            This is a description
          </Collapsible.Item>
        ))}
      </Collapsible>
    </div>
  );
};
