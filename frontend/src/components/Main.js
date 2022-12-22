import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"
import DailyImage from "./DailyImage";


const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
  });

  const goQuestions = () => {
  navigate("/questions")
  }

  //const dispatch = useDispatch();
  const username = useSelector((store) => store.user.username);

  return(
    <>
      <h3>Main (userpage) component!</h3>
      <h4>Welcome {username}</h4>
      <p>Navigate to: /questions</p>
      {/* <Link to="/questions"> Post Question Wall </Link> */}
      <button type="button" onClick={goQuestions}> Questions </button>
      
       <DailyImage/>    
    </>
   ) 
}


export default Main;

