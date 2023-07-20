import React, { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import {getDocs,collection} from "@firebase/firestore"

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


function ManageSupplier() {
  const[supplierList,setSupplierlist]=useState();

  useEffect(()=>{
    getSupplier()
  },[])

  async function getSupplier(){
    const ref=collection(firestore,"supplier_master");
    const supList=await getDocs(ref);
    setSupplierlist(supList.docs.map(doc=>doc.data()));
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
                <h2>Manage Supplier</h2>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
                <button
                  class="btn btn-primary  mb-3 rounded-2"
                  type="button"
                >
                  Add Supplier
                </button>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Supplier Name </th>
                    <th>Supplier Phoneno</th>
                    <th>Supplier Email</th>
                    <th>Supplier Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierList?.map(function (data,index) {
                    return <>
                      <tr>
                        <td>{data.Name}</td>
                        <td>{data.Phoneno}</td>
                        <td>{data.Email}</td>
                        <td>{data.Address}</td>
                        <td>Edit/Delete</td>
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

export default ManageSupplier;
