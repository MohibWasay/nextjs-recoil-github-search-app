import { useSearchUsers } from "@/modules/users/hooks/useSearchUsers";
import { Collapsible } from "@/shared/components/Collapsible";
import { Input } from "@/shared/components/Input";
import { FC, useState } from "react";

export const SearchUsers: FC = () => {
  const [query, setQuery] = useState("");
  const {} = useSearchUsers(query);

  return (
    <div>
      <Input
        name="search-users"
        id="searchUsers"
        placeholder="Search Users"
        onChange={({ target: { value } }) => setQuery(value)}
      />
      <Collapsible>
        <Collapsible.Item value="1" title="Hello">
          This is a description
        </Collapsible.Item>
        <Collapsible.Item value="2" title="Hello Again">
          This is a description
        </Collapsible.Item>
        <Collapsible.Item value="3" title="Hello Again and Again">
          This is a description
        </Collapsible.Item>
      </Collapsible>
    </div>
  );
};
