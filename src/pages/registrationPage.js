import React from "react";
import { Formik } from "formik";
import { firestore } from "../config/firestore";
import { addDoc, collection } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'

function RegistrationPage() {
  const navigate = useNavigate(); //using for navigate 
  const ref=collection(firestore,"user_master");
  const auth = getAuth();

  const handleClick=(values)=>{
    try{
      if(values!==0){

        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("user--->",user.uid);
          values.uid=user.uid;
          addDoc(ref,values); //store data in user_master collection in firebase
          navigate("/signin") //redirect to login page
          alert("submitted");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

        
      }else{
        alert("error");
      }
    }catch(err){
      console.log('Error adding document: ', err);
    }

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
                      href="/"
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
                        } else if (values.password !== values.confirmpassword) {
                          errors.confirmpassword = 'Passwords do not match';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log(JSON.stringify(values));
                        handleClick(values);
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
                              <label for="exampleInputtext1" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputtext1"
                                aria-describedby="textHelp"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                              <span className="text-danger">                                
                              {errors.name && touched.name && errors.name}
                              </span>
                            </div>
                            <div className="mb-3">
                              <label
                                for="exampleInputEmail1"
                                className="form-label"
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
                              <span className="text-danger">
                              {errors.email && touched.email && errors.email}
                              </span>
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
                              <span className="text-danger">
                              {errors.password && touched.password && errors.password}
                              </span>
                            </div>
                            <div className="mb-4">
                              <label
                                for="exampleInputPassword1"
                                className="form-label"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                              />
                              <span className="text-danger">
                              {errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
                              </span>
                            </div>
                            <div className="row">
                              <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-1"></div>
                              <div className="col-xxl-4 col-xl-4 col-md-4 col-sm-5">
                                <button
                                  className="btn btn-success  mb-4 rounded-2"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  Register
                                </button>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-md-4 col-sm-5">
                                <button
                                  className="btn btn-primary  mb-4 rounded-2"
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
