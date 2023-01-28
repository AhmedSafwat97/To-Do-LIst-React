import React from "react";
import "../App.css";
import "./Theme.css";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import { useReducer } from 'react';
import { useContext } from "react";
import Context from "../Context/Context";

// const initialData = {
//     Theme : "Light" ,
//     Name : "Ahmed Safwat" ,
//     Age : "26"
// }

// const reducer = (state , action) =>{
//     switch (action.type) {
//       case "CHANGE_THEME":
//         return {...state , Theme : action.newValue}

//         case "CHANGE_NAME" :
//           return {...state , Name : action.newValue}

//           case "CHANGE_AGE" :
//           return {...state , Age : action.newValue}
//       default:
//         return state
//     }
//   }

const Theme = () => {
  // const [Theme, setTheme] = useState("");
  // const [MoodName, setMoodName] = useState("Dark Mood");

  // const [Data , dispatch] = useReducer(reducer, initialData)

  const { Theme, toggleTheme, Name, changeName, Age, changeAge } =
    useContext(Context);

  return (
    <div className={`Themes ${Theme}`}>
      <Link to="/" style={{ fontSize: "25px", margin: "20px" }}>
        Home
      </Link>

      <h1> hello from app .js</h1>
      {/* <button onClick={
          ()=>{setTheme("dark")}
      }>Dark</button>
      <button 
      onClick={
        ()=>{setTheme("Light")}
    }
      >Light</button>
      <button     onClick={
        ()=>{setTheme("Red")}
    } >Red</button>
       */}

      <div>
        <input
          id="toggle"
          className="toggle"
          type="checkbox"
          role="switch"
          name="toggle"
          defaultValue="on"
          onChange={() => {
            toggleTheme(Theme === "Light" ? "dark" : "Light");
          }}
        />
        <label className="toggle-switch" for="toggle">
          Change Mood
        </label>
      </div>

      {/* Change Name */}
      <button
        onClick={() => {
          changeName("Abdullrahman Gamal");
        }}
      >
        Change Name
      </button>
      <h2>My Name Is : {Name}</h2>

      {/* Change Age */}
      <button
        onClick={() => {
          changeAge("45 Years Old");
        }}
      >
        Change Name
      </button>
      <h2>I'm {Age}</h2>

      {/* ======================================== */}
      {/* Dark Mood using use reducer */}
      {/*   
          <button onClick={() => {
          dispatch({
            type : "CHANGE_THEME" , 
            newValue : Data.Theme === "Light"? "dark" : "Light"
          } 
          )
          }} >Change color</button>
  
          {/* Change Name */}
      {/* <button onClick={() => { dispatch(
            {type : "CHANGE_NAME" , newValue : "Mahmoud Alaa" } 
          )}} >Change Name</button>
          <h2>My Name Is : {Data.Name}</h2>
  
  
  
                  {/* Change Age */}
      {/* <button onClick={() => { dispatch(
            {type : "CHANGE_AGE" , newValue : "45" } 
          )}} >Change Age</button>
          <h2>My Age Is : {Data.Age}</h2> */}
    </div>
  );
};

export default Theme;
