import React, { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {doc,addDoc,getDocs,updateDoc,deleteDoc,collection} from "@firebase/firestore"
import { Button,Modal,Row,Col,Container } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import 'bootstrap/dist/css/bootstrap.min.css';

const header = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];


function ManageStock() {
  const db=collection(firestore,"stock_master");
  const[stockList,setStocklist]=useState();
  const[editStock,setEditStock]=useState("");
  const[editStockId,setEditStockId]=useState("");
  const[open,setOpen]=useState(false);


  useEffect(()=>{
    getStock()
  },[])

  async function getStock(){
    const stkData=await getDocs(db);
    const editStk=stkData.docs.map((doc)=>({id:doc.id,...doc.data()}));
    setStocklist(editStk);
    console.log(editStk);
  }

  const handleEditStock=(editData)=>{
    console.log(editData)
    setEditStock(editData.Product)
    setEditStockId(editData.id)
    setOpen(true);
    }

    const handleUpdateStock=(e)=>{
      e.preventDefault();
      if(editStock!==""){
        console.log(editStock,editStockId)
        const Ref=doc(db,editStockId)
        updateDoc(Ref,{
          Product:editStock
        });
        setEditStock("");
        setEditStockId("");
        setOpen(false);
        getStock();
      }
    }

    const handleDeleteStock=(deleteDataId)=>{
      console.log(deleteDataId);
      deleteDoc(doc(db,deleteDataId));
      getStock();
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
                      <tr key={data.index}>
                        <td>{data.Product}</td>
                        <td>{data.CurrentStock}</td>
                        <td>{data.SupplierName}</td>
                        <td>{data.AddQty}</td>
                        <td>
                        <button className="button-edit" onClick={() => handleEditStock(data)}> <EditIcon id="i" /> </button>
                        <button className="button-delete" onClick={() => handleDeleteStock(data.id)}><DeleteIcon Id="i" /> </button>
                        </td>
                      </tr>
                    </>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal show ={open} onHide={()=>{setOpen(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateStock}>
            <div className="input-container">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                className="form-control"
                value={editStock}
                onChange={(e)=>setEditStock(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <button className="btn btn-primary">Update Stock</button>
             </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageStock;
