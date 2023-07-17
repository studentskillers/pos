import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import { firestore } from "../config/firestore";
import { addDoc, collection } from "@firebase/firestore";

function AddCustomer() {
  //function calling la doubts iruku! values,name,onchange la doubts iruku
  // doubts finshed
  const ref = collection(firestore, "customer_master");
  const [formData, setFormData] = useState({
    country: "",
    city: "",
  });
  const countryUrl = "https://countriesnow.space/api/v0.1/countries"; //country api link
  const [countryList, setCountryList] = useState();
  const [cityList, setCityList] = useState();

  //useEffect is used for execute once to countryList state variable
  useEffect(() => {
    axios.get(countryUrl).then((response) => {
      setCountryList(response.data.data);
    });
  }, []);

  //this useEffect is for making our selecting countries, state to display
  useEffect(() => {
    countryList?.map((cList) => {
      if (cList.country === formData.country) {
        setCityList(cList.cities);
      }
    });
  }, [formData.country]);

  const handleCountryCity=(e)=>{
    const {name,value}=e.currentTarget;
    setFormData((prevFormData)=>({
      ...prevFormData,
      [name]: value
    }));
    //console.log(formData);
  }

  const handleClick = (values) => {
    console.log("Submit button clicked");
    try {
      if (values && Object.keys(formData).length !== 0){
        console.log(values,formData);
        addDoc(ref, {...values, ...formData});
        alert("added successfully");
      } else {
        alert("error");
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
                <h2 className="card-title text-center mb-3">Add customer</h2>
                <Formik
                  initialValues={{
                    fullname: "",
                    phoneno: "",
                    email: "",
                    address: "",
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
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values));
                    handleClick(values);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    handleBlur,
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
                              />
                              {errors.fullname &&
                                touched.fullname &&
                                errors.fullname}
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
                              />
                              {errors.phoneno &&
                                touched.phoneno &&
                                errors.phoneno}
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
                              <label
                                for="validationTextarea"
                                className="form-label"
                              >
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
                              >
                                {errors.address &&
                                  touched.address &&
                                  errors.address}
                              </textarea>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationServer03"
                                className="form-label"
                              >
                                Country
                              </label>
                              <select
                                className="form-select"
                                id="validationServer04"
                                aria-describedby="validationServer04Feedback"
                                name="country"
                                onChange={handleCountryCity}
                                onBlur={handleBlur}
                                value={formData.country}
                                required
                              >
                                {countryList?.map(function (
                                  countryData,
                                  index
                                ) {
                                  return (
                                    <>
                                      <option
                                        key={countryData.iso3}
                                        value={countryData.country}
                                      >
                                        {countryData.country}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                              <label
                                for="validationServer04"
                                className="form-label"
                              >
                                City
                              </label>
                              <select
                                className="form-select"
                                id="validationServer04"
                                aria-describedby="validationServer04Feedback"
                                name="city"
                                onChange={handleCountryCity}
                                onBlur={handleBlur}
                                value={formData.city}
                                required
                              >
                                {cityList?.map(function (cityData, index) {
                                  return (
                                    <>
                                      <option key={cityData} value={cityData}>
                                        {cityData}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <br />
                          <div className="row"></div>
                          <div className="row">
                            <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1"></div>
                            <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                              <button className="btn btn-success  mb-4 rounded-2" type="reset">
                                Reset
                              </button>
                            </div>
                            <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                              <button
                                className="btn btn-primary  mb-4 rounded-2"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Submit
                              </button>
                            </div>
                            <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1"></div>
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

export default AddCustomer;
