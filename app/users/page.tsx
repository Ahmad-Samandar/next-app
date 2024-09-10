import React from "react";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;

// rafce stands for "React Arrow Function Component Export"
