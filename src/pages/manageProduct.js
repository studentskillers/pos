import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

function ManageProduct() {
  const ref = collection(firestore, "product_master");
  const [productList, setProductList] = useState();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const [editProductId, setEditProductId] = useState();
  const [formProduct, setFormProduct] = useState({
    ProductName: "",
    SKU: "",
    Description: "",
    StockQty: "",
    ReorderQty: "",
    CostPrice: "",
    SellingPrice: "",
  });
  const[open, setOpen] = useState(false);

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    const prdList = await getDocs(ref);
    setProductList(prdList.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    console.log(productList);
  }

  const handleEditProduct = (editPrd) => {
    console.log(editPrd)
    setFormProduct(editPrd.Category, editPrd.ProductName, editPrd.SKU, editPrd.Description, editPrd.StockQty, editPrd.ReorderQty, editPrd.CostPrice, editPrd.SellingPrice);
    setEditProductId(editPrd.id)
    setOpen(true);
    getProduct();
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (
      formProduct.Category &&
      formProduct.ProductName &&
      formProduct.SKU &&
      formProduct.Description &&
      formProduct.StockQty &&
      formProduct.ReorderQty &&
      formProduct.SellingPrice !== ""
    ) {
      console.log(formProduct, editProductId)
      const db = doc(ref, editProductId)
      updateDoc(db, {
        Category: formProduct.Category,
        ProductName: formProduct.ProductName,
        SKU: formProduct.SKU,
        Description: formProduct.Description,
        StockQty: formProduct.StockQty,
        ReorderQty: formProduct.ReorderQty,
        CostPrice: formProduct.CostPrice,
        SellingPrice: formProduct.SellingPrice
      });
      setFormProduct("");
      setEditProductId("");
      setOpen(false);
      getProduct();
    }
    else {
      Swal.fire(
        "Don't leave empty field",
        'Could you please provide a valid data',
        'question'
      )
    }
  }

  const handleDeleteProduct = async (deleteDataId) => {
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
        getProduct();
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
                <h2>Manage Product</h2>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end col-xxl-2 col-xl-2 col-md-2 col-sm-4">
                <Link className="btn btn-primary mb-3 rounded-2" to="/addproduct">
                  <span className="hide-menu text-white">Add Product</span>
                </Link>
              </div>
            </div>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Category</th>
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
                  {productList?.map(function (data, index) {
                    return <>
                      <tr key={data.index}>
                        <td>{data.Category}</td>
                        <td>{data.ProductName}</td>
                        <td>{data.SKU}</td>
                        <td>{data.Description}</td>
                        <td>{data.StockQty}</td>
                        <td>{data.ReorderQty}</td>
                        <td>{data.CostPrice}</td>
                        <td>{data.SellingPrice}</td>
                        <td>
                          <button className="button-edit" onClick={() => handleEditProduct(data)}>
                            <EditIcon id="i" />
                          </button>
                          <button className="button-delete" onClick={() => handleDeleteProduct(data.id)}>
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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateProduct}>
            <div className="input-container row">
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="fullname" className="form-label">
                  Product Name
                </label>
                <input type="text"
                  className="form-control"
                  id="ProductName"
                  name="ProductName"
                  placeholder="Enter the Product Name"
                  value={formProduct.ProductName}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      ProductName: e.target.value
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="SKU" className="form-label">
                   SKU
                </label>
                <input type="text"
                  className="form-control"
                  id="SKU"
                  name="SKU"
                  placeholder="Enter the SKU"
                  value={formProduct.SKU}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      SKU: e.target.value
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <input type="text"
                  className="form-control"
                  id="Description"
                  name="Description"
                  placeholder="Description"
                  value={formProduct.Description}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      Description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="StockQty" className="form-label">
                  Stock Qty
                </label>
                <input type="text"
                  className="form-control"
                  id="StockQty"
                  name="StockQty"
                  placeholder="enter the StockQty"
                  value={formProduct.StockQty}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      StockQty: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="ReorderQty" className="form-label">
                  Reorder Qty
                </label>
                <input type="text"
                  className="form-control"
                  id="ReorderQty"
                  name="ReorderQty"
                  placeholder="Enter the ReorderQty"
                  value={formProduct.ReorderQty}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      ReorderQty: e.target.value
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="CostPrice" className="form-label">
                  Cost Price
                </label>
                <input type="text"
                  className="form-control"
                  id="CostPrice"
                  name="CostPrice"
                  placeholder="Enter the Cost Price"
                  value={formProduct.CostPrice}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      CostPrice: e.target.value
                    }))
                  }
                />
              </div>
              <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
              <label htmlFor="SellingPrice" className="form-label">
                  Selling Price
                </label>
                <input type="text"
                  className="form-control"
                  id="SellingPrice"
                  name="SellingPrice"
                  placeholder="Enter the Selling Price"
                  value={formProduct.SellingPrice}
                  onChange={(e) => 
                    setFormProduct((prevProduct)=>({
                      ...prevProduct,
                      SellingPrice: e.target.value
                    }))
                  }
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
