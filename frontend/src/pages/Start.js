import React, { useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import styled from "styled-components"
//import { WelcomeText } from "../GlobalStyles";
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
        <StartContainer>
        <WelcomeText>Welcome to Planet Space</WelcomeText>
          <TextWrapper>
            <StartText> "Did you know there are more stars in space than there are grains of sand in the world?"</StartText>
            <StartTextTwo>Want more space?</StartTextTwo>
            <ButtonStart type="button" onClick={goLogin}> Give me some space 🚀</ButtonStart>
        </TextWrapper> 
        </StartContainer>
   ) 
}
export default Start;








const StartContainer = styled.div`
text-align: center;
margin: 35% 2% 50% 2%;
 /* min-height: 450px;  */
 display: flex;
flex-direction: column; 

@media (min-width: 768px) {
margin: 20% 2% 40% 2%;
  } 

  @media (min-width: 1024px) {
    margin: 10% 2% 7% 2%;
  } 
`
const TextWrapper = styled.div`
margin: 0%;
`

const WelcomeText = styled.h2`
text-align: center;
margin-bottom: 5%;
`

const StartText = styled.p`
font-style: italic;
margin-bottom: 30%;
margin-right: 7%;
margin-left: 7%;



@media (min-width: 768px) {
    margin-bottom: 30%; 
  } 

  @media (min-width: 1024px) {
    margin-bottom: 0%;  
  } 
`

const StartTextTwo = styled.p`
@media (min-width: 768px) {
  } 
`
const ButtonStart = styled.button`
margin-top: 5%;
margin-bottom: 15%;
width: 15rem;
height:40px;
border-radius:25px;
/* box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);    */
justify-content: center;
background-color: #063455;

`





  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };