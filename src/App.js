import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // using for routing
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from './pages/homePage';
import ContactPage from './pages/contactPage';
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





function App() {



  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/addcustomer' element={<AddCustomer/>} />
        <Route path='/addcategory' element={<AddCategory/>} />        
        <Route path='/addproduct' element={<AddProduct/>} />        
        <Route path='/addstock' element={<AddStock/>} />
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
       </Routes>
    </BrowserRouter>
  );
}
export default App;