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
      
      <StartPage>
        <StartContainer>
          <>
          "Did you know there are more stars in space than there
           are grains of sand in the world?"
           </>
          <h2>Want to learn more?</h2>
          <button type="button" onClick={goLogin}> Login </button>
          <button type="button" onClick={goRegister}> Register </button>
      </StartContainer>
      </StartPage>
    </Wrapper>
      
   ) 
}

export default Start;




const Wrapper = styled.main`
margin: 2%;
@media (min-width: 768px) {
    margin: 10%;
  }
`
const StartContainer = styled.div`
`
const StartPage = styled.div`
/* background-image: url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
text-align: center;
height: 100%; */
`