import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
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

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
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
