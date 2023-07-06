import React from 'react';
import logo from './logo.svg';
import './App.css';

function showTitle(title2) {
  return title2;
}

function simpleFun(induct) {
  return induct;
 }

function App() {

  const title = "ARUN";

  const welcomMessage = {
    name: "Arun",
    age: "21"
  }

  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Leo Messi',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Cristiono',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchitem, setSearchitem] = React.useState("SKGS"); //state variable declare
  const searchFun = (e) => {
    console.log(e.target.value);
    setSearchitem(e.target.value);
  }


  const numbers = [1, 4, 9, 16];
  const newNumbers = numbers.map(function (number) {
    return number * 2;
  });

  console.log(newNumbers);

  const world="Arunachalam";

  
      


  

  return (
    <div className="App">

      {/* loading value from variable */}
      <h1>Hello {world} </h1>

      <h1>Hello {simpleFun("Sridhar")} </h1>

      <h2>{welcomMessage.name} {welcomMessage.age}</h2>

      <input type="text" name='search' placeholder='search name' onChange={searchFun} />

      <h3>Name: {searchitem}</h3>

      <h1>List Example</h1>
      
      <div>
        {list.map(function (data,index) {
          return <div key={index}>{data.author}</div>;
        })}

      </div>

    </div>
  );
    }

export default App;
