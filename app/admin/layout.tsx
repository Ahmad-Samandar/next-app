import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="bg-slate-200 mr-5 p-5">Admin Sidebar </div>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
