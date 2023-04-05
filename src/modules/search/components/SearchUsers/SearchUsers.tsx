import { useSearchUsers } from "@/modules/users/hooks/useSearchUsers";
import { Input } from "@/shared/components/Input";
import { FC, useState } from "react";

export const SearchUsers: FC = () => {
  const [query, setQuery] = useState('')
  const {} = useSearchUsers(query)
  
  return (
    <div>
      <Input
        name="search-users"
        id="searchUsers"
        placeholder="Search Users"
        onChange={() => {}}
      />
    </div>
  );
};
