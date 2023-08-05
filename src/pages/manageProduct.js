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


function ManageProduct() {
  const db=collection(firestore,"product_master");
  const[productList,setProductList]=useState();
  const[editProduct,setEditProduct]=useState("");
  const[editProductId,setEditProductId]=useState("");
  const[open,setOpen]=useState(false);

  useEffect(()=>{
    getProduct()
  },[])

  async function getProduct(){
    const prdData=await getDocs(db);
    const editPrd=prdData.docs.map((doc)=>({id:doc.id,...doc.data()}));
    setProductList(editPrd);
    console.log(editPrd);
  }

  const handleEditProduct=(editData)=>{
  console.log(editData)
  setEditProduct(editData.ProductName)
  setEditProductId(editData.id)
  setOpen(true);
  }

  const handleUpdateProduct=(e)=>{
    e.preventDefault();
    if(editProduct!==""){
      console.log(editProduct,editProductId)
      const Ref=doc(db,editProductId)
      updateDoc(Ref,{
        ProductName:editProduct
      });
      setEditProduct("");
      setEditProductId("");
      setOpen(false);
      getProduct();
    }
  }

  const handleDeleteProduct=(deleteDataId)=>{
  console.log(deleteDataId);
  deleteDoc(doc(db,deleteDataId));
  getProduct();
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
                    <th>Category</th>
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
                      <tr key={data.index}>
                        <td>{data.ProductName}</td>
                        <td>{data.SKU}</td>
                        <td>{data.Category}</td>
                        <td>{data.Description}</td>
                        <td>{data.StockQty}</td>
                        <td>{data.ReorderQty}</td>
                        <td>{data.CostPrice}</td>
                         <td>{data.SellingPrice}</td>
                        <td>
                        <button className="button-edit" onClick={() => handleEditProduct(data)}> <EditIcon id="i" /> </button>
                        <button className="button-delete" onClick={() => handleDeleteProduct(data.id)}><DeleteIcon Id="i" /> </button>
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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateProduct}>
            <div className="input-container">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                className="form-control"
                value={editProduct}
                onChange={(e)=>setEditProduct(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <button className="btn btn-primary">Update Product </button>
             </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageProduct;
