import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";

function EditCategory() {
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
                <h2 className="card-title text-center mb-3">Edit customer</h2>
                <Formik
                  initialValues={{
                    CategoryName:"",
                    CategoryCode:"",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.CategoryName) {
                      errors.CategoryName = "Required";
                    }
                    if (!values.CategoryCode) {
                      errors.CategoryCode = "Required";
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
                                Category Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationServer01"
                                name="CategoryName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.CategoryName}
                                required
                              />
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationCustomUsername"
                                className="form-label"
                              >
                                Category Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                name="CategoryCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.CategoryCode}
                                required
                              />
                            </div>
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

export default EditCategory;
