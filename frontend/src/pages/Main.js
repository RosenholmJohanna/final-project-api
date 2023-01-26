import React, { useState, useEffect } from "react";
import { useNavigate, Link, } from "react-router-dom";
import styled from "styled-components";
import DailyImage from '../components/DailyImage';


const Main = () => {
  
  //const navigate = useNavigate();


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






// const DailyImageContainer = styled.section`
// `



// const ButtonNavigate = styled.button`
// background-color: transparent;
// font-size: 12px;
// text-align: center;
// border-radius:5px;
// cursor:pointer;
// box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
// justify-content: center;
// `

// const ButtonWrapper=styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: right;
// `

  //const accessToken = useSelector((store) => store.user.accessToken);
  // const username = useSelector((store) => store.user.username);
  

  // const goQuestions = () => {
  //   navigate("/questions")
  // }
  // const goUsersCollection = () => {
  //   navigate("/collection")
  //   }
  // const goAllUsers = () => {
  //   navigate("/allUsers")
  //   }

   {/* <ButtonWrapper>
        <ButtonNavigate type="button" onClick={goQuestions}> Questions </ButtonNavigate>
        <ButtonNavigate type="button" onClick={goUsersCollection}> Collection </ButtonNavigate>
        <ButtonNavigate type="button" onClick={goAllUsers}> Users </ButtonNavigate>
        </ButtonWrapper> */}