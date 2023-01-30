import React from "react";
import styled from "styled-components";
import DailyImage from '../../components/nasaAPI/DailyImage';


const Main = () => {

  return(
    <>  
      <MainWrapper>  
      <DailyImage />   
      </MainWrapper>   
    </>
   ) 
}

export default Main;



const MainWrapper = styled.main`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
margin: 2%;
margin-bottom: 15%;

  @media (min-width: 768px) {
    margin: 15%;
  } 
    
  @media (min-width: 1024px) {
    margin: 5%;
  } 
`