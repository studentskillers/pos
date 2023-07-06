import React, { useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";

function EditCustomer() {

  const stateArr=[
    {
      stateName: "Tamilnadu",
      stateCode: "TN",
    },
    {
      stateName: "Bihar",
      stateCode: "BR",
    },
    {
      stateName: "Delhi",
      stateCode: "DL",
    },
    {
      stateName: "Kerala",
      stateCode: "KL",
    }
    ];

    const [stateObj,setStateobj] =useState(stateArr);

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
                    fullname: "",
                    phoneno: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.fullname) {
                      errors.fullname = "Required";
                    }
                    if (!values.phoneno) {
                      errors.phoneno = "Required";
                    }
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    if (!values.address) {
                      errors.address = "Required";
                    }
                    if (!values.city) {
                      errors.city = "Required";
                    }
                    if (!values.state) {
                      errors.state = "Required";
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
                                Fullname
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationServer01"
                                name="fullname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullname}
                                required
                              />
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationCustomUsername"
                                className="form-label"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                id="validationCustomUsername"
                                name="phoneno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneno}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="exampleInputEmail1"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label for="validationTextarea" class="form-label">
                              Address
                            </label>
                            <textarea
                              className="form-control"
                              id="validationTextarea"
                              name="address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address}
                              placeholder="Enter the current address"
                            ></textarea>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationServer03"
                              className="form-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationServer03"
                              aria-describedby="validationServer03Feedback"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                              required
                            />
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                            <label
                              for="validationServer04"
                              className="form-label"
                            >
                              State
                            </label>
                            <select
                              className="form-select"
                              id="validationServer04"
                              aria-describedby="validationServer04Feedback"
                              name="state"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.state}
                              required
                            >
                              <option selected disabled value="">
                                Choose...
                              </option>
                              {stateObj.map(function(data,index){
                              return <option value={data.stateCode}>{data.stateName}</option>
                              })}
                            </select>
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

export default EditCustomer;
