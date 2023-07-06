import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";

function EditProduct() {
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
                    Category:"",
                    Productname: "",
                    SKU: "",
                    Description: "",
                    StockQty: "",
                    ReorderQty: "",
                    CostPrice: "",
                    SellingPrice: "",
                    ProductImg:"",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.Category) {
                      errors.Category = "Required";
                    }
                    if (!values.Productname) {
                      errors.Productname = "Required";
                    }
                    if (!values.SKU) {
                      errors.SKU = "Required";
                    }
                    if (!values.Description) {
                      errors.addrDescriptioness = "Required";
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
                    if (!values.ProductImg) {
                        errors.ProductImg = "Required";
                    }  
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    alert(JSON.stringify(values));
                    setSubmitting(false);
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
                               required
                               >
                               <option selected disabled value="">
                                 Choose...
                               </option>
                               <option>CategoryCode</option>
                               <option>CategoryName</option>
                             </select>
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
                                required 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationProductname"
                                className="form-label"
                              >
                                SKU 
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationProductname"
                                name="SKU"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.SKU}
                                required
                              />
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
                            >
                              </textarea>
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
                              id="validation server03"
                              name="StockQty"    
                              aria-describedby="stockqty"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.StockQty}
                             />
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
                              aria-describedby="Reorderqty"
                              name="Reorderqty"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.Reorderqty}
                              required
                            />
                          </div>
                        </div>
                        <br />
                        <div className="row"></div>
                        <div className="row">
                          <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1">
                            </div>
                          <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                        <button
                          className="btn btn-success  mb-4 rounded-2"
                          type="reset"
                        >
                          Reset
                        </button>
                        </div>
                        <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                        <button class="btn btn-primary  mb-4 rounded-2" type="button">
                            Update
                        </button>
                        </div>
                        <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1">

                        </div>
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
