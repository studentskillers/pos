import React from "react";
import { Formik } from "formik";

function RegistrationPage() {
  return (
    <>
      <div
        class="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center w-100">
            <div class="row justify-content-center w-100">
              <div class="col-md-8 col-lg-6 col-xxl-3">
                <div class="card mb-0">
                  <div class="card-body">
                    <a
                      href="/"
                      class="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width="180"
                        alt=""
                      />
                    </a>
                    <p class="text-center">Sign Up</p>
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmpassword: "",
                      }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                          errors.name = "Required";
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
                        if (!values.password) {
                          errors.password = "Required";
                        }
                        if (!values.confirmpassword) {
                          errors.confirmpassword = "Required";
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
                            <div class="mb-3">
                              <label for="exampleInputtext1" class="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="exampleInputtext1"
                                aria-describedby="textHelp"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                            </div>
                            <div class="mb-3">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Email Address
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
                            <div class="mb-4">
                              <label
                                for="exampleInputPassword1"
                                class="form-label"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                            </div>
                            <div class="mb-4">
                              <label
                                for="exampleInputPassword1"
                                class="form-label"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                              />
                            </div>
                            <div className="row">
                              <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-1"></div>
                              <div className="col-xxl-4 col-xl-4 col-md-4 col-sm-5">
                                <button
                                  className="btn btn-success  mb-4 rounded-2"
                                  type="button"
                                  disabled={isSubmitting}
                                >
                                  Register
                                </button>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-md-4 col-sm-5">
                                <button
                                  class="btn btn-primary  mb-4 rounded-2"
                                  type="button"
                                >
                                  Cancel
                                </button>
                              </div>
                              <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-1"></div>
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
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;
