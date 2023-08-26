import React, { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { firestore } from "../config/firestore";
import { doc, deleteDoc, updateDoc, getDocs, collection } from "@firebase/firestore";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

function ManageUser() {

  const ref=collection(firestore,"user_master");
  const[userList,setUserList]=useState();

  useEffect(()=>{
    getUser()
  },[])

  async function getUser() {
    const uList=await getDocs(ref);
    setUserList(uList.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    console.log(userList);
  }

  const handleDelete=(delDataId)=>{
    console.log(delDataId);
    Swal.fire({
      title: "Are you sure to delete the user details?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(ref, delDataId));
        Swal.fire("Deleted!", "", "success");
        getUser();
        console.log("deleted");
      }
    });
  };

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
                <div className="col-xxl-8 col-xl-8 col-md-8 col-sm-6">
                    <h2>Manage User</h2>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-4 col-xl-4 col-md-4 col-sm-6">
                <Link className="btn btn-primary mb-3 me-md-2 rounded-2" to="/signin">
                  <span className="hide-menu text-white">Log In</span>
                </Link>
                <Link className="btn btn-primary mb-3 rounded-2" to="/registration">
                  <span className="hide-menu text-white">Add User</span>
                </Link>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.map(function (data,index) {
                    return (
                        <tr key={index}>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>********</td>
                          <td>
                            <span>
                              <EditIcon fontSize="medium" id="i" />
                            </span>
                            <span onClick={() => handleDelete(data.id)}>
                              <DeleteOutlineIcon fontSize="medium" id="i" />
                            </span>
                          </td>
                        </tr>
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
