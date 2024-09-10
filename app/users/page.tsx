import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <UserTable sortOrder={sortOrder} />
      {/* </Suspense> */}
    </>
  );
};

export default UsersPage;

// rafce stands for "React Arrow Function Component Export"
