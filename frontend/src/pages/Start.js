import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"


const Start = () => {
  //const username = useSelector((store) => store.user.username);
  const navigate = useNavigate();
  

  useEffect(() => {
  });

  const goLogin = () => {
    navigate("/Login")
  }

  const goRegister = () => {
    navigate("/Register")
  }

  return(
    <StartPage>
    <StartContainer>
    <h3>"Did you know there are more stars in space than there are grains of sand in the world?"</h3>
    <h5>Want to learn more?</h5>
      <button type="button" onClick={goLogin}> Login </button>
      <button type="button" onClick={goRegister}> Register </button>
      </StartContainer>
     </StartPage>
   ) 
}


export default Start;

const StartPage = styled.section`
text-align: center;
margin-top: 20%;
`

const StartContainer = styled.p`

`