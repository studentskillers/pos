import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import { firestore } from "../config/firestore";
import { addDoc, collection } from "@firebase/firestore";

function AddSupplier() {
  const ref = collection(firestore, "supplier_master");
  const [formData, setFormData] = useState({
    country: "",
    city: "",
  });
  const countryUrl = "https://countriesnow.space/api/v0.1/countries";
  const [countryList, setCountryList] = useState();
  const [cityList, setCityList] = useState();

  useEffect(() => {
    axios.get(countryUrl).then((response) => {
      setCountryList(response.data.data);
    });
  }, []);

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
                <h2 className="card-title text-center mb-3">Add Supplier</h2>
                <Formik
                  initialValues={{
                    Name: "",
                    Phoneno: "",
                    Email: "",
                    Address: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.Name) {
                      errors.Name = "Required";
                    }
                    if (!values.Phoneno) {
                      errors.Phoneno = "Required";
                    }
                    if (!values.Email) {
                      errors.Email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.Email
                      )
                    ) {
                      errors.Email = "Invalid email address";
                    }
                    if (!values.Address) {
                      errors.Address = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    handleClick(values);
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
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationServer01"
                                name="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Name}
                              />
                              {errors.Name &&
                                touched.Name &&
                                errors.Name}
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
                                name="Phoneno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Phoneno}
                              />
                              {errors.Phoneno &&
                                touched.Phoneno &&
                                errors.Phoneno}
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
                                name="Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Email}
                              />
                              {errors.Email && 
                              touched.Email &&
                               errors.Email}
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
                                name="Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Address}
                                placeholder="Enter the current address"
                              >
                                {errors.Address &&
                                  touched.Address &&
                                  errors.Address}
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

export default AddSupplier;
