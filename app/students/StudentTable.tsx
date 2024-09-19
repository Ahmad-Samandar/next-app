import React from "react";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

const StudentTable = async () => {
  const request = await fetch("http://localhost:3001/api/students");
  const students: Student[] = await request.json();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td className="flex gap-2">
                <AiTwotoneEdit size={21} />
                <AiOutlineDelete size={21} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
