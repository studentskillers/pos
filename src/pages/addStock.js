import React, { useState, useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";
import { addDoc, getDocs, collection } from "@firebase/firestore";
import { firestore } from "../config/firestore";


function AddStock() {
    const [productList, setProductList] = useState();

    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {
        const ref = collection(firestore, "product_master");
        const prdList = await getDocs(ref);
        setProductList(prdList.docs.map(doc => doc.data()));
        console.log(prdList);
    }


    const[supplierList,setSupplierlist]=useState();

  useEffect(()=>{
    getSupplier()
  },[])

  async function getSupplier(){
    const ref=collection(firestore,"supplier_master");
    const supList=await getDocs(ref);
    setSupplierlist(supList.docs.map(doc=>doc.data()));
  }


    const ref = collection(firestore, "stock_master");
    const handleSubmit = (values) => {
        try {
            if (values !== "" && values !== undefined) {
                addDoc(ref, values)
                alert("added successfully")
            } else {
                alert("enter a valid data");
            }
        } catch (err) {
            console.log(err)
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
                                <h3 class="card-title text-center mb-3">Add Stock </h3>
                                <Formik
                                    initialValues={{
                                        Product: "",
                                        CurrentStock: "10",
                                        SupplierName: "",
                                        AddQty: "",
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.Product) {
                                            errors.Product = "Required";
                                        }
                                        if (!values.CurrentStock) {
                                            errors.CurrentStock = "Required";
                                        }
                                        if (!values.SupplierName) {
                                            errors.SupplierName = "Required";
                                        }
                                        if (!values.AddQty) {
                                            errors.AddQty = "Required";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        handleSubmit(values)
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
                                                                Product
                                                            </label>
                                                            <select
                                                                className="form-select"
                                                                id="validationServer01"
                                                                aria-describedby="validationServer01Feedback"
                                                                name="Product"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.Product}
                                                            >
                                                                <option value="">Choose...</option>
                                                                {productList?.map(function (data, index) {
                                                                    return (
                                                                        <option value={data.SKU}>
                                                                            {data.ProductName}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                            {errors.Product &&
                                                                touched.Product &&
                                                                errors.Product}
                                                        </div>
                                                        <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                            <label
                                                                for="validationServer01"
                                                                className="form-label"
                                                            >
                                                                Current Stock
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="validationserver02"
                                                                name="CurrentStock"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.CurrentStock}
                                                            />
                                                            {errors.CurrentStock &&
                                                                touched.CurrentStock &&
                                                                errors.CurrentStock}
                                                        </div>
                                                        <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                            <label
                                                                for="validationServer03"
                                                                className="form-label"
                                                            >
                                                                Supplier Name
                                                            </label>
                                                            <select
                                                                className="form-select"
                                                                id="validationServer01"
                                                                aria-describedby="validationServer03Feedback"
                                                                name="SupplierName"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.SupplierName}
                                                            >
                                                                <option value=""> Choose...</option>
                                                                {supplierList?.map(function(data,index){
                                                                    return(
                                                                        <option value={data.Phoneno}>
                                                                            {data.Name}
                                                                        </option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {errors.SupplierName &&
                                                                touched.SupplierName &&
                                                                errors.SupplierName}
                                                        </div>
                                                        <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                                                            <label
                                                                for="validationServer04"
                                                                className="form-label"
                                                            >
                                                                Add Qty
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="validationserver04"
                                                                name="AddQty"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.AddQty}
                                                            />
                                                            {errors.AddQty &&
                                                                touched.AddQty &&
                                                                errors.AddQty}
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
                                                                type="submit" disabled={isSubmitting}
                                                            >
                                                                ADD
                                                            </button>
                                                        </div>
                                                        <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                                                            <button class="btn btn-primary  mb-4 rounded-2" type="cancel" >
                                                                CANCEL
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
export default AddStock;