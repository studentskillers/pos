import React from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import { Formik } from "formik";

//const Product=[];
function AddStock() {
    const Products=[
       {
           ProductId:"001",
            ProductSku:"SH001",
            ProductName:"Sample1",
            ProductCategory:"xyz",
        },
        {
            ProductId:"002",
            ProductSku:"SH001",
            ProductName:"Sample2",
            ProductCategory:"xxxyyyzzz",
        },
    ];   
    //const Supplier=[
      //{
       // SupplierId:1,
       // Name:"ZYX",
        ///Phoneno:"123345566",
        //Address:"abcd",
        //City:"efgh",
        //State:"ijkl",
      //},
      //{
        //SupplierId:2,
        //Name:"WVU",
        //Phoneno:"098787654",
        //Address:"mnop",
        //City:"qrst",
        //State:"uvwx",
      //},
//];
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
                                                                Product
                                                            </label>
                                                            <select>
                                                                {Products.map(function(item,index){
                                                                    <option value={item.ProductId}>
                                                                        {item.ProductName}
                                                                    </option>
                                                                })};
                                                            </select>
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
                                                                required
                                                            />
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
                                                                required
                                                            >
                                                                <option selected disabled value="">
                                                                    Choose...
                                                                </option>
                                                                <option>Supplier State </option>
                                                                <option>Supplier City</option>
                                                                <option>Supplier Id</option>
                                                            </select>
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
                                                                ADD
                                                            </button>
                                                        </div>
                                                        <div className="col-xxl-1 col-xl-1 col-md-1 col-sm-5">
                                                            <button class="btn btn-primary  mb-4 rounded-2" type="submit" disabled={isSubmitting}>
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