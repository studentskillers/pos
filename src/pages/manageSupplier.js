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
import { Link } from "react-router-dom";
import { Phone } from "@mui/icons-material";
const header = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];

function ManageSupplier() {
  const db=collection(firestore,"supplier_master");
  const[supplierList,setSupplierList]=useState();
  const[editSupplierName,setEditSupplierName]=useState("");
  const[editSupplierPhoneno,setEditSupplierPhoneno]=useState("");
  const[editSupplierEmail,setEditSupplierEmail]=useState("");
  const[editSupplierAddress,setEditSupplierAddress]=useState("");
  const[editSupplierId,setEditSupplierId]=useState("");
  const[open,setOpen]=useState(false);

  useEffect(()=>{
    getSupplier()
  },[])

  async function getSupplier(){
    const supData=await getDocs(db);
    const editSup=supData.docs.map((doc)=>({id:doc.id,...doc.data()}));
    setSupplierList(editSup);
    console.log(editSup)
  }

  const handleEditSupplier=(editData)=>{
    console.log(editData)
    setEditSupplierName(editData.Name)
    setEditSupplierId(editData.id)
    setOpen(true);
    }

    const handleUpdateSupplier=(e)=>{
      e.preventDefault();
      if(editSupplierName!==""){
        console.log(editSupplierName,editSupplierId)
        const Ref=doc(db,editSupplierId)
        updateDoc(Ref,{
          Name:editSupplierName,
          Phoneno:editSupplierPhoneno,
          Email:editSupplierEmail,
          Address:editSupplierAddress
        });
        setEditSupplierName("");
        setEditSupplierPhoneno("");
        setEditSupplierEmail("");
        setEditSupplierAddress("");
        setEditSupplierId("");
        setOpen(false);
        getSupplier();
      }
    }
  
    const handleDeleteSupplier=(deleteDataId)=>{
      console.log(deleteDataId);
      deleteDoc(doc(db,deleteDataId));
      getSupplier();
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
                <Link className="btn btn-primary mb-3 rounded-2" to="/addsupplier">
                    <span className="hide-menu text-white">Add Supplier</span>
                </Link>
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
                      <tr key={data.index}>
                        <td>{data.Name}</td>
                        <td>{data.Phoneno}</td>
                        <td>{data.Email}</td>
                        <td>{data.Address}</td>
                        <td>
                        <button className="button-edit" onClick={() => handleEditSupplier(data)}> <EditIcon id="i" /> </button>
                        <button className="button-delete" onClick={() => handleDeleteSupplier(data.id)}><DeleteIcon Id="i" /> </button>
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
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSupplier}>
            <div className="input-container">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                className="form-control"
                value={editSupplierName}
                placeholder="Name"
                onChange={(e)=>setEditSupplierName(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="Number"
                className="form-control"
                value={editSupplierPhoneno}
                placeholder="PhoneNO"
                onChange={(e)=>setEditSupplierPhoneno(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="email"
                className="form-control"
                value={editSupplierEmail}
                placeholder="Email"
                onChange={(e)=>setEditSupplierEmail(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                className="form-control"
                value={editSupplierAddress}
                placeholder="Address"
                onChange={(e)=>setEditSupplierAddress(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <button className="btn btn-primary">Update Supplier</button>
             </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageSupplier;
