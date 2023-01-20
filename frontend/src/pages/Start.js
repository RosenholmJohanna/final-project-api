import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"
// import Lottie from 'react-lottie';
// import animationData from '../lotties/lottiespace';



const Start = () => {
const navigate = useNavigate();
  
  useEffect(() => {
  });

  const goLogin = () => {
    navigate("/Login")
  }

  return(
    <Wrapper>
        <StartContainer>
          <TextWrapper>
            <StartText> "Did you know there are more stars in space than there are grains of sand in the world?"</StartText>
            <StartTextTwo>Want more space?</StartTextTwo>
            <ButtonStart type="button" onClick={goLogin}> Give me some space 🚀</ButtonStart>
        </TextWrapper> 
        </StartContainer>
    </Wrapper>
   ) 
}

export default Start;





const Wrapper = styled.main`
/* background: url("https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
background-size: cover; */
`
const StartContainer = styled.div`
text-align: center;
margin-top: 50%;
 min-height: 450px; 
 display: flex;
flex-direction: column; 

@media (min-width: 768px) {
    margin-top: 10%;
  } 
`
const TextWrapper = styled.div`
margin: 5%;
`

const StartText = styled.p`

`

const StartTextTwo = styled.p`
`
const ButtonStart = styled.button`
border-style: none;
text-align: center;
width: 60%;
height:40px;
border-radius:25px;
margin-bottom: 0;
color: white;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
background-color: transparent;
 
@media (min-width: 768px) {
    width: 20%;
  } 
`







  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };