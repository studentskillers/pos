import React, { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import{getDocs,collection} from "@firebase/firestore";

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
  

function ManageCategory() {

 
  const[categoryList,setCategorylist]=useState();

  useEffect(()=>{
    getCategory()
  },[])

  async function getCategory(){
    const ref=collection(firestore,"category_master");
    const catList=await getDocs(ref);
    setCategorylist(catList.docs.map(doc=>doc.data()));
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
                    <h2>Manage Category</h2>
                </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
              <button
                class="btn btn-primary  mb-3 rounded-2"
                type="button"
              >
                Add Category
              </button>
            </div>
            </div> 
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Customer code</th>
                    <th>CategoryName</th>
                    <th>CategoryCode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {categoryList?.map(function (data,index) {
                        return <>
                        <tr>
                        <td>#c0001</td>
                        <td>{data.CategoryName}</td>
                        <td>{data.CategoryCode}</td>
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

export default ManageCategory;
