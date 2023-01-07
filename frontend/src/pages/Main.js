import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"
import DailyImage from "../components/DailyImage";


const Main = () => {
  //const dispatch = useDispatch();
  const username = useSelector((store) => store.user.username);
  const navigate = useNavigate();
  
  
  // useEffect(() => {
  // });

  const goQuestions = () => {
  navigate("/questions")
  }
  const goUsersCollection = () => {
    navigate("/collection")
    }
  const goAllUsers = () => {
    navigate("/allUsers")
    }

  return(
    <>  
      <p>User: {username}</p>
      <DailyImage/>
      {/* <Link to="/questions"> Post Question Wall </Link> */}
      <button type="button" onClick={goQuestions}> Questions </button>
      <button type="button" onClick={goUsersCollection}> My saved post and images </button>
      <button type="button" onClick={goAllUsers}> See all users </button>
    </>
   ) 
}


export default Main;

