import React, { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import {addDoc,getDocs,collection} from "@firebase/firestore"

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


function ManageStock() {
  const[stockList,setStocklist]=useState();

  useEffect(()=>{
    getStock()
  },[])

  async function getStock(){
    const ref=collection(firestore,"stock_master");
    const stkList=await getDocs(ref);
    setStocklist(stkList.docs.map(doc=>doc.data()));
    console.log(stkList);
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
                <h2>Manage Product</h2>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
                <button
                  class="btn btn-primary  mb-3 rounded-2"
                  type="button"
                >
                  Add Product
                </button>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Product </th>
                    <th>Current Stock</th>
                    <th>Supplier Name </th>
                    <th>Add Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stockList?.map(function (data,index) {
                    return <>
                      <tr>
                        <td>{data.Product}</td>
                        <td>{data.CurrentStock}</td>
                        <td>{data.SupplierName}</td>
                        <td>{data.AddQty}</td>
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

export default ManageStock;
