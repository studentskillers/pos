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


function ManageProduct() {
  const[productList,setProductList]=useState();

  useEffect(()=>{
    getProduct()
  },[])

  async function getProduct(){
    const ref=collection(firestore,"product_master");
    const prdList=await getDocs(ref);
    setProductList(prdList.docs.map(doc=>doc.data()));
    console.log(prdList);
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
                    <th>Product Name </th>
                    <th>SKU</th>
                    <th>Description </th>
                    <th>Stock Qty</th>
                    <th>Reorder Qty</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList?.map(function (data,index) {
                    return <>
                      <tr>
                        <td>{data.ProductName}</td>
                        <td>{data.SKU}</td>
                        <td>{data.Description}</td>
                        <td>{data.StockQty}</td>
                        <td>{data.ReorderQty}</td>
                        <td>{data.CostPrice}</td>
                         <td>{data.SellingPrice}</td>
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

export default ManageProduct;
