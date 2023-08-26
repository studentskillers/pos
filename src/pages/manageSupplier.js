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
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2"

function ManageSupplier() {
  const ref=collection(firestore,"supplier_master");
  const[supplierList,setSupplierList]=useState();
  const[initialLoad,setInitialLoad]=useState(true);

  const handleOpen=()=>{
    setOpen(true)
  }

  const handleClose=()=>{
    setOpen(false)
  }

  const[editSupplierId,setEditSupplierId]=useState("");
const[formSupplier,setFormSupplier]=useState({
  Name:"",
  Phoneno:"",
  Email:"",
  Address:""
})
 const[open,setOpen]=useState(false);


  useEffect(()=>{
    getSupplier()
  },[])

  async function getSupplier(){
    const supList=await getDocs(ref);
    setSupplierList(supList.docs.map((doc)=>({id:doc.id,...doc.data()})));
    console.log(supList)
  }

  const handleEditSupplier=(editSup)=>{
    console.log(editSup)
    setFormSupplier(editSup.Name,editSup.Phoneno,editSup.Email,editSup.Address)
    setEditSupplierId(editSup.id)
    setOpen(true);
    getSupplier()
    }

    const handleUpdateSupplier=(e)=>{
      e.preventDefault();
      if(
        formSupplier.Name &&
        formSupplier.Phoneno &&
        formSupplier.Email &&
        formSupplier.Address !==""
        ){
        console.log(formSupplier,editSupplierId)
        const db=doc(ref,editSupplierId)
        updateDoc(db,{
          Name:formSupplier.Name,
          Phoneno:formSupplier.Phoneno,
          Email:formSupplier.Email,
          Address:formSupplier.Address
        });
        setFormSupplier("");
        setEditSupplierId("");
        setOpen(false);
        getSupplier();
      }
      else{
        Swal.fire(
          "Don't leave empty field",
          'Could you please provide a valid data',
          'question'
        )
      }
    }
  
    const handleDeleteSupplier=(deleteDataId)=>{
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
          getSupplier();
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
                    return<>
                      <tr key={data.index}>
                        <td>{data.Name}</td>
                        <td>{data.Phoneno}</td>
                        <td>{data.Email}</td>
                        <td>{data.Address}</td>
                        <td>
                        <button className="button-edit" onClick={() => handleEditSupplier(data)}> 
                         <EditIcon id="i" /> 
                        </button>
                        <button className="button-delete" onClick={() => handleDeleteSupplier(data.id)}>
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
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSupplier}>
            <div className="input-container row">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="ProductName" className="form-label">
                  Name
                </label>
                <input type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={formSupplier.Name}
                placeholder="Enter the Supplier Name"
                onChange={(e)=>
                  setFormSupplier((prevSupplier)=>({
                    ...prevSupplier,
                    Name: e.target.value
                  }))
                }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="Phoneno" className="form-label">
                  Phone NO
                </label>
                <input type="Number"
                className="form-control"
                id="Phoneno"
                name="Phoneno"
                value={formSupplier.Phoneno}
                placeholder="Enter Suppliers PhoneNO"
                onChange={(e)=>
                  setFormSupplier((prevSupplier)=>({
                    ...prevSupplier,
                    Phoneno: e.target.value
                  }))
                }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input type="email"
                className="form-control"
                id="Email"
                name="Email"
                value={formSupplier.Email}
                placeholder="Enter the Email"
                onChange={(e)=>
                  setFormSupplier((prevSupplier)=>({
                    ...prevSupplier,
                    Email:e.target.value
                  }))
                }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="Address" className="form-label">
                  Address
                </label>
                <input type="text"
                className="form-control"
                id="Address"
                name="Address"
                value={formSupplier.Address}
                placeholder="Enetr the Address"
                onChange={(e)=>
                  setFormSupplier((prevSupplier)=>({
                    ...prevSupplier,
                    Address:e.target.value
                  }))}
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
