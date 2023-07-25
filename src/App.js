import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // using for routing
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from './pages/dashboard';
import AddCustomer from './pages/addCustomer';
import ManageCustomer from './pages/manageCustomer';
import EditCustomer from './pages/editCustomer';
import SignIn from './pages/signIn';
import RegistrationPage from './pages/registrationPage';
import ManageUser from './pages/manageUser';
import PointOnSales from './pages/pointOnSales';
import AddCategory from './pages/addCategory';
import AddProduct from './pages/addProduct';
import AddStock from './pages/addStock';
import EditCategory from './pages/editCategory';
import EditProduct from './pages/editProduct';
import ManageCategory from './pages/manageCategory';
import ManageProduct from './pages/manageProduct';
import ManageStock from './pages/manageStock';
import AddSupplier from './pages/addSupplier';
import ManageSupplier from './pages/manageSupplier';




function App() {



  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/addcustomer' element={<AddCustomer/>} />
        <Route path='/addcategory' element={<AddCategory/>} />        
        <Route path='/addproduct' element={<AddProduct/>} />        
        <Route path='/addstock' element={<AddStock/>} />
        <Route path='/managestock' element={<ManageStock/>} />
        <Route path='/managecustomer' element={<ManageCustomer/>} />
        <Route path='/editcustomer' element={<EditCustomer/>} />       
        <Route path='/editcategory' element={<EditCategory/>} />
        <Route path='/editproduct' element={<EditProduct/>} />       
        <Route path='/managecategory' element={<ManageCategory/>} /> 
        <Route path='/manageproduct' element={<ManageProduct/>} /> 
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/registration' element={<RegistrationPage/>} />
        <Route path='/manageuser' element={<ManageUser/>} />
        <Route path='/pointonsales' element={<PointOnSales/>} />
        <Route path='/addsupplier' element={<AddSupplier/>}/>
        <Route path='/managesupplier' element={<ManageSupplier/>}/>
       </Routes>
    </BrowserRouter>
  );
}
export default App;