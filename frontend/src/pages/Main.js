import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useHistory} from "react-router-dom";
import styled from "styled-components"
import DailyImage from '../components/DailyImage'


const Main = () => {
  const navigate = useNavigate();
  //const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  //const accessToken = useSelector((store) => store.user.accessToken);
  // const username = useSelector((store) => store.user.username);
  

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
    {/* <Wrapper> */}
      <DailyImageContainer>
        <DailyImage/> 
      </DailyImageContainer>
      <ButtonWrapper>
      <ButtonNavigate type="button" onClick={goQuestions}> Questions </ButtonNavigate>
      <ButtonNavigate type="button" onClick={goUsersCollection}> Collection </ButtonNavigate>
      <ButtonNavigate type="button" onClick={goAllUsers}> Users </ButtonNavigate>
      </ButtonWrapper>
    {/* </Wrapper> */}
    </>
   ) 
}

export default Main;


const ButtonWrapper=styled.div`
  /* width: 95%; */
  display: flex;
  justify-content: flex-start;
  align-items: right;
`

const DailyImageContainer = styled.section`
`

// const Wrapper = styled.main`
// display: flex;
// justify-content: space-around;
// margin: 2%;
// @media (min-width: 768px) {
//     margin: 10%;
//   }
// `

const ButtonNavigate = styled.button`
background-color: transparent;
font-size: 12px;
text-align: center;
width: 92px;
height:40px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`
