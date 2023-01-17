import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"

const Start = () => {
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
    <Wrapper>
        <StartContainer>
          <>
          "Did you know there are more stars in space than there
           are grains of sand in the world?"
           </>
          <h3>Want more space?</h3>
          <button type="button" onClick={goLogin}> Login </button>
          <button type="button" onClick={goRegister}> Register </button>
      </StartContainer>
    </Wrapper>
   ) 
}

export default Start;





const Wrapper = styled.main`
margin: 2%;

/* @media (min-width: 768px) {
    margin: 10%;
  } */
`
const StartContainer = styled.div`
border: 2px solid white;
text-align: center;
text-align: center; 
`