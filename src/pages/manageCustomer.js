import React from "react";
import { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import { addDoc,getDocs, collection } from "@firebase/firestore";

import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOpts,
    TableBody,
    TableHeader
  } from 'react-bs-datatable';
  import { Col, Row, Table } from 'react-bootstrap';
  
  import 'bootstrap/dist/css/bootstrap.min.css';

  const header = [
    { title: 'Username', prop: 'username' },
    { title: 'Name', prop: 'realname' },
    { title: 'Location', prop: 'location' }
  ];
  

function ManageCustomer() {

  const ref=collection(firestore,"customer_master");

  const [customerList, setCustomerList] = useState();

    useEffect(()=>{
      getCustomer()
    },[])

    async function getCustomer() {
      const cusList=await getDocs(ref);
      setCustomerList(cusList.docs.map(doc => doc.data()));
      console.log(customerList);
    }

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
              <button
                className="btn btn-primary  mb-3 rounded-2"
                type="button"
              >
                Add Customer
              </button>
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
                    {customerList?.map(function (data,index) {
                        return <>
                        <tr key={data.index}>
                        <td>#cc001</td>
                        <td>{data.fullname}</td>
                        <td>{data.phoneno}</td>
                        <td>{data.email}</td>
                        <td>{data.address}</td>
                        <td>{data.country}</td>
                        <td>{data.city}</td>
                        <td>Edit Delete</td>
                        </tr>
                        </>
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

export default ManageCustomer;