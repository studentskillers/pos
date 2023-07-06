import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";

function ManageUser() {
  const userData = [
    {
      name: "Arunachalam",
      email: "arunachalam@gmail.com",
      password: "12345678",
      confirmpassword: "12345678",
    },
    {
      name: "Sridhar",
      email: "sridhar@gmail.com",
      password: "12345678",
      confirmpassword: "12345678",
    },
    {
      name: "Kavitha",
      email: "kavitha@gmail.com",
      password: "12345678",
      confirmpassword: "12345678",
    },
  ];
  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <SideMenu></SideMenu>

        {/* <!--  Main wrapper --> */}
        <div className="body-wrapper">
          <TopBar></TopBar>
          <div className="container-fluid">
            <div className="row">
                <div className="col-xxl-10 col-xl-10 col-md-10 col-sm-8">
                    <h2>Manage User</h2>
                </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
              <button className="btn btn-primary mb-4 rounded-2" type="button">
                Register
              </button>
            </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Confirm Password</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map(function (data) {
                    return (
                      <>
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.password}</td>
                          <td>{data.confirmpassword}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageUser;
