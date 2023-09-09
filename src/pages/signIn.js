import React from "react";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'

function SignIn() {
  const auth = getAuth();
  const navigate = useNavigate(); //using for navigate 

  const login=(formData)=>{

    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if(user.uid){
        console.log("user-->",user);
        sessionStorage.setItem("uid",user.uid); //set uid in session storage
        sessionStorage.setItem("accessToken",user.accessToken); //set accessToken in session storage
        
        navigate("/")
      }else{
        alert("enter valid emailid and password");
      }
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(error)
      if(error){
        alert("enter valid emailid and password"); 
        console.log(error)
      }
      
    });

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
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width="180"
                        alt=""
                      />
                    </a>
                    <p className="text-center">Sign In</p>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        )
                          if (!values.password) {
                            errors.password = "Required";
                          }
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        // alert(JSON.stringify(values));
                        login(values)
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
                            <div className="mb-3">
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
                            <div className="mb-4">
                              <label
                                for="exampleInputPassword1"
                                className="form-label"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input primary"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckChecked"
                                  checked
                                />
                                <label
                                  className="form-check-label text-dark"
                                  for="flexCheckChecked"
                                >
                                  Remember this Device
                                </label>
                              </div>
                              <a
                                className="text-primary fw-bold"
                                href="./index.html"
                              >
                                Forgot Password ?
                              </a>
                            </div>
                           

                            <div className="col-xxl-12 col-xl-12 col-md-12 col-sm-12">
                                <button
                                  className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                   Sign In
                                </button>
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

export default SignIn;
