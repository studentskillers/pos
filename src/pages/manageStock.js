import React, { useState,useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { firestore } from "../config/firestore";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection
} from "@firebase/firestore"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2"

function ManageStock() {
  const ref=collection(firestore,"stock_master");
  const[stockList,setStocklist]=useState();
  const[initialLoad,setInitialLoad]=useState(true);

  const handleOpen=()=>{
    setOpen(true)
  }

  const handleClose=()=>{
    setOpen(false)
  }

const[editStockId,setEditStockId]=useState();
const[formStock,setFormStock]=useState({
  Product:"",
  CurrentStock:"",
  SupplierName:"",
  AddQty:"",
});
 const[open,setOpen]=useState(false);

  useEffect(()=>{
    getStock()
  },[])

  async function getStock(){
    const stkList=await getDocs(ref);
    setStocklist(stkList.docs.map((doc)=>({id:doc.id,...doc.data()})));
    console.log(stockList);
  }

  const handleEditStock=(editStk)=>{
    console.log(editStk)
    setFormStock(editStk.Product,editStk.CurrentStock,editStk.SupplierName,editStk.AddQty)
    setEditStockId(editStk.id)
    setOpen(true);
    getStock();
    }

    const handleUpdateStock=(e)=>{
      e.preventDefault();
      if(
        formStock.Product &&
        formStock.CurrentStock &&
        formStock.SupplierName &&
        formStock.AddQty !==""
      ) {
        console.log(formStock,editStockId)
        const db=doc(ref,editStockId)
        updateDoc(db,{
          Product:formStock.Product,
          CurrentStock:formStock.CurrentStock,
          SupplierName:formStock.SupplierName,
          AddQty:formStock.AddQty
        });
        setFormStock("");
        setEditStockId("");
        setOpen(false);
        getStock();
      }
      else{
        Swal.fire(
          "Don't leave empty field",
          'Could you please provide a valid data',
          'question'
        )
      }
    }

    const handleDeleteStock=(deleteDataId)=>{
      console.log(deleteDataId);
      Swal.fire({
        title: "Are you sure to delete the category?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Don't Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDoc(doc(ref, deleteDataId))
          Swal.fire("Deleted!", "", "success");
          getStock();
          console.log("Deleted")
        } else if (result.isDenied) {
          Swal.fire("Changes not deleted", "", "info");
        }
      })
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
                <h2>Manage Stock</h2>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
                <Link className="btn btn-primary mb-3 rounded-2" to="/addstock">
                    <span className="hide-menu text-white">Add Stock </span>
                </Link>
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
                    return<>
                      <tr key={data.index}>
                        <td>{data.Product}</td>
                        <td>{data.CurrentStock}</td>
                        <td>{data.SupplierName}</td>
                        <td>{data.AddQty}</td>
                        <td>
                         <button className="button-edit" onClick={() => handleEditStock(data)}> 
                          <EditIcon id="i" /> 
                         </button>
                         <button className="button-delete" onClick={() => handleDeleteStock(data.id)}>
                          <DeleteIcon Id="i" /> 
                         </button>
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
      <Modal 
      show ={open} 
      onHide={()=>{
        setOpen(false)
      }} 
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateStock}>
            <div className="input-container row">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="ProductName" className="form-label">
                  Product
                </label>
                <input type="text"
                className="form-control"
                id="Product"
                name="Product"
                placeholder="Enter the Product"
                value={formStock.Product}
                onChange={(e)=>
                  setFormStock((prevStock)=>({
                    ...prevStock,
                    Product:e.target.value
                  }))
                }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="CurrentStock" className="form-label">
                  Current Stock
                </label>    
                <input type="text"
                className="form-control"
                placeholder="Enter the CurrentStock"
                value={formStock.CurrentStock}
                onChange={(e)=>
                  setFormStock((prevStock)=>({
                    ...prevStock,
                    CurrentStock:e.currentTarget.value
                  }))}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="SupplierName" className="form-label">
                  Supplier Name
                </label>
                <input type="text"
                className="form-control"
                id="SupplierName"
                name="SupplierName"
                placeholder="Enter the AddQty"
                value={formStock.SupplierName}
                onChange={(e)=>
                  setFormStock((prevStock)=>({
                    ...prevStock,
                    SupplierName:e.target.value
                  }))
                }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="AddQty" className="form-label">
                  Add Qty
                </label>
                <input type="text"
                className="form-control"
                id="AddQty"
                name="AddQty"
                placeholder="Enter the AddQty"
                value={formStock.AddQty}
                onChange={(e)=>
                  setFormStock((prevStock)=>({
                    ...prevStock,
                    AddQty:e.target.value
                  }))
                }
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