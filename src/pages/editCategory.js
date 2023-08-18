import React, { useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import {addDoc,getDocs,collection} from "@firebase/firestore";
import { firestore } from "../config/firestore";

function EditCategory() {
    
    const db=collection(firestore,"category_master");

    const handleSubmit=(values)=>{
        try{
            if(values!=""&&values!=undefined){
                addDoc(db,values)
                alert("added successfully")
            }else{
              alert("enter valid data");
            }  
        }catch(err){
           console.log(err)
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
                <SideMenu></SideMenu>


                  <div className="body-wrapper">
                    <TopBar></TopBar>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <h3 class="card-title text-center mb-3">Edit Category </h3>
                                <Formik
                                    initialValues={{
                                        CategoryName: "",
                                        CategoryCode: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.CategoryName) {
                                            errors.CategoryName = "Required";
                                        }
                                        if (!values.CategoryCode) {
                                            errors.CategoryCode = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
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
                                                                Category Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="validationserver01"
                                                                name="CategoryName"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.CategoryName}
                                                            />
                                                            {errors.CategoryName && touched.CategoryName && errors.CategoryName}
                                                        </div>
                                                        <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                            <label
                                                                for="validationServer01"
                                                                className="form-label"
                                                            >
                                                                Category Code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="validationserver02"
                                                                name="CategoryCode"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.CategoryCode}
                                                            />
                                                             {errors.CategoryCode && touched.CategoryCode && errors.CategoryCode}
                                                        </div>
                                                    </div>
                                                        <br/>
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
                                                                <button class="btn btn-primary  mb-4 rounded-2" type="submit" disabled={isSubmitting}>
                                                                    Submit
                                                                </button>
                                                            </div>
                                                            <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-1">
                                                            </div>
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
    )
};
export default EditCategory;