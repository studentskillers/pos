import React from "react";
import { useState, useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { firestore } from "../config/firestore";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from "@firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

function ManageCategory() {
  const ref = collection(firestore, "category_master");
  const [categoryList, setCategorylist] = useState();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editCategoryId, setEditcategoryId] = useState();
  const [formCategory, setFormCategory] = useState({
    CategoryName: "",
    CategoryCode: "",
  });
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getCategory()
  }, [])

  async function getCategory() {
    const catList = await getDocs(ref);
    setCategorylist(catList.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    console.log(categoryList)
  }

  const handleEditCategory = (editCat) => {
    console.log(editCat);
    setFormCategory(editCat.CategoryName, editCat.CategoryCode);
    setEditcategoryId(editCat.id);
    setOpen(true);
  }

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (
      formCategory.CategoryName &&
      formCategory.CategoryCode !== ""
    ) {
      console.log(formCategory, editCategoryId)
      const db = doc(ref, editCategoryId);
      updateDoc(db, {
        CategoryName: formCategory.CategoryName,
        CategoryCode: formCategory.CategoryCode
      });
      setFormCategory("");
      setEditcategoryId("");
      setOpen(false);
      getCategory();
    }
    else {
      Swal.fire(
        "Don't leave empty field",
        'Could you please provide a valid data',
        'question'
      )
    }
  };

  const handleDeleteCategory = async (deleteDataId) => {
    console.log(deleteDataId);
    Swal.fire({
      title: "Are you sure to delete the category?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Don't Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(ref, deleteDataId));
        Swal.fire("Deleted!", "", "success");
        getCategory();
        console.log("Deleted");
      } else if (result.isDenied) {
        Swal.fire("Changes not deleted", "", "info");
      }
    });
  };

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
                          <button className="button-edit" onClick={() => handleEditCategory(data)}>
                            <EditIcon id="i" />
                          </button>
                          <button className="button-delete" onClick={() => handleDeleteCategory(data.id)}>
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
        show={open}
        onHide={() => {
          setOpen(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCategory}>
            <div className="input-container row">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                <label htmlFor="fullname" className="form-label">
                  CategoryName
                </label>
                  <input type="text"
                    className="form-control"
                    id="CategoryName"
                    name="CategoryName"
                    placeholder="Enter Category Name"
                    value={formCategory.CategoryName}
                    onChange={(e)=>
                    setFormCategory((prevCategory)=>({
                      ...prevCategory,
                      CategoryName: e.target.value
                    }))
                    }
                  />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="phoneno" className="form-label">
                  Category Code
                </label>
                <input type="text"
                  className="form-control"
                  id="CategoryCode"
                  name="CategoryCode"
                  placeholder="Category Code"
                  value={formCategory.CategoryCode}
                  onChange={(e) => 
                    setFormCategory((prevCategory)=>({
                      ...prevCategory,
                      CategoryCode: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 mt-4 text-align">
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
