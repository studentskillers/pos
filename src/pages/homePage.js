
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // using for routing
import moment from 'moment'
import SideMenu from './sideMenu';
import TopBar from './topBar';

function showTitle(title2) {
  return title2;
}

function HomePage() {

  const title = "ARUN";
  const currentDate = moment().format('DD/MM/YYYY');
  const [curDate, setCurdate] = useState(currentDate);
  const [curTime, setCurtime] = useState("00:00:00");
  const [userlist, setUserlist] = useState();


  const welcomMessage = {
    name: "Arun",
    age: "21"
  }

  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchitem, setSearchitem] = React.useState("SKGS"); //state variable declare

  const [uname, setUname] = useState("Sridhar");

  const searchFun = (e) => {
    console.log(e.target.value);
    setSearchitem(e.target.value);
  }


  const numbers = [1, 4, 9, 16];
  const newNumbers = numbers.map(function (number) {
    return number * 2;
  });

  console.log(newNumbers);


  const showtime = () => {
    const currentDate = moment().format('HH:mm:ss');
    setCurtime(currentDate);
  }

  setInterval(() => {
    showtime();
  }, 1000);



  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <SideMenu></SideMenu>
        {/* <!--  Main wrapper --> */}
        <div className="body-wrapper">
          <TopBar></TopBar>

          <div className="container-fluid">


            <h1>Home Page</h1>
            
            {/* loading value from variable */}
            <h1>{curDate}</h1>
            <h2>{curTime}</h2>
            <h1>Hello {title} </h1>

            <h1>Hello {showTitle("Sridhar")} </h1>

            <h2>{welcomMessage.name} {welcomMessage.age}</h2>

            <input type="text" name='search' placeholder='search name' onChange={searchFun} />

            <h3>Name: {searchitem}</h3>

            <h1>List Example</h1>

            <div>
              {list.map(function (data, index) {
                return <div key={index}>{data.author}</div>;
              })}

            </div>


          </div>
        </div>
      </div>
    </>

  );
}

export default HomePage;