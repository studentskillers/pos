import React from "react";
import { useState } from "react";
import SideMenu from "./sideMenu";
import TopBar from "./topBar";
import moment from "moment";
import products from "../products.jpg";

function PointOnSales() {
  const time = moment().format("MMMM Do dddd YYYY");
  const [curTime, setCurTime] = useState("");
  const productList = [
    {
      id: 1,
      title: "Product 1",
      price: 200,
    },
    {
      id: 2,
      title: "Product 2",
      price: 300,
    },
    {
      id: 3,
      title: "Product 3",
      price: 400,
    },
    {
      id: 4,
      title: "Product 4",
      price: 500,
    },
    {
      id: 5,
      title: "Product 5",
      price: 600,
    },
    {
      id: 6,
      title: "Product 6",
      price: 700,
    },
    {
      id: 7,
      title: "Product 7",
      price: 800,
    },
    {
      id: 8,
      title: "Product 8",
      price: 900,
    },
  ];

  const [proList, setProlist] = useState(productList);
  console.log(proList);

  // const showtime = () => {
  //     setCurTime(time);
  // }

  // setInterval(() => {
  //     showtime();
  //   }, 1000);

  const cartArr = [];

  const cartFun = (id, title, price, quantity) => {
    var cartObj = {
      productId: id,
      title: title,
      price: price,
      quantity: quantity,
    };
    cartArr.push(cartObj);
    // console.log(cartArr);
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
            <div className="row mb-2">
              {/* Products Content Page Start */}
              <div className="col-8">
                <div className="row mb-2">
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                  <div className="col-2 ml-1 mt-2">
                    <a className="btn btn-primary">Categories</a>
                  </div>
                </div>
                <div className="row">
                  {proList.map(function (list, index) {
                    return (
                      <>
                        <div className="col-xxl-2 col-xl-2 col-md-4 col-sm-6 ml-1" id="Product1">
                          <div
                            className="card"
                            onClick={cartFun(1, "Product 1", 200)}
                          >
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
                  <div className="col-9">
                    <h2>Current Order</h2>
                  </div>
                  <div className="col-3">
                    <h1>***</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
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
                      {cartArr.map(function (data, index) {
                        <tr key={index}>
                          <td>{data.title}</td>
                          <td>{data.price}</td>
                          <td>{data.quantity}</td>
                          <td>{data.price}</td>
                        </tr>;
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
                          <h5 className="card-text text-dark col-10">Total</h5>
                          <h5 className="text-end col-2">$4</h5>
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
