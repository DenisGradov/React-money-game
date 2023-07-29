import React from "react";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";

function Admin({ adminLogin, dataState, setAdminLogin }) {
  return (
    <div>
      {adminLogin && (
        <AdminMenu
          adminLogin={adminLogin}
          dataState={dataState}
          setAdminLogin={setAdminLogin}
        />
      )}
      {!adminLogin && (
        <AdminLogin
          adminLogin={adminLogin}
          dataState={dataState}
          setAdminLogin={setAdminLogin}
        />
      )}
    </div>
  );
}

export default Admin;
