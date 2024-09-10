import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // When we make a request, the response will be cached in the either memory, file system or network
  // We have full control on cache for instance we can see, do not cache when making a request
  // const responseTwo = await fetch(
  //   "https://jsonplaceholder.typicode.com/users",
  //   {
  //     cache: "no-store",
  //   }
  // );
  // Or we cann call the next which takes an object and we can set revalidate to specific time in seconds
  // for instance
  // const responseTwo = await fetch(
  //   "https://jsonplaceholder.typicode.com/users",
  //   {
  //     next: { revalidate: 10 },
  //   }
  // );
  // Now in above code, the fetch well be recalled every 10 seconds!
  const users: User[] = await response.json();
  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
