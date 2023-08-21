import React from "react";
import { useState, useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { firestore } from "../config/firestore";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "@firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

function ManageCustomer() {
  const ref = collection(firestore, "customer_master");
  const [customerList, setCustomerList] = useState();
  const [initialLoad, setInitialLoad] = useState(true);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [editCustomerId, setEditCustomerId] = useState();
  const [formCustomer, setFormCustomer] = useState({
    fullname: "", 
    phoneno: "",
    email: "",
    address: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCustomer();
  }, []);

  async function getCustomer() {
    const cusList = await getDocs(ref);
    setCustomerList(cusList.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    console.log(customerList);
  }

  const handleEdit = (editCus) => {
    console.log(editCus);
    setFormCustomer(editCus.fullname, editCus.phoneno);
    setEditCustomerId(editCus.id);
    setOpen(true);
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (
      formCustomer.fullname &&
      formCustomer.phoneno &&
      formCustomer.email &&
      formCustomer.address !== ""
    ) {
      console.log(formCustomer, editCustomerId);
      const db = doc(ref, editCustomerId);
      updateDoc(db, {
        fullname: formCustomer.fullname,
        phoneno: formCustomer.phoneno,
        email: formCustomer.email,
        address: formCustomer.address,
      });
      setFormCustomer("");
      setEditCustomerId("");
      setOpen(false);
      getCustomer();
    }
    else{
      Swal.fire(
        "Don't leave empty fields",
        'Could you please provide a valid data',
        'question'
      )
    }
  };

  const handleDelete = async (delDataId) => {
    console.log(delDataId);
    Swal.fire({
      title: "Are you sure to delete the customer details?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(ref, delDataId));
        Swal.fire("Deleted!", "", "success");
        getCustomer();
        console.log("deleted");
      } else if (result.isDenied) {
        Swal.fire("Changes are not deleted", "", "info");
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
              <div className="col-xxl-10 col-xl-10 col-md-10 col-sm-8">
                <h2>Manage Customer</h2>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
                <Link
                  className="btn btn-primary mb-3 rounded-2"
                  to="/addcustomer"
                >
                  <span className="hide-menu text-white">Add Customer</span>
                </Link>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Customer code</th>
                    <th>Name</th>
                    <th>Mobile no</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList?.map(function (data) {
                    return (
                      <>
                        <tr key={data.id}>
                          <td>#cc001</td>
                          <td>{data.fullname}</td>
                          <td>{data.phoneno}</td>
                          <td>{data.email}</td>
                          <td>{data.address}</td>
                          <td>{data.country}</td>
                          <td>{data.city}</td>
                          <td>
                            <span onClick={() => handleEdit(data)}>
                              <EditIcon fontSize="medium" id="i" />
                            </span>
                            <span onClick={() => handleDelete(data.id)}>
                              <DeleteOutlineIcon fontSize="medium" id="i" />
                            </span>
                          </td>
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
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCustomer}>
            <div className="input-container row">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter Full Name"
                  value={formCustomer.fullname}
                  onChange={(e) =>
                    setFormCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      fullname: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="phoneno" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneno"
                  name="phoneno"
                  placeholder="Enter Phone Number"
                  value={formCustomer.phoneno}
                  onChange={(e) =>
                    setFormCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      phoneno: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formCustomer.email}
                  onChange={(e) =>
                    setFormCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={formCustomer.address}
                  onChange={(e) =>
                    setFormCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mt-4 text-align">
                <button className="btn btn-primary">Update Customer</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageCustomer;
