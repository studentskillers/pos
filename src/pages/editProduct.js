import React, { useEffect, useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { addDoc, getDocs, collection } from "@firebase/firestore";
import { firestore } from "../config/firestore";

function EditProduct() {
  const [categoryList, setCategorylist] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const ref = collection(firestore, "category_master");
    const catList = await getDocs(ref);
    setCategorylist(catList.docs.map((doc) => doc.data()));
  }

  const ref = collection(firestore, "product_master");

  const handleSubmit =  (values) => {
    console.log("checking handleSubmit -->", values);
    try {
      if (values !== "" && values !== undefined) {
         addDoc(ref,values);
        alert("added successfully");
      } else {
        alert("enter valid data");
      }
    } catch (err) { 
      console.log(err);
    }
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
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-3">Edit Product</h2>
                <Formik
                  initialValues={{
                    Category: "",
                    ProductName: "",
                    SKU: "",
                    Description: "",
                    StockQty: "",
                    ReorderQty: "",
                    CostPrice: "",
                    SellingPrice: "",
                    ProductImg: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.Category) {
                      errors.Category = "Required";
                    }
                    if (!values.ProductName) {
                      errors.ProductName = "Required";
                    }
                    if (!values.SKU) {
                      errors.SKU = "Required";
                    }
                    if (!values.Description) {
                      errors.Description = "Required";
                    }
                    if (!values.StockQty) {
                      errors.StockQty = "Required";
                    }
                    if (!values.ReorderQty) {
                      errors.ReorderQty = "Required";
                    }
                    if (!values.CostPrice) {
                      errors.CostPrice = "Required";
                    }
                    if (!values.SellingPrice) {
                      errors.SellingPrice = "Required";
                    }
                    // if (!values.ProductImg) {
                    //   errors.ProductImg = "Required";
                    // }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    handleSubmit(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="container">
                          <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationServer01"
                                className="form-label"
                              >
                                Category
                              </label>
                              <select
                                className="form-select"
                                id="validationServer01"
                                aria-describedby="validationServer01Feedback"
                                name="Category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Category}
                              >
                                <option value="">Choose...</option>
                                {categoryList?.map(function (data, index) {
                                  return (
                                    <option value={data.CategoryCode}>
                                      {data.CategoryName}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.Category &&
                                touched.Category &&
                                errors.Category}
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationServer02"
                                className="form-label"
                              >
                                Product Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationServer02"
                                name="ProductName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ProductName}
                              />
                              {errors.ProductName &&
                                touched.ProductName &&
                                errors.ProductName}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label for="validationSKU" className="form-label">
                              SKU
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer03"
                              name="SKU"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.SKU}
                            />
                            {errors.SKU && touched.SKU && errors.SKU}
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationTextarea"
                              className="form-label"
                            >
                              Description
                            </label>
                            <textarea
                              name="Description"
                              className="form-control"
                              id="validationTextarea"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.Description}
                              placeholder="Enter the description"
                            ></textarea>
                            {errors.Description &&
                              touched.Description &&
                              errors.Description}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label for="validationserver03" class="form-label">
                              Stock Qty
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer03"
                              name="StockQty"
                              aria-describedby="stockqty"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.StockQty}
                            />
                            {errors.StockQty &&
                              touched.StockQty &&
                              errors.StockQty}
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationServer04"
                              className="form-label"
                            >
                              Reorder Qty
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer04"
                              aria-describedby="ReorderQty"
                              name="ReorderQty"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ReorderQty}
                            />
                            {errors.ReorderQty &&
                              touched.ReorderQty &&
                              errors.ReorderQty}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationServer05"
                              className="form-label"
                            >
                              Cost Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer05"
                              aria-describedby="validationServer05"
                              name="CostPrice"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.CostPrice}
                            />
                            {errors.CostPrice &&
                              touched.CostPrice &&
                              errors.CostPrice}
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationServer06"
                              className="form-label"
                            >
                              Selling Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer06"
                              aria-describedby="validationServer06"
                              name="SellingPrice"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.SellingPrice}
                            />
                            {errors.SellingPrice &&
                              touched.SellingPrice &&
                              errors.SellingPrice}
                          </div>
                        </div>
                        <div className="col-xxl-12 col-xl-12 col-md-12 col-sm-12">
                          <label
                              for="validationServer06"
                              className="form-label"
                            >
                              Product Image
                          </label>
                          <input
                          accept=".jpg,.jpeg, .png,"
                          multiple=""
                          type="file"
                          name="ProductImg"
                          className="form-control border "
                          placeholder="Upload product image here..."
                          />
                        </div>
                        <br />
                        <div className="row"></div>
                        <div className="row">
                          <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1"></div>
                          <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                            <button
                              className="btn btn-success  mb-4 rounded-2"
                              type="reset"
                            >
                              Reset
                            </button>
                          </div>
                          <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                            <button
                              class="btn btn-primary  mb-4 rounded-2"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Submit
                            </button>
                          </div>
                          <div className="col -xxl-5 col-xl-5 col-md-5 col-sm-1"></div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
