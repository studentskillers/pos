import React from "react";
import { useState, useEffect } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import moment from "moment";
import products from "../products.jpg";
import { firestore } from "../config/firestore";
import { getDocs, collection } from "@firebase/firestore";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CustomerModal from "./customerModal";

function PointOnSales() {
  const time = moment().format("MMMM Do dddd YYYY");
  const [curTime, setCurTime] = useState("");
  const ref = collection(firestore, "customer_master");
  const codeRef = collection(firestore, "category_master");
  const [categoryCode, setCategoryCode] = useState();
  const [customerList, setCustomerList] = useState();
  const [proList, setProlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [cartArr, setCartArr] = useState([]);
  const productList = [
    {
      id: 1,
      title: "Rolex",
      price: 2000,
    },
    {
      id: 2,
      title: "Harley",
      price: 30000,
    },
    {
      id: 3,
      title: "BMW",
      price: 40000,
    },
    {
      id: 4,
      title: "Bracelet",
      price: 400,
    },
    {
      id: 5,
      title: "Chain",
      price: 600,
    },
    {
      id: 6,
      title: "Tomato",
      price: 100,
    },
    {
      id: 7,
      title: "Potato",
      price: 70,
    },
    {
      id: 8,
      title: "Carrot",
      price: 50,
    },
  ];

  useEffect(() => {
    setProlist(productList);
    setInitialLoad(false);
  }, []);

  // const showtime = () => {
  //     setCurTime(time);
  // }

  // setInterval(() => {
  //     showtime();
  //   }, 1000);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


 

  const cartFun = (id, title, price) => {
    const existingIndex = cartArr.findIndex((item) => item.productId === id);
  
    if (existingIndex !== -1) {
      // Product already exists, update its quantity
      const updatedCartArr = [...cartArr];
      updatedCartArr[existingIndex].quantity += 1;
  
      setCartArr(updatedCartArr);
    } else {
      // Product doesn't exist, add it to the cart
      const cartObj = {
        productId: id,
        title: title,
        price: price,
        quantity: 1,
      };
      setCartArr((prevCartArr) => [...prevCartArr, cartObj]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartArr) {
      total += item.price * item.quantity;
    }
    return total;
  };

  async function getCustomer() {
    const cusList = await getDocs(ref);
    setCustomerList(cusList.docs.map((doc) => doc.data()));
    console.log(customerList);
  }

  async function getCategoryCode() {
    const codeList = await getDocs(codeRef);
    setCategoryCode(codeList.docs.map((doc) => doc.data()));
    console.log(categoryCode);
  }

  useEffect(() => {
    getCustomer();
    getCategoryCode();
    setCustomerList();
  }, []);

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
            <div className="row mb-2">
              {/* Products Content Page Start */}
              <div className="col-8">
                <div className="row mb-2">
                {categoryCode?.map(function (data, index) {
                    return (
                  <div className="col-2 ml-1 mt-2" key={index}>
                    <a className="btn btn-primary align-self-center">{data.CategoryName}</a>
                  </div>
                  )})}
                </div>
                <div className="row">
                  {proList.map(function (list, index) {
                    return (
                      <>
                        <div
                          className="col-xxl-2 col-xl-2 col-md-4 col-sm-6 ml-1"
                          id={`Product${list.id}`}
                          onClick={() =>
                            cartFun(
                              list.id,
                              list.title,
                              list.price,
                              list.quantity
                            )
                          }
                          key={list.id}
                        >
                          <div className="card">
                            <img
                              src={products}
                              className="card-img-top"
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">{list.title}</h5>
                              <h5>{list.price}</h5>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {/* Products Content Page End */}
              <div className="col-4">
                <div className="row">
                  <div className="col-10">
                    <select
                      className="form-select mb-3"
                      id="validationServer04"
                      aria-describedby="validationServer04Feedback"
                      name="customerName"
                      required
                    >
                      <option value="">Choose a customer...</option>
                      {customerList?.map(function (data, index) {
                        return (
                          <>
                            <option key={index} value={data.fullname}>
                              {data.fullname} - {data.phoneno}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-2">
                    <PersonAddAlt1Icon
                      color="primary"
                      fontSize="large"
                      onClick={handleOpen}
                    />
                  </div>
                  {initialLoad ? null : (
                    <CustomerModal open={open} handleClose={handleClose} />
                  )}
                </div>
                <div className="row">
                  <div className="col">
                    <h4>
                      Date:
                      {/* {curTime} */}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <table className="table table-striped table-responsive">
                    <thead>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </thead>
                    <tbody>
                      {Array.isArray(cartArr) &&
                        cartArr.map(function (data, index) {
                          return (
                            <tr key={index}>
                              <td>{data.title}</td>
                              <td>{data.price}</td>
                              <td>
                                -
                                 {data.quantity} 
                                +
                              </td>
                              <td>{data.price * data.quantity}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12 mr-1">
                    <div className="card border-secondary mb-3">
                      <div className="card-body text-secondary">
                        <div className="row">
                          <h5 className="card-text text-secondary col-10">
                            Cash
                          </h5>
                          <h5 className="text-end col-2">$12</h5>
                        </div>
                        <div className="row">
                          <h5 className="card-text text-secondary col-10">
                            Tax
                          </h5>
                          <h5 className="text-end col-2">$2</h5>
                        </div>
                        <div className="row">
                          <h5 className="card-text text-secondary col-10">
                            Discount
                          </h5>
                          <h5 className="text-end col-2">$4</h5>
                        </div>
                        <h5 className="card-text text-secondary">
                          -----------------------------------------
                        </h5>
                        <div className="row">
                          <h5 className="card-text text-dark col-7">Total</h5>
                          <h5 className="text-end col-5">${calculateTotal()}</h5>
                        </div>
                      </div>
                      <div className="card-header"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="p-3 m-3 bg-primary text-white rounded col-11">
                    Continue to payment
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

export default PointOnSales;
