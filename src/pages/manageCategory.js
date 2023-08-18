import React, { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { doc, addDoc, updateDoc, deleteDoc, getDocs, collection } from "@firebase/firestore";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const header = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];


function ManageCategory() {
  const db = collection(firestore, "category_master");
  const [categoryList, setCategorylist] = useState();
  const [editCategory, setEditcategory] = useState("");
  const [editCategoryCode,setEditcategoryCode]=useState("");
  const [editCategoryId, setEditcategoryId] = useState("");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getCategory()
  }, [])

  async function getCategory() {
    const catData = await getDocs(db);
    const editCat = catData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategorylist(editCat);
    console.log(editCat)
  }

  const handleEditCategory = (editData) => {
    console.log(editData)
    setEditcategory(editData.CategoryName)
    setEditcategoryId(editData.id)
    setOpen(true);

  }

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editCategory !== "") {
      console.log(editCategory,editCategoryId)
      const Ref = doc(db, editCategoryId);
      updateDoc(Ref, {
        CategoryName: editCategory, 
        CategoryCode:editCategoryCode
       });
      setEditcategory(""); 
      setEditcategoryCode("");
      setEditcategoryId("");
      setOpen(false);
      getCategory();
    }
  }

  const handleDeleteCategory = (deleteDataId) => {
    console.log(deleteDataId)
    deleteDoc(doc(db, deleteDataId));
    getCategory();
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
                  <Link className="btn btn-primary mb-3 rounded-2" to="/addcategory">
                    <span className="hide-menu text-white">Add Category</span>
                  </Link>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Customer code</th>
                    <th>Category Name</th>
                    <th>Category Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList?.map(function (data, index) {
                    return <>
                      <tr key={data.index}>
                        <td>#c001</td>
                        <td>{data.CategoryName}</td>
                        <td>{data.CategoryCode}</td>
                        <td>
                          <button className="button-edit" onClick={() => handleEditCategory(data)}> <EditIcon id="i" /> </button>
                          <button className="button-delete" onClick={() => handleDeleteCategory(data.id)}><DeleteIcon Id="i" /> </button>
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
      <Modal show={open} onHide={()=>{setOpen(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCategory}>
            <div className="input-container">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                  className="form-control"
                  placeholder="Category Name"
                  value={editCategory}
                  onChange={(e) => setEditcategory(e.target.value)}
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <input type="text"
                  className="form-control"
                  placeholder="Category Code"
                  value={editCategoryCode}
                  onChange={(e) => setEditcategoryCode(e.target.value)}
                />
              </div>
               <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <button className='btn btn-primary'>Update Category</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManageCategory;
