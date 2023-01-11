import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"
//import DailyImage from "../components/DailyImage";

const Main = () => {
  const username = useSelector((store) => store.user.username);
  const navigate = useNavigate();
  // const accessToken = useSelector((store) => store.user.accessToken);
  
  // const navigate = useNavigate();

  // useEffect( () => {
  //     if (!accessToken) {
  //         navigate("/login");
  //     }
  // }, []);

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
    <Wrapper>
      <p>User: {username}</p>
      {/* <DailyImage/> */}
      {/* <Link to="/questions"> Post Question Wall </Link> */}
      <button type="button" onClick={goQuestions}> Question wall </button>
      <button type="button" onClick={goUsersCollection}> My collection </button>
      <button type="button" onClick={goAllUsers}> All users </button>
    </Wrapper>
    </>
   ) 
}


export default Main;

const Wrapper = styled.main`
margin: 2%;
@media (min-width: 768px) {
    margin: 10%;
    
  }
`